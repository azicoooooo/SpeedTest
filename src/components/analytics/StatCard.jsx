import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

const StatCard = ({ title, value, change, icon: Icon, trend = 'up', helper }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
        </div>
        {Icon && (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            <Icon className="h-6 w-6" />
          </span>
        )}
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium">
          <span
            className={`flex items-center gap-1 ${
              trend === 'down' ? 'text-red-500' : 'text-emerald-500'
            }`}
          >
            {trend === 'down' ? (
              <ArrowDownIcon className="h-4 w-4" />
            ) : (
              <ArrowUpIcon className="h-4 w-4" />
            )}
            {change}
          </span>
          <span className="text-xs font-normal text-slate-400">vs. mes anterior</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
