import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/logos/main-logo.png';
import { useCurrentUser } from '../hooks/query/user';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useCurrentUser();

    console.log(user)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
        window.location.reload();
    };

    const handleAdminRoute = () => {
        navigate('/admin');
    }

    return (
        <div className='flex justify-between items-center p-2 md:p-4 text-white shadow-md bg-gray-900'>
            <div className='flex items-center'>
                <img src={logo} alt='logo' className='w-10 h-10 mr-3' />
                <h1 className='text-2xl font-semibold'>Movie Booking</h1>
            </div>
            <div className='md:hidden'>
                <button
                    className='text-2xl bg-transparent border-none text-white cursor-pointer'
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <FaBars />
                </button>
            </div>
            <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute top-14 right-4 bg-gray-800 p-4 rounded-lg md:static md:flex-row md:bg-transparent md:p-0 md:rounded-none`}>
                <a href='#' className='block md:inline-block text-lg mb-2 md:mb-0 md:ml-4 hover:text-yellow-300 active:text-yellow-400'>Home</a>
                <a href='#' className='block md:inline-block text-lg mb-2 md:mb-0 md:ml-4 hover:text-yellow-300 active:text-yellow-400'>Profile</a>
                {user?.role === 'admin' && <button 
                    onClick={handleAdminRoute} 
                    className='block md:inline-block text-lg mb-2 md:mb-0 md:ml-4 hover:text-yellow-300 active:text-yellow-400'>
                    Post an event
                </button>}
                <button 
                    onClick={handleLogout} 
                    className='block md:inline-block text-lg mb-2 md:mb-0 md:ml-4 text-red-500 hover:text-red-300 active:text-red-400'>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;
