import React from 'react';
// import WomanImg from '../img/woman_hero.png';
import DeliveryGuy from '../img/delivery_hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='bg-pink-200 h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full'>
        <div className='flex flex-col justify-center'>
          <div className='w-10 h-[2px] bg-red-500 mr-3'></div>
          <div>Avari</div>
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            Get your essentials <br />
            <span className='font-semibold'>DELIVERED</span>
          </h1>
          <Link
            to={ '/' }
            className='self-start uppercase font-semibold border-b-2 border-primary'
          >
            Discover More
          </Link>
        </div>
        <div className='hidden lg:block'>
          <img src={ DeliveryGuy } alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
