import { CheckCircle, Clock, XCircle } from 'lucide-react'
import React from 'react'

function Dashboard({ ideas }) {
  const total = ideas.length
  const approved = ideas.filter((i) => i.status === "قبول").length
  const rejected = ideas.filter((i) => i.status === "رفض").length
  const pending = ideas.filter((i) => i.status === "انتظار").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="text-sm text-gray-500">قيد الانتظار</h3>
          <p className="text-xl font-bold">{pending}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
        <div className="p-2 bg-green-100 text-green-600 rounded-full">
          <CheckCircle size={24} />
        </div>
        <div>
          <h3 className="text-sm text-gray-500">موافق عليها</h3>
          <p className="text-xl font-bold">{approved}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
        <div className="p-2 bg-red-100 text-red-600 rounded-full">
          <XCircle size={24} />
        </div>
        <div>
          <h3 className="text-sm text-gray-500">مرفوضة</h3>
          <p className="text-xl font-bold">{rejected}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
        <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
          <span className="text-xl font-bold">{total}</span>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">إجمالي الأفكار</h3>
          <p className="text-xl font-bold">{total}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard