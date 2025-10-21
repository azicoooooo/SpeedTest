import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { navigation } from '../../data/navigation.js';
import Logo from './Logo.jsx';

const SidebarLink = ({ item, onNavigate, isActive }) => (
  <Link
    to={item.href}
    onClick={onNavigate}
    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-primary-50 hover:text-primary-600 ${
      isActive ? 'bg-primary-100 text-primary-700' : 'text-slate-500'
    }`}
  >
    <item.icon className="h-5 w-5" />
    {item.name}
  </Link>
);

const SidebarContent = ({ onNavigate }) => {
  const location = useLocation();

  return (
    <nav className="mt-6 flex flex-1 flex-col gap-1">
      {navigation.map((item) => (
        <SidebarLink
          key={item.name}
          item={item}
          onNavigate={onNavigate}
          isActive={location.pathname === item.href}
        />
      ))}
      <div className="mt-auto rounded-2xl bg-primary-100 p-4 text-primary-800">
        <p className="text-xs uppercase tracking-wide text-primary-600">Integración</p>
        <p className="mt-1 text-sm font-medium">
          Conecta con Django REST Framework para mantener inventarios en tiempo real.
        </p>
      </div>
    </nav>
  );
};

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/50" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white px-4 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <Logo />
                  <button
                    type="button"
                    className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar menú</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <SidebarContent onNavigate={onClose} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden w-72 flex-col border-r border-slate-100 bg-white px-6 pb-8 pt-8 lg:flex">
        <Logo />
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
