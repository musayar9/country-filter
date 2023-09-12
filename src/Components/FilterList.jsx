import React from "react";

const FilterList = ({
  filterData,
  selectedCountries,
  randomColor,
  handleCountryClick,
  
}) => {
  /**representation of filtered data in the table */
  return (
    <>
      {filterData.map((country) => (
        <tr
          className="transition-all duration-300"
          key={country.code}
          style={{
            backgroundColor:
              selectedCountries === country.code
                ? randomColor // Background color of the selected country
                : "white",
            color:
              selectedCountries === country.code && randomColor // Text color of the selected country
                ? "white"
                : "black",
            cursor: "pointer",
          }}
          onClick={() => handleCountryClick(country)}
        >
          <td className="px-4  py-2 font-medium  whitespace-nowrap">
            {country.code}
          </td>
          <td className="px-4  py-2 " style={{}}>
            {country.name}
          </td>
          <td className="px-4  py-2 ">{country.capital}</td>
          <td className="px-4  py-2  ">{country.native}</td>
          <td className="px-4  py-2  ">{country.currency}</td>
          <td className="px-4  py-2  ">(+{country.phone})</td>
        </tr>
      ))}
    </>
  );
};

export default FilterList;
