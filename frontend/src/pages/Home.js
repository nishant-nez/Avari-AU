import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';
import { CategoryContext } from '../contexts/CategoryContext';
import { IoMdClose } from 'react-icons/io';
import { Toast } from '../components/Toast';

const Home = () => {
  const { products } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleClick = (id) => {
    setSelectedCategory(id);
    const filtered = products.filter((product) => product.category.id === id);
    setFilteredProducts(filtered);
  };

  const handleSearch = () => {
    Toast('success', 'yaay');
    const filtered = filteredProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredProducts(filtered);
  };

  const handleClear = () => {
    setQuery('');
    setFilteredProducts(products);
  }

  return (
    <>
      <Header />
      <div>
        <Hero />
        <section className='py-16'>
          <div className="container mx-auto">

            {/* search bar */ }
            <div className='w-full items-center justify-center gap-6 mb-8'>
              <div className="max-w-lg mx-auto">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Search Products..."
                    required
                    value={ query }
                    onChange={ (e) => setQuery(e.target.value) }
                  />
                  <button
                    className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                    onClick={ handleSearch }
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* category buttons */ }
            <div className='w-full flex flex-wrap items-center justify-center gap-6 mb-8'>
              { categories.map((category) => {
                return (
                  <div
                    onClick={ () => handleClick(category.id) }
                    className={ `${ category.id === selectedCategory ? 'bg-primary text-white' : 'bg-gray-50 text-primary' } border border-gray-400 hover:bg-primary hover:text-white p-3 justify-evenly items-center font-medium cursor-pointer` }
                    key={ category.id }
                  >
                    { category.name }
                  </div>
                )
              }) }
              <div className='text-xl cursor-pointer'>
                <IoMdClose
                  onClick={ handleClear }
                  className='text-gray-500 hover:text-red-500 transition'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              { filteredProducts.map((product) => {
                return (
                  <Product key={ product.id } product={ product } />
                )
              }) }
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
