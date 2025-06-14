import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Users, Edit3, UserPlus, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo-Project.png"
function Nav () {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'students', label: 'عرض جميع الطلاب', icon: Users, link: "/adminDashboard" },
    { id: 'ideas', label: 'إدارة الأفكار', icon: Edit3, link: "/allIdeas" },
  ];
    const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/');
  };

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-gray-50 z-20 relative">
      <div className="flex justify-between w-full items-center">
        <button onClick={() => setNav(!nav)} className="cursor-pointer mr-4">
          <AiOutlineMenu size={28} />
        </button>
      <img src={logo} alt="logo" height={10} width={60} />
      </div>

    
      {nav && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setNav(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-[280px] h-full bg-gray-50 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
              <img src={logo} alt="logo" height={10} width={60} />

            <button onClick={() => setNav(false)}>
              <AiOutlineClose size={24} />
            </button>
          </div>

          <nav className="flex flex-col ">
            <ul className="space-y-2 text-right">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                 
                    >
                    <div className="flex gap-4 my-6 p-4 text-blue-700  hover:bg-blue-100 rounded-2xl "><Icon size={20} />
                      {item.label}</div>  
                    </Link>
                  </li>
                  
                );
              })}
            </ul>
            <div  onClick={handleLogout} className="text-red-700 hover:bg-red-200 px-4 py-3 rounded-2xl flex gap-4"> <LogOut/>
            <button className="">تسجيل خروج</button></div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;