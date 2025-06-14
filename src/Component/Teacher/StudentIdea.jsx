import React, { useState } from 'react';

function StudentIdea({ idea, student, onUpdateStatus }) {
  const [ideasReject, setideasReject] = useState(false);
  const [reason, setReason] = useState("");

  const handleAccept = () => {
    onUpdateStatus(idea.id, "قبول");
  };

  const handleReject = () => {
    onUpdateStatus(idea.id, "رفض", reason);
    setideasReject(false);
  };

  return (
    <div className="  ">
      {student && (
        <div className="mb-3">
          <h3 className="font-semibold text-gray-800">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.email}</p>
        </div>
      )}
      <p className='font-semibold text-gray-800 text-xs' >فكره:</p>
<p className="p-2  mt-1">
        {idea.idea || "لا توجد فكرة بعد"}
      </p>
      

      <div className="mt-2 flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            idea.status === "قبول"
              ? "text-green-600"
              : idea.status === "رفض"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          الحالة: {idea.status || "انتظار"}
        </span>

        {idea.status !== "رفض" && idea.status !== "قبول" && (
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition"
            >
              قبول
            </button>
            <button
              onClick={() => setideasReject(!ideasReject)}
              className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
            >
              رفض
            </button>
          </div>
        )}
      </div>

      {idea.status === "رفض" && idea.rejectReason && (
        <div className="mt-2 p-2 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
          <strong>سبب الرفض:</strong> {idea.rejectReason}
        </div>
      )}

      {ideasReject && (
        <div className="mt-3">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="سبب الرفض..."
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows="2"
          />
          <div className="mt-2  space-x-2 space-x-reverse">
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              حفظ
            </button>
            <button
              onClick={() => setideasReject(false)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentIdea;