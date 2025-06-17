import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../FirebaseAuth/AuthContext';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import registerLottie from '../../assets/Lotties/register.json'
import { Helmet } from 'react-helmet';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log('after google login', result);
                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

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
        form.reset();
    }


    return (
        <>
        <Helmet>
            <title>Register</title>
        </Helmet>
        <div className='mx-auto'>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        <p className="py-6">
                            We're excited to have you here. Join us and start exploring new hobbies, connecting with like-minded people, and being part of something amazing!
                        </p>
                        <Lottie style={{ width: '350px' }} loop={true} animationData={registerLottie} />
                    </div>
                    <div className="card bg-base-100 w-full max-w-full md:max-w-sm justify-self-center shadow-2xl border border-green-500">
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
                                    {/* Google */}
                                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                        Login with Google
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Register;