import React from "react";

const FilterList = ({
  filterData,
  selectedCountries,
  randomColor,
  handleCountryClick,
  
}) => {

  return (
    <>
      {filterData.map((country) => (
        <tr
          key={country.code}
          style={{
            backgroundColor:
              selectedCountries === country.code
                ? randomColor // Seçili ülkenin arka plan rengi
                : "white",
            color:
              selectedCountries === country.code && randomColor
                ? "white"
                : "black",
            cursor: "pointer",
          }}
          onClick={() => handleCountryClick(country)}
        >
          <td className="px-4  py-2 font-medium  whitespace-nowrap">
            {country.code}
          </td>
          <td className="px-4  py-2 " style={{}}>{country.name}</td>
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
