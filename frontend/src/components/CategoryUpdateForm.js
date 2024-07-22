import { useState } from "react";
import axios from "../api/axios";
import { Toast } from "./Toast";

const CategoryUpdateForm = ({ closeModal, fetchCategories, category }) => {
    const [name, setName] = useState(category.name);

    const handleUpdateCategory = async () => {
        try {
            const response = await axios.put(`/api/category/update/${ category.id }`, { name: name }, { withCredentials: true });
            if (response.status === 201) {
                Toast('success', 'Category updated successfully');
                closeModal();
                fetchCategories();
            } else {
                Toast('error', 'Category not updated');
            }
        } catch (err) {
            console.log(err);
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
                    <button type="button" onClick={ handleUpdateCategory } className='bg-primary p-3 rounded-lg flex items-center justify-center text-white font-medium cursor-pointer my-3'>
                        Update Category
                    </button>
                </div>
            </div>
        </>
    );
}

export default CategoryUpdateForm;