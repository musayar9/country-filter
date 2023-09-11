import React from 'react'
import {FiArrowUp} from "react-icons/fi"
const GroupList = ({ group, countryList }) => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="border p-4 rounded shadow-md w-[900px] mt-10">
        <h2 className="text-lg font-semibold mb-2">Currency : {group}</h2>
        <ul className="grid grid-cols-4 gap-2">
          {countryList.map((country) => (
            <li key={country.code} className="bg-blue-100 p-2 rounded">
              {country.name}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="border border-gray-200 px-5 py-2 
                                                    rounded-xl flex items-center justify-between space-x-3
                                                    hover:bg-gray-600 hover:text-gray-50 duration-700
                                                    hover:border-gray-300 active:translate-y-7
                                                    "
        onClick={backToTop}
        style={{ bottom: "20px", right: "40px", position: "fixed" }}
      >
        <FiArrowUp /> <span className="font-semibold text-md">Back To Top</span>
      </button>
    </>
  );
};

export default GroupList
