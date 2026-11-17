const { PrismaClient, Role, Category } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  if (await prisma.user.count()) {
    console.log('Database already seeded.')
    return
  }

  const hash = (password) => bcrypt.hashSync(password, 10)
  await prisma.user.createMany({
    data: [
      { username: 'admin', password: hash('Admin@123'), role: Role.admin, name: 'Admin User' },
      { username: 'cashier1', password: hash('Cashier@123'), role: Role.cashier, name: 'Cashier One' },
      { username: 'waiter1', password: hash('Waiter@123'), role: Role.waiter, name: 'Waiter One' },
      { username: 'waiter2', password: hash('Waiter@123'), role: Role.waiter, name: 'Waiter Two' },
    ],
  })

  await prisma.menuItem.createMany({
    data: [
      { name: 'Pad Thai', description: 'Classic Thai stir-fried noodles', price: 80, category: Category.food },
      { name: 'Tom Yum Soup', description: 'Spicy Thai soup with shrimp', price: 120, category: Category.food },
      { name: 'Green Curry', description: 'Thai green curry with coconut milk', price: 110, category: Category.food },
      { name: 'Fried Rice', description: 'Thai-style fried rice with egg', price: 75, category: Category.food },
      { name: 'Spring Rolls', description: 'Crispy vegetable spring rolls (6)', price: 65, category: Category.food },
      { name: 'Mango Sticky Rice', description: 'Sweet dessert with fresh mango', price: 60, category: Category.dessert },
      { name: 'Coconut Ice Cream', description: 'Homemade coconut ice cream', price: 55, category: Category.dessert },
      { name: 'Fresh OJ', description: '100% fresh squeezed orange juice', price: 45, category: Category.drink },
      { name: 'Thai Iced Tea', description: 'Sweetened tea with condensed milk', price: 40, category: Category.drink },
      { name: 'Singha Beer', description: 'Thai lager 330ml', price: 70, category: Category.drink },
    ],
  })

  await prisma.restaurantTable.createMany({
    data: Array.from({ length: 10 }, (_, index) => ({
      tableNumber: index + 1,
      capacity: index < 5 ? 4 : 6,
    })),
  })
  console.log('Seed complete.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
}).finally(() => prisma.$disconnect())
