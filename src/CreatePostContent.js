import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePostContent = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [postcontentid, setPostContentId] = useState("");
  const [postcontentname, setPostContentName] = useState("");
  const [postcontenttitle, setPostContentTitle] = useState("");
  const [postcontent, setPostContent] = useState("");
  const [postcontenttype, setPostContentType] = useState("");
  const [postid, setPostId] = useState("");
  const [postlocationid, setPostLocationId] = useState("");
  const [isactive, setIsActive] = useState(1);


  const url = process.env.REACT_APP_API_URL;

  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault();
    setShowCreateModal(false)
    const postData = {
      postcontentid,
      postcontentname,
      postcontenttitle,
      postcontent,
      postcontenttype,
      postid,
      postlocationid,
      isactive,
    };

    if (
      !postcontentid ||
      !postcontentname ||
      !postcontenttitle ||
      !postcontent ||
      !postcontenttype ||
      !postid ||
      !postlocationid
    ) {
      toast.error("Missing required parameters.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    } else {
      try {
        const headers = {
          'x-access-token': localStorage.getItem('jwttoken')
        };
        const response = await axios.post(
          url + "postcontent/addNewData",
          postData, {headers}
        );

        if (response.status === 201) {
          toast.success("Post created successfully", {
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/postlist");
          }, 2000);
        } else {
          toast.error("Post was not added", {
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
          });
        }
      } catch (err) {
        toast.error("An error occurred while creating the post.", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
    }
  }
  const handleSubmit = async (e) => {
   e.preventDefault()
   setShowCreateModal(true)
  };

  return (
    <>
      <h1>Post Add</h1>
      <form onSubmit={handleSubmit} className="form-row">
        <div>
          <label htmlFor="postcontentid">Post Content Id:</label>
          <input
            type="text"
            value={postcontentid}
            name="postcontentid"
            id="postcontentid"
            className="form-control"
            onChange={(e) => setPostContentId(e.target.value)}
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="postcontentname">Post Content Name:</label>

          <input
            type="text"
            value={postcontentname}
            name="postcontentname"
            id="postcontentname"
            className="form-control"
            onChange={(e) => setPostContentName(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="postcontenttitle">Post Content Title:</label>

          <input
            type="text"
            value={postcontenttitle}
            name="postcontenttitle"
            id="postcontenttitle"
            className="form-control"
            onChange={(e) => setPostContentTitle(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="postcontent">Post Content:</label>
          <JoditEditor
            ref={editor}
            value={postcontent}
            name="postcontent"
            id="postcontent"
            className="form-control"
            onChange={(newContent) => setPostContent(newContent)}
          />
        </div>
        <div>
          <label htmlFor="postcontenttype">Post Content Type:</label>
          <input
            type="text"
            value={postcontenttype}
            name="postcontenttype"
            id="postcontenttype"
            className="form-control"
            onChange={(e) => setPostContentType(e.target.value)}
            maxLength={20}
          />
        </div>
        <div>
          <label htmlFor="postid">Post Id:</label>
          <input
            type="number"
            value={postid}
            name="postid"
            id="postid"
            className="form-control"
            onChange={(e) => setPostId(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="postlocationid">Post Location Id:</label>
          <input
            type="number"
            value={postlocationid}
            name="postlocationid"
            id="postlocationid"
            className="form-control"
            onChange={(e) => setPostLocationId(e.target.value)}
            maxLength={11}
          />
        </div>
        <td>
          <button type="submit" className="btn btn-success">
            Add Post
          </button>
        </td>
      </form>
      <ToastContainer />
      <Modal show={showCreateModal} >
        <Modal.Header>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sure you want to add post?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleCreate} variant="primary" style={{ marginLeft: '10px' }}>
            Add Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePostContent;