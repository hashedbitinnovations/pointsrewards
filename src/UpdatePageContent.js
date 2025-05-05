import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";

function UpdatePageContent() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { srno } = useParams();
  const [formData, setFormData] = useState({
    contentid: "",
    contentname: "",
    contenttitle: "",
    content: "",
    contenttype: "",
    pageid: "",
    pagelocationid: "",
  });

  const [allPageContent, setAllPageContent] = useState([]);
  const callApiPageContent = async () => {
    try {
      const headers = {
       'x-access-token' : localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "pagecontent/showall";
      const response = await axios.get(url, {headers});
      setAllPageContent(response.data);
    } catch (error) {
      toast.error("Couldn't Fetch Page", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (allPageContent.length === 0) {
      callApiPageContent();
    }
    const matchingPageContent = allPageContent.find(
      (item) => item.srno === parseInt(srno, 10)
    );
    if (matchingPageContent) {
      setFormData(matchingPageContent);
    }
  }, [srno, allPageContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const callApiUpdateContent = async () => {
    try {
      const headers = {
        'x-access-token' : localStorage.getItem('jwttoken')
      }
      const url = process.env.REACT_APP_API_URL + "pagecontent/updates/" + srno;
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
    setShowUpdateModal(false)
    if (
      !formData.contentid ||
      !formData.contentname ||
      !formData.contenttitle ||
      !formData.content ||
      !formData.contenttype ||
      !formData.pageid ||
      !formData.pagelocationid
    ) {
      toast.error("Missing required parameters.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    } else {try {
        await callApiUpdateContent();
        toast.success("PageContent Updated Successfully", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      } catch (error) {
        toast.error("PageContent not updated", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
      setTimeout(() => {
        navigate("/pagecontentlist");
      }, 2000);
    }
  }
  const handleSubmit = async (e) => {
   e.preventDefault()
   setShowUpdateModal(true)
  };

  return (
    <>
      <div>
        <h1>Update Page Content</h1>
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
            <label htmlFor="contentid">PageContent Id:</label>
            <input
              type="text"
              name="contentid"
              id="contentid"
              className="form-control"
              value={formData.contentid}
              onChange={handleChange}
              placeholder="PageContent"
              maxlength="50"
            />
          </div>
          <div>
            <label htmlFor="contentname">PageContent Name:</label>
            <input
              type="text"
              name="contentname"
              id="contentname"
              className="form-control"
              value={formData.contentname}
              onChange={handleChange}
              placeholder="PageContent Name"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="contenttitle">PageContent Title:</label>
            <input
              type="text"
              name="contenttitle"
              id="contenttitle"
              className="form-control"
              value={formData.contenttitle}
              onChange={handleChange}
              placeholder="PageContent Title"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="content">PageContent:</label>
            <JoditEditor
              ref={editor}
              value={formData.content}
              id="content"
              className="form-control"
              name="content"
              onChange={handleContentChange}
            />
          </div>
          <div>
            <label htmlFor="contenttype">PageContent Type:</label>
            <input
              type="text"
              name="contenttype"
              id="contenttype"
              className="form-control"
              value={formData.contenttype}
              onChange={handleChange}
              placeholder="PageContent Type"
              maxlength="20"
            />
          </div>
          <div>
            <label htmlFor="pageid">PageContent Id:</label>
            <input
              type="number"
              name="pageid"
              id="pageid"
              className="form-control"
              value={formData.pageid}
              onChange={handleChange}
              placeholder="PageContent Id"
              maxlength="11"
            />
          </div>
          <div>
            <label htmlFor="pagelocationid">PageContent Location Id:</label>
            <input
              type="number"
              name="pagelocationid"
              id="pagelocationid"
              className="form-control"
              value={formData.pagelocationid}
              onChange={handleChange}
              placeholder="PageContent Location Id"
              maxlength="11"
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Update Page Content
          </button>
        </form>
      </div>
      <ToastContainer />
      <Modal show={showUpdateModal} >
        <Modal.Header>
          <Modal.Title>Page Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sure you want to update page?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleUpdate} variant="primary" style={{ marginLeft: '10px' }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePageContent;
