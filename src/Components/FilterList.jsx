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
            color: randomColor ? "black" : "white",
            cursor: "pointer",
          }}
          onClick={() => handleCountryClick(country)}
        >
          <td className="px-4  py-2 font-medium  text-gray-900 whitespace-nowrap">
            {country.code}
          </td>
          <td
            className="px-4  py-2 text-gray-900"
         
          >
            {country.name}
          </td>
          <td className="px-4  py-2  text-gray-900">{country.capital}</td>
          <td className="px-4  py-2  text-gray-900">{country.native}</td>
          <td className="px-4  py-2  text-gray-900">{country.currency}</td>
          <td className="px-4  py-2  text-gray-900">(+{country.phone})</td>
        </tr>
      ))}
    </>
  );
};

export default FilterList;
