import { ChartPieIcon, CloudArrowDownIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

import useInventory from '../hooks/useInventory.js';

const ReportsPage = () => {
  const { stats } = useInventory();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Reportes y analítica</h1>
        <p className="text-sm text-slate-500">
          Genera dashboards financieros, de operación y cumplimiento basados en datos consumidos desde Django REST Framework.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-400">Inventario total</p>
          <p className="text-3xl font-semibold text-slate-900">{stats.total}</p>
          <p className="text-xs text-slate-400">Activos gestionados</p>
        </div>
        <div className="card space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-400">Valor contable</p>
          <p className="text-3xl font-semibold text-slate-900">${stats.totalValue.toLocaleString('es-MX')}</p>
          <p className="text-xs text-slate-400">Costo histórico</p>
        </div>
        <div className="card space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-400">Garantías por vencer</p>
          <p className="text-3xl font-semibold text-slate-900">{stats.expiringWarranties}</p>
          <p className="text-xs text-slate-400">Próximos 90 días</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <ChartPieIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-700">Indicadores clave</p>
              <p className="text-xs text-slate-400">Conecta tablas con herramientas BI.</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>· Tendencia de asignaciones por departamento</li>
            <li>· Tiempo medio para cierre de solicitudes</li>
            <li>· Cumplimiento de pólizas de garantía</li>
          </ul>
        </div>
        <div className="card space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <CloudArrowDownIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-700">Exportaciones</p>
              <p className="text-xs text-slate-400">Genera reportes en CSV o PDF desde Django.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50">
              <DocumentArrowDownIcon className="h-5 w-5" /> Exportar CSV
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50">
              <DocumentArrowDownIcon className="h-5 w-5" /> Exportar PDF
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Puedes crear endpoints dedicados como <span className="font-semibold">/reportes/inventario/</span> usando DRF y{' '}
            <span className="font-semibold">django-filter</span> para parámetros dinámicos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;
