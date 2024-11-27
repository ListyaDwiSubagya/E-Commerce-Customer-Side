import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice'; 
import { assets } from '../assets/assets';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()

    // Menggunakan useSelector untuk mengambil data dari Redux
    const { isLoggedIn } = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.cartItems);
    
    const cartCount = Object.values(cartItems).reduce((total, item) => 
        total + Object.values(item).reduce((sum, quantity) => sum + quantity, 0), 0);

    const dispatch = useDispatch();

    const handleLogout = () => {
        // Hapus data dari localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        navigate('/login')
        
        // Dispatch action logout ke Redux
        dispatch(logout());
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to={'/'}>
                <img src={assets.logo} className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative '>
                    <Link to='/login'>
                        <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    </Link>
                    {/* Dropdown menu */}
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        {isLoggedIn ? (
                            <>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p>
                            </>
                        ) : (
                            <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-black'>Login</p>
                        )}
                        </div>
                    </div>
                </div>
                {/* Cart icon hanya ditampilkan jika pengguna sudah login */}
                {isLoggedIn && (
                    <Link to="/cart" className="relative">
                        <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart Icon" />
                        {cartCount > 0 && (
                            <p className="absolute right-[5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                                {cartCount}
                            </p>
                        )}
                    </Link>
                )}
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Sidebar menu for small screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
