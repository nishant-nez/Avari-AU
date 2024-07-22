
const CategoryRow = ({ category, totalProducts, openUpdateModal, handleDelete }) => {
    const handleUpdate = async (id) => {
        openUpdateModal(id);
    };

    return (
        <>
            <tr className="text-gray-700">
                <td className="px-4 py-3 text-ms font-semibold border">{ category.id }</td>
                <td className="px-4 py-3 text-sm border">{ category.name }</td>
                <td className="px-4 py-3 text-sm border">{ totalProducts }</td>
                <td className="px-4 py-3 text-sm border">{ category.created_at.split('T')[0] }</td>
                <td className="px-4 py-3 border">
                    <div className="h-full flex gap-4 justify-center">
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