import React from 'react'

function SearchBar(props) {

    return (
        <div className="flex flex-row">
            <input 
                className="bg-white w-screen p-2 rounded-l-md border-l-2 border-b-2 border-t-2 border-gray-200"
                type="text"
                placeholder="Payments / Merchants / Buyers"
            ></input>
            <button className="bg-blue-500 text-sm font-light p-2 rounded-r-md text-white">Search</button>
        </div>
    );
}

function CommonSearchBar(props) {
    return (
        <div className="m-4">
            <SearchBar/>
        </div>
    )
}

export { SearchBar, CommonSearchBar }