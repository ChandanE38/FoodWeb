import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupStart, signupSuccess, signupFailure } from '../store/authSlice';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth || {});
  const loading = auth?.loading || false;
  const error = auth?.errorMessage || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      console.log('Passwords do not match. Dispatching signupFailure...');
      dispatch(signupFailure('Passwords do not match'));
      return;
    }

    console.log('Signup button clicked. Dispatching signupStart...');
    dispatch(signupStart());

    try {
      const userData = {
        name,
        email,
      };
      
      console.log('Simulating successful signup. Dispatching signupSuccess...', userData);
      dispatch(signupSuccess(userData));
    } catch (err) {
      console.error('Signup failed. Dispatching signupFailure...', err);
      dispatch(signupFailure(err.message));
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log('isAuthenticated is true, navigating to /...');
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-75">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Sign Up - <span className="text-blue-500">Food App</span>
        </h1>

        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name here"
              className="w-full input input-bordered h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Email address</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email here"
              className="w-full input input-bordered h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Password</span>
            </label>
            <input
              type="password"
              placeholder="Create a password here"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password here"
              className="w-full input input-bordered h-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          {error && (
             <div className="text-red-500 text-sm text-center mt-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-block btn-sm mt-4 bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 