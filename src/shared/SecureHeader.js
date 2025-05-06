import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataAppContext } from '../DataContext';

const SecureHeader = () => {
  const localContext = useContext(DataAppContext);
    const navigate = useNavigate();

    const { appstate, logout_user } = localContext;
    const { loginstatus } = appstate;

    const studentpages = ['/myStatus', '/class', '/assignment'];

    const checkLoginandRedirect = () => {
        const token = localStorage.getItem('jwttoken');
        if (!token) {
            navigate('/login')
        }
    }

    const checkUserTypeandRedirect = () => {
        const usertype = localStorage.getItem('usertype');
        if (usertype === 'student') {
            let pageurl = window.location.pathname;
            if(studentpages.indexOf(pageurl) === -1) {
                navigate('/accessdenied')
            }
        }
    }

    useEffect(() => {
        checkLoginandRedirect();
        checkUserTypeandRedirect();
    }, [])

  return (
    <div className='row secureheader'>
      <div className='col-6 bg-info bg-opacity-10 py-1'>
        <h3>Points & Rewards System</h3>
      </div>
      <div className='col-6 bg-info bg-opacity-10 py-1'>
        <div className='text-right d-flex justify-content-end'>
          {
            loginstatus && (
              <button className='btn btn-outline-danger' onClick={logout_user}>Logout</button>
            )
          }
          {
            (!loginstatus && (window.location.pathname !== '/')) && (<Link className='btn btn-outline-success' to="/login">Login</Link>)
          }

        </div>
      </div>
    </div>
  )
}

export default SecureHeader
