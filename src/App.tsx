import React, { useState, useEffect } from 'react';
import { Package2, Boxes, PlusSquare, Home, Clock, Users, Settings } from 'lucide-react';
import RequisitionPage from './pages/RequisitionPage';
import AddProductPage from './pages/AddProductPage';
import ProductListPage from './pages/ProductListPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AddUserPage from './pages/AddUserPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

interface User {
  username: string;
  role: string;
  _id?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('productList');
  const [user, setUser] = useState<User | null>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#8B4513] text-white">
        <div className="p-4 flex items-center space-x-2">
          <Package2 className="h-8 w-8" />
          <span className="text-xl font-semibold">Inventory System</span>
        </div>
        <div className="px-4 py-2 border-b border-[#A0522D]">
          <p className="text-sm">ยินดีต้อนรับ</p>
          <p className="font-medium">{user.username}</p>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab('productList')}
              className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-[#A0522D] w-full justify-start ${
                activeTab === 'productList' ? 'bg-[#A0522D]' : ''
              }`}
            >
              <Home className="h-5 w-5" />
              <span>หน้าหลัก</span>
            </button>
            <button
              onClick={() => setActiveTab('requisition')}
              className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-[#A0522D] w-full justify-start ${
                activeTab === 'requisition' ? 'bg-[#A0522D]' : ''
              }`}
            >
              <Boxes className="h-5 w-5" />
              <span>เบิกสินค้า</span>
            </button>
            <button
              onClick={() => setActiveTab('addProduct')}
              className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-[#A0522D] w-full justify-start ${
                activeTab === 'addProduct' ? 'bg-[#A0522D]' : ''
              }`}
            >
              <PlusSquare className="h-5 w-5" />
              <span>เพิ่มสินค้า</span>
            </button>
            <button
              onClick={() => setActiveTab('orderHistory')}
              className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-[#A0522D] w-full justify-start ${
                activeTab === 'orderHistory' ? 'bg-[#A0522D]' : ''
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>ประวัติการเบิกสินค้า</span>
            </button>
            {user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('addUser')}
                className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-[#A0522D] w-full justify-start ${
                  activeTab === 'addUser' ? 'bg-[#A0522D]' : ''
                }`}
              >
                <Users className="h-5 w-5" />
                <span>เพิ่มผู้ใช้</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-[#A0522D] w-full justify-start ${
                activeTab === 'settings' ? 'bg-[#A0522D]' : ''
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>ตั้งค่า</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-[#A0522D] w-full justify-start text-red-300 hover:text-red-200"
            >
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'requisition' && <RequisitionPage userId={user._id} username={user.username} />}
        {activeTab === 'addProduct' && <AddProductPage userId={user._id} username={user.username} />}
        {activeTab === 'productList' && <ProductListPage />}
        {activeTab === 'orderHistory' && <OrderHistoryPage />}
        {activeTab === 'addUser' && user.role === 'admin' && <AddUserPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;