
const australianStates = [
    { short: 'NSW', full: 'New South Wales' },
    { short: 'VIC', full: 'Victoria' },
    { short: 'QLD', full: 'Queensland' },
    { short: 'SA', full: 'South Australia' },
    { short: 'WA', full: 'Western Australia' },
    { short: 'TAS', full: 'Tasmania' },
    { short: 'ACT', full: 'Australian Capital Territory' },
    { short: 'NT', full: 'Northern Territory' }
];

function getStateFullName(short) {
    const state = australianStates.find(state => state.short === short);
    return state ? state.full : 'Unknown state';
}

const OrderRow = ({ order, openModal, name }) => {
    const statusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'to be delivered':
                return 'font-bold text-yellow-400'
            case 'delivered':
                return 'font-bold text-green-400'
            default:
                return 'font-bold text-red-400'
        }
    }

    return (
        <tr className="text-gray-700" key={ order.id }>
            <td className="px-4 py-3 text-ms font-semibold border">{ order.id }</td>
            { name === 'admin' ? <td className="px-4 py-3 text-sm border">$ { order.amount_subtotal }</td> : '' }
            { name === 'admin' ? <td className="px-4 py-3 text-sm border">$ { order.shipping_cost }</td> : '' }
            <td className="px-4 py-3 text-sm border">
                { order.address_line_1 } <br />
                { order.address_line_2 } <br />
                { order.city } <br />
                { getStateFullName(order.state) } { order.postal_code } <br />
                { order.country === 'AU' ? 'Australia' : order.country }
            </td>
            <td className="px-4 py-3 text-sm border text-center">{ order.name }</td>
            <td className="px-4 py-3 text-sm border text-center">{ order.email }</td>
            <td className="px-4 py-3 text-sm border text-center">{ order.phone }</td>
            <td className="px-4 py-3 text-sm border text-center">
                { order.products.map(product => {
                    return <div key={ product.id } className="flex items-center gap-2 mb-2">
                        { product.quantity }
                        <span>x</span>
                        <img src={ `${ process.env.REACT_APP_BACKEND_URL }/${ product.image }` } alt={ product.name } className="h-8 w-8 rounded-full" />
                        { product.name } <br />
                    </div>
                }) }
            </td>
            <td className="px-4 py-3 text-sm border">{ new Date(order.created_at).toISOString().slice(0, 16).replace('T', ' ') }</td>
            <td className="px-4 py-3 text-sm border text-center">
                <span className={ statusClass(order.status) }>
                    { order.status }
                </span>
            </td>
            <td className="px-4 py-3 border">
                <div className="h-full flex justify-evenly">
                    <button
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                        onClick={ () => openModal(order.id) }
                    >
                        Update Status
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default OrderRow;