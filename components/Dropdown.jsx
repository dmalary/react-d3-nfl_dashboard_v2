/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";

const Dropdown = ({ data = [], onSelect, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  const listNames =
    title === "Teams"
      ? data?.map((item) => item.team) ?? []
      : data?.map((item) => item.position) ?? [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button to Toggle Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="selectorBtn font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {title}
        {/* {selectedItem !== null ? selectedItem : title} */}
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
        <div className="dropList dropdown-list absolute z-10 mt-2 divide-y divide-gray-100 rounded-lg shadow-md w-44 max-h-80 overflow-y-auto">
          <ul className="py-2 text-sm">
            {listNames.length > 0 ? (
              listNames.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <button
                    onClick={() => {
                      onSelect(item); // Send selected item to parent
                      // setSelectedItem(item); // Send selected item to parent
                      setIsOpen(false); // Close dropdown
                    }}
                    className="list-item w-full text-left block px-4 py-2 hover:bg-gray-600"
                  >
                    {item}
                  </button>
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
