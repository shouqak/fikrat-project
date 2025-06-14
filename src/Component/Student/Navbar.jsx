import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Users, Edit3, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo-Project.png"

function Navbar() {
       const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/');
  };


   useEffect(() => {
   const storedUser = localStorage.getItem('user');
       if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
         setUsername(parsedUser.name);
       }
     
     }, []);

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-gray-50 z-20 relative">
      <div className="flex justify-between w-full items-center">
      
 <div className="relative inline-block text-right">
      {username ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-400 rounded-full hover:bg-blue-500 focus:outline-none"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
           {username.charAt(0)}
          </button>

          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
            
               <p className="px-4 py-2 " >{username} </p>
               
                <div  onClick={handleLogout} className="text-red-700 hover:bg-red-200 p-2 rounded-2xl flex gap-4"> <LogOut className="mt-2 " size={15} />
                            <button className="">تسجيل خروج</button></div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-700">مستخدم غير مسجل</p>
      )}
    </div>       
             <img src={logo} alt="logo" height={10} width={60} />
       
      </div>

    </div>
  )
}

export default Navbar