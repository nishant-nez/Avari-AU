
const VendorRow = ({ vendor, openUpdateModal, handleDelete }) => {
    const handleUpdate = async (id) => {
        openUpdateModal(id);
    }

    return (
        <tr className="text-gray-700" key={ vendor.id }>
            <td className="px-4 py-3 text-ms font-semibold border">{ vendor.id }</td>
            <td className="px-4 py-3 border">
                <div className="flex items-center text-sm">
                    <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                            className="object-cover w-full h-full rounded-full"
                            src={ `${ process.env.REACT_APP_BACKEND_URL }/${ vendor.image }` }
                            alt={ vendor.name }
                            loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                        <p className="font-semibold text-black">{ vendor.name }</p>
                        {/* <p className="text-xs text-gray-600">Developer</p> */ }
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm border">{ vendor.email }</td>
            <td className="px-4 py-3 text-sm border">{ vendor.phone }</td>
            <td className="px-4 py-3 text-sm border">{ vendor.location }</td>
            <td className="px-4 py-3 text-sm border">{ vendor.state }, { vendor.country }</td>
            <td className="px-4 py-3 text-sm border text-center">{ vendor.latitude }, { vendor.longitude }</td>
            <td className="px-4 py-3 text-sm border">{ vendor.created_at.split('T')[0] }</td>
            <td className="px-4 py-3 border">
                <div className="h-full flex justify-evenly">
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