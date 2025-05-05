import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";

function UpdateBlogContent() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { blogid } = useParams();
  const srno = blogid;
  const [formData, setFormData] = useState({
      postid: "",
      posttitle: "",
      postheading: "",
      author: "",
      content: "",
      featuredimage: "",
      featuredicon: "",
      category: "",
  });

  const [allBlogs, setAllBlogs] = useState([]);
  const callApiBlogContent = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "posts/showAll";
      const response = await axios.get(url, {headers});
      setAllBlogs(response.data);
    } catch (error) {
      toast.error("Couldn't Fetch Blog", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (allBlogs.length === 0) {
      callApiBlogContent();
    }
    const matchingBlog = allBlogs.find(
      (item) => item.srno === parseInt(srno, 10)
    );
    if (matchingBlog) {
      setFormData(matchingBlog);
    }
  }, [srno, allBlogs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, postcontent: newContent });
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const callApiUpdateContent = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "posts/updatepost/" + srno;
      await axios.put(url, formData, {headers});
    } catch (err) {
      toast.error("Blog not updated", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setShowUpdateModal(false);
    if (
      !formData.postid ||
      !formData.category ||
      !formData.postheading ||
      !formData.author ||
      !formData.content

    ) {
      toast.error("Missing required parameters.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    } else {
      try {
        await callApiUpdateContent();
        toast.success("Blog Updated Successfully", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      } catch (error) {
        toast.error("Blog not updated", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
      setTimeout(() => {
        navigate("/blogslist");
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowUpdateModal(true);
  };
// blog image upload 
const [image, setImage] = useState('');

    function handleImage(e) {
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
    }

    function handleApi(postid) {
      const stringPostId = String(postid);
        const formData = new FormData();
        formData.append('blogpic', image);
        const url = `${process.env.REACT_APP_API_URL}images/uploadImage/blogimages/${encodeURIComponent(stringPostId)}`;
        axios.put(url, formData, {
            headers: {
              'accept': 'application/json',
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
          }).then((res) => {
            console.log(res);
            toast.success("Image Uploaded Successfully", {
              position: "top-center",
              autoClose: 1000,
              theme: "colored",
            });
            // fetchImages();
        })
    }
// blog image upload functionality
  return (
    <>
      <div>
        <h1>Update Blog</h1>
        <form onSubmit={handleSubmit} className="form-row">
          <div>
            <label htmlFor="postid">Post Content Id:</label>
            <input
              type="number"
              name="postid"
              id="postid"
              className="form-control"
              value={formData.postid}
              disabled
              placeholder=">Post Content Id"
            />
          </div>
          {/* <div>
            <label htmlFor="posttitle">Post Content Title (URL):</label>
            <input
              type="text"
              name="posttitle"
              id="posttitle"
              className="form-control"
              value={formData.posttitle}
              onChange={handleChange}
              placeholder="Post Content Title"
              maxlength="50"
              disabled
            />
          </div> */}
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="postheading">Post Content Heading:</label>
            <input
              type="text"
              name="postheading"
              id="postheading"
              className="form-control"
              value={formData.postheading}
              onChange={handleChange}
              placeholder="Post Content Heading"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="author">Post Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              className="form-control"
              value={formData.author}
              onChange={handleChange}
              placeholder="Post Author"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <JoditEditor
              ref={editor}
              value={formData.content}
              id="content"
              className="form-control"
              name="content"
              onChange={handleContentChange}
            />
          </div>
          {/* <div>
            <label htmlFor="featuredimage">Featured Image:</label>
            <input
              type="text"
              name="featuredimage"
              id="featuredimage"
              className="form-control"
              value={formData.featuredimage}
              onChange={handleChange}
              placeholder="Featured Image"
              maxlength="20"
              disabled
            />
          </div> */}
          {/* <div>
            <label htmlFor="featuredicon">Featured Icon:</label>
            <input
              type="text"
              name="featuredicon"
              id="featuredicon"
              className="form-control"
              value={formData.featuredicon}
              onChange={handleChange}
              placeholder="Featured Icon"
              maxlength="11"
              disabled
            />
          </div> */}
          
          <button type="submit" className="btn btn-warning">
            Update Blog
          </button>
        </form>
        <div className='alert alert-success'>

<input type='file' onChange={handleImage} className='form-control' />
<button onClick={() => handleApi(formData.postid)} className='btn btn-success' disabled={image.length === 0}>Upload Image</button>
{/* <button onClick={() => handleApi(formData.postid)} className='btn btn-success' disabled={!image}>Upload Image</button> */}


</div>
      </div>
      <ToastContainer />
      <Modal show={showUpdateModal}>
        <Modal.Header>
          <Modal.Title>Blog Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to update blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpdate}
            variant="primary"
            style={{ marginLeft: "10px" }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateBlogContent;