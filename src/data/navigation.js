import {
  Squares2X2Icon,
  ComputerDesktopIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

export const navigation = [
  {
    name: 'Panel de control',
    href: '/',
    icon: Squares2X2Icon
  },
  {
    name: 'Activos',
    href: '/activos',
    icon: ComputerDesktopIcon
  },
  {
    name: 'Proveedores',
    href: '/proveedores',
    icon: BuildingOfficeIcon
  },
  {
    name: 'Mantenimiento',
    href: '/mantenimiento',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'Solicitudes',
    href: '/solicitudes',
    icon: ClipboardDocumentCheckIcon
  },
  {
    name: 'Reportes',
    href: '/reportes',
    icon: SignalIcon
  },
  {
    name: 'Configuración',
    href: '/configuracion',
    icon: Cog6ToothIcon
  }
];
