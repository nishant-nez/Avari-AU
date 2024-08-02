import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "../../api/axios";
import { Toast } from "../../components/Toast";
import Modal from 'react-modal';
import * as Yup from "yup";
import ProductRow from "../../components/ProductRow";
import ProductAddForm from "../../components/ProductAddForm";
import ProductUpdateForm from "../../components/ProductUpdateForm";
import { CategoryContext } from "../../contexts/CategoryContext";
import DeleteCard from "../../components/DeleteCard";

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
    { name: "ID", style: "py-3 px-5 text-left border border-b rounded-tl-lg md:rounded-none" },
    { name: "Name", style: "my-3 py-[0.80rem] px-6 text-left lg:border lg:border-b" },
    { name: "Price", style: "py-3 px-5 text-left border border-b" },
    { name: "Stock", style: "py-3 px-5 text-left border border-b" },
    { name: "Unit", style: "py-3 px-5 text-left border border-b" },
    { name: "Description", style: "py-3 px-5 text-left border border-b" },
    { name: "Category", style: "py-3 px-5 text-left border border-b" },
    { name: "Created At", style: "py-3 px-5 text-left border border-b" },
    { name: "Vendor", style: "py-3 px-5 text-left border border-b" },
    { name: "Action", style: "my-3 py-[0.52rem] px-6 text-left lg:border lg:border-b" },
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

const Products = () => {
    const { categories } = useContext(CategoryContext);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedDelProduct, setSelectedDelProduct] = useState({});


    const handleDelete = (id) => {
        openDeleteModal(id);
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product/all', { withCredentials: true });
            setProducts(response.data);
            if (response.status === 200) setProducts(response.data);
            else Toast('error', response.message);
        } catch (err) {
            Toast('error', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
            <Navbar />

            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="container mx-auto flex pt-36 justify-between items-center px-6">
                    <h1 className="text-xl font-semibold">Products</h1>
                    <div className='bg-primary flex p-3 w-[150px] rounded-lg justify-center items-center text-white font-medium cursor-pointer' onClick={ openModal }>
                        Add Product
                    </div>
                </div>

                {/* table  */ }
                <section className="min-h-screen container mx-auto p-6 font-mono">
                    <div className="w-full mb-8 overflow-hidden rounded-lg">
                        <div className="w-full overflow-x-auto">
                            <table className="md:inline-table w-full flex flex-row justify-center overflow-hidden">
                                <thead>
                                    { products.map((product, index) => (
                                        <tr
                                            className={ `bg-[#222E3A]/[6%] flex flex-col md:table-row rounded-l-lg md:rounded-none mb-2 md:mb-0 ${ index === 0 ? "md:flex" : "md:hidden"
                                                }` }
                                            key={ index }
                                        >
                                            { columns.map((item) => {
                                                return <th key={ item.name } className={ item.style }>{ item.name }</th>
                                            }) }
                                        </tr>
                                    )) }
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
                <DeleteCard handleDelete={ handleDeleteProduct } name={ 'Product' } deleteModalIsOpen={ deleteModalIsOpen } closeDeleteModal={ closeDeleteModal } />
            </div>
        </>
    );
}

export default Products;