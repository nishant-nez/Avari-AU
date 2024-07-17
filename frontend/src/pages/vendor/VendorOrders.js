import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { Toast } from "../../components/Toast";
import Modal from 'react-modal';
import OrderRow from "../../components/OrderRow";
import { AuthContext } from "../../contexts/AuthContext";

const columns = [
    { name: "ID" },
    { name: "Delivery Address" },
    { name: "Name" },
    { name: "Email" },
    { name: "Phone" },
    { name: "Products" },
    { name: "Order Placed" },
    { name: "Status" },
    { name: "Action" },
];

// modal
const customStyles = {
    content: {
        top: '53%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '40%',
    },
};


Modal.setAppElement('#root');

const VendorOrders = () => {
    const { authState } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [status, setStatus] = useState('to be delivered');

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/order/all', { withCredentials: true });
            if (response.statusText === 'OK') {
                setOrders(response.data);
            }
        } catch (err) {
            Toast('error', err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (orders) {
            const filtOrders = orders.map(order => {
                const filteredProducts = order.products.filter(product => product.vendor.id === authState.user.id);
                if (filteredProducts.length > 0) {
                    return { ...order, products: filteredProducts };
                }
                return null;
            }).filter(order => order !== null);
            setFilteredOrders(filtOrders);
        }
    }, [orders, authState]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/order/update/${ selectedOrder.id }`, { status: status }, { withCredentials: true });
            if (response.status === 201) {
                Toast('success', 'Order status updated successfully');
                fetchOrders();
            } else {
                Toast('error', 'Something went wrong');
            }
        } catch (err) {
            Toast('error', err.response.data.message);
        }
        closeModal();
    }


    // update modal
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(id) {
        const selOrder = orders.find((order) => order.id === id);
        setSelectedOrder(selOrder);
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Navbar />

            <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className="container mx-auto flex pt-36 justify-between items-center px-6">
                    <h1 className="text-xl font-semibold text-center">Orders of my products</h1>
                </div>

                {/* table  */ }
                <section className="h-screen container mx-auto p-6 font-mono">
                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b">
                                        { columns.map((item) => {
                                            return <th key={ item.name } className="px-4 py-3">{ item.name }</th>
                                        }) }
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    { filteredOrders.map((order) => {
                                        return (
                                            <OrderRow order={ order } key={ order.id } openModal={ openModal } name='vendor' />
                                        );
                                    }) }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* update modal  */ }
                <Modal
                    isOpen={ modalIsOpen }
                    // onAfterOpen={ afterOpenModal }
                    onRequestClose={ closeModal }
                    style={ customStyles }
                    contentLabel="Update Order Status Modal"
                >
                    <button onClick={ closeModal } className="text-right w-full pr-8">X</button>
                    <h2 className="text-center w-full my-6 text-xl font-bold">Update Order Status</h2>

                    <div>
                        <form onSubmit={ handleSubmit } className="mx-auto p-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Delivery Status</label>
                            <select
                                value={ status }
                                onChange={ (e) => setStatus(e.target.value) }
                                className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            >
                                <option value="To be delivered">To be delivered</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <div className="w-full flex justify-center mt-8">
                                <button
                                    type="submit"
                                    className="px-6 py-3 text-lg text-white bg-primary rounded-md focus:outline-none"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>

            </div>
        </>
    );
}

export default VendorOrders;