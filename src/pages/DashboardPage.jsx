import dayjs from 'dayjs';
import { BoltIcon, ChartBarIcon, ComputerDesktopIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

import AssetHealthSummary from '../components/analytics/AssetHealthSummary.jsx';
import StatCard from '../components/analytics/StatCard.jsx';
import StatusPill from '../components/common/StatusPill.jsx';
import MaintenanceTimeline from '../components/maintenance/MaintenanceTimeline.jsx';
import useInventory from '../hooks/useInventory.js';

const DashboardPage = () => {
  const {
    stats,
    assets,
    allAssets,
    maintenance,
    requests,
    maintenanceByStatus,
    requestsByStatus
  } = useInventory();

  const maintenancePreview = maintenance.slice(0, 3);
  const latestRequests = [...requests]
    .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    .slice(0, 4);

  const recentAssets = assets.slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Resumen ejecutivo</h1>
        <p className="text-sm text-slate-500">
          Controla el ciclo de vida de dispositivos, licencias y periféricos que soportan las operaciones de TI.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Activos registrados"
          value={stats.total}
          change="+8%"
          icon={ComputerDesktopIcon}
          helper="Incluye hardware, periféricos y equipos de red"
        />
        <StatCard
          title="Uso operativo"
          value={`${stats.inUse} activos`}
          change="+3%"
          icon={ChartBarIcon}
          helper="Dispositivos en producción o asignados"
        />
        <StatCard
          title="Mantenimientos activos"
          value={stats.maintenance}
          trend="down"
          change="-2%"
          icon={WrenchScrewdriverIcon}
          helper="Incluye tareas preventivas y correctivas"
        />
        <StatCard
          title="Valor estimado"
          value={`$${stats.totalValue.toLocaleString('es-MX')}`}
          change="+5%"
          icon={BoltIcon}
          helper="Capex gestionado durante los últimos 3 años"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AssetHealthSummary assets={allAssets} />
        <div className="card">
          <p className="text-sm font-semibold text-slate-700">Estado de solicitudes</p>
          <p className="text-xs text-slate-400">
            Monitorea requerimientos de usuarios y automatiza aprobaciones con tu API en Django.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(requestsByStatus).map(([status, count]) => (
              <div key={status} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{status}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{count}</p>
                <p className="text-xs text-slate-400">Solicitudes</p>
              </div>
            ))}
            {!Object.keys(requestsByStatus).length && (
              <p className="col-span-full text-sm text-slate-500">
                No hay solicitudes registradas.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">Activos destacados</p>
              <p className="text-xs text-slate-400">Registros recientemente actualizados</p>
            </div>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {recentAssets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-slate-800">{asset.name}</p>
                  <p className="text-xs text-slate-400">{asset.id} · {asset.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xs text-slate-400">
                    Garantía {asset.warrantyEnd ? dayjs(asset.warrantyEnd).format('DD MMM YYYY') : 'N/D'}
                  </p>
                  <StatusPill status={asset.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <MaintenanceTimeline items={maintenancePreview} />
          <div className="card">
            <p className="text-sm font-semibold text-slate-700">Flujo de mantenimiento</p>
            <div className="mt-4 space-y-2 text-sm">
              {Object.entries(maintenanceByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between rounded-xl bg-slate-50/80 px-3 py-2">
                  <span className="text-slate-500">{status}</span>
                  <span className="font-semibold text-slate-800">{count}</span>
                </div>
              ))}
              {!Object.keys(maintenanceByStatus).length && (
                <p className="text-sm text-slate-500">No hay historial registrado.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">Últimas solicitudes</p>
            <p className="text-xs text-slate-400">Coordina aprobaciones desde la API en Django REST Framework.</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {latestRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between rounded-2xl bg-slate-50/80 px-4 py-3">
              <div>
                <p className="font-semibold text-slate-800">{request.title}</p>
                <p className="text-xs text-slate-400">
                  {request.id} · {request.department} · {dayjs(request.createdAt).format('DD MMM YYYY')}
                </p>
              </div>
              <StatusPill status={request.status} />
            </div>
          ))}
          {!latestRequests.length && (
            <p className="text-sm text-slate-500">No hay solicitudes recientes.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
