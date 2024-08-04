import React from 'react';
// import WomanImg from '../img/woman_hero.png';
import DeliveryGuy from '../img/delivery_hero.png';

const Hero = () => {
  return (
    <section className='bg-pink-200 h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full'>
        <div className='flex flex-col justify-center'>
          <div className='w-12 h-[2px] bg-red-500 mr-3'></div>
          <div>Gromi</div>
          <h1 className='text-[60px] md:text-[70px] leading-[1.1] font-light mb-4'>
            Get your essentials <br />
            <span className='font-semibold'>DELIVERED</span>
          </h1>
          <div
            onClick={ () => {
              const section = document.querySelector('#products-section');
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } }
            className='self-start uppercase font-semibold border-b-2 border-primary cursor-pointer'
          >
            Discover More
          </div>
        </div>
        <div className='hidden lg:block'>
          <img src={ DeliveryGuy } alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
