import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CategoryUpdate = () => {
    const { srno } = useParams();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const [categoryList, setCategoryList] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        categoryid: '',
        categoryname: '',
        categorydisplayname: '',
        categorydetails: '',
    });

    useEffect(() => {
        const allApiCategoryData = async () => {
            try {
                const headers = {
                    'x-access-token': localStorage.getItem('jwttoken')
                  };
                const response = await axios.get(url + 'postcategory/showAll', {headers});
                if (response.status === 200) {
                    setCategoryList(response.data);
                }
            } catch (err) {
                setError(err);
            }
        };

        if (categoryList.length === 0) {
            allApiCategoryData();
        }

        const matchSrnoData = categoryList.find((item) => item.srno === parseInt(srno, 10));
        if (matchSrnoData) {
            setFormData(matchSrnoData);
            console.log(matchSrnoData);
        }
    }, [srno, categoryList, url]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                'x-access-token': localStorage.getItem('jwttoken')
              }; 
            const res = await axios.put(url + `postcategory/updates/${srno}`, formData, {headers})
            if (res.status === 200) {
                setTimeout(() => {
                    navigate("/categorylist");
                }, 1000);
            }
            toast.success('Category Updated Successfully', {
                position: "top-center",
                autoClose: 1000,
                theme: "colored",
            })
        } catch (err) {

            toast.error('Category not updated', {
                position: "top-center",
                autoClose: 1000,
                theme: "colored",
            })
        }
    }
    return (
        <>
            <h1>Category Update</h1>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Category ID</label>
                    <input type="text" className="form-control" name="categoryid" value={formData.categoryid} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" className="form-control" name="categoryname" value={formData.categoryname} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Category Display Name</label>
                    <input type="text" className="form-control" name="categorydisplayname" value={formData.categorydisplayname} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Category Details</label>
                    <input type="text" className="form-control" name="categorydetails" value={formData.categorydetails} onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn btn-success w-100 mt-2">
                        Update Category
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};
export default CategoryUpdate;
