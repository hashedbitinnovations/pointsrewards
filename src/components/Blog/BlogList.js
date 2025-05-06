import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteBlogModal from './DeleteBlogModal';

function BlogList() {

  const [postList, setPostList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const usertype = localStorage.getItem('usertype');

  const callApiPostContent = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + 'posts/showAll';
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
      //const url = process.env.REACT_APP_API_URL + `postcontent/delete/${postToDeleteSrno}`;
      const url = process.env.REACT_APP_API_URL + `posts/delete/${postToDeleteSrno}`;
      await axios.delete(url, {headers});
      setShowDeleteModal(false);
      const updatedPostList = postList.filter((item) => item.srno !== postToDeleteSrno);
      setPostList(updatedPostList);
    } catch (error) {
      console.error(error);
      setShowDeleteModal(false);
    }
  };

  const activatePost = async (postToDeleteSrno) => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      //const url = process.env.REACT_APP_API_URL + `postcontent/delete/${postToDeleteSrno}`;
      const url = process.env.REACT_APP_API_URL + `posts/activate/${postToDeleteSrno}`;
      await axios.put(url, {headers});
      callApiPostContent();
    } catch (error) {
      console.error(error);
    }
  };

  const deactivatePost = async (postToDeleteSrno) => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      //const url = process.env.REACT_APP_API_URL + `postcontent/delete/${postToDeleteSrno}`;
      const url = process.env.REACT_APP_API_URL + `posts/deactivate/${postToDeleteSrno}`;
      await axios.put(url, {headers});
      callApiPostContent();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Posts List</h1>
      <div className="d-grid gap-2">
        <Link to='/blogcreate' className="btn btn-primary" type="button">
          Create New Post
        </Link>
      </div>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Post Id</th>
            <th>Post Title</th>
            <th>Post Heading</th>
            {/* <th>Post Content</th>   */}
            {/* <th>Post Featured Image</th>
            <th>Post Featured Icon</th> */}
            <th>Post Category</th>
            <th>Author</th>
            <th>is Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList && postList.map((item, index) => (
            <tr key={index + item.exam_id}>
              <td>{item.srno}</td>
              <td>{item.postid}</td>
              <td>{item.posttitle}</td>
              <td>{item.postheading}</td>
              {/* <td>
              <div dangerouslySetInnerHTML={{ __html: item.content}} />
                </td> */}
              {/* <td>{item.featuredimage}</td>
              <td>{item.featuredicon}</td> */}
              <td>{item.category}</td>
              <td>{item.author}</td>
              <td>{item.isactive}</td>

              <td>
                <Link to={`/blogview/${item.srno}`} className='btn btn-primary'>View</Link>
              </td>
              {(usertype === 'admin') && <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleOpenDeleteModal(item)}
                >
                  Delete
                </button>
              </td>}
              {(usertype === 'admin') && <td>
                <button
                  className="btn btn-success"
                  onClick={() => activatePost(item.srno)}
                >
                  Activate
                </button>
              </td>}
              {(usertype === 'admin') && <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deactivatePost(item.srno)}
                >
                  DeActivate
                </button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <DeleteBlogModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeletePost(postToDelete.srno)}
        postToDelete={postToDelete}
      />

    </div>
  );
}

export default BlogList;
