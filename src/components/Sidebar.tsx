import React from 'react';
import {
  LayoutDashboard,
  Users,
  Smartphone,
  ClipboardList,
  Package,
  BarChart2,
  Settings,
  HelpCircle,
  Wrench,
  FileText
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { appConfig } from '../config/app';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Kunden', path: '/customers' },
  { icon: Smartphone, label: 'Geräte', path: '/devices' },
  { icon: ClipboardList, label: 'Reparaturaufträge', path: '/tickets' },
  { icon: Package, label: 'Inventar', path: '/inventory' },
  { icon: Wrench, label: 'Ersatzteile', path: '/parts' },
  { icon: FileText, label: 'Rechnungen', path: '/invoices' },
  { icon: BarChart2, label: 'Berichte', path: '/reports' },
  { icon: HelpCircle, label: 'Support', path: '/support' },
  { icon: Settings, label: 'Einstellungen', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const settings = useSelector((state: RootState) => state.settings);

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <img src={settings.company.logo || appConfig.logo} alt="Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">{settings.company.name || appConfig.name}</h1>
        </div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}