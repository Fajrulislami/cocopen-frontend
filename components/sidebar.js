// components/sidebar.js
"use client";
import { User } from 'lucide-react';

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {

  const App = () => {
  return (
    <User />
  );
};

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
   
    
    { name: "Profile", href: "/dashboard", icon: "👤" },
    { name: "Jadwal", href: "/dashboard/jadwal", icon: "📅" },
    { name: "Soal", href: "/dashboard/soal", icon: "📝" },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-20"
      } bg-gray-100  text-black h-full fixed md:pb-13 md:pl-5 left-0 top-0 transition-all duration-300 ease-in-out z-50`}
    >
      <div className="bg-white md:rounded-3xl  h-full ">
        {/* Brand */}
        <div className="flex items-center justify-between  md:hidden p-4 border-b border-gray-700">
          <div className="flex items-center">
            
            <span
              className={`${
                isExpanded ? "ml-3 block" : "hidden"
              } font-bold text-lg`}
            >
              Dashboard
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-0  rounded w-5 h-5 mr-[15px] hover:bg-gray-100"
          >
            {isExpanded ? "X" : "☰"}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center py-4 px-4 rounded-xl mb-2 transition-all duration-200
              hover:bg-gray-700 hover:shadow-md
              ${isExpanded ? "justify-start" : "justify-center"}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`${
                  isExpanded ? "ml-4 block" : "hidden"
                } font-medium`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
