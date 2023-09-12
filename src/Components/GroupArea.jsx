import React, { useState } from "react";
import GroupAreaList from "./GroupAreaList";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
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
  const [count, setCount] = useState(0);

  console.log("GroupAREA", groupArea[count]);
  console.log("groupArealength", groupArea.length);

  const handleTurnList = () => {
    setIsGroup(false);
    setCount(0);
    setGroupSize(" ");
    setSearch("");
  };
  return (
    <>
      <div className="flex items-end mt-5">
        <button
          className=" px-4 py-2 rounded-md bg-blue-600 text-gray-50  hover:bg-blue-400 hover:text-gray-200 duration-200 active:translate-y-2"
          onClick={handleTurnList}
        >
          Return List
        </button>
      </div>
      <div className="space-x-2 relative w-[900px] overflow-x-auto  shadow-2xl mt-5 mb-5 rounded-md">
        <table className="text-sm w-full text-left text-gray-500 p-5">
          <thead className="text-sm text-gray-200 capitalize bg-blue-500">
            <tr>
              <th scope="col" className="px-2 py-2">
                Line
              </th>
              <th scope="col" className="px-2 py-2">
                Code
              </th>
              <th scope="col" className="px-2 py-2">
                Country
              </th>
              <th scope="col" className="px-2 py-2">
                Capital
              </th>
              <th scope="col" className="px-2 py-2">
                Native
              </th>
              <th scope="col" className="px-2 py-2">
                Currency
              </th>
              <th scope="col" className="px-2 py-2">
                Phone
              </th>
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
        <button
          className="border border-gray-300 px-2 py-2 rounded-full disabled:bg-red-500  group"
          disabled={count <= 0}
          onClick={() => setCount(count - 1)}
        >
          <BsChevronLeft className="text-gray-900 group-disabled:text-gray-50  duration-500 ease-in" />
        </button>

        <span className="px-4 py-2 font-bold text-gray-700">{count + 1}</span>

        <button
          className="border border-gray-300 px-2 py-2 rounded-full  disabled:bg-red-500 group"
          disabled={count === groupArea.length - 1}
          onClick={() => setCount(count + 1)}
        >
          <BsChevronRight className="text-gray-900 group-disabled:text-gray-50   duration-500 ease-in" />
        </button>
      </div>
    </>
  );
};

export default GroupArea;
