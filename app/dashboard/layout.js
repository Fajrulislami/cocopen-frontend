// app/dashboard/layout.js
import Sidebar from '@/components/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ml-20 sm:ml-64 min-h-screen bg-gray-100 transition-all duration-300 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}