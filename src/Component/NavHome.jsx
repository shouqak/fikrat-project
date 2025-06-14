import React, { useState } from 'react'
import logo from '../assets/logo-Project.png'
import { Link } from 'react-router'
import { FaBars, FaTimes } from 'react-icons/fa';

function NavHome() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <nav className="max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 shadow-sm bg-white z-20 sticky top-0">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <img src={logo} alt="logo" width={60} height={40} />
        </div>

        <div className="hidden md:flex gap-4">
          <p  className="text-gray-700 hover:text-blue-500 font-medium">
            الرئيسية
          </p>
          <p  className="text-gray-700 hover:text-blue-500 font-medium">
            عن النظام
          </p>
        
          <p className="text-gray-700 hover:text-blue-500 font-medium">
            تواصل معنا
          </p>
        </div>

        <div className="hidden md:flex items-center">
          <Link
            to="/Login"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none transition duration-150"
          >
            تسجيل دخول
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-3 text-right px-2">
            <p
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              الرئيسية
            </p>
            <p
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              عن النظام
            </p>
            
            <p
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              تواصل معنا
            </p>
            <Link
              to="/Login"
              className="block px-4 py-2 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              تسجيل دخول
            </Link>
          </div>
        </div>
      )}
    </nav>

  )
}

export default NavHome