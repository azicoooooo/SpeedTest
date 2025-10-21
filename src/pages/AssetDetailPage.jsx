import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import StatusPill from '../components/common/StatusPill.jsx';
import MaintenanceTimeline from '../components/maintenance/MaintenanceTimeline.jsx';
import useInventory from '../hooks/useInventory.js';

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
    <span className="text-sm font-semibold text-slate-700">{value || 'No registrado'}</span>
  </div>
);

const AssetDetailPage = () => {
  const navigate = useNavigate();
  const { assetId } = useParams();
  const { allAssets, maintenance, requests } = useInventory();

  const asset = allAssets.find((item) => item.id === assetId);

  if (!asset) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-slate-600 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Volver
        </button>
        <div className="card">
          <p className="text-sm text-slate-500">No se encontró el activo solicitado.</p>
        </div>
      </div>
    );
  }

  const relatedMaintenance = maintenance.filter((item) => item.assetId === asset.id);
  const relatedRequests = requests.filter((item) => item.title.includes(asset.name));

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-slate-600 shadow-sm hover:bg-slate-50"
      >
        <ArrowLeftIcon className="h-4 w-4" /> Volver al listado
      </button>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="card xl:col-span-2">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Activo</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">{asset.name}</h1>
              <p className="text-xs text-slate-400">Identificador {asset.id}</p>
            </div>
            <StatusPill status={asset.status} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailRow label="Categoría" value={asset.category} />
            <DetailRow label="Serie" value={asset.serial} />
            <DetailRow label="Responsable" value={asset.assignedTo} />
            <DetailRow label="Propietario" value={asset.owner} />
            <DetailRow label="Proveedor" value={asset.vendor} />
            <DetailRow label="Costo" value={asset.cost ? `$${asset.cost.toLocaleString('es-MX')}` : null} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailRow
              label="Fecha de compra"
              value={asset.purchaseDate ? dayjs(asset.purchaseDate).format('DD MMM YYYY') : null}
            />
            <DetailRow
              label="Fin de garantía"
              value={asset.warrantyEnd ? dayjs(asset.warrantyEnd).format('DD MMM YYYY') : null}
            />
            <DetailRow label="Ubicación" value={asset.location} />
            <DetailRow label="Puntaje de salud" value={`${asset.health}%`} />
          </div>

          {asset.tags?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">Etiquetas técnicas</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card space-y-3">
            <p className="text-sm font-semibold text-slate-700">Integración con Django REST</p>
            <p className="text-xs text-slate-400">
              Los endpoints de detalle, actualización y retiro pueden conectarse a vistas DRF como
              <span className="font-semibold text-slate-600"> RetrieveUpdateAPIView</span>.
            </p>
            <div className="rounded-2xl bg-slate-900/90 p-4 text-xs text-slate-200">
              <p className="font-mono">GET /inventario/activos/{asset.id}/</p>
              <p className="font-mono">PUT /inventario/activos/{asset.id}/</p>
              <p className="font-mono">POST /inventario/activos/{asset.id}/retirar/</p>
            </div>
            <p className="text-xs text-slate-400">
              Conecta formularios React con <span className="font-semibold">serializers</span> y{' '}
              <span className="font-semibold">viewsets</span> para persistencia inmediata.
            </p>
          </div>

          <MaintenanceTimeline items={relatedMaintenance} />

          <div className="card">
            <p className="text-sm font-semibold text-slate-700">Solicitudes vinculadas</p>
            <div className="mt-3 space-y-3 text-sm">
              {relatedRequests.length ? (
                relatedRequests.map((request) => (
                  <div key={request.id} className="rounded-2xl bg-slate-50/80 px-3 py-2">
                    <p className="font-semibold text-slate-700">{request.title}</p>
                    <p className="text-xs text-slate-400">
                      {request.id} · {request.department} · {dayjs(request.createdAt).format('DD MMM YYYY')}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">Sin solicitudes asociadas.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetDetailPage;
