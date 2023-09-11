import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_COUNTRIES } from "../queries";
import Loading from "./Loading";
import Error from "./Error";
import FormArea from "./FormArea";


const CountryList = () => {
  const [search, setSearch] = useState(""); // Arama terimi için state
  const [group, setGroup] = useState(""); // Gruplama alanı olarak "currency" ayarlandı
  const [selectedCountries, setSelectedCountries] = useState([]); // Seçili ülkelerin listesi
  const [randomColor, setRandomColor] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [groupSize, setGroupSize] = useState(0);
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: {
      groupBy: group, // Gruplama alanı
    },
  });

  const handleCountryClick = (country) => {
    if (selectedCountries === country?.code) {
      setSelectedCountries(null);
      setRandomColor(null);
    } else {
      // Eğer ülke seçili değilse listeye ekle

      setSelectedCountries(country?.code);
      setRandomColor(getRandomColor());
    }
  };
  useEffect(() => {
    if (!loading) {
      const countries = data.countries;
      let filteredCountries = countries.filter((country) => {
        const currency = Array.isArray(country.currency)
          ? country.currency[0]
          : country.currency;
        if (currency) {
          const currencyLowerCase = currency.toLocaleLowerCase("TR");
          const searchLowerCase = search.toLocaleLowerCase("TR");
          return searchLowerCase === ""
            ? true
            : currencyLowerCase.includes(searchLowerCase);
        }
        return false; // Currency null ise false döndür
      });
      setFilterData(filteredCountries);
      if (search === "" && filteredCountries.length >= 10) {
        // Eğer filtrelenen liste boş değilse, son öğeyi seç ve rengini ayarla

        const value = countries[9];
        handleCountryClick(value);
      } else if (search) {
        const lastCountry = filteredCountries[filteredCountries.length - 1];
        handleCountryClick(lastCountry);
      }
    }
  }, [loading, data, search, group, setFilterData]);
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  // Geri kalan bileşen kodu...
  const countries = data.countries;

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const handleChange = (e) => {
    const newSize = Number(e.target.value); // Girilen değeri bir tamsayıya çevirin
    if (!isNaN(newSize)) {
      setGroupSize(newSize);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupSize) {
      const groups = groupDataBySize(filterData, groupSize);
      console.log(groups); // Gruplanmış verileri konsola yazdır
    }
  };

  const groupDataBySize = (data, size) => {
    console.log("size0", size);
    const groups = [];
    for (let i = 0; i < data.length; i += size) {
      groups.push(data.slice(i, i + size));
    }

    return groups;
  };

  return (
    <div>
      <div>
        {/* <h1>Ülkeler</h1>
        <input
          type="text"
          placeholder="Ülke Ara"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Currency göre grupla"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Grup Boyutu"
            value={groupSize}
            onChange={handleChange}
          />
          <button type="suböit">grupla</button>
        </form> */}
        <FormArea search={search} setSearch={setSearch} group={group} setGroup={setGroup} handleChange={handleChange} handleSubmit={handleSubmit} groupSize={groupSize}/>
        {groupedCountries(
          countries,
          group,
          selectedCountries,
          handleCountryClick,
          randomColor,
          filterData
        )}
      </div>
    </div>
  );
};

const groupedCountries = (
  countries,
  groupBy,
  selectedCountries,
  handleCountryClick,
  randomColor,
   filterData

) => {
  if (!groupBy) {
    return (
      <ul>
        {filterData
          .map((country) => (
            <li
              key={country.code}
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
          ))}
      </ul>
    );
  }

  // Verileri gruplayın

  const groupData = {};

  countries.forEach((country) => {
    let groupKey = country[groupBy];

    if (Array.isArray(groupKey)) {
      groupKey = groupKey[0];
    }

    if (!groupKey) {
      return;
    }

    if (!groupData[groupKey]) {
      groupData[groupKey] = [];
    }
    groupData[groupKey].push(country);
  });

  // Grupları gösterin
  return (
    <div>
      {Object.entries(groupData).map(([group, countryList]) => (
        <div key={group}>
          <h2>{group}</h2>
          <ul>
            {countryList.map((country) => (
              <li key={country.code}>{country.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default CountryList;
