import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

import Logo from '../components/layout/Logo.jsx';

const featureHighlights = [
  'Sincroniza activos y contratos desde tu CMDB y ERP en tiempo real.',
  'Automatiza aprobaciones con flujos basados en políticas corporativas.',
  'Auditorías continuas con reportes descargables y alertas preventivas.'
];

const trustedIntegrations = ['Azure AD', 'Google Workspace', 'ServiceNow'];

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    remember: true
  });

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-primary-900 to-primary-700">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid items-center gap-12 rounded-[2.5rem] bg-white/5 p-10 shadow-2xl shadow-slate-950/20 ring-1 ring-white/10 backdrop-blur-xl lg:grid-cols-[1.15fr,1fr]">
          <div className="space-y-10 text-white">
            <div className="inline-flex items-center gap-4 rounded-3xl bg-white/10 px-6 py-4 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-600">
                <span className="text-xl font-semibold">TI</span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-100/80">Inventario</p>
                <p className="text-2xl font-bold">Tecnología</p>
              </div>
            </div>
            <div className="space-y-5">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Control total del ecosistema tecnológico de tu organización
              </h1>
              <p className="max-w-xl text-base text-primary-100/90">
                Centraliza activos, contratos y mantenimientos con un panel diseñado para equipos de TI modernos y operaciones 24/7.
              </p>
            </div>
            <ul className="space-y-4 text-primary-100/80">
              {featureHighlights.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-1 h-5 w-5 text-accent" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary-100/60">Conectado con</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {trustedIntegrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-500/40 via-primary-400/20 to-accent/40 blur-3xl" />
            <div className="card relative overflow-hidden border border-slate-100/80 p-8 sm:p-9">
              <div className="absolute -top-24 -right-32 h-40 w-40 rounded-full bg-primary-100/70 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-28 -left-20 h-36 w-36 rounded-full bg-accent/40 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <Logo />
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                    Acceso seguro
                  </span>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-600">
                      Correo corporativo
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formValues.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-12 text-sm text-slate-600 shadow-sm transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
                        placeholder="persona@empresa.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-slate-600">
                      Contraseña
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formValues.password}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-12 text-sm text-slate-600 shadow-sm transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
                        placeholder="Ingresa tu clave"
                        autoComplete="current-password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="remember" className="flex items-center gap-2 text-sm text-slate-500">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        checked={formValues.remember}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      Recordarme
                    </label>
                    <a href="#recuperar" className="text-sm font-semibold text-primary-600 transition hover:text-primary-500">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Ingresar al panel
                    <ArrowRightIcon className="h-5 w-5" />
                  </button>
                </form>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <ShieldCheckIcon className="h-6 w-6 text-primary-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Autenticación reforzada</p>
                      <p className="text-xs text-slate-400">
                        Compatible con políticas MFA, SSO y rotación de credenciales en tu directorio corporativo.
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-400">
                    ¿No tienes acceso? Solicítalo a seguridadTI@empresa.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
