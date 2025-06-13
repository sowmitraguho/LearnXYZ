import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../FirebaseAuth/AuthContext';
import Swal from 'sweetalert2';

const Register = () => {

    const { createUser, updateUser } = useContext(AuthContext);
    
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        const { email, password, name, photoURL } = userData;
        //console.log(userData);
        createUser(email, password)
            .then((result) => {
                // Signed up 
                console.log(result);
                if (result?.user?.uid) {
                    Swal.fire({
                        title: "You have been registered successfully!",
                        icon: "success",
                        draggable: true,
                        timer: 2000
                    });
                }
                updateUser({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        // Signed up 
                        const user = result.user;
                        console.log('profile updated!', user);
                    })
                    .catch((error) => {
                        console.log(error.message)
                    });
            })
            .catch((error) => {
                console.log(error.message)
            });

    }


    return (
        <div className='mx-auto'>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content grid grid-cols-1 md:grid-cols-2">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        <p className="py-6">
                            We're excited to have you here. Join us and start exploring new hobbies, connecting with like-minded people, and being part of something amazing!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-full md:max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input w-full" placeholder="Your Name" />
                                    <label className="label">Photo</label>
                                    <input type="text" name='photoURL' className="input w-full" placeholder="Your PhotoURL" />
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input w-full" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" name='password' className="input w-full" placeholder="Password" />
                                    <div><div>Already have an account? <Link to='/login' className="link link-hover text-green-900">Login Now</Link></div></div>
                                    <button type='submit' className="btn btn-neutral mt-4">Sign Up</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;