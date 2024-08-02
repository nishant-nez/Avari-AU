
const ProductRowVendor = ({ product, openUpdateModal, handleDelete }) => {
    const handleUpdate = async (id) => {
        openUpdateModal(id);
    }

    return (
        <tr className="flex flex-col md:table-row mb-2 md:mb-0">
            <td className="border hover:bg-[#222E3A]/[6%] hover:md:bg-transparent py-3 px-5">
                { product.id }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%] hover:md:bg-transparent py-3 px-5">
                <div className="flex items-center text-sm">
                    <div className="relative w-12 h-12 mr-3 rounded-full md:block">
                        <img
                            className="object-cover w-full h-full"
                            src={ `${ process.env.REACT_APP_BACKEND_URL }/${ product.image }` }
                            alt={ product.name }
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                        <p className="font-semibold text-black">{ product.name }</p>
                        {/* <p className="text-xs text-gray-600">Developer</p> */ }
                    </div>
                </div>
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:md:bg-transparent py-3 px-5">
                { product.price }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:md:bg-transparent py-3 px-5">
                { product.stock }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:md:bg-transparent py-3 px-5">
                { product.unit }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:md:bg-transparent py-3 px-5">
                { product.description }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:md:bg-transparent py-3 px-5">
                { product.category.name }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:md:bg-transparent py-3 px-5">
                { product.created_at.split('T')[0] }
            </td>
            <td className="px-4 py-3 border">
                <div className="h-full flex justify-evenly gap-2">
                    <button
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                        onClick={ () => handleUpdate(product.id) }
                    >
                        Update
                    </button>
                    <button type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                        onClick={ () => handleDelete(product.id) }
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ProductRowVendor;