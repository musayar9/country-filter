import React from 'react'

const FilterList = ({country, selectedCountries, randomColor, handleCountryClick}) => {
  return (
    <li
      
      style={{
        backgroundColor:
          selectedCountries === country.code
            ? randomColor // Seçili ülkenin arka plan rengi
            : "white",
        cursor: "pointer",
      }}
      onClick={() => handleCountryClick(country)}
    >
      {country.name}-{country.currency}
    </li>
  );
}

export default FilterList
