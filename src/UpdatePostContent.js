import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";

function UpdatePostContent() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { srno } = useParams();
  const [formData, setFormData] = useState({
    postcontentid: "",
    postcontentname: "",
    postcontenttitle: "",
    postcontent: "",
    postcontenttype: "",
    postid: "",
    postlocationid: "",
    isactive: "",
    srno: "",
  });

  const [allPosts, setAllPosts] = useState([]);
  const callApiPostContent = async () => {
    try {
      const headers = {
      'x.access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "postcontent/showAll";
      const response = await axios.get(url, {headers});
      setAllPosts(response.data);
    } catch (error) {
      toast.error("Couldn't Fetch Post", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (allPosts.length === 0) {
      callApiPostContent();
    }
    const matchingPost = allPosts.find(
      (item) => item.srno === parseInt(srno, 10)
    );
    if (matchingPost) {
      setFormData(matchingPost);
    }
  }, [srno, allPosts]);

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
        'x-access-token ': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "postcontent/updates/" + srno;
      await axios.put(url, formData, {headers});
    } catch (err) {
      toast.error("Post not updated", {
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
      !formData.postcontentid ||
      !formData.postcontentname ||
      !formData.postcontenttitle ||
      !formData.postcontent ||
      !formData.postcontenttype ||
      !formData.postid ||
      !formData.postlocationid
    ) {
      toast.error("Missing required parameters.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    } else {
      try {
        await callApiUpdateContent();
        toast.success("Post Updated Successfully", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      } catch (error) {
        toast.error("Post not updated", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
      setTimeout(() => {
        navigate("/postlist");
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowUpdateModal(true);
  };

  return (
    <>
      <div>
        <h1>Update Post</h1>
        <form onSubmit={handleSubmit} className="form-row">
          <div>
            <label htmlFor="srno">Sr No:</label>
            <input
              type="number"
              name="srno"
              id="srno"
              className="form-control"
              value={formData.srno}
              readOnly
              placeholder="srno"
            />
          </div>
          <div>
            <label htmlFor="postcontentid">Post Content Id:</label>
            <input
              type="text"
              name="postcontentid"
              id="postcontentid"
              className="form-control"
              value={formData.postcontentid}
              onChange={handleChange}
              placeholder="Post Content"
              maxlength="50"
            />
          </div>
          <div>
            <label htmlFor="postcontentname">Post Content Name:</label>
            <input
              type="text"
              name="postcontentname"
              id="postcontentname"
              className="form-control"
              value={formData.postcontentname}
              onChange={handleChange}
              placeholder="Post Content Name"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="postcontenttitle">Post Content Title:</label>
            <input
              type="text"
              name="postcontenttitle"
              id="postcontenttitle"
              className="form-control"
              value={formData.postcontenttitle}
              onChange={handleChange}
              placeholder="Post Content Title"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="postcontent">Post Content:</label>
            <JoditEditor
              ref={editor}
              value={formData.postcontent}
              id="postcontent"
              className="form-control"
              name="postcontent"
              onChange={handleContentChange}
            />
          </div>
          <div>
            <label htmlFor="postcontenttype">Post Content Type:</label>
            <input
              type="text"
              name="postcontenttype"
              id="postcontenttype"
              className="form-control"
              value={formData.postcontenttype}
              onChange={handleChange}
              placeholder="Post Content Type"
              maxlength="20"
            />
          </div>
          <div>
            <label htmlFor="postid">Post Id:</label>
            <input
              type="number"
              name="postid"
              id="postid"
              className="form-control"
              value={formData.postid}
              onChange={handleChange}
              placeholder="Post Id"
              maxlength="11"
            />
          </div>
          <div>
            <label htmlFor="postlocationid">Post Location Id:</label>
            <input
              type="number"
              name="postlocationid"
              id="postlocationid"
              className="form-control"
              value={formData.postlocationid}
              onChange={handleChange}
              placeholder="Post Location Id"
              maxlength="11"
            />
          </div>
          <div>
            <label htmlFor="isactive">Is Active:</label>
            <input
              type="number"
              name="isactive"
              id="isactive"
              className="form-control"
              value={formData.isactive}
              onChange={handleChange}
              placeholder="Is Active"
              maxlength="11"
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Update Post
          </button>
        </form>
      </div>
      <ToastContainer />
      <Modal show={showUpdateModal}>
        <Modal.Header>
          <Modal.Title>Post Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to update post?</Modal.Body>
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

export default UpdatePostContent;
