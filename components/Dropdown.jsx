/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";

const Dropdown = ({ data, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const teamNames = data.map(item => item.team);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log('teamNames', teamNames)

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button to Toggle Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Teams
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className="dropdown-list absolute z-10 mt-2 divide-y divide-gray-100 rounded-lg shadow-md w-44 max-h-80 overflow-y-auto"
        >
          <ul className="py-2 text-sm">
            {teamNames.length > 0 ? (
              teamNames.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() => {
                      onSelect(item); // Send selected item to parent
                      setIsOpen(false); // Close dropdown
                    }}
                    className="list-item w-full text-left block px-4 py-2"
                  >
                    {item}
                  </a>
                </li>
              ))
            ) : (
              <li>
                <span className="block px-4 py-2 text-gray-400">
                  No data available
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;