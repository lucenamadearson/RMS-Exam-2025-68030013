// src/routes/payments.ts
import { Router } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// POST /api/payments
router.post('/', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    const { orderId, amountPaid, method } = req.body as {
      orderId?: number; amountPaid?: number; method?: 'cash' | 'card' | 'qr'
    }
    if (typeof orderId !== 'number' || !Number.isInteger(orderId) || orderId <= 0 || amountPaid === undefined) {
      res.status(400).json({ error: 'orderId and amountPaid required' }); return
    }
    const paid = Number(amountPaid)
    if (!Number.isFinite(paid) || paid <= 0) {
      res.status(400).json({ error: 'amountPaid must be a positive number' }); return
    }
    const paymentMethod = method ?? 'cash'
    if (!['cash', 'card', 'qr'].includes(paymentMethod)) {
      res.status(400).json({ error: 'method must be cash, card, or qr' }); return
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    })
    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    if (order.status !== 'confirmed') {
      res.status(400).json({ error: 'Order must be confirmed before payment' }); return
    }
    if (!order.items.length) {
      res.status(400).json({ error: 'Order has no items' }); return
    }

    const totalAmount = Number(order.totalAmount)
    if (paid < totalAmount) {
      res.status(400).json({ error: 'Insufficient payment amount' }); return
    }
    const change = paid - totalAmount

    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: { orderId, cashierId: req.user!.id, totalAmount, amountPaid: paid, change, method: paymentMethod },
      }),
      prisma.order.update({ where: { id: orderId }, data: { status: 'paid' } }),
      prisma.restaurantTable.update({ where: { id: order.tableId }, data: { status: 'available' } }),
    ])

    res.status(201).json({ payment, change, message: 'Payment processed successfully' })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// GET /api/payments/:orderId
router.get('/:orderId', authenticate, async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { orderId: Number(req.params.orderId) },
    })
    if (!payment) { res.status(404).json({ error: 'Payment not found' }); return }
    res.json(payment)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

export default router
