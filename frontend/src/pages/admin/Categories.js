import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { CategoryContext } from "../../contexts/CategoryContext";
import Modal from 'react-modal';
import axios from "../../api/axios";
import { Toast } from "../../components/Toast";
import CategoryRow from "../../components/CategoryRow";
import CategoryAddForm from "../../components/CategoryAddForm";
import DeleteCard from "../../components/DeleteCard";
import CategoryUpdateForm from "../../components/CategoryUpdateForm";

const columns = [
    { name: "ID", style: "py-3 px-5 text-left border border-b" },
    { name: "Name", style: "py-3 px-5 text-left border border-b" },
    { name: "Total Products", style: "py-3 px-5 text-left border border-b" },
    { name: "Created At", style: "py-3 px-5 text-left border border-b" },
    { name: "Action", style: "my-3 py-[0.50rem] px-6 text-left sm:border sm:border-b" },
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
        width: '50%',
    },
};

Modal.setAppElement('#root');

const Categories = () => {
    const { categories, fetchCategories } = useContext(CategoryContext);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedDelCategory, setSelectedDelCategory] = useState({});
    const [totalProducts, setTotalProducts] = useState({});


    const handleDelete = (id) => {
        openDeleteModal(id);
    };

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

    useEffect(() => {
        const productCounts = {};
        categories.forEach(category => {
            productCounts[category.id] = products.filter(product => product.category.id === category.id).length;
        });
        setTotalProducts(productCounts);
    }, [categories, products]);


    const handleDeleteCategory = async () => {
        try {
            const response = await axios.delete(`/api/category/delete/${ selectedDelCategory.id }`, { withCredentials: true });
            if (response.statusText === 'OK') {
                Toast('success', 'Category Deleted Successfully');
                fetchCategories();
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
        const selCategory = categories.find((category) => category.id === id);
        setSelectedCategory(selCategory);
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
        const del = categories.find((category) => category.id === id);
        setSelectedDelCategory(del);
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
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <div className='bg-primary flex p-3 w-[150px] rounded-lg justify-center items-center text-white font-medium cursor-pointer' onClick={ openModal }>
                        Add Category
                    </div>
                </div>

                {/* table  */ }
                <section className="min-h-screen container mx-auto p-6 font-mono">
                    <div className="w-full mb-8 overflow-hidden rounded-lg">
                        <div className="w-full overflow-x-auto">
                            <table className="sm:inline-table w-full flex flex-row justify-center overflow-hidden">
                                <thead>
                                    { categories.map((category, index) => (
                                        <tr className={ `bg-[#222E3A]/[6%] flex flex-col sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 ${ index === 0 ? "sm:flex" : "sm:hidden"
                                            }` }
                                            key={ index }>
                                            { columns.map((item) => {
                                                return <th key={ item.name } className={ item.style }>{ item.name }</th>
                                            }) }
                                        </tr>
                                    )) }
                                </thead>
                                <tbody className="bg-white">
                                    { categories.map((category) => {
                                        return (
                                            <CategoryRow category={ category } totalProducts={ totalProducts[category.id] || 0 } openUpdateModal={ openUpdateModal } handleDelete={ handleDelete } key={ category.id } />
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
                    contentLabel="Add Category Modal"
                >
                    <button onClick={ closeModal } className="text-right w-full pr-8">X</button>
                    <h2 ref={ (_subtitle) => (subtitle = _subtitle) } className="text-center w-full">Add Category</h2>
                    <CategoryAddForm closeModal={ closeModal } />
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
                    <h2 ref={ (_subtitle) => (updateSubtitle = _subtitle) } className="text-center w-full">Update Category</h2>

                    <CategoryUpdateForm closeModal={ closeUpdateModal } fetchCategories={ fetchCategories } category={ selectedCategory } />
                </Modal>

                {/* delete modal */ }
                <DeleteCard handleDelete={ handleDeleteCategory } name={ 'Category' } deleteModalIsOpen={ deleteModalIsOpen } closeDeleteModal={ closeDeleteModal } />
            </div>

        </>
    );
}

export default Categories;