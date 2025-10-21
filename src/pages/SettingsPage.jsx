import { useState } from 'react';
import { ServerStackIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api');
  const [token, setToken] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Configura las variables de entorno en tu proyecto: \nVITE_API_BASE_URL=${apiUrl}\nTOKEN=${token || '<token>'}`
    );
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Configuración e integración</h1>
        <p className="text-sm text-slate-500">
          Ajusta parámetros de conexión y políticas de seguridad para sincronizar con servicios expuestos desde Django REST Framework.
        </p>
      </header>

      <section className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <ServerStackIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-700">Conexión con API</p>
              <p className="text-xs text-slate-400">Define la URL base de tu backend Django.</p>
            </div>
          </div>
          <label className="block text-sm font-medium text-slate-600">
            URL base
            <input
              value={apiUrl}
              onChange={(event) => setApiUrl(event.target.value)}
              placeholder="http://localhost:8000/api"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </label>
          <label className="block text-sm font-medium text-slate-600">
            Token de servicio
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Token JWT o API Key"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Guardar configuración
          </button>
        </form>
      </section>

      <section className="card space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            <ShieldExclamationIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-700">Buenas prácticas</p>
            <p className="text-xs text-slate-400">Seguridad y despliegue.</p>
          </div>
        </div>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>· Protege los endpoints con <span className="font-semibold">SimpleJWT</span> o autenticación por token.</li>
          <li>· Define permisos granulares con <span className="font-semibold">DjangoModelPermissions</span>.</li>
          <li>· Configura CORS en Django usando <span className="font-semibold">django-cors-headers</span>.</li>
        </ul>
      </section>
    </div>
  );
};

export default SettingsPage;
