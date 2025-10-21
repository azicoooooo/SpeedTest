# Inventario TI · Frontend

Aplicación web construida con **React**, **Vite** y **Tailwind CSS** para administrar inventario tecnológico. Está preparada para integrarse con un backend expuesto mediante **Django REST Framework**, incluyendo endpoints para activos, mantenimientos, solicitudes y proveedores.

## Características principales

- Panel ejecutivo con métricas clave, salud de activos y próximos mantenimientos.
- Gestión de activos con filtros por estado y categoría, detalle completo por activo y etiquetas técnicas.
- Catálogo de proveedores estratégicos, plan de mantenimiento y seguimiento de solicitudes de servicio.
- Componentes de UI reutilizables, listos para conectar con endpoints DRF (`/inventario/activos/`, `/inventario/mantenimientos/`, etc.).
- Configuración de cliente HTTP con Axios y soporte para token de autenticación.

## Requisitos

- Node.js 18 o superior
- npm o pnpm/yarn

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor de desarrollo se levanta en `http://localhost:5173`. Puedes definir `VITE_API_BASE_URL` en un archivo `.env` para apuntar a tu instancia de Django REST Framework.

## Construcción

```bash
npm run build
```

## Estructura relevante

```
src/
├── api/                # Cliente Axios y servicios para inventario
├── components/         # Componentes UI (layout, analytics, assets, etc.)
├── context/            # Contexto global con estado del inventario
├── data/               # Semillas locales para trabajar sin backend
├── hooks/              # Hooks personalizados (useInventory)
├── pages/              # Vistas principales conectadas al router
├── router/             # Definición de rutas
└── index.css           # Tailwind y estilos globales
```

## Integración con Django REST Framework

1. Expone endpoints RESTful (`/inventario/activos/`, `/inventario/mantenimientos/`, `/inventario/solicitudes/`, `/inventario/proveedores/`).
2. Habilita autenticación (por ejemplo JWT) y configura CORS (`django-cors-headers`).
3. Define `VITE_API_BASE_URL` y, opcionalmente, tokens en `localStorage` para que el cliente agregue el encabezado `Authorization`.
4. Extiende los servicios en `src/api/inventory.js` para añadir operaciones CRUD adicionales según tus necesidades.

## Scripts disponibles

- `npm run dev` — Ejecuta el servidor de desarrollo con recarga en caliente.
- `npm run build` — Genera la versión optimizada para producción.
- `npm run preview` — Sirve la build de producción localmente.
- `npm run lint` — Ejecuta ESLint sobre los archivos de `src/`.

---

Creado para gestionar inventarios tecnológicos con una experiencia moderna, modular y fácilmente integrable con Django REST Framework.
