import dayjs from 'dayjs';
import { WrenchIcon } from '@heroicons/react/24/outline';

import StatusPill from '../components/common/StatusPill.jsx';
import MaintenanceTimeline from '../components/maintenance/MaintenanceTimeline.jsx';
import useInventory from '../hooks/useInventory.js';

const MaintenancePage = () => {
  const { maintenance } = useInventory();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Plan de mantenimiento</h1>
        <p className="text-sm text-slate-500">
          Coordina tareas preventivas, correctivas y predictivas; sincroniza el estado con servicios REST en Django.
        </p>
      </header>

      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4">Intervención</th>
              <th className="px-6 py-4">Activo</th>
              <th className="px-6 py-4">Técnico</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {maintenance.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-semibold text-slate-800">{item.id}</td>
                <td className="px-6 py-4">{item.assetId}</td>
                <td className="px-6 py-4">{item.technician}</td>
                <td className="px-6 py-4">{dayjs(item.scheduledFor).format('DD MMM YYYY')}</td>
                <td className="px-6 py-4">
                  <StatusPill status={item.status} />
                </td>
              </tr>
            ))}
            {!maintenance.length && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                  No hay mantenimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <MaintenanceTimeline items={maintenance} />
        <div className="card space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <WrenchIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-700">Workflow conectado</p>
              <p className="text-xs text-slate-400">Operaciones integradas con API REST.</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Define endpoints como <span className="font-semibold">/inventario/mantenimientos/</span> y gestiona estados desde
            <span className="font-semibold"> viewsets</span> o <span className="font-semibold">GenericAPIView</span> en Django.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MaintenancePage;
