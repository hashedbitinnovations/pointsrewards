import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";

function UpdatePage() {
    const editor = useRef(null);
    const navigate = useNavigate();
    const { srno } = useParams();
    const [formData, setFormData] = useState({
        pageid: "",
        pageurlname: "",
        pagename: "",
        pagetitle: "",
        pagesubtitle: "",
        pagetype: "",
        pagesubtype: "",
        pagecontent: "",
        pagetheme: "",
        tobeaddedinmenu: "",
        tobeaddedinsubmenu1: "",
        parentofsubmenu1: "",
        tobeaddedinsubmenu2: "",
        parentofsubmenu2: "",
        iscommon: "",
        issecure: "",
        templateid: "",
        hasmenubar: "",
        hasheader: "",
        hasfooter: "",
        hasleftsidebar: "",
        hasrightsidebar: "",
        leftsidebarid: "",
        rightsidebarid: "",
    });

    const [allPage, setAllPage] = useState([]);
    const callApiPage = async () => {
        try {
            const headers = {
                'x-access-token': localStorage.getItem('jwttoken')
            };
            const url = process.env.REACT_APP_API_URL + "pages/showAll";
            const response = await axios.get(url, { headers });
            console.log(response.data) 
            setAllPage(response.data);
        } catch (error) {
            toast.error("Couldn't Fetch Page", {
                position: "top-center",
                autoClose: 1000,
                theme: "colored",
            });
        }
    };
    useEffect(() => {
        if (allPage.length === 0) {
            callApiPage();
        }
        const matchingPage = allPage.find(
            (item) => item.srno === parseInt(srno, 10)
        );
        if (matchingPage) {
            setFormData(matchingPage);
        }
    }, [srno, allPage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (newContent) => {
        setFormData({ ...formData, pagecontent: newContent });
    };

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const callApiUpdateContent = async () => {
        try {
            const headers = {
                'x-access-token': localStorage.getItem('jwttoken')
            }
            console.log("dfg")
            const url = process.env.REACT_APP_API_URL + "pages/updates/" + srno;
            await axios.put(url, formData, { headers });
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
            !formData.pageid
        ) {
            toast.error("Missing required parameters.", {
                position: "top-center",
                autoClose: 1000,
                theme: "colored",
            });
        } else {
            try {
                await callApiUpdateContent();
                toast.success("Page Updated Successfully", {
                    position: "top-center",
                    autoClose: 1000,
                    theme: "colored",
                });
            } catch (error) {
                toast.error("Page not updated", {
                    position: "top-center",
                    autoClose: 1000,
                    theme: "colored",
                });
            }
            setTimeout(() => {
                navigate("/pages");
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
                        <label htmlFor="pageid">Page Id:</label>
                        <input
                            type="text"
                            value={formData.pageid}
                            name="pageid"
                            id="pageid"
                            placeholder="pageid"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='50'
                        />
                    </div>

                    <div>
                        <label htmlFor="pageurlname">Page Url Name:</label>

                        <input
                            type="text"
                            value={formData.pageurlname}
                            name="pageurlname"
                            id="pageurlname"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='100'
                        />
                    </div>
                    <div>
                        <label htmlFor="pagename">Page Name:</label>

                        <input
                            type="text"
                            value={formData.pagename}
                            name="pagename"
                            id="pagename"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='100'
                        />
                    </div>
                    <div>
                        <label htmlFor="pagetitle">Page Title:</label>

                        <input
                            type="text"
                            value={formData.pagetitle}
                            name="pagetitle"
                            id="pagetitle"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='100'
                        />
                    </div>
                    <div>
                        <label htmlFor="pagesubtitle">Page Sub Title:</label>

                        <input
                            type="text"
                            value={formData.pagesubtitle}
                            name="pagesubtitle"
                            id="pagesubtitle"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='100'
                        />
                    </div>
                    <div>
                        <label htmlFor="pagetype">Page Type:</label>

                        <input
                            type="text"
                            value={formData.pagetype}
                            name="pagetype"
                            id="pagetype"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='200'
                        />
                    </div>
                    <div>
                        <label htmlFor="pagesubtype">Page Sub Type:</label>

                        <input
                            type="text"
                            value={formData.pagesubtype}
                            name="pagesubtype"
                            id="pagesubtype"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='200'
                        />
                    </div>
                    <div>
                        <label htmlFor="pagecontent">Page Content:</label>
                        <JoditEditor
                            ref={editor}
                            value={formData.pagecontent}
                            name="pagecontent"
                            id="pagecontent"
                            className="form-control"
                            onChange={handleContentChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="pagetheme">Page Theme:</label>
                        <input
                            type="text"
                            value={formData.pagetheme}
                            name="pagetheme"
                            id="pagetheme"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='20'
                        />
                    </div>
                    <div>
                        <label htmlFor="tobeaddedinmenu">To be added in menu:</label>
                        <input
                            type="number"
                            value={formData.tobeaddedinmenu}
                            name="tobeaddedinmenu"
                            id="tobeaddedinmenu"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="tobeaddedinsubmenu1">To be added in sub menu1:</label>
                        <input
                            type="number"
                            value={formData.tobeaddedinsubmenu1}
                            name="tobeaddedinsubmenu1"
                            id="tobeaddedinsubmenu1"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="parentofsubmenu1">Parent of submenu1:</label>
                        <input
                            type="number"
                            value={formData.parentofsubmenu1}
                            name="parentofsubmenu1"
                            id="parentofsubmenu1"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="tobeaddedinsubmenu2">To be added in sub menu2:</label>
                        <input
                            type="number"
                            value={formData.tobeaddedinsubmenu2}
                            name="tobeaddedinsubmenu2"
                            id="tobeaddedinsubmenu2"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="parentofsubmenu2">Parent of submenu1:</label>
                        <input
                            type="number"
                            value={formData.parentofsubmenu2}
                            name="parentofsubmenu2"
                            id="parentofsubmenu2"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="iscommon">Is common:</label>
                        <input
                            type="number"
                            value={formData.iscommon}
                            name="iscommon"
                            id="iscommon"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="issecure">Is secure:</label>
                        <input
                            type="number"
                            value={formData.issecure}
                            name="issecure"
                            id="issecure"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="templateid">Template id:</label>
                        <input
                            type="number"
                            value={formData.templateid}
                            name="templateid"
                            id="templateid"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="hasmenubar">Has Menubar:</label>
                        <input
                            type="number"
                            value={formData.hasmenubar}
                            name="hasmenubar"
                            id="hasmenubar"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="hasheader">Has Header:</label>
                        <input
                            type="number"
                            value={formData.hasheader}
                            name="hasheader"
                            id="hasheader"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="hasfooter">Has footer:</label>
                        <input
                            type="number"
                            value={formData.hasfooter}
                            name="hasfooter"
                            id="hasfooter"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="hasleftsidebar">Has rightside bar:</label>
                        <input
                            type="number"
                            value={formData.hasleftsidebar}
                            name="hasleftsidebar"
                            id="hasleftsidebar"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="hasrightsidebar">Has rightside bar:</label>
                        <input
                            type="number"
                            value={formData.hasrightsidebar}
                            name="hasrightsidebar"
                            id="hasrightsidebar"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="leftsidebarid">Left sidebar id:</label>
                        <input
                            type="number"
                            value={formData.leftsidebarid}
                            name="leftsidebarid"
                            id="leftsidebarid"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>
                    <div>
                        <label htmlFor="rightsidebarid">Right sidebar id:</label>
                        <input
                            type="number"
                            value={formData.rightsidebarid}
                            name="rightsidebarid"
                            id="rightsidebarid"
                            className="form-control"
                            onChange={handleChange}
                            maxLength='11'
                        />
                    </div>

                    <button type="submit" className="btn btn-warning">
                        Update Page
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
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
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

export default UpdatePage;
