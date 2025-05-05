import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePageContent = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [contentid, setContentId] = useState("");
  const [contentname, setContentName] = useState("");
  const [contenttitle, setContentTitle] = useState("");
  const [content, setContent] = useState("");
  const [contenttype, setContentType] = useState("");
  const [pageid, setPageId] = useState("");
  const [pagelocationid, setPageLocationId] = useState("");
  const [isactive, setIsActive] = useState(1);

  const url = process.env.REACT_APP_API_URL;

  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault();
    setShowCreateModal(false)
    const pageData = {
      contentid,
      contentname,
      contenttitle,
      content,
      contenttype,
      pageid,
      pagelocationid,
    };

    if (
      !contentid ||
      !contentname ||
      !contenttitle ||
      !content ||
      !contenttype ||
      !pageid ||
      !pagelocationid
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
          url + "pagecontent/addNewData",
          pageData, {headers}
        );

        if (response.status === 201) {
          toast.success("Page created successfully", {
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/pagecontentlist");
          }, 2000);
        } else {
          toast.error("Page was not added", {
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
          });
        }
      } catch (err) {
        toast.error("An error occurred while creating the page.", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
    }
  }
  const handleSubmit = async (e) => {
   e.preventDefault();
   setShowCreateModal(true);
  };

  return (
    <>
      <h1>Page Add</h1>
      <form onSubmit={handleSubmit} className="form-row">
        <div>
          <label htmlFor="contentid">Page Content Id:</label>
          <input
            type="text"
            value={contentid}
            name="contentid"
            id="contentid"
            className="form-control"
            onChange={(e) => setContentId(e.target.value)}
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="contentname">Page Content Name:</label>

          <input
            type="text"
            value={contentname}
            name="contentname"
            id="contentname"
            className="form-control"
            onChange={(e) => setContentName(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="contenttitle">Page Content Title:</label>

          <input
            type="text"
            value={contenttitle}
            name="contenttitle"
            id="contenttitle"
            className="form-control"
            onChange={(e) => setContentTitle(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="content">Page Content:</label>
          <JoditEditor
            ref={editor}
            value={content}
            name="content"
            id="content"
            className="form-control"
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div>
          <label htmlFor="contenttype">Page Content Type:</label>
          <input
            type="text"
            value={contenttype}
            name="contenttype"
            id="contenttype"
            className="form-control"
            onChange={(e) => setContentType(e.target.value)}
            maxLength={20}
          />
        </div>
        <div>
          <label htmlFor="pageid">Page Id:</label>
          <input
            type="number"
            value={pageid}
            name="pageid"
            id="pageid"
            className="form-control"
            onChange={(e) => setPageId(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="pagelocationid">Page Location Id:</label>
          <input
            type="number"
            value={pagelocationid}
            name="pagelocationid"
            id="pagelocationid"
            className="form-control"
            onChange={(e) => setPageLocationId(e.target.value)}
            maxLength={11}
          />
        </div>
        <td>
          <button type="submit" className="btn btn-success">
            Add Page
          </button>
        </td>
      </form>
      <ToastContainer />
      <Modal show={showCreateModal} >
        <Modal.Header>
          <Modal.Title>Add New Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sure you want to add page?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleCreate} variant="primary" style={{ marginLeft: '10px' }}>
            Add Page
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePageContent;