import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';
import { Menu, X } from 'lucide-react'; // You can use Heroicons or Lucide

const Navbar = () => {
    const { loading, logout } = useLogout();
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <nav className="bg-cyan-100 text-slate-700 px-4 py-3 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">

                <Link to="/dashboard" className="font-semibold text-xl text-gray-700 hover:text-gray-500">
                    store<span className='text-xl text-sky-500 font-bold hover:text-sky-700'>App</span>
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 items-center">
                    {authUser ? (
                        <>
                            <div className="p-2 ml-2 text-sm font-medium bg-gray-100  rounded-sm  w-fit capitalize">
                                Hello, {authUser.name} ({authUser.role})
                            </div>
                            {authUser.role === 'ADMIN' && (
                                <>
                                    <Link to="/admin/users" className="font-semibold hover:underline">Users</Link>
                                    <Link to="/admin/stores" className="font-semibold hover:underline">Stores</Link>
                                    <Link to="/admin/create-user" className="font-semibold hover:underline">AddUser</Link>
                                    <Link to="/admin/create-store" className="font-semibold hover:underline">AddStore</Link>
                                </>
                            )}
                            {/* <span className='text-sm px-1 py-1 '>
                                {authUser.name}</span> */}
                            <Link to="/change-password" onClick={toggleMenu} className='font-semibold hover:underline'>Password</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-yellow-700 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                disabled={loading}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="font-medium px-4 py-1 rounded-md  bg-blue-300 hover:bg-blue-400">Login</Link>
                            <Link to="/signup" className="font-medium px-4 py-1 rounded-md  bg-blue-300 hover:bg-blue-400">Signup</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-4 mt-3 px-2">
                    {authUser ? (

                        <>
                            <span className="text-sm bg-white px-3 py-1 rounded border font-mono capitalize">
                                Hello, {authUser.name} ({authUser.role})
                            </span>
                            {/* <span className="capitalize text-sm bg-gray-100 px-2 py-1 rounded border w-fit">
                                Role: {authUser.role}
                            </span> */}
                            {authUser.role === 'ADMIN' && (
                                <>
                                    <Link to="/admin/users" onClick={toggleMenu} className='font-semibold'>Users</Link>
                                    <Link to="/admin/stores" onClick={toggleMenu} className='font-semibold'>Stores</Link>
                                    <Link to="/admin/create-user" onClick={toggleMenu} className='font-semibold'>Create User</Link>
                                    <Link to="/admin/create-store" onClick={toggleMenu} className='font-semibold'>Add Store</Link>
                                </>
                            )}
                            <Link to="/change-password" onClick={toggleMenu} className='font-semibold hover:text-gray-500'>Change Pass</Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={toggleMenu}>Login</Link>
                            <Link to="/signup" onClick={toggleMenu}>Signup</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
