import { PlusIcon } from '@heroicons/react/24/outline';

import AssetFilters from '../components/assets/AssetFilters.jsx';
import AssetTable from '../components/assets/AssetTable.jsx';
import useInventory from '../hooks/useInventory.js';

const AssetsPage = () => {
  const { assets, filters } = useInventory();

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de activos</h1>
          <p className="text-sm text-slate-500">
            Administra asignaciones, estados de salud y garantías conectadas a tu API Django REST Framework.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
          <PlusIcon className="h-5 w-5" />
          Nuevo activo
        </button>
      </header>

      <AssetFilters />

      <div className="flex items-center justify-between text-xs text-slate-400">
        <p>
          Mostrando <span className="font-semibold text-slate-600">{assets.length}</span> activos
          {filters.status !== 'Todos' && ` · Estado: ${filters.status}`}
          {filters.category !== 'Todos' && ` · Categoría: ${filters.category}`}
        </p>
      </div>

      <AssetTable assets={assets} />
    </div>
  );
};

export default AssetsPage;
