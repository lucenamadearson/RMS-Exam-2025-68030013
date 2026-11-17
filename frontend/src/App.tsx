// src/App.tsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import type { Role } from './types'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))

function PrivateRoute({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return <>{children}</>
}

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading…</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout><PrivateRoute><DashboardPage /></PrivateRoute></Layout>} />
            <Route path="/menu" element={<Layout><PrivateRoute><MenuPage /></PrivateRoute></Layout>} />
            <Route path="/orders" element={<Layout><PrivateRoute><OrdersPage /></PrivateRoute></Layout>} />
            <Route path="/orders/:id" element={<Layout><PrivateRoute><OrderDetailPage /></PrivateRoute></Layout>} />
            <Route path="/payment/:orderId" element={<Layout><PrivateRoute><PaymentPage /></PrivateRoute></Layout>} />
            <Route path="/reports" element={
              <Layout>
                <PrivateRoute roles={['admin', 'cashier']}>
                  <ReportsPage />
                </PrivateRoute>
              </Layout>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
