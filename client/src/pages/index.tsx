import React, { useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextPage } from 'next';
import axios from 'axios';

const Home: NextPage = () => {

  const [incomeAmount, setIncomeAmount] = useState<string | number>(0);
  const [expenseAmount, setExpenseAmount] = useState<string | number>(0);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [incomeTitle, setIncomeTitle] = useState('');
  const [incomeDesc, setIncomeDesc] = useState('');

  const addIncome = async () => {
    try {
      axios.post('http://localhost:5000/incomes')
      
    } catch (err) {
      
    }
  }

  const addExpense = async () => {

  }

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container-fluid bg-primary text-center text-white py-3'>
        <h1 className='display-6 mb-2 fw-bold'>Expense Tracker</h1>
      </div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 mb-4'>
            <div className='card'>
              <div className='card-header bg-success text-white fw-bold'>
                Income
              </div>
              <div className='card-body'>
                <form onSubmit={addIncome}>
                  <div className='mb-3'>
                    <label htmlFor='incomeTitle' className='form-label'>
                      Title
                    </label>
                    <input
                    value={incomeTitle}
                    onChange={e => setIncomeTitle(e.target.value)}
                      type='text'
                      className='form-control'
                      id='incomeTitle'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='incomeAmount' className='form-label'>
                      Amount
                    </label>
                    <input
                    value={incomeAmount}
                    onChange={e => setIncomeAmount(e.target.value)}
                      type='text'
                      className='form-control'
                      id='incomeAmount'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='desc' className='form-label'>
                      Description
                    </label>
                    <input
                    value={incomeDesc}
                    onChange={e => setIncomeDesc(e.target.value)}
                      type='text'
                      className='form-control'
                      id='desc'
                    />
                  </div>
                  <button type='submit' className='btn btn-success fw-bold'>
                    Add Income
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='card'>
              <div className='card-header bg-danger text-white fw-bold'>
                Expense
              </div>
              <div className='card-body'>
                <form onSubmit={addExpense}>
                  <div className='mb-3'>
                    <label htmlFor='expenseTitle' className='form-label'>
                      Title
                    </label>
                    <input
                    value={expenseTitle}
                    onChange={e => setExpenseTitle(e.target.value)}
                      type='text'
                      className='form-control'
                      id='expenseTitle'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='expenseAmount' className='form-label'>
                      Amount
                    </label>
                    <input
                    value={expenseAmount}
                    onChange={e => setExpenseAmount(e.target.value)}
                      type='text'
                      className='form-control'
                      id='expenseAmount'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='desc' className='form-label'>
                      Description
                    </label>
                    <input
                    value={expenseDesc}
                    onChange={e => setExpenseDesc(e.target.value)}
                      type='text'
                      className='form-control'
                      id='desc'
                    />
                  </div>
                  <button type='submit' className='btn btn-danger fw-bold'>
                    Add Expense
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='card mt-5 mb-4'>
          <div className='card-header bg-primary text-white fw-bold'>
            Transaction History
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Salary</td>
                    <td>$3000</td>
                    <td>
                      Description
                    </td>
                    <td>2023-06-18</td>
                  </tr>
                  <tr>
                    <td>Rent</td>
                    <td>-$1000</td>
                    <td>Description</td>
                    <td>2023-06-17</td>
                  </tr>
                  <tr>
                    <td>Rent</td>
                    <td>-$1000</td>
                    <td>Description</td>
                    <td>2023-06-17</td>
                  </tr>
                  <tr>
                    <td>Rent</td>
                    <td>-$1000</td>
                    <td>Description</td>
                    <td>2023-06-17</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
