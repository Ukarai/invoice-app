import { useState } from "react";

const CollapsiblePanel = ({
  title,
  children,
  defaultOpen = true,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border min-w-fit rounded shadow bg-white ${className}`}>
      <div
        className="bg-blue-300 px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <span>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </div>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default CollapsiblePanel;
