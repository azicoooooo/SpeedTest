import clsx from 'clsx';

const buckets = [
  { label: 'Salud óptima', min: 85, max: 101, color: 'bg-emerald-500' },
  { label: 'Revisar pronto', min: 70, max: 85, color: 'bg-amber-500' },
  { label: 'Crítico', min: 0, max: 70, color: 'bg-red-500' }
];

const AssetHealthSummary = ({ assets }) => {
  const total = assets.length;
  const averageHealth = total
    ? Math.round(assets.reduce((acc, asset) => acc + (asset.health || 0), 0) / total)
    : 0;

  const distribution = buckets.map((bucket) => ({ ...bucket, count: 0 }));

  assets.forEach((asset) => {
    const bucket = distribution.find((candidate) => {
      const health = asset.health ?? 0;
      return health >= candidate.min && health < candidate.max;
    });

    if (bucket) {
      bucket.count += 1;
    }
  });

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Salud de activos</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{averageHealth}%</p>
          <p className="mt-1 text-sm text-slate-500">Promedio global de condition scoring</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary-200 bg-primary-50 text-center">
          <span className="text-xs font-semibold text-primary-600">{total} activos</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {distribution.map((bucket) => {
          const percentage = total ? Math.round((bucket.count / total) * 100) : 0;
          return (
            <div key={bucket.label} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className={clsx('h-2 rounded-full', bucket.color)}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-32 text-right">
                <p className="text-xs font-semibold text-slate-600">{bucket.label}</p>
                <p className="text-xs text-slate-400">
                  {bucket.count} ({percentage}%)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetHealthSummary;
