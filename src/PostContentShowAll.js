import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeletePostContentModal from './DeletePostContentModal';

function PostContentShowAll() {
 

    const [postList, setPostList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
  
    const callApiPostContent = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + 'postcontent/showAll';
      const response = await axios.get(url, {headers});
      setPostList(response.data);
    }
    catch (error) {
      console.log(error);
    }
   }
   useEffect(() => {
     callApiPostContent();
   }, [])

   const handleOpenDeleteModal = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };
  const handleDeletePost = async (postToDeleteSrno) => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + `postcontent/delete/${postToDeleteSrno}`;
      await axios.delete(url, {headers});
      setShowDeleteModal(false);
      const updatedPostList = postList.filter((item) => item.srno !== postToDeleteSrno);
      setPostList(updatedPostList);
    } catch (error) {
      console.error(error);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <h1>Posts List</h1>
      <div className="d-grid gap-2">
        <Link to='/createpost' className="btn btn-primary" type="button">
          Create New Post
        </Link>
      </div>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Post Content Id</th>
            <th>Post Content Name</th>
            <th>Post Content Tilte</th>
            <th>Post Content</th>  
            <th>Post Content Type</th>
            <th>Post Id</th>
            <th>Post Location Id</th> 
            <th>is Active</th>
            {/* <th>Created By</th>
            <th>Created On</th>
            <th>Updated By</th>
            <th>Updated On</th>   */}
            <th>Edit Action</th>
            <th>Delete Action</th>

           
          </tr>
        </thead>
        <tbody>
          {postList && postList
            .filter(item => item.isactive === 1)
            .map((item, index) => (
            <tr key={index + item.exam_id}>
              <td>{item.srno}</td>
              <td>{item.postcontentid}</td>
              <td>{item.postcontentname}</td>
              <td>{item.postcontenttitle}</td>
              <td>{item.postcontent}</td>
              <td>{item.postcontenttype}</td>
              <td>{item.postid}</td>
              <td>{item.postlocationid}</td>
              <td>{item.isactive}</td>
              {/* <td>{item.createdby}</td>
              <td>{item.createdon}</td>
              <td>{item.updatedby}</td>
              <td>{item.updatedon}</td> */}
              
              <td>
                <Link to={`/postupdate/${item.srno}`} className='btn btn-warning'>Edit</Link>
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
      <br></br>
      <DeletePostContentModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeletePost(postToDelete.srno)}
        postToDelete={postToDelete}
      />
      
    </div>
  );
}

export default PostContentShowAll;
