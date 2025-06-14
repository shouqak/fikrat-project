import axios from "axios"
import React, { useEffect, useState } from "react"
import StudentIdea from "../Component/Teacher/StudentIdea"
import toast from "react-hot-toast"
import Nav from "../Component/Admin/Nav"
import { Lightbulb } from "lucide-react"
import Cards from "../Component/Admin/Cards"
import Dashboard from "../Component/Admin/Dashboard"

function AllIdeas() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState([])
  const apiUrl = "https://68483fb9ec44b9f349403c0f.mockapi.io/ideas"
  const apiUrlAuth = "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ideasResponse, usersResponse] = await Promise.all([
          axios.get(apiUrl),
          axios.get(apiUrlAuth),
        ])

        const allIdeas = ideasResponse.data
        const allUsers = usersResponse.data

        const studentList = allUsers.filter(
          (user) => !user.email?.toLowerCase().endsWith("@tuwaiq.edu.com")
        )

        const studentsIdeas = studentList.map((student) => ({
          ...student,
          ideas: allIdeas.filter((i) => i.studentId === student.id),
        }))

        setStudents(studentsIdeas)
        setIdeas(allIdeas)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchData()
  }, [])

  const handleUpdateStatus = async (ideaId, newStatus, reason = "") => {
    try {
      await axios.put(`${apiUrl}/${ideaId}`, {
        status: newStatus,
        rejectReason: reason,
      })

      setIdeas((prev) =>
        prev.map((i) =>
          i.id === ideaId
            ? { ...i, status: newStatus, rejectReason: reason }
            : i
        )
      )
    } catch (err) {
      console.error("Error updating idea status:", err)
    }
  }

  const handleEditIdea = async (ideaId, newText) => {
    try {
      await axios.put(`${apiUrl}/${ideaId}`, {
        idea: newText,
      })

      setIdeas((prev) =>
        prev.map((i) => (i.id === ideaId ? { ...i, idea: newText } : i))
      )
    } catch (err) {
      console.error("Error editing idea:", err)
    }
  }

  

  return (
    <>
      <Nav />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl text-yellow-600  rounded-2xl bg-yellow-100 px-1 py-2 flex gap-1 font-bold mb-6" > <Lightbulb />  أفكار الطلاب</h1>

      <Dashboard ideas={ideas} />


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.length > 0 ? (
            [...ideas].reverse().map((idea) => {
              const student = students.find((s) => s.id === idea.studentId)
              return (
                <Cards
                  key={idea.id}
                  idea={idea}
                  student={student}
                  onUpdateStatus={handleUpdateStatus}
                  onEditIdea={handleEditIdea}
                />
              )
            })
          ) : (
            <p className="text-center text-gray-500">لا توجد أفكار حالياً.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AllIdeas
