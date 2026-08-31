import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from './auth/AuthContext'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'
import { ToastProvider } from './components/ui/ToastProvider'
import { ThemeProvider } from './theme/ThemeProvider'

import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'

import { DynamicReportPage } from './pages/report/pages/DynamicReportPage'
import { FFContactLocationReportPage } from './pages/report/pages/FFContactLocationReportPage'
import { FFLiveLocationReportPage } from './pages/report/pages/FFLiveLocationReportPage'

import { DashboardViewPage } from './pages/dashboard/pages/DashboardViewPage'
import { DashboardDetailPage } from './pages/dashboard/pages/DashboardDetailPage'

import { UserListPage } from './pages/user/pages/UserListPage'

import { JmlRequestPage } from './pages/jml/pages/JmlRequestPage'
import { RequestListPage } from './pages/jml/pages/RequestListPage'
import { ApproveListPage } from './pages/jml/pages/ApproveListPage'
import { ApproveDetailPage } from './pages/jml/pages/ApproveDetailPage'
import { JmlUsersPage } from './pages/jml/pages/JmlUsersPage'

import { AgencyListPage } from './pages/agency/pages/AgencyListPage'
import { CampaignListPage } from './pages/campaign/pages/CampaignListPage'
import { ProductListPage } from './pages/product/pages/ProductListPage'

import { AccountProfilePage } from './pages/account/pages/AccountProfilePage'
import { SecurityPage } from './pages/account/pages/SecurityPage'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<HomePage />} />

                  <Route path="/report" element={<Navigate to="/report/dynamic" replace />} />
                  <Route path="/report/dynamic" element={<DynamicReportPage />} />
                  <Route path="/report/ff-contact-location" element={<FFContactLocationReportPage />} />
                  <Route path="/report/ff-live-location" element={<FFLiveLocationReportPage />} />

                  <Route path="/dashboard" element={<Navigate to="/dashboard/view" replace />} />
                  <Route path="/dashboard/view" element={<DashboardViewPage />} />
                  <Route path="/dashboard/view/:dashboardId" element={<DashboardDetailPage />} />

                  <Route path="/user" element={<Navigate to="/user/list" replace />} />
                  <Route path="/user/list" element={<UserListPage />} />

                  <Route path="/jml" element={<Navigate to="/jml/request" replace />} />
                  <Route path="/jml/request" element={<JmlRequestPage />} />
                  <Route path="/jml/requests" element={<RequestListPage />} />
                  <Route path="/jml/approvals" element={<ApproveListPage />} />
                  <Route path="/jml/approvals/:ticketId" element={<ApproveDetailPage />} />
                  <Route path="/jml/users" element={<JmlUsersPage />} />

                  <Route path="/agency" element={<Navigate to="/agency/list" replace />} />
                  <Route path="/agency/list" element={<AgencyListPage />} />

                  <Route path="/campaign" element={<Navigate to="/campaign/list" replace />} />
                  <Route path="/campaign/list" element={<CampaignListPage />} />

                  <Route path="/product" element={<Navigate to="/product/list" replace />} />
                  <Route path="/product/list" element={<ProductListPage />} />

                  <Route path="/account/profile" element={<AccountProfilePage />} />
                  <Route path="/account/security" element={<SecurityPage />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
