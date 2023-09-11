import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_COUNTRIES } from "../queries";
import Loading from "./Loading";
import Error from "./Error";
import FormArea from "./FormArea";
import FilterList from "./FilterList";
import GroupList from "./GroupList";
import GroupArea from "./GroupArea";

const CountryList = () => {
  const [search, setSearch] = useState(""); // Arama terimi için state
  const [group, setGroup] = useState(""); // Gruplama alanı olarak "currency" ayarlandı
  const [selectedCountries, setSelectedCountries] = useState([]); // Seçili ülkelerin listesi
  const [randomColor, setRandomColor] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [groupSize, setGroupSize] = useState("");
  const [groupArea, setGroupArea] = useState([]);
  const [isGroup, setIsGroup] = useState(false);


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

        const value = countries[10];
        handleCountryClick(value);
      } else if (search) {
        const lastCountry = filteredCountries[filteredCountries.length - 1];
        handleCountryClick(lastCountry);
      }
    }
  }, [loading, data, search, group, setFilterData]);
  if (loading) return (
    <div className="mt-10">
      <Loading />
    </div>
  );
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
      setGroupArea(groups);
      setIsGroup(true);
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
    <div className=" flex flex-col items-center justify-center mt-10">
      <div className="shadow shadow-slate-400 rounded-lg w-[400px] md:w-[600px] lg:w-[800px] p-10">
        <FormArea
          search={search}
          setSearch={setSearch}
          group={group}
          setGroup={setGroup}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          groupSize={groupSize}
        />
      </div>
      <div className={isGroup ? "hidden": "flex"}>
        {groupedCountries(
          countries,
          group,
          selectedCountries,
          handleCountryClick,
          randomColor,
          filterData,
          setFilterData,
   
        )}
      </div>

      {isGroup && (
        <GroupArea
          groupArea={groupArea}
          setIsGroup={setIsGroup}
          selectedCountries={selectedCountries}
          randomColor={randomColor}
          handleCountryClick={handleCountryClick}
          setGroupSize={setGroupSize}
          search={search}
          setSearch={setSearch}
        />
      )}
    </div>
  );
};

const groupedCountries = (
  countries,
  groupBy,
  selectedCountries,
  handleCountryClick,
  randomColor,
  filterData,

) => {


  if (!groupBy) {
    return (
      <>
        {filterData.length > 0 ? (
          <div className="relative w-[900px] overflow-x-auto  shadow-2xl mt-5 mb-5 rounded-md ">
            <table className="text-sm w-full text-left text-gray-500 p-5">
              <thead className="text-sm text-gray-200 capitalize bg-blue-500">
                <tr>
                  <th scope="col" className="px-2 py-2">Code</th>
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
                <FilterList
                  filterData={filterData}
                  selectedCountries={selectedCountries}
                  randomColor={randomColor}
                  handleCountryClick={handleCountryClick}
                />
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-5">
            <p className=" text-gray-50 bg-red-700 px-4 py-4 rounded-lg">
              Not found Data
            </p>
          </div>
        )}
      </>
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
      {
        <>
          {groupBy === "currency" ? (
            <>
              {Object.entries(groupData).map(([group, countryList]) => (
                <GroupList
                  key={group}
                  group={group}
                  countryList={countryList}
                  groupData={groupData}
                />
              ))}
            </>
          ) : (
            <div className="mt-10">
              <Loading />
            </div>
          )}
        </>
      }
    </div>
  );
};
export default CountryList;
