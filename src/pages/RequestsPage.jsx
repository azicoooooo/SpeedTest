import dayjs from 'dayjs';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

import StatusPill from '../components/common/StatusPill.jsx';
import useInventory from '../hooks/useInventory.js';

const RequestsPage = () => {
  const { requests, requestsByStatus } = useInventory();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Solicitudes de servicio</h1>
        <p className="text-sm text-slate-500">
          Gestiona peticiones de equipos, periféricos y servicios. Sincroniza cambios de estado con endpoints Django REST.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(requestsByStatus).map(([status, count]) => (
          <div key={status} className="card">
            <p className="text-xs uppercase tracking-wide text-slate-400">{status}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{count}</p>
            <p className="text-xs text-slate-400">Solicitudes registradas</p>
          </div>
        ))}
        {!Object.keys(requestsByStatus).length && (
          <div className="card">
            <p className="text-sm text-slate-500">No hay solicitudes activas.</p>
          </div>
        )}
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4">Solicitud</th>
              <th className="px-6 py-4">Departamento</th>
              <th className="px-6 py-4">Prioridad</th>
              <th className="px-6 py-4">Creado</th>
              <th className="px-6 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">{request.title}</p>
                  <p className="text-xs text-slate-400">{request.id}</p>
                </td>
                <td className="px-6 py-4">{request.department}</td>
                <td className="px-6 py-4">{request.priority}</td>
                <td className="px-6 py-4">{dayjs(request.createdAt).format('DD MMM YYYY')}</td>
                <td className="px-6 py-4">
                  <StatusPill status={request.status} />
                </td>
              </tr>
            ))}
            {!requests.length && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                  No hay solicitudes registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="card space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            <ClipboardDocumentListIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-700">Automatiza aprobaciones</p>
            <p className="text-xs text-slate-400">Integra reglas de negocio desde Django.</p>
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Habilita endpoints como <span className="font-semibold">/inventario/solicitudes/</span> con DRF y sincroniza estados mediante
          websockets o <span className="font-semibold">signals</span> para notificaciones en tiempo real.
        </p>
      </section>
    </div>
  );
};

export default RequestsPage;
