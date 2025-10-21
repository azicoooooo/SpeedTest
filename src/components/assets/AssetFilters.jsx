import { useMemo } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

import useInventory from '../../hooks/useInventory.js';

const AssetFilters = () => {
  const { allAssets, filters, setFilters } = useInventory();

  const options = useMemo(() => {
    const categories = Array.from(new Set(allAssets.map((asset) => asset.category))).sort();
    const statuses = Array.from(new Set(allAssets.map((asset) => asset.status))).sort();

    return {
      categories: ['Todos', ...categories],
      statuses: ['Todos', ...statuses]
    };
  }, [allAssets]);

  return (
    <div className="card flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3 text-slate-500">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
          <FunnelIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-700">Filtros de activos</p>
          <p className="text-xs text-slate-400">
            Refina la vista por categoría, estado operativo o responsable.
          </p>
        </div>
      </div>
      <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
          Estado
          <select
            value={filters.status}
            onChange={(event) => setFilters({ status: event.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
          >
            {options.statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
          Categoría
          <select
            value={filters.category}
            onChange={(event) => setFilters({ category: event.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
          >
            {options.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setFilters({ status: 'Todos', category: 'Todos' })}
          className="flex h-12 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm font-medium text-slate-500 transition hover:border-primary-200 hover:text-primary-600"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default AssetFilters;
