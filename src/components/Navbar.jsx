import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    console.log("user is ", user);

    const logout = () =>  {
        localStorage.clear('user');
        localStorage.removeItem('user');
        navigate("/login"); // Reload the page to reflect changes
    }
    return (
        <div className='main lg:flex md:flex flex-wrap justify-between items-center 
     px-4 bg-[#2a056f] py-4 shadow-md'>
            <div className="left">
                <div className="logo font-bold text-2xl text-white text-center">E-NoteBook</div>
            </div>
            <div className="right">
                <ul className='flex space-x-4 text-white justify-center items-center'>
                    <Link to={'/'}>
                        <li className='cursor-pointer'>Home</li>
                    </Link>
                    
                    {user ? (
                        <div onClick={logout}>
                        <li className='cursor-pointer'>Logout</li>
                    </div>
                    ) : (
                        <>
                        <Link to={'/login'}>
                        <li className='cursor-pointer'>Login</li>
                    </Link>
                    <Link to={'/signup'}>
                        <li className='cursor-pointer'>Signup</li>
                    </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar