import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice'; 

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Simulasi data pengguna default untuk demo login
  const defaultEmail = 'johndoe@example.com'; 
  const defaultPassword = '12345'; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ambil data users dari API
    const response = await fetch('https://fakestoreapi.com/users');
    const users = await response.json();
    const user = users.find(u => u.email === email);

    // Periksa apakah pengguna valid dan password sesuai
    if (user && user.password === password) {
      const token = 'fake-jwt-token'; // Simulasi token
      dispatch(login({ token, userData: user })); // Simpan data pengguna di Redux
      localStorage.setItem('token', token); // Simpan token di localStorage
      navigate('/'); // Redirect ke halaman utama setelah login
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Login' ? '' : <input required type="text" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name'/>}
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800 ' 
        placeholder='Email'
      />
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800 ' 
        placeholder='Password'
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p className='cursor-pointer' onClick={() => setCurrentState('Sign up')}>Create account</p>
        ) : (
          <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>
        )}
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
