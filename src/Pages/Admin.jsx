import React, { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import Nav from "../Component/Admin/Nav"
import AddStudent from "../Component/Admin/AddStudent"
import { PenLine, Trash2, Users } from "lucide-react"
import EditModal from "../Component/Admin/EditModal"
import AddTeacher from "../Component/Admin/addTeacher"
function Admin() {
  const [allUsers, setAllUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleteModal, setdeleteModal] = useState(false)
  const [studentDelete, setstudentDelete] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const apiUrl = "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth"

  const teachers = allUsers.filter((user) =>
    user.email?.toLowerCase().endsWith("@tuwaiq.edu.com")
  )

  const students = allUsers.filter((user) =>
    user.email?.toLowerCase().endsWith("@tuwaiq.com")
  )

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      (student.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      (teacher.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.email || "").toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const teacherFind = teachers.reduce((map, teacher) => {
    map[teacher.id] = teacher.name
    return map
  }, {})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl)
        setAllUsers(res.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [allUsers])

  const deleteStudent = (id) => {
    setstudentDelete(id)
    setdeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${studentDelete}`)

      setAllUsers(allUsers.filter((u) => u.id !== studentDelete))
      toast.success("تم حذف الطالب بنجاح")
    } catch (error) {
      console.error("فشل في الحذف:", error)
      toast.error("فشل في حذف الطالب")
    }

    setdeleteModal(false)
  }


  const openEditModal = (student) => {
    setEditingStudent(student)
    setIsModalOpen(true)
  }
  return (
    <>
      <Nav />
      <Toaster />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl  flex gap-1 font-bold text-blue-700">
              <Users /> جميع الطلاب
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                aria-label="بحث عن طالب"
              />
              <AddStudent />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex animate-pulse justify-center items-center h-40">
                  <p className="text-gray-500">جاري التحميل...</p>
                </div>
              ) : filteredStudents.length > 0 ? (
                <table className="w-full table-auto">
                  <thead className="bg-blue-100 hidden md:table-header-group">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                        الاسم
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                        البريد الإلكتروني
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                        المعلم
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 md:table-row-group">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 transition-colors flex flex-col md:table-row"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {teacherFind[student.teacherId] || "لا يوجد معلم"}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => deleteStudent(student.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            aria-label="حذف الطالب"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            className="text-amber-700 hover:text-amber-800 p-1 rounded hover:bg-amber-50 "
                            onClick={() => openEditModal(student)}
                          >
                            <PenLine size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center h-40 text-gray-500">
                  لا يوجد طلاب متاحين.
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="text-blue-200 my-10" />

        
        {/* teachers table */}
        <div className="max-w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold flex gap-1 text-blue-700">
              <Users /> جميع المعلمين
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <AddTeacher />
            </div>
          </div>

          <div className=" rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-500">جاري التحميل...</p>
                </div>
              ) : filteredTeachers.length > 0 ? (
                <table className="w-full table-auto">
                  <thead className="bg-blue-100 hidden md:table-header-group">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                        الاسم
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                        البريد الإلكتروني
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 md:table-row-group">
                    {filteredTeachers.map((teacher) => (
                      <tr
                        key={teacher.id}
                        className="hover:bg-gray-50 transition-colors flex flex-col md:table-row"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {teacher.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {teacher.email}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => deleteStudent(teacher.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            aria-label="حذف الطالب"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center h-40 text-gray-500">
                  لا يوجد معلمين متاحين.
                </div>
              )}
            </div>
          </div>
        </div>

        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
                onClick={() => setdeleteModal(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  هل أنت متأكد من الحذف؟
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={handleConfirmDelete}
                >
                  متأكد من الحذف
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={() => setdeleteModal(false)}
                >
                  لا، إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={editingStudent}
        />
      </div>
      <div className=" bg-blue-50 py-6 border-t border-blue-800 text-center text-blue-500 text-sm">
          &copy; {new Date().getFullYear()} فكرات. جميع الحقوق محفوظة.
        </div>
    </>
  )
}

export default Admin
