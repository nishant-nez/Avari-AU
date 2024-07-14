import { useContext, useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav";
import axios from "../../api/axios";
import { Toast } from "../../components/Toast";
import Modal from 'react-modal';
import * as Yup from "yup";
import ProductRow from "../../components/ProductRow";
import ProductAddForm from "../../components/ProductAddForm";
import ProductUpdateForm from "../../components/ProductUpdateForm";
import { ProductContext } from "../../contexts/ProductContext";
import { CategoryContext } from "../../contexts/CategoryContext";

// formik
const productSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    unit: Yup.string().required("Unit is required"),
    image: Yup.mixed().required("Image is required"),
    description: Yup.string().required("Description is required"),
    category_id: Yup.number().required("Category id is required"),
});

const columns = [
    { name: "ID" },
    { name: "Name" },
    { name: "Description" },
    { name: "Price" },
    { name: "Unit" },
    { name: "Category" },
    { name: "Created At" },
    { name: "Vendor" },
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
const deleteStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const Products = () => {
    const { categories } = useContext(CategoryContext);
    const { products, fetchProducts } = useContext(ProductContext);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedDelProduct, setSelectedDelProduct] = useState({});


    const handleDelete = (id) => {
        openDeleteModal(id);
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(`/api/product/delete/${ selectedDelProduct.id }`, { withCredentials: true });
            if (response.statusText === 'OK') {
                Toast('success', 'Product Deleted Successfully');
                fetchProducts();
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
        const selProduct = products.find((product) => product.id === id);
        setSelectedProduct(selProduct);
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
    let deleteSubtitle;
    const [deleteModalIsOpen, setDeleteIsOpen] = useState(false);

    function openDeleteModal(id) {
        const delProduct = products.find((product) => product.id === id);
        setSelectedDelProduct(delProduct);
        setDeleteIsOpen(true);
    }
    function closeDeleteModal() {
        setDeleteIsOpen(false);
    }

    return (
        <>
            <AdminNav />

            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="container mx-auto flex pt-36 justify-between items-center px-6">
                    <h1 className="text-xl font-semibold">Products</h1>
                    <div className='bg-primary flex p-3 w-[150px] rounded-lg justify-center items-center text-white font-medium cursor-pointer' onClick={ openModal }>
                        Add Product
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
                                    { products.map((product) => {
                                        return (
                                            <ProductRow product={ product } openUpdateModal={ openUpdateModal } handleDelete={ handleDelete } key={ product.id } />
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
                    contentLabel="Add Product Modal"
                >
                    <button onClick={ closeModal } className="text-right w-full pr-8">X</button>
                    <h2 ref={ (_subtitle) => (subtitle = _subtitle) } className="text-center w-full">Add Product</h2>
                    <ProductAddForm productSchema={ productSchema } closeModal={ closeModal } fetchProducts={ fetchProducts } categories={ categories } />
                </Modal>

                {/* update modal */ }
                <Modal
                    isOpen={ updateModalIsOpen }
                    onAfterOpen={ afterUpdateOpenModal }
                    onRequestClose={ closeUpdateModal }
                    style={ customStyles }
                    contentLabel="Update Product Modal"
                >
                    <button onClick={ closeUpdateModal } className="text-right w-full pr-8">X</button>
                    <h2 ref={ (_subtitle) => (updateSubtitle = _subtitle) } className="text-center w-full">Update Product</h2>

                    <ProductUpdateForm closeModal={ closeUpdateModal } productSchema={ productSchema } fetchProducts={ fetchProducts } product={ selectedProduct } categories={ categories } />
                </Modal>

                {/* delete modal */ }
                <Modal
                    isOpen={ deleteModalIsOpen }
                    onRequestClose={ closeDeleteModal }
                    style={ deleteStyles }
                    contentLabel="Delete Vendor Modal"
                >
                    <button onClick={ closeDeleteModal } className="text-right w-full pr-8">X</button>

                    <div className="relative p-4 text-center bg-white rounded-lg">
                        <svg className="text-gray-400 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        <p className="mb-4 text-gray-500 ">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                data-modal-toggle="deleteModal"
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                                onClick={ closeDeleteModal }
                            >
                                No, cancel
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                                onClick={ handleDeleteProduct }
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Products;