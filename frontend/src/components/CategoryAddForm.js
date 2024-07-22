import { Toast } from "./Toast";
import axios from "../api/axios";
import { useContext, useState } from "react";
import { CategoryContext } from "../contexts/CategoryContext";


const CategoryAddForm = ({ closeModal }) => {
    const { fetchCategories } = useContext(CategoryContext);
    const [name, setName] = useState('');

    const handleAddCategory = async () => {
        try {
            const response = await axios.post('/api/category/add', { name: name }, { withCredentials: true });
            if (response.status === 201) {
                Toast('success', 'Category added successfully');
                closeModal();
                fetchCategories();
            } else {
                Toast('error', 'Category not added');
            }
        } catch (err) {
            Toast('error', err.response.data.message);
        }
    };

    return (
        <>
            <div className="px-8 my-6">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Category Name</label>
                    <input
                        type="text" id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Name"
                        required
                        onChange={ (e) => setName(e.target.value) }
                        value={ name }
                    />
                </div>

                <div className="flex justify-center items-center">
                    <button type="button" onClick={ handleAddCategory } className='bg-primary p-3 rounded-lg flex items-center justify-center text-white font-medium cursor-pointer my-3'>
                        Add Category
                    </button>
                </div>
            </div>
        </>
    );
}

export default CategoryAddForm;