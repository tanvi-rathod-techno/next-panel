"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
import { logoutUser } from "@/lib/api/auth";


export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout, user } = useAuth(); 
  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleSignOut = async () => {
    await logoutUser();
    logout();           
    closeDropdown();    
    router.push("/signin"); 
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Image width={44} height={44} src="/images/user/owner.jpg" alt="User" />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">
          {user?.username ?? "Guest"}
        </span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
      isOpen={isOpen}
      onClose={closeDropdown}
      className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
      {/* ...existing dropdown content... */}

      <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        {/* ...other DropdownItem links like Profile, Settings, etc. */}
        
        <li>
          <DropdownItem
            onItemClick={closeDropdown}
            tag="a"
            href="/profile"
            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <svg
              className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 20h4.586l10.243-10.243a2 2 0 0 0 0-2.828l-2.758-2.758a2 2 0 0 0-2.828 0L4 14.586V20Zm14.828-11.415a.5.5 0 0 1 0 .707L17.121 10.5l-3.5-3.5 1.707-1.707a.5.5 0 0 1 .707 0l2.5 2.5ZM5.5 16.914 14.207 8.207l1.5 1.5L7 18.414H5.5v-1.5Z"
                fill="currentColor"
              />
            </svg>
            Edit Account
          </DropdownItem>
        </li>
      </ul>

      {/* Sign out button remains below */}
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 w-full text-left"
      >
        <svg
          className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.707 7.293a1 1 0 0 0-1.414 1.414L17.586 11H9a1 1 0 1 0 0 2h8.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Zm-11-3A2 2 0 0 0 3 6v12a2 2 0 0 0 2 2h7a1 1 0 1 0 0-2H5V6h7a1 1 0 1 0 0-2H5Z" // your existing sign out path
            fill=""
          />
        </svg>
        Sign out
      </button>
    </Dropdown>

    </div>
  );
}
