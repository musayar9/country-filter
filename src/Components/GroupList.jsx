import React from "react";
const GroupList = ({ group, countryList }) => {
  //listing by currencies
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
    </>
  );
};

export default GroupList;
