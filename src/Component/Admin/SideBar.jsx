import React, { useState } from 'react';
import { Users, Edit3, UserPlus, X } from 'lucide-react';
import { Link } from 'react-router';

const SideBar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('students');

  const menuItems = [
    { id: 'students', label: 'عرض جميع الطلاب', icon: Users, link: "/adminDashboard" },
    { id: 'ideas', label: 'إدارة الأفكار', icon: Edit3, link: "/allIdeas" },
    { id: 'accounts', label: 'إدارة الحسابات', icon: UserPlus, link: "/accountManagement" },
  ];

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
        <button
          onClick={onClose}
          className="lg:hidden text-white hover:bg-white/20 p-1 rounded"
          aria-label="إغلاق القائمة"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={({ isActive }) =>
                `block w-full flex items-center px-6 py-3 text-right hover:bg-blue-50 transition-colors ${
                  isActive || activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700'
                }`
              }
            >
              <Icon size={20} className="ml-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;