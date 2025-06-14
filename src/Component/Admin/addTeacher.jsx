import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react'; 

function addTeacher() {
 const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const apiUrl = "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth"; 

 useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${apiUrl}`);
        const filtered = response.data.filter(t =>
          t.email?.toLowerCase().endsWith('@tuwaiq.edu.com')
        );
        setTeachers(filtered);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [teachers]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}`, formData);

      toast.success('تم إضافة معلم بنجاح');
      setFormData({ name: '', email: '', password: '', teacherId: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('فشل في إضافة معلم');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        إضافة معلم <Plus size={16} />
      </button>

      {showModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-blue-50 rounded-lg shadow ">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={() => setShowModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <form onSubmit={handleSubmit} className="p-4 md:p-5 text-right">
              <h3 className="text-lg font-bold text-gray-900  mb-4">
                إضافة معلم جديد
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700  mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="الاسم الكامل"
                  className="w-full bg-white p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700  mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@tuwaiq.edu.com"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  "
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700  mb-1">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="كلمة المرور"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  "
                  required
                />
              </div>


              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  إضافة معلم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default addTeacher