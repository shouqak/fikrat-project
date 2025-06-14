import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Trash2, 
  UserPlus, 
  UserX,
  Menu,
  X,
  Eye,
  Plus,
  Filter,
  Download,
  Bell
} from 'lucide-react';
import SideBar from '../Component/Admin/SideBar';

const AA = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Mock data
  const [students, setStudents] = useState([]);

  const [ideas, setIdeas] = useState([
    { id: 1, title: 'تطبيق ذكي للتعلم', student: 'أحمد محمد', status: 'في الانتظار', date: '2024-06-08' },
    { id: 2, title: 'نظام إدارة المكتبة', student: 'فاطمة علي', status: 'مقبول', date: '2024-06-07' },
    { id: 3, title: 'موقع للتجارة الإلكترونية', student: 'يوسف خالد', status: 'مرفوض', date: '2024-06-06' },
  ]);

  const [teachers] = useState([
    { id: 1, name: 'د. سارة أحمد', email: 'sara@example.com', students: 15 },
    { id: 2, name: 'د. محمد حسن', email: 'mohamed@example.com', students: 12 },
    { id: 3, name: 'د. نور الدين', email: 'nour@example.com', students: 8 },
  ]);

  const menuItems = [
    { id: 'students', label: 'عرض جميع الطلاب', icon: Users },
    { id: 'search', label: 'البحث عن طالب', icon: Search },
    { id: 'ideas', label: 'إدارة الأفكار', icon: Edit3 },
    { id: 'accounts', label: 'إدارة الحسابات', icon: UserPlus },
  ];

  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedStudent(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setModalType('');
  };

  const handleIdeaAction = (ideaId, action, reason = '') => {
    setIdeas(prev => prev.map(idea => 
      idea.id === ideaId 
        ? { ...idea, status: action === 'accept' ? 'مقبول' : 'مرفوض', reason }
        : idea
    ));
  };

  const deleteStudent = (studentId) => {
    setStudents(prev => prev.filter(student => student.id !== studentId));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* const Sidebar = () => (
    <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:bg-white/20 p-1 rounded"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-right hover:bg-blue-50 transition-colors ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700'
              }`}
            >
              <Icon size={20} className="ml-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  ); */

  const StudentsView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">جميع الطلاب المسجلين</h2>
        <div className="flex gap-2">
          
          <button 
            onClick={() => openModal('addStudent')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            إضافة طالب
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الاسم</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المعلم</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الأفكار</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.teacher}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      student.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.ideas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openModal('viewStudent', student)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => openModal('editStudent', student)}
                        className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-50"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteStudent(student.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SearchView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">البحث عن طالب</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث باسم الطالب أو البريد الإلكتروني..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {searchTerm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">نتائج البحث ({filteredStudents.length})</h3>
          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-500">{student.email}</p>
                    <p className="text-sm text-gray-500">المعلم: {student.teacher}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openModal('viewStudent', student)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    عرض
                  </button>
                  <button 
                    onClick={() => openModal('editStudent', student)}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                  >
                    تعديل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const IdeasView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">إدارة أفكار الطلاب</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter size={16} />
            تصفية
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{idea.title}</h3>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    idea.status === 'مقبول' ? 'bg-green-100 text-green-800' :
                    idea.status === 'مرفوض' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {idea.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">الطالب: {idea.student}</p>
                <p className="text-sm text-gray-500">تاريخ التقديم: {idea.date}</p>
              </div>
              
              <div className="flex gap-2">
                {idea.status === 'في الانتظار' && (
                  <>
                    <button 
                      onClick={() => handleIdeaAction(idea.id, 'accept')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle size={16} />
                      قبول
                    </button>
                    <button 
                      onClick={() => openModal('rejectIdea', idea)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle size={16} />
                      رفض
                    </button>
                  </>
                )}
                <button 
                  onClick={() => openModal('editIdea', idea)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={16} />
                  تعديل
                </button>
                <button 
                  onClick={() => openModal('deleteIdea', idea)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Trash2 size={16} />
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AccountsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">إدارة الحسابات</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="text-blue-600" size={20} />
            إضافة حساب جديد
          </h3>
          <div className="space-y-4">
            <button 
              onClick={() => openModal('addStudent')}
              className="w-full p-4 text-right border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus size={20} className="text-blue-600" />
                <span>إضافة طالب جديد</span>
              </div>
            </button>
            <button 
              onClick={() => openModal('addTeacher')}
              className="w-full p-4 text-right border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus size={20} className="text-green-600" />
                <span>إضافة معلم جديد</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="text-purple-600" size={20} />
            ربط الطلاب بالمعلمين
          </h3>
          <button 
            onClick={() => openModal('assignStudent')}
            className="w-full p-4 text-right border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus size={20} className="text-purple-600" />
              <span>إضافة طالب لمعلم</span>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">المعلمون</h3>
        <div className="grid gap-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {teacher.name.charAt(2)}
                </div>
                <div className="mr-4">
                  <h4 className="font-medium text-gray-900">{teacher.name}</h4>
                  <p className="text-sm text-gray-500">{teacher.email}</p>
                  <p className="text-sm text-blue-600">{teacher.students} طالب</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit3 size={16} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalType === 'addStudent' && 'إضافة طالب جديد'}
                {modalType === 'addTeacher' && 'إضافة معلم جديد'}
                {modalType === 'editStudent' && 'تعديل بيانات الطالب'}
                {modalType === 'viewStudent' && 'عرض بيانات الطالب'}
                {modalType === 'rejectIdea' && 'رفض الفكرة'}
                {modalType === 'deleteIdea' && 'حذف الفكرة'}
                {modalType === 'assignStudent' && 'إضافة طالب لمعلم'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {modalType === 'rejectIdea' && (
                <>
                  <p className="text-gray-600">سبب رفض الفكرة:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows="4"
                    placeholder="اكتب سبب الرفض..."
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        handleIdeaAction(selectedStudent?.id, 'reject', 'سبب الرفض');
                        closeModal();
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      تأكيد الرفض
                    </button>
                    <button 
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      إلغاء
                    </button>
                  </div>
                </>
              )}

              {(modalType === 'addStudent' || modalType === 'addTeacher') && (
                <>
                  <input 
                    type="text" 
                    placeholder="الاسم الكامل"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input 
                    type="email" 
                    placeholder="البريد الإلكتروني"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input 
                    type="password" 
                    placeholder="كلمة المرور"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {modalType === 'addStudent' && (
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>اختر المعلم</option>
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                      ))}
                    </select>
                  )}
                  <button 
                    onClick={closeModal}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {modalType === 'addStudent' ? 'إضافة الطالب' : 'إضافة المعلم'}
                  </button>
                </>
              )}

              {modalType === 'assignStudent' && (
                <>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>اختر الطالب</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>اختر المعلم</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                  <button 
                    onClick={closeModal}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    ربط الطالب بالمعلم
                  </button>
                </>
              )}

              {modalType === 'viewStudent' && selectedStudent && (
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <h4 className="text-xl font-semibold">{selectedStudent.name}</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>البريد الإلكتروني:</strong> {selectedStudent.email}</p>
                    <p><strong>المعلم:</strong> {selectedStudent.teacher}</p>
                    <p><strong>الحالة:</strong> {selectedStudent.status}</p>
                    <p><strong>عدد الأفكار:</strong> {selectedStudent.ideas}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'students':
        return <StudentsView />;
      case 'search':
        return <SearchView />;
      case 'ideas':
        return <IdeasView />;
      case 'accounts':
        return <AccountsView />;
      default:
        return <StudentsView />;
    }
  }; 

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <SideBar/>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 mr-4">
                  👨‍💼 لوحة تحكم الأدمن
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                  <Bell size={20} />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  أ
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderActiveView()}
          </div>
        </main>
      </div>

      <Modal />
    </div>
  );
};

export default AA;