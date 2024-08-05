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
    { name: "ID", style: "py-3 px-5 text-left border border-b rounded-tl-lg lg:rounded-none" },
    { name: "Name", style: "my-3 py-[0.80rem] px-6 text-left lg:border lg:border-b" },
    { name: "Email", style: "py-3 px-5 text-left border border-b" },
    { name: "Phone", style: "py-3 px-5 text-left border border-b" },
    { name: "Address", style: "py-3 px-5 text-left border border-b" },
    { name: "State/Country", style: "py-3 px-5 text-left border border-b" },
    { name: "Coordinates", style: "py-3 px-5 text-left border border-b" },
    { name: "Created At", style: "py-3 px-5 text-left border border-b" },
    { name: "Action", style: "my-3 py-[0.51rem] px-6 text-left lg:border lg:border-b" },
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
            if (response.status === 200) {
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
            if (response.status === 200) {
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
                <div className="container mx-auto flex pt-36 justify-between items-center px-4">
                    <h1 className="text-xl font-semibold">Vendors</h1>
                    <div className='bg-primary flex p-3 w-[150px] rounded-lg justify-center items-center text-white font-medium cursor-pointer' onClick={ openModal }>
                        Add Vendor
                    </div>
                </div>

                {/* table  */ }
                <section className="min-h-screen container mx-auto py-6 font-mono">
                    <div className="w-full mb-8 overflow-hidden rounded-lg">
                        <div className="w-full overflow-x-auto">
                            <table className="lg:inline-table w-full flex flex-row justify-center overflow-hidden">
                                <thead>
                                    { vendors.map((vendor, index) => (
                                        <tr className={ `bg-[#222E3A]/[6%] flex flex-col lg:table-row rounded-l-lg lg:rounded-none mb-2 lg:mb-0 ${ index === 0 ? "lg:flex" : "lg:hidden"
                                            }` }
                                            key={ index }>
                                            { columns.map((item) => {
                                                return <th key={ item.name } className={ item.style }>{ item.name }</th>
                                            }) }
                                        </tr>
                                    )) }
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