import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { useRouter } from 'next/router';
config()

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/register', {
      name: name,
      email: email,
      password: password
    })

    localStorage.setItem('token', res.data.token)

    router.replace('/')
    
  };

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token) {
      router.replace('/')
    }
  })

  return (
    <>
      <Head>
        <title>Expense Tracker | Register</title>
      </Head>
      <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
        <div
          className='card shadow col-md-6 col-lg-3'
          style={{ maxWidth: '800px', borderRadius: '10px' }}
        >
          <div className='card-body p-4'>
            <h2 className='card-title text-center mb-4 fw-bold'>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label fw-bold'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label fw-bold'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label fw-bold'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete='off'
                />
              </div>
              <button
                type='submit'
                className='btn btn-success w-100 fw-bold mt-3'
              >
                Register
              </button>
              <div className='text-center'>
                <p className='text-muted mt-4 fw-bold'>
                  Already have an account?{' '}
                  <Link href='/login' className='link-primary'>
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
