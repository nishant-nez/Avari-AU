import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axios";
import { Toast } from "../../components/Toast";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/admin/dashboard';

    const { authState, login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (authState.role === 'admin') {
        return <Navigate to='/admin/dashboard' replace />;
    }

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/admin/login', { username, password }, { withCredentials: true });
            if (response.status === 200) {
                login(response.data.user);
                Toast('success', response.data.message);
                setIsLoading(false);
                navigate(from, { replace: true });
            }
        } catch (err) {
            Toast('error', err.response.data.message)
            setIsLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className='h-screen w-full flex items-center justify-center'>
                <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-28 shadow-xl">
                    <div className="py-8 px-8 rounded-xl">
                        <h1 className="font-medium text-2xl mt-3 text-center">Admin Login</h1>
                        <div className="mt-6">
                            <div className="my-5 text-sm">
                                <label htmlFor="username" className="block text-black">Username</label>
                                <input
                                    type="text"
                                    autoFocus id="username"
                                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                    placeholder="Username"
                                    value={ username }
                                    required
                                    onChange={ (e) => setUsername(e.target.value) }
                                />
                            </div>
                            <div className="my-5 text-sm">
                                <label htmlFor="password" className="block text-black">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                    placeholder="Password"
                                    value={ password }
                                    required
                                    onChange={ (e) => setPassword(e.target.value) }
                                />
                                <div className="flex justify-end mt-2 text-xs text-gray-600">
                                    <a href="#">Forgot Password?</a>
                                </div>
                            </div>

                            <button
                                className={ `block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full ${ isLoading ? 'cursor-wait' : '' }` }
                                disabled={ isLoading }
                                type="submit"
                                onClick={ handleLogin }
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;