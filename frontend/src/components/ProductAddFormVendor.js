import { useFormik } from "formik";
import { Toast } from "./Toast";
import axios from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProductAddFormVendor = ({ productSchema, closeModal, fetchProducts, categories }) => {
    const { authState } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            unit: '',
            image: null,
            description: '',
            category_id: '',
            stock: ''
        },
        validationSchema: productSchema,
        onSubmit: values => {
            handleAddProduct(values);
        }
    });

    const handleAddProduct = async (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        formData.append('vendor_id', authState.user.id)

        try {
            const response = await axios.post('/api/product/add', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                Toast('success', 'Product added successfully');
                closeModal();
                fetchProducts();
            } else {
                Toast('error', 'Product not added');
            }
        } catch (err) {
            Toast('error', err.response.data.message);
        }
    }

    return (
        <form onSubmit={ formik.handleSubmit } className="px-8">
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
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
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                <input
                    type="number" id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Price"
                    required
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.price }
                />
            </div>
            <div className="mb-5">
                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                <input
                    type="number" id="stock"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Stock"
                    required
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.stock }
                />
            </div>
            <div className="mb-5">
                <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900">Unit</label>
                <select
                    id="unit"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.unit }
                >
                    <option value="" label="Select unit" />
                    <option value="kg">kg</option>
                    <option value="pcs">pcs</option>
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                <input
                    type="file" id="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={ (e) => formik.setFieldValue('image', e.currentTarget.files[0]) }
                />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Description"
                    required
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.description }
                />
            </div>
            <div className="mb-5">
                <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <select
                    id="category_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    value={ formik.values.category_id }
                >
                    <option value="" label="Select category" />
                    { categories && categories.map((category) => (
                        <option key={ category.id } value={ category.id }>{ category.name }</option>
                    )) }
                </select>
            </div>
            <div className="flex justify-center items-center">
                <button type="submit" className='bg-primary p-3 w-[150px] rounded-lg flex items-center justify-center text-white font-medium cursor-pointer my-3'>
                    Add Product
                </button>
            </div>
        </form>
    );
}

export default ProductAddFormVendor;