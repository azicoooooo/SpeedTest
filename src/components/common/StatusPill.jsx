const STATUS_STYLES = {
  'En uso': 'bg-primary-100 text-primary-600',
  'En producción': 'bg-indigo-100 text-indigo-600',
  Disponible: 'bg-emerald-100 text-emerald-600',
  Mantenimiento: 'bg-amber-100 text-amber-600',
  Retirado: 'bg-slate-200 text-slate-500'
};

const StatusPill = ({ status }) => {
  const styles = STATUS_STYLES[status] || 'bg-slate-100 text-slate-500';

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
};

export default StatusPill;
