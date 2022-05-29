import React, { useState } from 'react'

function SearchBar({ placeholder, onSetSearchParams }) {

    let [searchParams, setSearchParams] = useState('')

    let handleChange = (e) => {
        setSearchParams(e.target.value )
    }

    let handleSetSearchParams = (e) => {
        e.preventDefault()
        onSetSearchParams(searchParams)
    }

    return (

        <form className="flex flex-row" onSubmit={handleSetSearchParams}>
            <input
                className="bg-white w-screen p-2 rounded-l-md border-l-2 border-b-2 border-t-2 border-gray-200"
                type="text"
                value={searchParams}
                onChange={handleChange}
                placeholder={placeholder || "Payments / Merchants / Buyers"}
            ></input>
            <button className="bg-blue-500 text-sm font-light p-2 rounded-r-md text-white">Search</button>
        </form>
    );
}

function CommonSearchBar({ placeholder, onSetSearchParams }) {
    return (
        <div className="m-4">
            <SearchBar placeholder={placeholder} onSetSearchParams={onSetSearchParams} />
        </div>
    )
}

export { SearchBar, CommonSearchBar }