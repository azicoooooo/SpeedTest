import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

import useInventory from '../hooks/useInventory.js';

const VendorsPage = () => {
  const { vendors } = useInventory();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Proveedores estratégicos</h1>
        <p className="text-sm text-slate-500">
          Controla contratos, acuerdos de nivel de servicio y contactos clave para respuesta rápida ante incidentes.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <article key={vendor.id} className="card space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                <BuildingOffice2Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">{vendor.id}</p>
                <p className="text-lg font-semibold text-slate-800">{vendor.name}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="inline-flex items-center gap-2 text-slate-500">
                <EnvelopeIcon className="h-4 w-4" /> {vendor.contact}
              </p>
              <p className="inline-flex items-center gap-2 text-slate-500">
                <PhoneIcon className="h-4 w-4" /> {vendor.phone}
              </p>
              <p className="inline-flex items-center gap-2 text-slate-500">
                <ShieldCheckIcon className="h-4 w-4" /> {vendor.sla}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Cobertura</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {vendor.categories.map((category) => (
                  <span key={category} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="card">
        <p className="text-sm font-semibold text-slate-700">Integración sugerida</p>
        <p className="mt-2 text-sm text-slate-500">
          Expone endpoints como <span className="font-semibold">/inventario/proveedores/</span> desde Django REST Framework
          y conecta formularios de alta con validaciones de <span className="font-semibold">ModelSerializer</span>.
        </p>
      </section>
    </div>
  );
};

export default VendorsPage;
