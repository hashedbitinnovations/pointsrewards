import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import axios from 'axios';
// import loadImage from '../images/giphy.gif';
import { DataAppContext } from '../DataContext';

const Login = (props) => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const localContext = useContext(DataAppContext);

    const navigate = useNavigate();

    const login = async (values) => {
        setLoader(true);
        console.log(values);
        const url = process.env.REACT_APP_API_URL + 'users/login';
        //const url = 'http://jscmsapi.codeacetechnologies.com/users/adduser';

        // const response = await fetch(url, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(values),
        // });
        try {
            const response = await axios.post(url, values);
            console.log(response.data);
            setLoader(false);

            const { token, userId, userType } = response.data;

            if (response.status === 202) {
                localStorage.setItem('jwttoken', token);
                localStorage.setItem('userid', userId);
                localStorage.setItem('usertype', userType);
                setLoginStatus(true);
                localContext.login_user();
                if (userType === 'admin') {
                    navigate('/dashboardadmin');
                }
                else {
                    navigate('/dashboard');
                }

            }
            else {
                setError(true);
                return {
                    error: true
                }
            }
        }
        catch (err) {
            setError(true);
            setLoader(false);
            return {
                error: true
            }
        }

    }

    useEffect(() => {
        console.log('dashboard')
        //navigate('/dashboard');
    }, [window.location.href])

    return (
        <>
            {/* {(window.location.pathname !== '/login') && 
            (<div className='row'>
                <div className='col-12 bg-success-subtle text-center'>
                    <Link className='btn btn-primary' onClick={() => props.setfn(false)}>Back to Register</Link>
                </div>
            </div>)} */}

            <div className='row maincontent'>
                <div className='col-4'>

                </div>
                <div className='col-4'>
                    {/* <h2 className='text-center'>Welcome to HashedBit Innovations</h2> */}

                    <Formik
                        initialValues={{ username: "", password: "" }}
                        onSubmit={async (values, { resetForm }) => {
                            //console.log(values);
                            const { error } = await login(values);
                            if (!error) {
                                resetForm();
                            };
                        }}
                    >
                        <Form className='login-form' autocomplete="off">
                            <br></br>
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label">Username</label>
                                <div className='col-sm-7'>
                                    <Field name="username" type="text" className="form-control" placeholder="" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label">Password</label>
                                <div className='col-sm-7'>
                                    <Field name="password" type="password" className="form-control" placeholder="" required />
                                </div>
                            </div>
                            <br></br>
                            <button type="submit" className='btn btn-primary'>Login</button>
                            <br></br>
                        </Form>
                    </Formik>

                    {
                        error && (
                            <div className="alert alert-danger" role="alert">
                                Please, try after sometime or try again with correct values.
                            </div>
                        )
                    }
                </div>
                <div className='col-4'>

                </div>
                {loader && (
                    <div className="loading">
                        Loading...
                        {/* <img src={loadImage} alt="Loader" /> */}
                    </div>
                )
                }
            </div>
        </>
    )
}

export default Login
