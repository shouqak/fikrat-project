import { User, Users, UsersRound } from 'lucide-react';
import React from 'react'

function StudentsTeacher({ students }) {
 if (!students || students.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        لا يوجد طلاب تحت إشرافك حالياً.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl  rounded-2xl bg-blue-100 px-1 py-2 font-bold mb-4 text-blue-700 flex gap-1"> <Users />  الطلاب</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-800">{student.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{student.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentsTeacher