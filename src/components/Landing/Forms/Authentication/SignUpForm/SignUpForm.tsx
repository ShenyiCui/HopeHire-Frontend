import React, { useState } from 'react';
import { routes } from '@/constants/routes';
import { useApi } from '@/api/ApiHandler';
import AuthService, { UserSignUpData } from '@/api/Authentication/AuthService';
import Logo from '@/assets/icon.png';
import { useHistory } from 'react-router';
import SingleSignOn from '@components/Landing/Forms/SingleSignOn';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [signUp] = useApi((data: UserSignUpData) => AuthService.register(data), true, true, true);
  const history = useHistory();

  const handleSubmit = async () => {
    const res = await signUp({ email, password, passwordConfirmation });
    if (res && res.data) {
      console.log(res);
      history.push(routes.authentication.login);
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src={Logo} alt='HopeHire' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>Sign up for an account</h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' action='#' method='POST'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='mt-1'>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1'>
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password Confirmation
              </label>
              <div className='mt-1'>
                <input
                  onChange={e => setPasswordConfirmation(e.target.value)}
                  value={passwordConfirmation}
                  id='passwordConfirmation'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                onClick={e => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Sign up
              </button>
            </div>
          </form>

          <SingleSignOn />

          <div className='mt-4'>
            <div className='relative'>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-2 text-gray-500'>
                  Have an account?{' '}
                  <a className='text-indigo-600 hover:text-indigo-700 hover:underline' href={routes.authentication.login}>
                    Log in here
                  </a>
                  !
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
