import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoryAdd = () => {
    const navigate = useNavigate();
    const [categoryid, setCategoryid] = useState('');
    const [categoryname, setCategoryName] = useState('');
    const [categorydisplayname, setCategoryDisplayName] = useState('');
    const [categorydetails, setCategoryDetails] = useState('');
    const [isactive, setIsActive] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [parameter, setParameter] = useState('');

    const url = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData={categoryid,categoryname,categorydisplayname,categorydetails,isactive};

        if (!categoryid || !categoryname || !categorydisplayname || !categorydetails) {
            setParameter('Missing required parameters.');
        } else {
            try {
                const headers = {
                    'x-access-token': localStorage.getItem('jwttoken')
                  };
                const response = await axios.post(url+'postcategory/addNewData', postData, {headers});

                if (response.status === 201) {
                    setSuccess('Category created successfully');
                    setTimeout(() => {
                        navigate('/categorylist');
                    }, 1000);
                } else {
                    setError('Category was not added');
                }
            } catch (err) {
                console.error('Error creating category:', err);
                setError('An error occurred while creating the category.');
            }
        }
    };

    return (
        <>
            <h1>Category Add</h1>
            <form onSubmit={handleSubmit} className="form-row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Category Display Name</th>
                            <th>Category Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="col">
                                    <input
                                        type="text"
                                        value={categoryid}
                                        className="form-control"
                                        onChange={(e) => setCategoryid(e.target.value)}
                                        maxLength={20}
                                    />
                                </div>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={categoryname}
                                    className="form-control"
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    maxLength={50}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={categorydisplayname}
                                    className="form-control"
                                    onChange={(e) => setCategoryDisplayName(e.target.value)}
                                    maxLength={50}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={categorydetails}
                                    className="form-control"
                                    onChange={(e) => setCategoryDetails(e.target.value)}
                                    maxLength={100}
                                />
                            </td>
                            <td>
                                <button type="submit" className="btn btn-success">
                                    Add Category
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {success && <div className="alert alert-success mt-2">{success}</div>}
            {parameter && <div className="alert alert-danger mt-2">{parameter}</div>}
        </>
    );
};

export default CategoryAdd;
