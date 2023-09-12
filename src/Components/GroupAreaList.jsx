import React, { useEffect, useState } from 'react'

const GroupAreaList = ({
  groupArea,
  count,
  selectedCountries,
  handleCountryClick,
  randomColor,
  search
}) => {
const [filterGroup, setFilterGroup] = useState([])
useEffect(()=>{

    let filteredCountries = groupArea[count].filter((group) => {
      const currency = Array.isArray(group.currency)
        ? group.currency[0]
        : group.currency;

      if (currency) {
        const currencyLowerCase = currency.toLocaleLowerCase("TR");
        const searchLowerCase = search.toLocaleLowerCase("TR");
        return searchLowerCase === ""
          ? true
          : currencyLowerCase.includes(searchLowerCase);
      }
      return false; // Currency null ise false döndür
    });
    setFilterGroup(filteredCountries)
     if (search === "" && filteredCountries.length >= 10) {
       // Eğer filtrelenen liste boş değilse, son öğeyi seç ve rengini ayarla

       const value = groupArea[1];
       handleCountryClick(value);
     } else if (search) {
       const lastCountry = filteredCountries[filteredCountries.length - 1];
       handleCountryClick(lastCountry);
     }
}, [count, groupArea, search])

  return (
    <>
      {filterGroup.map((country, index) => (
        <tr
          key={country.code}
          
          style={{
            backgroundColor:
              selectedCountries === country.code
                ? randomColor // Seçili ülkenin arka plan rengi
                : "white",

                color:selectedCountries === country.code && randomColor ? "white" : "black",
            cursor: "pointer",
          }}
          onClick={() => handleCountryClick(country)}
        >
          <td className="px-4  py-2 font-medium whitespace-nowrap">
            {index + 1}
          </td>
          <td className="px-4  py-2 font-medium   whitespace-nowrap">
            {country.code}
          </td>
          <td className="px-4  py-2 ">{country.name}</td>
          <td className="px-4  py-2  ">{country.capital}</td>
          <td className="px-4  py-2 ">{country.native}</td>
          <td className="px-4  py-2 ">{country.currency}</td>
          <td className="px-4  py-2 ">(+{country.phone})</td>
        </tr>
      ))}
    </>
  );
};

export default GroupAreaList
