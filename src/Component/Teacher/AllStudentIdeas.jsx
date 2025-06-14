import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import StudentIdea from "./StudentIdea";
import { Lightbulb } from "lucide-react";
import Dashboard from "../Admin/Dashboard";

function SubmittedIdeas() {
  const [ideas, setideas] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = "https://68483fb9ec44b9f349403c0f.mockapi.io/ideas"; 
  const apiUrlAuth = "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth"; 

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetches both idea and user data at the same time
        const [ideasResponse , usersResponse ] = await Promise.all([
          axios.get(apiUrl),
          axios.get(apiUrlAuth),
        ]);

        const allIdeas = ideasResponse .data;
        const allUsers = usersResponse .data;

        const myStudents = allUsers.filter(
          (u) =>
            u.teacherId === user.id &&
            !u.email?.toLowerCase().endsWith("@tuwaiq.edu.com")
        );

        const studentFind = {};
        myStudents.forEach((student) => {
          studentFind[student.id] = student;
        });

        const ideasWithStudent = allIdeas
          .filter((idea) => studentFind[idea.studentId]) 
          .map((idea) => ({
            ...idea,
            student: studentFind[idea.studentId],
          }));

        setideas(ideasWithStudent);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ideas]);

  const handleUpdateStatus = async (ideaId, newStatus, reason = "") => {
    if (!ideaId) return;

    try {
      await axios.put(`${apiUrl}/${ideaId}`, {
        status: newStatus,
        rejectReason: reason,
      });

      setideas((prev) =>
        prev.map((idea) =>
          idea.id === ideaId
            ? { ...idea, status: newStatus, rejectReason: reason }
            : idea
        )
      );

      toast.success(`تم تحديث الحالة إلى: ${newStatus}`);
    } catch (err) {
      console.error("Error updating idea status:", err);
      toast.error("فشل في تحديث حالة الفكرة");
    }
  };

  if (loading) {
    return <div className="text-center py-10">جارٍ التحميل...</div>;
  }

  return (
    <div className="mt-3">
      <Toaster/>
      <h1 className="text-2xl font-bold mb-6 flex text-yellow-600  rounded-2xl bg-yellow-100 px-1 py-2 ">  <Lightbulb /> افكار الطلاب</h1>
 <Dashboard ideas={ideas} />
      {ideas.length > 0 ? (
        <div className="flex flex-row overflow-x-auto gap-6 p-5">
  {ideas.slice().reverse().map((idea) => (
    <div
      key={idea.id}
      className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <h3 className="font-semibold text-gray-800">{idea.student.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{idea.student.email}</p>

      <StudentIdea
        idea={idea}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  ))}
</div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          لا يوجد أفكار مقترحة حالياً.
        </div>
      )}
    </div>
  )
}

export default SubmittedIdeas