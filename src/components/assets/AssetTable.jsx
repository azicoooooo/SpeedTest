import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import StatusPill from '../common/StatusPill.jsx';

const AssetTable = ({ assets }) => {
  if (!assets.length) {
    return (
      <div className="card text-center text-sm text-slate-500">
        No hay activos que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50/50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-6 py-4">Activo</th>
            <th className="px-6 py-4">Categoría</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4">Asignado a</th>
            <th className="px-6 py-4">Garantía</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-slate-50/70">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-800">{asset.name}</div>
                <p className="text-xs text-slate-400">{asset.id}</p>
              </td>
              <td className="px-6 py-4 text-slate-500">{asset.category}</td>
              <td className="px-6 py-4">
                <StatusPill status={asset.status} />
              </td>
              <td className="px-6 py-4 text-slate-500">
                {asset.assignedTo || 'Sin asignar'}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {asset.warrantyEnd ? dayjs(asset.warrantyEnd).format('DD MMM YYYY') : 'N/D'}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end">
                  <Link
                    to={`/activos/${asset.id}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600 hover:bg-primary-100"
                  >
                    Ver detalle
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
