import { Users } from 'lucide-react';
import React from 'react'

function TeamMembers({ users, TeacherId }) {
  const teamMembers = users.filter(
    (user) => user.teacherId === TeacherId && !user.email?.endsWith("@tuwaiq.edu.com")
  );

  return (
    <div className="p-6 bg-white mt-6 rounded-lg shadow">
      <h2 className="text-2xl rounded-2xl bg-blue-100  px-1 py-2 font-bold mb-4 text-blue-700 flex gap-2"> <Users /> أعضاء الفريق 
        </h2>
      {teamMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-blue-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.email}</p>
             
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          لا يوجد طلاب حالياً.
        </p>
      )}
    </div>
  );
}

export default TeamMembers