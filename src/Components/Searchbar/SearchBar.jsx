import { useState } from "react";

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');

    const handleClearSearch = () => {
        setSearchText('')
        setSearch('')
    }

    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText)
    }
    console.log(search);
    return (
        <div>
            {/* search bar */}
            <div data-aos="fade-up flex">
                <form onSubmit={handleSearch} className="mb-10 mx-auto ">
                    <div className="flex justify-center items-center">
                        <label className="input  input-bordered w-90 md:w-96 flex items-center gap-2">
                            <input type="text" className="grow" name="search" placeholder="Search"
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText} />

                            <button type="submit" className="btn border-none bg-orange-400 -mr-4 text-black ">Search</button>
                        </label>
                        <button onClick={handleClearSearch} className="btn border-none bg-orange-400 -mr-4 text-black ml-5 ">Clear Search</button>
                    </div>
                </form>
            </div>
            {/* search bar end*/}

            <div>
                
            </div>

        </div>
    );
};

export default SearchBar;