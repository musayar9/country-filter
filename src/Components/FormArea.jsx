import React from 'react'

const FormArea = ({search, setSearch, group, setGroup,
handleChange, handleSubmit, groupSize}) => {
  return (
    <>
    
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
      </form>
    </>
  );
}

export default FormArea
