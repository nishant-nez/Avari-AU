
const CategoryRow = ({ category, totalProducts, openUpdateModal, handleDelete }) => {
    const handleUpdate = async (id) => {
        openUpdateModal(id);
    };

    return (
        <>
            <tr
                className="flex flex-col sm:table-row mb-2 sm:mb-0"
            >
                <td className="border hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent py-3 px-5">
                    { category.id }
                </td>
                <td className="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                    { category.name }
                </td>
                <td className="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                    { totalProducts }
                </td>
                <td className="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                    { category.created_at.split('T')[0] }
                </td>
                <td className="px-4 py-3 border">
                    <div className="h-full flex justify-center gap-2">
                        <button
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                            onClick={ () => handleUpdate(category.id) }
                        >
                            Update
                        </button>
                        <button type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                            onClick={ () => handleDelete(category.id) }
                        >
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default CategoryRow;