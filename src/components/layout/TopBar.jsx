import dayjs from 'dayjs';
import { ArrowPathIcon, Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import useInventory from '../../hooks/useInventory.js';

const TopBar = ({ onToggleSidebar }) => {
  const { filters, setFilters, lastSync, refreshFromApi, loading } = useInventory();

  return (
    <header className="sticky top-0 z-30 bg-slate-100/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 lg:px-10">
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            type="button"
            className="rounded-xl bg-white p-2 text-slate-600 shadow-sm lg:hidden"
            onClick={onToggleSidebar}
          >
            <Bars3Icon className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </button>
          <div className="hidden text-left lg:block">
            <p className="text-xs uppercase tracking-wide text-slate-400">Inventario TI</p>
            <p className="text-lg font-semibold text-slate-900">Panel de monitoreo</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden w-full max-w-md items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm lg:flex">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
            <input
              type="search"
              value={filters.search}
              onChange={(event) => setFilters({ search: event.target.value })}
              placeholder="Buscar activo, serie o responsable"
              className="ml-2 w-full border-none bg-transparent text-sm text-slate-600 outline-none focus:ring-0"
            />
          </div>
          <div className="hidden flex-col items-end text-xs text-slate-400 lg:flex">
            <span>Última sincronización</span>
            <span className="font-medium text-slate-600">
              {lastSync ? dayjs(lastSync).format('DD MMM YYYY HH:mm') : 'Automático'}
            </span>
          </div>
          <button
            type="button"
            onClick={refreshFromApi}
            className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-primary-600 shadow-sm transition hover:bg-primary-50"
          >
            <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            Sincronizar
          </button>
          <button className="rounded-2xl bg-white p-2 text-slate-500 shadow-sm">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Ver notificaciones</span>
          </button>
          <div className="hidden items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm lg:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
              IT
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Administrador</p>
              <p className="text-xs text-slate-400">ti@empresa.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-3 lg:hidden">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          <input
            type="search"
            value={filters.search}
            onChange={(event) => setFilters({ search: event.target.value })}
            placeholder="Buscar activo, serie o responsable"
            className="w-full border-none bg-transparent text-sm text-slate-600 outline-none focus:ring-0"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
