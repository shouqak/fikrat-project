import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosAdd, IoMdClose } from "react-icons/io";

function IdeaForm() {
   const [title, setTitel] = useState("");

 const [idea, setIdea] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const ApiUrl = "https://68483fb9ec44b9f349403c0f.mockapi.io/ideas"; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idea.trim()) {
      toast.error("يرجى إدخال الفكرة");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = user?.id || user?.studentId;

    if (!studentId) {
      toast.error("لم يتم العثور على معرف الطالب");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(ApiUrl, {
       title,
        idea,
        status:"انتظار",
        studentId, 
      });

      if (response.status === 201) {
        toast.success("تم إرسال الفكرة بنجاح!");
        setTitel("");
        setIdea("");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
      toast.error("فشل في إرسال الفكرة. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Toaster />
      <div className="p-8">
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-full p-1 text-sm text-center"
          type="button"
        >
          <IoIosAdd className="text-2xl text-white" />
        </button>

        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50"
            onClick={closeModal}
          >
            <div
              className="relative mx-auto p-6 bg-blue-50 rounded-lg shadow-md w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 left-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                aria-label="Close modal"
              >
                <IoMdClose />
              </button>

              <div className="space-y-6 text-right">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  أرسل فكرتك
                </h3>

                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="idea"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      عنوان
                    </label>
                    <input
                      id="idea"
                      value={title}
                      placeholder="ادخل فكرتك"
                      rows="4"
                      className="bg-gray-50 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out hover:border-blue-400 resize-none"
                      required
                      onChange={(e) => setTitel(e.target.value)}
                    />
                          <label
                      htmlFor="idea"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      فكره
                    </label>
                    <textarea
                      id="idea"
                      value={idea}
                      placeholder="ادخل فكرتك"
                      rows="4"
                      className="bg-gray-50 text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out hover:border-blue-400 resize-none"
                      required
                      onChange={(e) => setIdea(e.target.value)}
                    />
                  </div>
                  

                  <div className="flex space-x-2 gap-4 space-x-reverse mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition transform hover:scale-[1.01] active:scale-95 ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                      }`}
                    >
                      {loading ? "جاري الإرسال..." : "إرسال"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default IdeaForm;