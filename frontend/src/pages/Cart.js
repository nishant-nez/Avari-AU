import React, { useContext } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { MinimumOrderContext } from '../contexts/MinimumOrderContext';
import CartCard from '../components/CartCard';
import { Toast } from '../components/Toast';
import axios from '../api/axios';

const Cart = () => {
    const { cart, total } = useContext(CartContext);
    const { minOrder } = useContext(MinimumOrderContext);

    const handleClick = async () => {
        console.log('clicked');
        console.log('min order', minOrder)
        console.log('cart: ', cart)
        if (total < minOrder.minimum_order) {
            Toast('error', `Minimum order amount should be $ ${ minOrder.minimum_order }`);
        } else {

            try {
                const response = await axios.post(
                    '/api/stripe/create-checkout-session',
                    { cart },
                    { withCredentials: true },
                );
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            } catch (err) {
                console.log(err);
            }

            Toast('success', `Your order has been placed successfully!`);
        }
    };


    return (
        <>
            <Header />
            <div className="h-[100vh] bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">

                        { cart.map((item) => {
                            return (
                                <CartCard item={ item } key={ item.id } />
                            );
                        }) }

                    </div>

                    {/* side card */ }
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">${ parseFloat(total).toFixed(2) }</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$4.99</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${ parseFloat(total).toFixed(2) } USD</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button
                            onClick={ handleClick }
                            className="mt-6 w-full rounded-md bg-gray-700 py-1.5 font-medium text-white hover:bg-primary"
                        >
                            Check out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;