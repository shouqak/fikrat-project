import React from 'react'
import logo from "../assets/logo-Project.png"
function Footer() {
  return (
 <footer className="bg-blue-50 text-blue-600">



        <div className="mt-10 py-6 border-t border-blue-800 text-center text-blue-500 text-sm">
          &copy; {new Date().getFullYear()} فكرات. جميع الحقوق محفوظة.
        </div>
    </footer>  )
}

export default Footer
