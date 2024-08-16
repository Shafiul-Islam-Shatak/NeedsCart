import { useEffect, useState } from "react";
import SearchBar from "../../Components/Searchbar/searchBar";
import axios from "axios";
import ProductsCard from "../../Components/ProductsCard/ProductsCard";

const Home = () => {
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const [products , setProducts] = useState([])
    const handleClearSearch = () => {
        setSearchText('')
        setSearch('')
    }

    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText)
    }
    console.log(search);


    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-products?search=${search}`)
            setProducts(data)
        }
        getData()

    }, [search])

    console.log(products);
    

    return (
        <div>
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
            </div>

            <div className="flex gap-5 p-5">
                {/* Filter option on the left side */}
                <div className="border border-red-600 flex-1 hidden lg:block">
                    <h1>hii</h1>
                </div>
                {/* main display products */}
                <div className=" w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {
                    products.map(product =>
                        <ProductsCard
                            key={product._id}
                            product={product}
                        ></ProductsCard>)
                }
                </div>
            </div>
        </div>
    );
};

export default Home;