import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { CartContext } from '../contexts/CartContext';
import { Toast } from './Toast';

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const { id, name, image, price, amount } = item;

  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>
        {/* image */ }
        <Link to={ `/product/${ id }` }>
          <img className='max-w-[120px]' src={ `${ process.env.REACT_APP_BACKEND_URL }/${ image }` } alt={ name } />
        </Link>
        <div className='w-full flex flex-col'>
          {/* title and remove icon */ }
          <div className='flex justify-between mb-2'>
            <Link
              to={ `/product/${ id }` }
              className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
            >
              { name }
            </Link>
            <div className='text-xl cursor-pointer'>
              <IoMdClose
                onClick={ () => removeFromCart(id) }
                className='text-gray-500 hover:text-red-500 transition'
              />
            </div>
          </div>
          <div className='flex gap-x-2 h-[36px] text-sm'>
            {/* quantity */ }
            <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>
              <div
                onClick={ () => decreaseAmount(id) }
                className='flex-1 h-full flex justify-center items-center cursor-pointer'
              >
                <IoMdRemove />
              </div>
              <div className='h-full flex justify-center items-center px-2'>
                { amount }
              </div>
              <div
                onClick={ () => {
                  if (item.stock !== item.amount) {
                    increaseAmount(item.id)
                  } else {
                    Toast('error', `Stock amount is only ${ item.stock }`);
                  }
                } }
                className='flex-1 h-full flex justify-center items-center cursor-pointer'
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item price */ }
            <div className='flex-1 flex items-center justify-around'>$ { price }</div>
            {/* final price */ }
            <div className='flex-1 flex justify-end items-center text-primary font-medium'>{ `$ ${ parseFloat(price * amount).toFixed(2) }` }</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
