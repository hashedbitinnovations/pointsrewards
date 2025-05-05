import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteCategoryModal from './DeleteCategoryModal';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const response = await axios.get(url + 'postcategory/showAll', {headers});
      setCategoryList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };
  const handleDeleteCategory = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      await axios.delete(url+`postcategory/delete/${categoryToDelete.srno}`, {headers});
      setShowDeleteModal(false);
      const updatedCategoryList = categoryList.filter((item) => item.srno !== categoryToDelete.srno);
      setCategoryList(updatedCategoryList);
    } catch (error) {
      console.error(error);
      setShowDeleteModal(false);
    }
  };
  return (
    <>
      <h1>Category List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CategoryId</th>
            <th>Category Name</th>
            <th>CategoryDisplayName</th>
            <th>Category Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList
            .filter(item => item.isactive === 1)
            .map((item) => (
              <tr key={item.srno}>
                <td>{item.categoryid}</td>
                <td>{item.categoryname}</td>
                <td>{item.categorydisplayname}</td>
                <td>{item.categorydetails}</td>
                <td>
                  <Link to={`/categoryupdate/${item.srno}`} className='btn btn-warning'>
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleOpenDeleteModal(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DeleteCategoryModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeleteCategory(categoryToDelete.srno)}
        categoryToDelete={categoryToDelete}
      />
      <div className="d-grid gap-2">
        <Link to='/addueserid' className="btn btn-primary" type="button">
          Add New CategoryId
        </Link>
      </div>
    </>
  );
};
export default CategoryList;
