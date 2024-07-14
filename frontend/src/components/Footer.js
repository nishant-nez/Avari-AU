import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className=" bg-primary">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3"> Avari Australia </h3>
          <p> Get it delivered. </p>
          <div className="flex justify-center my-10">
            <div className="flex items-center w-auto rounded-lg px-4 py-2 gap-4 mx-2">
              <Link to={ '/admin/login' } className="text-left ml-3 border py-2 px-4 cursor-pointer">
                <p className="text-sm md:text-base"> Admin Login </p>
              </Link>
              <Link to={ '/vendor/login' } className="text-left ml-3 border py-2 px-4 cursor-pointer">
                <p className="text-sm md:text-base"> Admin Login </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; { Date().split(' ')[3] }. All rights reserved. </p>
          <div className="order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l">Contact us</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Footer;
