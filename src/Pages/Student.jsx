import React, { useEffect, useState } from "react"
import IdeaForm from "../Component/Student/IdeaForm"
import axios from "axios"
import Navbar from "../Component/Student/Navbar"
import {
  CheckCircle,
  CircleCheckBig,
  Clock,
  EllipsisVertical,
  Lightbulb,
  User,
  XCircle,
} from "lucide-react"
import TeamMembers from "../Component/Student/TeamMembers"
import toast, { Toaster } from "react-hot-toast"

function Student() {
  const [ideas, setIdeas] = useState([])
  const [approvedIdeas, setApprovedIdeas] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setdeleteId] = useState(null)
  const [deleteModal, setdeleteModal] = useState(false)
  const [ideaToDelete, setIdeaToDelete] = useState(null)

  const user = JSON.parse(localStorage.getItem("user"))
  const studentId = user?.id || user?.studentId

  const apiUrl = "https://68483fb9ec44b9f349403c0f.mockapi.io/ideas"
  const apiUrlAuth = "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth"

  const teacherFind = teachers.reduce((map, teacher) => {
    map[teacher.id] = teacher.name
    return map
  }, {})

  useEffect(() => {
    if (!studentId) return

    axios
      .get(apiUrl)
      .then((res) => {
        const filtered = res.data.filter((idea) => idea.studentId === studentId)
        const approved = res.data.filter((idea) => idea.status === "قبول")
        setIdeas(filtered)
        setApprovedIdeas(approved)
      })
      .catch((err) => console.error("Error fetching ideas:", err))
  }, [ideas, studentId])

  useEffect(() => {
    axios
      .get(apiUrlAuth)
      .then((res) => {
        setTeachers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching users:", err)
        setLoading(false)
      })
  }, [])

  const handleDeleteIdea = (ideaId) => {
    setIdeaToDelete(ideaId)
    setdeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!ideaToDelete) return

    try {
      await axios.delete(`${apiUrl}/${ideaToDelete}`)
      toast.success("تم حذف الفكرة بنجاح")
      setIdeas(ideas.filter((idea) => idea.id !== ideaToDelete))
      setdeleteId(null)
    } catch (error) {
      console.error("Error deleting idea:", error)
      toast.error("فشل في حذف الفكرة")
    } finally {
      setdeleteModal(false)
      setIdeaToDelete(null)
    }
  }

  return (
    <>
      <Toaster />
      <Navbar />

      <div className="bg-gray-50 h-screen">
        <div className="flex justify-between">
          <IdeaForm />

          <div className="m-2 rounded-2xl shadow-lg p-1 border border-blue-100">
            <div className="flex items-center">
              <User className="text-blue-500 ml-2 mt-2" />
              <div>
                <p className="text-lg me-2 mt-3">
                  معلمك:{" "}
                  {teacherFind[user.teacherId] || "لم يتم تعيين معلم بعد"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Approved Ideas */}
        <div className="p-3">
          <h2 className="text-2xl font-bold rounded-2xl bg-green-100 px-1 py-2 text-green-600 flex gap-1">
            <CircleCheckBig className="mt-1" /> الأفكار المقبولة
          </h2>
          <div className="flex flex-wrap gap-6 p-5">
            {approvedIdeas.length > 0 ? (
              approvedIdeas.map((item) => (
                <div
                  key={item.id}
                  className="group relative max-w-sm w-full sm:w-72 bg-green-50 border border-green-200 rounded-xl shadow-md overflow-hidden transition-all duration-300"
                >
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h5 className="mb-2 font-semibold text-green-800 truncate">
                        فكرة:
                      </h5>
                      <p className="text-sm text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                      </p>
                    </div>
                    <p className="font-semibold text-lg text-gray-800 mt-1">
                      {item.title}
                    </p>

                    <p className="font-normal   text-gray-800 mt-1">
                      {item.idea}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>لا توجد أفكار مقبولة حالياً</p>
            )}
          </div>
        </div>

        <hr className="text-blue-100 my-5" />

        {/* My Ideas */}
        <div className="p-3">
          <h1 className="text-2xl text-yellow-600  rounded-2xl bg-yellow-100 px-1 py-2 font-bold mb-4 flex">
            <Lightbulb /> أفكارك المبدعة
          </h1>
          <div className="flex overflow-x-auto gap-6 p-5 pb-6 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-100 snap-x">
            {ideas.length > 0 ? (
              [...ideas].reverse().map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-72 border border-gray-200 rounded-xl shadow-md bg-white transition-transform duration-300  snap-start"
                >
                  <div className="p-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-semibold text-amber-700">فكرة:</h5>

                        <div className="relative inline-block text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setdeleteId(deleteId === item.id ? null : item.id)
                            }}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <EllipsisVertical className="w-5 h-5" />
                          </button>

                          {deleteId === item.id && (
                            <div className="absolute right-0 mt-2 w-32 origin-top-right bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              <ul className="py-1 text-right">
                                <li
                                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                  onClick={() => handleDeleteIdea(item.id)}
                                >
                                  حذف الفكرة
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="font-semibold text-lg text-gray-800 mt-1">
                        {item.title}
                      </p>

                      <p className="font-normal text-lg text-gray-800 mt-1">
                        {item.idea}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "قبول"
                            ? "bg-green-100 text-green-700"
                            : item.status === "رفض"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status === "رفض" && (
                          <XCircle className="h-4 w-4 mr-1" />
                        )}
                        {item.status === "انتظار" && (
                          <Clock className="h-4 w-4 mr-1" />
                        )}
                        {item.status === "قبول" && (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        )}
                        {item.status || "انتظار"}
                      </p>

                      {item.status === "رفض" && item.rejectReason && (
                        <div className="mt-2 p-2 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
                          <strong>سبب الرفض:</strong> {item.rejectReason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 px-5">لا توجد أفكار بعد</p>
            )}
          </div>
        </div>

        <hr className="text-blue-100 my-5" />

        {teachers.length > 0 && (
          <TeamMembers
            users={teachers}
            TeacherId={user.teacherId || null}
          />
        )}

        <div className="bg-blue-50 py-6 border-t border-blue-800 text-center text-blue-500 text-sm">
          &copy; {new Date().getFullYear()} فكرات. جميع الحقوق محفوظة.
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
    </>
  )
}

export default Student
