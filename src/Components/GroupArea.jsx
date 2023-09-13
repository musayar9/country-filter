import React, { useState } from "react";
import GroupAreaList from "./GroupAreaList";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import TableHead from "./TableHead";
import { Helmet } from "react-helmet";
const GroupArea = ({
  groupArea,
  setIsGroup,
  selectedCountries,
  handleCountryClick,
  randomColor,
  setGroupSize,
  search,
  setSearch,
}) => {
  /**Display of incoming data according to groupSize */
  const [count, setCount] = useState(0);
  /**Back to first list */
  const handleTurnList = () => {
    setIsGroup(false);
    setCount(0);
    setGroupSize(" ");
    setSearch("");
  };
  return (
    <>
      <Helmet>
        <title>Group Size</title>
        <meta name="description" content="group-size" />
      </Helmet>
      <div className="space-x-2 relative w-[900px] overflow-x-auto  shadow-2xl mt-5 mb-5 rounded-md">
        <table className="text-sm w-full text-left text-gray-500 p-5">
          <thead className="text-sm text-gray-200 capitalize bg-blue-500">
            <tr>
              <th scope="col" className="px-3 py-4">
                Line
              </th>
              <TableHead />
            </tr>
          </thead>
          <tbody>
            <GroupAreaList
              groupArea={groupArea}
              count={count}
              selectedCountries={selectedCountries}
              randomColor={randomColor}
              handleCountryClick={handleCountryClick}
              search={search}
            />
          </tbody>
        </table>
      </div>
      <div className="mb-5">
        {/**Navigating through grouped data */}

        <button
          className="border border-gray-300 px-2 py-2 rounded-full disabled:bg-red-700  duration-200 group hover:bg-red-400 "
          disabled={count <= 0}
          onClick={() => setCount(count - 1)}
        >
          <BsChevronLeft className="text-gray-900 group-disabled:text-gray-50 group-hover:text-white duration-500 ease-in" />
        </button>

        <span className="px-4 py-2 font-bold text-black">{count + 1}</span>

        <button
          className="border border-gray-300 px-2 py-2 rounded-full  disabled:bg-red-700 duration-200 group hover:bg-green-400 "
          disabled={count === groupArea.length - 1}
          onClick={() => setCount(count + 1)}
        >
          <BsChevronRight className="text-gray-900 group-disabled:text-gray-50 group-hover:text-white   duration-500 ease-in" />
        </button>
      </div>

      <button
        className={`border border-gray-200 px-5 py-2 rounded-xl flex items-center justify-between space-x-3  hover:bg-gray-400 hover:text-gray-50 duration-700 hover:border-gray-300   active:-translate-x-4`}
        style={{
          bottom: "20px",
          right: "40px",
          position: "fixed",
        }}
        onClick={handleTurnList}
      >
        <FiArrowLeft />{" "}
        <span className="font-semibold text-md">Return List</span>
      </button>
    </>
  );
};

export default GroupArea;
