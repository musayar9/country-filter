import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_COUNTRIES } from "../data/queries";
import Loading from "./Loading";
import Error from "./Error";
import FormArea from "./FormArea";
import FilterList from "./FilterList";
import GroupList from "./GroupList";
import GroupArea from "./GroupArea";
import {  getRandomColor, groupDataBySize } from "./Function";
import TableHead from "./TableHead";
import TopButton from "./TopButton";
import { BiSolidErrorCircle } from "react-icons/bi"
const CountryList = () => {
  const [search, setSearch] = useState(""); // State for search term and filtering
  const [group, setGroup] = useState(""); //state for "currency" as grouping field
  const [selectedCountries, setSelectedCountries] = useState(""); // state definition for the selected country
  const [filterData, setFilterData] = useState([]); // the filtered data is kept
  const [groupSize, setGroupSize] = useState(""); //number of groupings
  const [groupArea, setGroupArea] = useState([]); // place where grouped records are kept
  const [isGroup, setIsGroup] = useState(false); //group  control
  const [randomColor, setRandomColor] = useState(null); //color control

  //Pulling and grouping data with useQuery
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: {
      groupBy: group, // grouping by currencies
    },
  });

  //change the color of the background of the selected country
  const handleCountryClick = (country) => {
    if (selectedCountries === country?.code) {
      setSelectedCountries(null);
      setRandomColor(null);
    } else {
      // If the country is not selected, add it to the list
      setSelectedCountries(country?.code);
      setRandomColor(getRandomColor());
    }
  };

  //change the background color of the specified element when the page loads
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
        return false; // If currency is null, it returns false
      });
      setFilterData(filteredCountries);
      if (search === "" && filteredCountries.length >= 10) {
        // If the filtered list is not empty, select the last element and set its color
        const value = countries[10];
        handleCountryClick(value);
      } else if (search) {
        const lastCountry = filteredCountries[filteredCountries.length - 1];
        handleCountryClick(lastCountry);
      }
    }
  }, [loading, data, search, group, setFilterData]);

  //loading animation will be shown when the page first loads
  if (loading)
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );

  //If there is an error, error message will be shown.
  if (error) return <Error message={error.message} />;

  const countries = data.countries;

  //number control for groupSize input
  const handleChange = (e) => {
    const newSize = Number(e.target.value);
    if (!isNaN(newSize)) {
      setGroupSize(newSize);
    }
  };

  //Group data by groupSize
  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupSize) {
      const groups = groupDataBySize(filterData, groupSize);
      setGroupArea(groups);
      setIsGroup(true);
    }
  };

  return (
    <div className="flex m-auto flex-col items-center justify-center mt-8">
    
    <h1 className="font-bold text-3xl p-4" style={{color:randomColor}}>Country Currency Filter</h1>
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
      <div className={isGroup ? "hidden" : "flex"}>
        {groupedCountries(
          countries,
          group,
          selectedCountries,
          handleCountryClick,
          randomColor,
          filterData,
          setFilterData
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
  filterData
) => {
  /*If groupBy is not active, show filtered data */
  if (!groupBy) {
    return (
      <>
        {filterData.length > 0 ? (
          <div className="relative w-[900px] overflow-x-auto  shadow-2xl mt-5 mb-5 rounded-md ">
            <table className="text-sm w-full text-left text-gray-500 p-5">
              <thead className="text-sm text-gray-200 capitalize bg-blue-500">
                <tr>
                  <TableHead />
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
            <TopButton />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mt-5">
              <p className="w-[900px] flex items-center space-x-4 text-gray-50 bg-red-700 px-4 py-4 rounded-lg">
                <BiSolidErrorCircle size={42} />
                <span className="text-xl font-bold">Data Not Found</span>
              </p>
            </div>
          </>
        )}
      </>
    );
  }

  // grouping by currencies
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

  return (
    <div>
      {
        <>
          {/**If there is a currency, show the list. If there is no currency, show the loading animation. */}
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

              <TopButton />
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
