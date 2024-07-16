import { Link } from "react-router-dom";
import Header from "../components/Header";

const CheckoutCancel = () => {
    return (
        <>
            <Header />

            <>
                <Header />

                <div className="h-[100vh] bg-gray-100 pt-24">
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="bg-white p-6  md:mx-auto">
                            <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/FA5252/box-important--v1.png" alt="box-important--v1" className="mx-auto mb-6" />
                            <div className="text-center">
                                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Unsuccessful!</h3>
                                <p className="text-gray-600 my-2">Your order and payment could not be done. Please try again later.</p>
                                <div className="py-10 text-center">
                                    <Link
                                        to={ '/' }
                                        className="px-12 bg-gray-800 hover:bg-primary text-white font-semibold py-3"
                                    >
                                        GO BACK
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default CheckoutCancel;