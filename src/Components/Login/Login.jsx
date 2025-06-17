import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../FirebaseAuth/AuthContext';
import Lottie from 'lottie-react';
import signInLottie from '../../assets/Lotties/signIn.json'
import { Helmet } from 'react-helmet';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { googleSignIn, signIn } = use(AuthContext);

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

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        const { email, password } = userData;
        console.log(email, password);
        signIn(email, password)
            .then((result) => {
                // Signed in 
                //console.log(result.user.uid);
                if (result.user.uid) {
                    Swal.fire({
                        title: "Login SuccessFull!",
                        icon: "success",
                        draggable: true
                    });
                }
                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.log(error.message);
                Swal.fire({
                        title: "Wrong Email or Password!",
                        icon: "warning",
                        draggable: true
                    });
            });
    }



    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content grid grid-cols-1 lg:grid-cols-2">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign In Now!</h1>
                        <p className="py-6">
                            We're excited to have you here. Join us and start exploring new hobbies, connecting with like-minded people, and being part of something amazing!
                        </p>
                        <Lottie style={{ width: '350px' }} loop={true} animationData={signInLottie} />
                    </div>
                    <div className="card bg-base-100 w-full mx-auto max-w-full lg:max-w-sm shrink-0 shadow-2xl justify-self-center border border-green-500">
                        <div className="card-body">
                            <form onSubmit={handleSignIn}>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input w-full" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" name='password' className="input w-full" placeholder="Password" />
                                    <div>Do not have an account yet? <Link to='/register' className="link link-hover text-green-900">Register Now</Link></div>
                                    <button type='submit' className="btn btn-neutral mt-4">Sign In</button>

                                </fieldset>
                            </form>
                            {/* Google */}
                            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;