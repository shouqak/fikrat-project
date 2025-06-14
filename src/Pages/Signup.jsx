import axios from "axios"
import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import PasswordChecklist from "react-password-checklist"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { SlArrowRight } from "react-icons/sl"

function Signup() {
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [emailExists, setEmailExists] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCheck, setShowPasswordCheck] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    let timeoutId

    if (email.trim()) {
      timeoutId = setTimeout(() => {
        checkEmailExists(email.trim())
      }, 500)
    } else {
      setEmailExists(false)
      setError("")
    }

    return () => clearTimeout(timeoutId)
  }, [email])

  const checkEmailExists = async (emailCheck) => {
    if (!emailCheck) return

    setCheckingEmail(true)
    const fullEmail = emailCheck + "@tuwaiq.com"

    try {
      const response = await axios.get(
        "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth"
      )

      const existingUser = response.data.find(
        (user) => user.email.toLowerCase() === fullEmail.toLowerCase()
      )

      setEmailExists(!!existingUser)
      if (existingUser) {
        toast.error("هذا الإيميل مسجل مسبقاً")
      } else {
        setError("")
      }
    } catch (err) {
      toast.error("خطأ في التحقق من الإيميل")
    } finally {
      setCheckingEmail(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    const UserName = userName.trim()

    if (!trimmedEmail || !UserName || !password || !passwordCheck) {
      setError("يرجى ملء جميع الحقول")
      return
    }

    if (password !== passwordCheck) {
      setError("كلمات المرور غير متطابقة.")
      return
    }

    if (emailExists) {
      setError("الإيميل مستخدم مسبقًا")
      return
    }

    const fullEmail = trimmedEmail + "@tuwaiq.com"

    setLoading(true)

    try {
      const response = await axios.post(
        "https://68483fb9ec44b9f349403c0f.mockapi.io/Auth",
        {
          name: UserName,
          email: fullEmail,
          password,
        }
      )

      if (response.status === 201) {
        toast.success("تم إنشاء الحساب بنجاح!")
        navigate("/Login")
      }
    } catch (err) {
      console.error("Error during signup:", err)
      toast.error("فشل في التسجيل. حاول مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toaster />
      <section className="bg-gray-50 min-h-screen px-4 py-6 md:py-12">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:underline"
          >
            <SlArrowRight />

            رجوع
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center text-right">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl mb-4">
              تسجيل لحسابك
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-right">
                {error}
              </div>
            )}

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  أسمك
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-right"
                  placeholder="أسمك"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value.trimStart())}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  إيميل
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center border rounded-lg overflow-hidden">
                  <div className="bg-blue-50 border-b sm:border-b-0 sm:border-r border-blue-200 px-3 py-2 text-blue-700 font-medium text-sm">
                    tuwaiq.com@
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5 text-right"
                    placeholder="اسم المستخدم"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trimStart())}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  سيتم إضافة @tuwaiq.com تلقائياً
                </p>
              </div>


              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  كلمة السر
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 text-right"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trimStart())}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="passwordCheck"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  كلمة السر للتأكيد
                </label>
                <div className="relative">
                  <input
                    type={showPasswordCheck ? "text" : "password"}
                    name="passwordCheck"
                    id="passwordCheck"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 text-right"
                    required
                    value={passwordCheck}
                    onChange={(e) =>
                      setPasswordCheck(e.target.value.trimStart())
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showPasswordCheck ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
<PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
				valueAgain={passwordCheck}
        className="text-xs "
				messages={{
					minLength: "كلمة المرور تحتوي على أكثر من 8",
					specialChar: "كلمة المرور تحتوي على أحرف خاصة",
					number: "كلمة المرور لها رقم",
					capital: "كلمة المرور تحتوي على حرف كبير",
					match: "مطابقة كلمات المرور",
				}}
			/>

              <button
                type="submit"
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 
                  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                }`}
              >
                { "إنشاء الحساب"}
              </button>

              <p className="text-center text-sm mt-4">
                إذا عندك حساب{" "}
                <Link
                  to={"/Login"}
                  className="hover:underline text-blue-500 font-medium"
                >
                  سجّل دخولك
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
