import axios from "axios"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { SlArrowRight } from "react-icons/sl"
import { Link, useNavigate } from "react-router"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    toast.error("يرجى ملء جميع الحقول");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.get(
      "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth" 
    );
    const user = res.data.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!user) {
      toast.error("البريد الإلكتروني غير موجود");
      setLoading(false);
      return;
    }

    if (user.password !== password) {
      toast.error("كلمة المرور غير صحيحة");
      setLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.endsWith("@admin.com")) {
      navigate(`/adminDashboard`);
    } else if (trimmedEmail.endsWith("@tuwaiq.com")) {
      navigate(`/homeDashboard/${user.id}`);
    } else {
      navigate(`/teacherDashboard/${user.id}`);
    }

    toast.success("تم تسجيل الدخول بنجاح");
  } catch (err) {
    console.error(err);
    toast.error("حدث خطأ. يرجى المحاولة مرة أخرى");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Toaster />
      <section className="bg-gray-50 min-h-screen px-4 py-6 md:py-12">
  <div className="mb-6">
    <Link
      to="/"
      className="inline-flex items-center text-blue-500 hover:underline"
    >
      <SlArrowRight className="ml-1" />
      رجوع
    </Link>
  </div>

  <div className="flex flex-col items-center justify-center">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl mb-6">
        سجّل دخولك لحسابك
      </h1>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            أيملك
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@tuwaiq.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            كلمة السر
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          تسجيل دخول
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        إذا ما عندك حساب{" "}
        <Link
          to="/Signup"
          className="text-blue-500 hover:underline font-medium"
        >
          تسجيل
        </Link>
      </p>
    </div>
  </div>
</section>
    </>
  )
}

export default Login
