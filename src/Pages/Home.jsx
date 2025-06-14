import React from "react"
import { Link } from "react-router"
import NavHome from "../Component/NavHome"
import hero from "../assets/hero.png"
import { Lightbulb, PaintbrushVertical, Pencil, SquarePen } from "lucide-react";
import Footer from "../Component/Footer";
function Home() {
  const features = [
  {
    title: "طرح الأفكار بسهولة",
    description: "يمكن لأي طالب تسجيل فكرته بسرعة من خلال نموذج بسيط ومباشر.",
    icon:<Lightbulb/>,
  },
  {
    title: "مراجعة احترافية للأفكار",
    description: "يتم عرض كل فكرة على لجنة مختصة لتقييمها وفق معايير محددة.",
    icon:<Pencil />,
  },
  {
    title: "قبول أو رفض الفكرة مع ملاحظات",
    description: "يتم إشعار الطالب بقرار القبول أو الرفض مع توضيحات للتحسين.",
    icon:<SquarePen />,
  },

  {
    title: "واجهة منظمة وسهلة الاستخدام",
    description: "تصميم عصري يسهل التنقل والوصول لجميع الميزات.",
    icon:<PaintbrushVertical />,
  },
];
  return (
    <div className="bg-gray-50 h-screen">
      <NavHome />

<section className="">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl text-blue-700 mb-4 text-3xl font-extrabold leading-none md:text-5xl xl:text-6xl">
          أفكارك تستاهل تطلع للنور
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 md:text-lg lg:text-xl">
          "فكرات" هو نظام ذكي لإدارة أفكار الطلاب، يساعدك تطرح فكرتك، تتابعها، وتطوّرها خطوة بخطوة… بكل بساطة
        </p>
        <Link
          to={"/Signup"}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-400 border border-gray-300 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-gray-100 transition"
        >
          قدّم فكرتك الحين
        </Link>
      </div>

      <div className="flex mt-8 lg:mt-0 lg:col-span-5 justify-center">
        <img
          src={hero}
          alt="mockup"
          className="w-full rounded-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain"
        />
      </div>
    </div>
  </section>


  <Footer/>
  </div>
  
  )
}

export default Home
