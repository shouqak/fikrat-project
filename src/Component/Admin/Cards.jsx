import React, { useState } from 'react';

function Cards({ idea, student, onUpdateStatus, onEditIdea }) {
  const [ideasReject, setideasReject] = useState(false);
  const [reason, setReason] = useState("");
  const [editing, setediting] = useState(false);
  const [editedIdea, setEditedIdea] = useState(idea.idea);

  const handleAccept = () => {
    onUpdateStatus(idea.id, "قبول");
  };

  const handleReject = () => {
    onUpdateStatus(idea.id, "رفض", reason);
    setideasReject(false);
  };

  const handleSaveEdit = () => {
    onEditIdea(idea.id, editedIdea);
    setediting(false);
  };

  return (
    <div className="border p-4 rounded-2xl border-gray-300 shadow-sm bg-white">
      {student && (
        <div className="mb-3">
          <h3 className="font-semibold text-gray-800">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.email}</p>
        </div>
      )}

      <p className='font-semibold text-gray-800 text-xs'>الفكرة:</p>
<p className="p-2 mt-1 font-semibold bg-gray-50 rounded">{idea.title }</p>
      {editing ? (
        <textarea
          value={editedIdea}
          onChange={(e) => setEditedIdea(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 text-sm mb-2"
          rows="3"
        />
      ) : (
                

        <p className="p-2 mt-1 bg-gray-50 rounded">{idea.idea || "لا توجد فكرة بعد"}</p>
      )}

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

        <div className="flex gap-2">
          {idea.status !== "رفض" && idea.status !== "قبول" && (
            <>
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
              <button
                onClick={() => setediting(!editing)}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
              >
                تعديل
              </button>
            </>
          )}
        </div>
      </div>

      {ideasReject && (
        <div className="mt-3">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="سبب الرفض..."
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows="2"
          />
          <div className="mt-2 space-x-2 space-x-reverse">
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

      {editing && (
        <div className="mt-2">
          <button
            onClick={handleSaveEdit}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
          >
            حفظ التعديلات
          </button>
        </div>
      )}

      {idea.status === "رفض" && idea.rejectReason && (
        <div className="mt-2 p-2 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
          <strong>سبب الرفض:</strong> {idea.rejectReason}
        </div>
      )}
    </div>
  );
}

export default Cards;