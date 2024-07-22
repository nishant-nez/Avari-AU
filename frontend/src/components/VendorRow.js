
const VendorRow = ({ vendor, openUpdateModal, handleDelete }) => {
    const handleUpdate = async (id) => {
        openUpdateModal(id);
    }

    return (
        <tr
            className="flex flex-col lg:table-row mb-2 lg:mb-0"
        >
            <td className="border hover:bg-[#222E3A]/[6%] hover:lg:bg-transparent py-3 px-5">
                { vendor.id }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%] hover:lg:bg-transparent py-3 px-5">
                <div className="flex items-center text-sm">
                    <div className="relative w-12 h-12 mr-3 rounded-full lg:block">
                        <img
                            className="object-cover w-full h-full"
                            src={ `${ process.env.REACT_APP_BACKEND_URL }/${ vendor.image }` }
                            alt={ vendor.name }
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                        <p className="font-semibold text-black">{ vendor.name }</p>
                    </div>
                </div>
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:lg:bg-transparent py-3 px-5">
                { vendor.email }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:lg:bg-transparent py-3 px-5">
                { vendor.phone }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:lg:bg-transparent py-3 px-5">
                { vendor.location }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:lg:bg-transparent py-3 px-5">
                { vendor.state }, { vendor.country }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:lg:bg-transparent py-3 px-5 text-center">
                { vendor.latitude }, { vendor.longitude }
            </td>
            <td className="border hover:bg-[#222E3A]/[6%]  hover:lg:bg-transparent py-3 px-5">
                { vendor.created_at.split('T')[0] }
            </td>
            <td className="px-4 py-3 border">
                <div className="h-full flex justify-evenly gap-2">
                    <button
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                        onClick={ () => handleUpdate(vendor.id) }
                    >
                        Update
                    </button>
                    <button type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                        onClick={ () => handleDelete(vendor.id) }
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default VendorRow;