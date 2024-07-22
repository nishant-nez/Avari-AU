import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "../../api/axios";
import { Toast } from "../../components/Toast";

const AdminDashboard = () => {
    const [minOrder, setMinOrder] = useState('');

    const fetchMinOrder = async () => {
        try {
            const response = await axios.get('/api/default/minorder', { withCredentials: true });
            if (response.status === 200) {
                setMinOrder(response.data.minimum_order);
            }
        } catch (err) {
            console.log('minorder err', err);
            Toast('error', err.response.data.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                '/api/default/minorder/update',
                { value: minOrder },
                { withCredentials: true }
            );
            if (response.status === 201) {
                Toast('success', 'Minimum order updated successfully!')
            }
        } catch (err) {
            console.log('minorder err', err);
            Toast('error', err.response.data.message);
        }
    }

    useEffect(() => {
        fetchMinOrder();
    }, []);

    return (
        <>
            <Navbar />

            <div className='w-full min-h-[100vh] container mx-auto pt-36'>
                <div className="text-center text-lg">
                    Welcome, <span className="font-bold">Admin!</span>
                </div>

                <div className="my-8 text-sm mx-10 flex flex-col justify-start items-center gap-6">
                    <label htmlFor="password" className="block text-black text-left">Minimum Order Value ($)</label>
                    <div className="flex gap-6">
                        <input
                            type="number"
                            id="minorder"
                            className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full"
                            placeholder="Minimum Order"
                            value={ minOrder }
                            required
                            onChange={ (e) => setMinOrder(e.target.value) }
                        />
                        <button
                            className="block text-center text-white bg-gray-800 px-3 duration-300 rounded-lg hover:bg-black" type="submit"
                            onClick={ handleUpdate }
                        >
                            Update
                        </button>
                    </div>
                </div>


            </div>
        </>
    );
}

export default AdminDashboard;