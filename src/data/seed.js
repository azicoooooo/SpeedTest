export const seedAssets = [
  {
    id: 'AST-001',
    name: 'Laptop Dell Latitude 5520',
    category: 'Portátiles',
    status: 'En uso',
    owner: 'Recursos Humanos',
    assignedTo: 'Laura Hernández',
    location: 'Oficina Principal',
    health: 92,
    purchaseDate: '2022-03-15',
    warrantyEnd: '2025-03-15',
    cost: 1450,
    vendor: 'Dell México',
    serial: 'DL5520-8891',
    tags: ['Windows 11', 'Core i7', '16GB RAM']
  },
  {
    id: 'AST-002',
    name: 'Servidor HPE ProLiant DL380',
    category: 'Servidores',
    status: 'En producción',
    owner: 'Infraestructura',
    assignedTo: 'Rack A2',
    location: 'Data Center',
    health: 87,
    purchaseDate: '2021-11-22',
    warrantyEnd: '2026-11-21',
    cost: 8200,
    vendor: 'Hewlett Packard Enterprise',
    serial: 'HPE-DL380-G10',
    tags: ['VMware', 'RAID 10']
  },
  {
    id: 'AST-003',
    name: 'Switch Cisco Catalyst 9300',
    category: 'Redes',
    status: 'Mantenimiento',
    owner: 'Infraestructura',
    assignedTo: 'Closet IDF-3',
    location: 'Sucursal Norte',
    health: 68,
    purchaseDate: '2020-08-09',
    warrantyEnd: '2024-08-09',
    cost: 5200,
    vendor: 'Cisco',
    serial: 'CSC9300-24T',
    tags: ['PoE+', '48 puertos']
  },
  {
    id: 'AST-004',
    name: 'Impresora HP LaserJet Pro M428fdw',
    category: 'Impresoras',
    status: 'Disponible',
    owner: 'Operaciones',
    assignedTo: null,
    location: 'Sucursal Centro',
    health: 76,
    purchaseDate: '2023-01-12',
    warrantyEnd: '2024-12-31',
    cost: 520,
    vendor: 'HP',
    serial: 'HP-M428-0012',
    tags: ['WiFi', 'Dúplex']
  },
  {
    id: 'AST-005',
    name: 'Firewall Fortinet FortiGate 200F',
    category: 'Seguridad',
    status: 'En producción',
    owner: 'Ciberseguridad',
    assignedTo: 'Perímetro WAN',
    location: 'Data Center',
    health: 95,
    purchaseDate: '2023-06-05',
    warrantyEnd: '2026-06-05',
    cost: 6100,
    vendor: 'Fortinet',
    serial: 'FG200F-3301',
    tags: ['HA', 'IPS']
  }
];

export const seedVendors = [
  {
    id: 'PRV-001',
    name: 'Dell México',
    contact: 'ventas@dell.com',
    phone: '+52 55 1234 5678',
    sla: 'Soporte NBD',
    categories: ['Portátiles', 'Monitores']
  },
  {
    id: 'PRV-002',
    name: 'Cisco',
    contact: 'soporte@cisco.com',
    phone: '+52 55 4321 8765',
    sla: 'Soporte avanzado 24/7',
    categories: ['Redes', 'Colaboración']
  },
  {
    id: 'PRV-003',
    name: 'HP',
    contact: 'latam@hp.com',
    phone: '+52 33 5566 7788',
    sla: 'Cobertura extendida 3 años',
    categories: ['Impresoras', 'Portátiles']
  }
];

export const seedMaintenance = [
  {
    id: 'MT-101',
    assetId: 'AST-003',
    type: 'Preventivo',
    scheduledFor: '2024-06-14',
    technician: 'Carlos Méndez',
    status: 'Programado',
    notes: 'Revisión de módulos PoE'
  },
  {
    id: 'MT-102',
    assetId: 'AST-001',
    type: 'Correctivo',
    scheduledFor: '2024-05-28',
    technician: 'Sofía Ramírez',
    status: 'Completado',
    notes: 'Reemplazo de teclado'
  }
];

export const seedRequests = [
  {
    id: 'REQ-5401',
    title: 'Asignación de laptop para nuevo ingreso',
    requester: 'Andrés Castillo',
    department: 'Marketing',
    priority: 'Alta',
    status: 'Pendiente',
    createdAt: '2024-05-18'
  },
  {
    id: 'REQ-5320',
    title: 'Renovación de licencias Adobe',
    requester: 'María González',
    department: 'Diseño',
    priority: 'Media',
    status: 'En progreso',
    createdAt: '2024-05-09'
  },
  {
    id: 'REQ-5210',
    title: 'Configuración de impresora para planta',
    requester: 'Luis Pérez',
    department: 'Operaciones',
    priority: 'Baja',
    status: 'Completado',
    createdAt: '2024-04-26'
  }
];
