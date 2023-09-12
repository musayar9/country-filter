import React from 'react'
import { backToTop } from './Function';
import { FiArrowUp } from "react-icons/fi";
const TopButton = () => {
  return (
    <button
      className={`border border-gray-200 px-5 py-2 rounded-xl flex items-center justify-between space-x-3  hover:bg-gray-400 hover:text-gray-50 duration-700 hover:border-gray-300  active:translate-y-7`}
      onClick={backToTop}
      style={{ bottom: "20px", right: "40px", position: "fixed" }}
    >
      <FiArrowUp /> <span className="font-semibold text-md">Back To Top</span>
    </button>
  );
}

export default TopButton
