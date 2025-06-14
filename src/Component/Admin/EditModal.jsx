import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function EditModal({ isOpen, onClose, initialData = null }) {
  const apiUrl = "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth"; 

  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        teacherId: initialData.teacherId || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(apiUrl);
        const teacherList = res.data.filter((user) =>
          user.email?.toLowerCase().endsWith("@tuwaiq.edu.com")
        );
        setTeachers(teacherList);
      } catch (err) {
        console.error("Failed to fetch teachers", err);
      }
    };

    fetchTeachers();
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.teacherId) {
      setError("يجب اختيار معلم للطالب");
      return;
    }

    setLoading(true);

    try {
      if (initialData) {
        await axios.put(`${apiUrl}/${initialData.id}`, formData);
      } else {
        await axios.post(apiUrl, formData);
      }

      onClose(); 
    } catch (err) {
      console.error("Error saving student:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-lg font-semibold text-gray-900 ">
              {initialData ? "تعديل طالب" : "إضافة طالب جديد"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="teacher" className="block mb-2 text-sm font-medium text-gray-900 ">
                  اختر المعلم
                </label>
                <select
                  id="teacher"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                >
                  <option value="">اختر معلمًا</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {"تحديث الطالب" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default EditModal