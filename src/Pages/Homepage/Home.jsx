import { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "../../Components/ProductsCard/ProductsCard";
import NoData from "../../Components/NoData/NoData";
import { IoFilterOutline } from "react-icons/io5";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sort, setSort] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // my all brands
    const brandNames = ["TechMaster", "SoundWave", "Visionary", "GardenPro", "WellnessHub", "HandyTools", "SportsGear"];

    // my all category 
    const categoryNames = ["electronics", "gadget", "Wellness", "Garden", "Sports", "Tools"];

    // clear text from search box
    const handleClearSearch = () => {
        setSearchText('')
        setSearch('')
    }

    // take text input from searchbar
    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText)
        setCurrentPage(1);
    }

    // Filter brand 
    const handleBrandChange = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((item) => item !== brand)
                : [...prev, brand]
        );
        setCurrentPage(1);
    }

    // Filter category
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ?
                prev.filter((item) => item !== category) : [...prev, category]
        )
        setCurrentPage(1);
    }

    // price range handler
    const handlePriceChange = (e) => {
        setPriceRange([0, e.target.value])
        setCurrentPage(1);
    }

    // clear filter handeler
    const handleClearFilter = () => {
        setPriceRange([0, 100]);
        setSelectedBrands('')
        setSelectedCategories('')
        setCurrentPage(1);

    }

    // sort handler
    const handleSort = (e) => {
        setSort(e.target.value)
        setCurrentPage(1);
    }
    console.log(sort);

    // handle pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    // display all products fethcingF
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-products`,
                {
                    params: {
                        search,
                        brands: selectedBrands.join(','),
                        categories: selectedCategories.join(','),
                        minPrice: priceRange[0],
                        maxPrice: priceRange[1],
                        sort,
                        page: currentPage,
                        limit: 10
                    },
                });
            setProducts(data.products);
            setTotalPages(data.totalPages);
        }
        getData()

    }, [search, selectedBrands, selectedCategories, priceRange, sort, currentPage])

    // console.log(products);


    return (
        <div>
            <div>
                {/* search bar */}
                <div data-aos="fade-up flex">
                    <form onSubmit={handleSearch} className="mb-10 mx-auto ">
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col lg:flex-row">
                                <div>
                                    <label className="input  input-bordered w-72 flex items-center gap-2">
                                        <input type="text" className="grow" name="search" placeholder="Search"
                                            onChange={(e) => setSearchText(e.target.value)}
                                            value={searchText} />
                                    </label>
                                </div>
                                <div className="mt-3 lg:mt-0">
                                    <button type="submit" className="btn border-none bg-orange-400 -mr-4 text-black ">Search</button>
                                    <button onClick={handleClearSearch} className="btn border-none bg-orange-400 p-2 text-black ml-5">Clear Search</button> 
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
                {/* search bar end*/}

                {/* Filter option on the top left corner in menu for small device */}

                <div className="flex justify-around ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <div className="flex justify-between gap-8">
                                <div className="flex justify-center items-center">
                                    <IoFilterOutline></IoFilterOutline>
                                    <h1 className="text-blue-800">Apply Filter</h1>
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                            <form>
                                {/* Brand filter */}
                                <h2 className="font-bold mt-4">Brands</h2>
                                {
                                    brandNames.map((brand, idx) => (
                                        <div key={idx}>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={brand}
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => handleBrandChange(brand)}
                                                    className="checkbox mt-1"
                                                />
                                                <span className="ml-2">{brand}</span>
                                            </label>
                                        </div>
                                    ))
                                }

                                {/* Category filter */}
                                <h2 className="font-bold mt-4">Category</h2>
                                {
                                    categoryNames.map((category, idx) => (
                                        <div key={idx}>
                                            <label className="flex items-center">
                                                <input type="checkbox"
                                                    value={category}
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={() => handleCategoryChange(category)}
                                                    className="checkbox mt-1"
                                                />
                                                <span className="ml-2">{category}</span>
                                            </label>
                                        </div>
                                    ))
                                }

                                {/* Price Filter */}
                                <h2 className="font-bold mt-4">Price Range</h2>
                                <div className="flex items-center gap-2">
                                    <span>${priceRange[0]}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={priceRange[1]}
                                        onChange={handlePriceChange}
                                        className="range range-primary"
                                    />
                                    <span>${priceRange[1]}</span>
                                </div>
                                <button onClick={handleClearFilter} className="mt-3">Clear Filter</button>
                            </form>
                        </ul>
                    </div>
                    {/* sorting div for mobile */}
                    <div className="flex justify-center items-center gap-3">
                        {/* sorting  */}
                        <label className="font-bold">Sort</label>
                        <select onChange={handleSort} className="select select-bordered w-full max-w-xs">
                            <option value="low to high">Low to high</option>
                            <option value="high to low">Hight to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="flex gap-5 p-5">
                {/* Filter option on the left side for large device */}
                <div className=" flex-1 hidden  md:block">
                    <h1 className="font-bold">Filter Your Products</h1>
                    <form>
                        {/* Brand filter */}
                        <h2 className="font-bold mt-4">Brands</h2>
                        {
                            brandNames.map((brand, idx) => (
                                <div key={idx}>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={brand}
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => handleBrandChange(brand)}
                                            className="checkbox mt-1"
                                        />
                                        <span className="ml-2">{brand}</span>
                                    </label>
                                </div>
                            ))
                        }

                        {/* Category filter */}
                        <h2 className="font-bold mt-4">Category</h2>
                        {
                            categoryNames.map((category, idx) => (
                                <div key={idx}>
                                    <label className="flex items-center">
                                        <input type="checkbox"
                                            value={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            className="checkbox mt-1"
                                        />
                                        <span className="ml-2">{category}</span>
                                    </label>
                                </div>
                            ))
                        }

                        {/* Price Filter */}
                        <h2 className="font-bold mt-4">Price Range</h2>
                        <div className="flex items-center gap-2">
                            <span>${priceRange[0]}</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={priceRange[1]}
                                onChange={handlePriceChange}
                                className="range range-primary"
                            />
                            <span>${priceRange[1]}</span>
                        </div>

                        <button onClick={handleClearFilter} className="mt-3">Clear Filter</button>
                        <div className="mt-3">

                            {/* sorting  */}
                            <label className="font-bold">Sort</label>
                            <select onChange={handleSort} className="select select-bordered w-full max-w-xs">
                                <option value="low to high">Low to high</option>
                                <option value="high to low">Hight to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </form>
                </div>


                {/* main display products */}

                {
                    products.length > 0 ?
                        <div className=" w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {
                                products.map(product =>
                                    <ProductsCard
                                        key={product._id}
                                        product={product}
                                    ></ProductsCard>)
                            }
                        </div> :
                        <NoData></NoData>
                }
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-5">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-primary"
                >
                    Previous
                </button>
                <span className="mx-3">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Home;