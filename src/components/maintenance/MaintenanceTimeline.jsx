import dayjs from 'dayjs';
import StatusPill from '../common/StatusPill.jsx';

const MaintenanceTimeline = ({ items }) => {
  if (!items.length) {
    return (
      <div className="card">
        <p className="text-sm font-semibold text-slate-700">Próximos mantenimientos</p>
        <p className="mt-2 text-sm text-slate-500">No hay tareas programadas.</p>
      </div>
    );
  }

  const sorted = [...items].sort(
    (a, b) => dayjs(a.scheduledFor).valueOf() - dayjs(b.scheduledFor).valueOf()
  );

  return (
    <div className="card">
      <p className="text-sm font-semibold text-slate-700">Próximos mantenimientos</p>
      <p className="text-xs text-slate-400">
        Seguimiento de intervenciones preventivas y correctivas para infraestructura crítica.
      </p>
      <div className="mt-4 space-y-4">
        {sorted.map((item) => (
          <div key={item.id} className="flex items-start gap-4 rounded-2xl bg-slate-50/80 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-sm font-semibold text-primary-600">
              {dayjs(item.scheduledFor).format('DD')}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-800">{item.type}</p>
                <StatusPill status={item.status} />
              </div>
              <p className="text-xs text-slate-400">Activo: {item.assetId}</p>
              <p className="mt-1 text-sm text-slate-500">
                Programado para {dayjs(item.scheduledFor).format('DD MMM YYYY')} · {item.technician}
              </p>
              {item.notes && <p className="mt-2 text-xs text-slate-400">{item.notes}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTimeline;
