import Logo from '../img/logo.png';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const adminLinks = [
    { title: 'Home', link: '/admin/dashboard' },
    { title: 'Vendors', link: '/admin/vendors' },
    { title: 'Products', link: '/admin/products' },
    { title: 'Orders', link: '/admin/orders' },
];

const vendorLinks = [
    { title: 'Home', link: '/vendor/dashboard' },
    { title: 'Products', link: '/vendor/products' },
    { title: 'Orders', link: '/vendor/orders' },
    { title: 'Others', link: '#' },
];

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [links, setLinks] = useState([]);

    useEffect(() => {
        location.pathname.split('/')[1] === 'admin' ? setLinks(adminLinks) : setLinks(vendorLinks);
    }, [location.pathname]);

    return (
        <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={ Logo } className="h-8" alt="Avari Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Avari</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-gray-800 hover:bg-primary font-medium rounded-lg text-sm px-4 py-2 text-center"
                        onClick={ () => {
                            logout();
                            location.pathname.split('/')[1] === 'admin' ? navigate('/admin/login') : navigate('/vendor/login');
                        } }
                    >
                        Logout
                    </button>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        {
                            links.map((link) => {
                                return (
                                    <li key={ link.link }>
                                        <Link
                                            to={ link.link }
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500 md:p-0"
                                        >
                                            { link.title }
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;