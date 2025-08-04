import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

function Login() {
    try {

        const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
        const [ password, setPassword ] = useState('');
    
        const signIn = async () => {
            if(!email || !password) {
                alert("Please fill in all fields");
                return;
            }
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);
            alert(`SignIn Succesfull`);
            console.log("User signed in:", user.user);
            localStorage.setItem('user', JSON.stringify(user)); // Store user info in localStorage
            setEmail('');
            setPassword('');
            navigate('/'); // Redirect to home or another page after login
            } catch (error) {
                console.error("Error signing up:", error);
            }
    
        }
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signIn}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg cursor-pointer hover:bg-yellow-600 transition-all duration-300'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
}

export default Login