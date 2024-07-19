import { useFormik } from "formik";
import { Toast } from "./Toast";
import axios from "../api/axios";
import Modal from 'react-modal'
import MapSelector from "./MapSelector";
import { useState } from "react";

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
        height: '83%',
    },
};

Modal.setAppElement('#root');

const VendorAddForm = ({ vendorSchema, closeModal, fetchVendors }) => {
    // map modal
    let subtitle;
    const [mapModalIsOpen, setMapModalIsOpen] = useState(false);

    function openMapModal() {
        setMapModalIsOpen(true);
    }
    function afterMapOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeMapModal() {
        setMapModalIsOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            location: '',
            state: '',
            country: '',
            latitude: undefined,
            longitude: undefined,
            phone: '',
        },
        validationSchema: vendorSchema,
        onSubmit: values => {
            handleAddVendor(values);
        }
    });

    const handleAddVendor = async (values) => {
        try {
            const response = await axios.post('/api/vendor/register', values, { withCredentials: true });
            if (response.status === 201) {
                Toast('success', 'Vendor added successfully');
                closeModal();
                fetchVendors();
            } else {
                Toast('error', 'Vendor not added');
            }
        } catch (err) {
            Toast('error', err.response.data.message);
        }
    }

    // location picker
    const [selectedCoordinates, setSelectedCoordinates] = useState({ lat: -25.478554, lng: 134.113335 });

    const handlePickLocation = () => {
        formik.setFieldValue('latitude', selectedCoordinates.lat);
        formik.setFieldValue('longitude', selectedCoordinates.lng);
        closeMapModal();
    };


    return (
        <>
            <form onSubmit={ formik.handleSubmit } className="px-8">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Vendor Name</label>
                    <input
                        type="text" id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Name"
                        required
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        value={ formik.values.name }
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Vendor Email</label>
                    <input
                        type="email" id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="email@example.com"
                        required
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        value={ formik.values.email }
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Vendor Phone Number</label>
                    <input
                        type="number" id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Phone Number"
                        required
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        value={ formik.values.phone }
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Vendor Password</label>
                    <input
                        type="password" id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Password"
                        required
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        value={ formik.values.password }
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Vendor Address</label>
                    <input
                        type="text" id="location"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Location"
                        required
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        value={ formik.values.location }
                    />
                </div>
                <div className="mb-5 flex gap-4 w-full justify-between items-center">
                    <div className="w-full">
                        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                        <input
                            type="text" id="country"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Country"
                            required
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                            value={ formik.values.country }
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                        <input
                            type="text" id="state"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="State"
                            required
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                            value={ formik.values.state }
                        />
                    </div>
                </div>

                <div className="mb-5 flex gap-4 w-full items-center">
                    <div className="w-full">
                        <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900">Latitude</label>
                        <input
                            type="number" id="latitude"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Latitude"
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                            value={ formik.values.latitude }
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900">Longitude</label>
                        <input
                            type="number" id="longitude"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Longitude"
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                            value={ formik.values.longitude }
                        />
                    </div>

                    {/* location picker  */ }
                    <div className="bg-primary flex-grow self-end rounded-lg">
                        <button
                            type="button"
                            onClick={ openMapModal }
                            className="bg-primary p-3 rounded-lg flex items-center justify-center text-white font-medium cursor-pointer h-[100%]">
                            Pick
                        </button>
                    </div>
                </div>


                <div className="flex justify-center items-center">
                    <button type="submit" className='bg-primary p-3 rounded-lg flex items-center justify-center text-white font-medium cursor-pointer my-3'>
                        Add Vendor
                    </button>
                </div>
            </form>

            {/* map modal */ }
            <Modal
                isOpen={ mapModalIsOpen }
                onAfterOpen={ afterMapOpenModal }
                onRequestClose={ closeMapModal }
                style={ customStyles }
                contentLabel="Location Picker Modal"
            >
                <button onClick={ closeMapModal } className="text-right w-full pr-8">X</button>
                <h2 ref={ (_subtitle) => (subtitle = _subtitle) } className="text-center w-full">Pick Location for Vendor</h2>

                <MapSelector selectedCoordinates={ selectedCoordinates } handlePickLocation={ handlePickLocation } setSelectedCoordinates={ setSelectedCoordinates } />
            </Modal>
        </>
    );
}

export default VendorAddForm;