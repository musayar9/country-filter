import React from 'react'

const GroupList = ({group, countryList}) => {
  return (
    <div>
      <h2>{group}</h2>
      <ul>
        {countryList.map((country) => (
          <li key={country.code}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList
