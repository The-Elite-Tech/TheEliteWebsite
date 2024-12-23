import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  //   return (
  //     <div>
  //       <img
  //         id="avatarButton"
  //         type="button"
  //         data-dropdown-toggle="userDropdown"
  //         data-dropdown-placement="bottom-start"
  //         class="w-10 h-10 rounded-full cursor-pointer"
  //         src="/docs/images/people/profile-picture-5.jpg"
  //         alt="User dropdown"
  //       />
  //       <div
  //         id="userDropdown"
  //         class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
  //       >
  //         <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
  //           <div>Bonnie Green</div>
  //           <div class="font-medium truncate">name@flowbite.com</div>
  //         </div>
  //         <ul
  //           class="py-2 text-sm text-gray-700 dark:text-gray-200"
  //           aria-labelledby="avatarButton"
  //         >
  //           <li>
  //             <a
  //               href="#"
  //               class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
  //             >
  //               Dashboard
  //             </a>
  //           </li>
  //           <li>
  //             <a
  //               href="#"
  //               class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
  //             >
  //               Settings
  //             </a>
  //           </li>
  //           <li>
  //             <a
  //               href="#"
  //               class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
  //             >
  //               Earnings
  //             </a>
  //           </li>
  //         </ul>
  //         <div class="py-1">
  //           <a
  //             href="#"
  //             class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
  //           >
  //             Sign out
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login')
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="p-2 rounded-full shadow-md cursor-pointer">
        <button
          type="button"
          className="flex items-center focus:outline-none"
          onClick={toggleDropdown}
        >
          <MdAccountCircle
            className="h-7 w-7"
            // src="https://via.placeholder.com/150" // Placeholder image URL, replace with your avatar image URL
            // alt="Avatar"
          />
          {/* <RiArrowDropDownLine className="h-7 w-7 text-gray-500" /> */}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              to='/profile'
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            {/* <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Settings
            </button> */}
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
