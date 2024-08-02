import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Toast } from "./Toast";

const CartCard = ({ item }) => {
    const { decreaseAmount, increaseAmount, removeFromCart } = useContext(CartContext);
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
                src={ `${ process.env.REACT_APP_BACKEND_URL }/${ item.image }` }
                alt={ item.name }
                className="w-full rounded-lg sm:w-40"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{ item.name }</h2>
                    <p className="mt-1 text-xs text-gray-700">{ item.description }</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <span
                            onClick={ () => decreaseAmount(item.id) }
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                            -
                        </span>
                        <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={ item.amount } min="1" />
                        <span
                            onClick={ () => {
                                if (item.stock !== item.amount) {
                                    increaseAmount(item.id)
                                } else {
                                    Toast('error', `Stock amount is only ${ item.stock }`);
                                }
                            } }
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                            +
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">{ `$ ${ parseFloat(item.price * item.amount).toFixed(2) }` }</p>
                        <svg
                            onClick={ () => removeFromCart(item.id) }
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartCard;