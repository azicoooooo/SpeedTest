import { Navigate, Route, Routes } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage.jsx';
import AssetsPage from '../pages/AssetsPage.jsx';
import AssetDetailPage from '../pages/AssetDetailPage.jsx';
import VendorsPage from '../pages/VendorsPage.jsx';
import MaintenancePage from '../pages/MaintenancePage.jsx';
import RequestsPage from '../pages/RequestsPage.jsx';
import ReportsPage from '../pages/ReportsPage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route index element={<DashboardPage />} />
    <Route path="/activos" element={<AssetsPage />} />
    <Route path="/activos/:assetId" element={<AssetDetailPage />} />
    <Route path="/proveedores" element={<VendorsPage />} />
    <Route path="/mantenimiento" element={<MaintenancePage />} />
    <Route path="/solicitudes" element={<RequestsPage />} />
    <Route path="/reportes" element={<ReportsPage />} />
    <Route path="/configuracion" element={<SettingsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
