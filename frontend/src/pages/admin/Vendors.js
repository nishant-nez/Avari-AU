import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Toast } from "../../components/Toast";
import Modal from 'react-modal';
import * as Yup from "yup";
import VendorRow from "../../components/VendorRow";
import VendorAddForm from "../../components/VendorAddForm";
import VendorUpdateForm from "../../components/VendorUpdateForm";
import DeleteCard from "../../components/DeleteCard";
import Navbar from "../../components/Navbar";

// formik
const vendorSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
    location: Yup.string().required("Location is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    latitude: Yup.number(),
    longitude: Yup.number(),
    phone: Yup.number().required("Phone number is required"),
});

const columns = [
    { name: "ID" },
    { name: "Name" },
    { name: "Email" },
    { name: "Phone" },
    { name: "Address" },
    { name: "State/Country" },
    { name: "Coordinates" },
    { name: "Created At" },
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
        width: '60%',
        height: '85%',
    },
};

Modal.setAppElement('#root');

const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState({});
    const [selectedDelVendor, setSelectedDelVendor] = useState({});

    const fetchVendors = async () => {
        try {
            const response = await axios.get('/api/vendor/all', { withCredentials: true });
            if (response.statusText === 'OK') {
                setVendors(response.data);
            }
        } catch (err) {
            Toast('error', err);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);


    const handleDelete = (id) => {
        openDeleteModal(id);
    }

    const handleDeleteVendor = async () => {
        try {
            const response = await axios.delete(`/api/vendor/delete/${ selectedDelVendor.id }`, { withCredentials: true });
            if (response.statusText === 'OK') {
                Toast('success', 'Vendor Deleted Successfully');
                fetchVendors();
                closeDeleteModal();
            } else {
                Toast('error', 'Something went wrong');
            }
        } catch (err) {
            Toast('error', err.response.data.message);
        }
    }

    // add modal
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }

    // update modal
    let updateSubtitle;
    const [updateModalIsOpen, setUpdateIsOpen] = useState(false);

    function openUpdateModal(id) {
        const selVendor = vendors.find((vendor) => vendor.id === id);
        setSelectedVendor(selVendor);
        setUpdateIsOpen(true);
    }
    function afterUpdateOpenModal() {
        // references are now sync'd and can be accessed.
        updateSubtitle.style.color = '#f00';
    }
    function closeUpdateModal() {
        setUpdateIsOpen(false);
    }

    // delete modal
    const [deleteModalIsOpen, setDeleteIsOpen] = useState(false);

    function openDeleteModal(id) {
        const delVendor = vendors.find((vendor) => vendor.id === id);
        setSelectedDelVendor(delVendor);
        setDeleteIsOpen(true);
    }
    function closeDeleteModal() {
        setDeleteIsOpen(false);
    }

    return (
        <>
            <Navbar />
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="container mx-auto flex pt-36 justify-between items-center px-6">
                    <h1 className="text-xl font-semibold">Vendors</h1>
                    <div className='bg-primary flex p-3 w-[150px] rounded-lg justify-center items-center text-white font-medium cursor-pointer' onClick={ openModal }>
                        Add Vendor
                    </div>
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
                                    { vendors.map((vendor) => {
                                        return (
                                            <VendorRow vendor={ vendor } openUpdateModal={ openUpdateModal } handleDelete={ handleDelete } key={ vendor.id } />
                                        );
                                    }) }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* add modal */ }
                <Modal
                    isOpen={ modalIsOpen }
                    onAfterOpen={ afterOpenModal }
                    onRequestClose={ closeModal }
                    style={ customStyles }
                    contentLabel="Add Vendor Modal"
                >
                    <button onClick={ closeModal } className="text-right w-full pr-8">X</button>
                    <h2 ref={ (_subtitle) => (subtitle = _subtitle) } className="text-center w-full">Add Vendor</h2>

                    <VendorAddForm vendorSchema={ vendorSchema } closeModal={ closeModal } fetchVendors={ fetchVendors } />
                </Modal>

                {/* update modal */ }
                <Modal
                    isOpen={ updateModalIsOpen }
                    onAfterOpen={ afterUpdateOpenModal }
                    onRequestClose={ closeUpdateModal }
                    style={ customStyles }
                    contentLabel="Update Vendor Modal"
                >
                    <button onClick={ closeUpdateModal } className="text-right w-full pr-8">X</button>
                    <h2 ref={ (_subtitle) => (updateSubtitle = _subtitle) } className="text-center w-full">Update Vendor</h2>

                    <VendorUpdateForm closeModal={ closeUpdateModal } fetchVendors={ fetchVendors } vendor={ selectedVendor } />
                </Modal>

                {/* delete modal */ }
                <DeleteCard handleDelete={ handleDeleteVendor } name={ 'Vendor' } deleteModalIsOpen={ deleteModalIsOpen } closeDeleteModal={ closeDeleteModal } />

            </div>
        </>
    );
}

export default Vendors;