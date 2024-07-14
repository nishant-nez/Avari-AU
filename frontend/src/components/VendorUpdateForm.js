import { FormikHelpers, useFormik } from "formik";
import { Toast } from "./Toast";
import axios from "../api/axios";
import { useEffect } from "react";
import * as Yup from "yup";

// formik
const vendorSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string(),
    location: Yup.string().required("Location is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    latitude: Yup.number(),
    longitude: Yup.number(),
    phone: Yup.number().required("Phone number is required"),
});

const VendorUpdateForm = ({ closeModal, fetchVendors, vendor }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            location: '',
            state: '',
            country: '',
            latitude: '',
            longitude: '',
            phone: '',
        },
        validationSchema: vendorSchema,
        onSubmit: values => {
            if (values.password !== '') {
                handleUpdateVendor(values);
            } else {
                delete values.password;
                handleUpdateVendor(values);
            }
        }
    });

    useEffect(() => {
        if (vendor) {
            formik.setValues({
                name: vendor.name || '',
                email: vendor.email || '',
                password: '',
                location: vendor.location || '',
                state: vendor.state || '',
                country: vendor.country || '',
                latitude: vendor.latitude || '',
                longitude: vendor.longitude || '',
                phone: vendor.phone || '',
            });
        }
    }, [vendor]);

    const handleUpdateVendor = async (values) => {
        try {
            const response = await axios.put(`/api/vendor/update/${ vendor.id }`, values, { withCredentials: true });
            if (response.status === 201) {
                Toast('success', 'Vendor updated successfully');
                closeModal();
                fetchVendors();
            } else {
                Toast('error', 'Vendor not updated');
            }
        } catch (err) {
            console.log(err);
            Toast('error', err.response.data.message);
        }
    };

    return (
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
            <div className="mb-5 flex gap-4 w-full justify-between items-center">
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
            </div>

            <div className="flex justify-center items-center">
                <button type="submit" className='bg-primary p-3 w-[150px] rounded-lg flex items-center justify-center text-white font-medium cursor-pointer my-3'>
                    Update Vendor
                </button>
            </div>
        </form>
    );
}

export default VendorUpdateForm;