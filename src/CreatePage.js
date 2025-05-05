import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePage = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [pageid, setPageId] = useState("");
  const [pageurlname, setPageUrlName] = useState("");
  const [pagename, setPageName] = useState("");
  const [pagetitle, setPageTitle] = useState("");
  const [pagesubtitle, setPageSubtitle] = useState("");
  const [pagetype, setPageType] = useState("");
  const [pagesubtype, setPageSubtype] = useState("");
  const [pagecontent, setPageContent] = useState("");
  const [pagetheme, setPageTheme] = useState("");
  const [tobeaddedinmenu, setToBeAddedInMenu] = useState("");
  const [tobeaddedinsubmenu1, setToBeAddedInSubmenu1] = useState("");
  const [parentofsubmenu1, setParentofSubmenu1] = useState("");
  const [tobeaddedinsubmenu2, setToBeAddedInSubmenu2] = useState("");
  const [parentofsubmenu2, setParentofSubmenu2] = useState("");
  const [iscommon, setIsCommon] = useState("");
  const [issecure, setIsSecure] = useState("");
  const [templateid, setTemplateId] = useState("");
  const [hasmenubar, setHasMenubar] = useState("");
  const [hasheader, setHasHeader] = useState("");
  const [hasfooter, setHasFooter] = useState("");
  const [hasleftsidebar, setHasLeftSidebar] = useState("");
  const [hasrightsidebar, setHasRightSidebar] = useState("");
  const [leftsidebarid, setLeftSidebarId] = useState("");
  const [rightsidebarid, setRightSidebarId] = useState("");
  const [isactive, setIsActive] = useState(1);


  const url = process.env.REACT_APP_API_URL;

  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault();
    setShowCreateModal(false)
    const pageData = {
        pageid,
        pageurlname,
        pagename,
        pagetitle,
        pagesubtitle,
        pagetype,
        pagesubtype,
        pagecontent,
        pagetheme,
        tobeaddedinmenu,
        tobeaddedinsubmenu1,
        parentofsubmenu1,
        tobeaddedinsubmenu2,
        parentofsubmenu2,
        iscommon,
        issecure,
        templateid,
        hasmenubar,
        hasheader,
        hasfooter,
        hasleftsidebar,
        hasrightsidebar,
        leftsidebarid,
        rightsidebarid,
    };

    if (
        !pageid||
        !pageurlname||
        !pagename||
        !pagetitle||
        !pagesubtitle||
        !pagetype||
        !pagesubtype||
        !pagecontent||
        !pagetheme||
        !tobeaddedinmenu||
        !tobeaddedinsubmenu1||
        !parentofsubmenu1||
        !tobeaddedinsubmenu2||
        !parentofsubmenu2||
        !iscommon||
        !issecure||
        !templateid||
        !hasmenubar||
        !hasheader||
        !hasfooter||
        !hasleftsidebar||
        !hasrightsidebar||
        !leftsidebarid||
        !rightsidebarid
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
          url + "pages/addNewData",
          pageData, {headers}
        );

        if (response.status === 201) {
          toast.success("Page created successfully", {
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/pages");
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
          <label htmlFor="pageid">Page Id:</label>
          <input
            type="text"
            value={pageid}
            name="pageid"
            id="pageid"
            className="form-control"
            onChange={(e) => setPageId(e.target.value)}
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="pageurlname">Page Url Name:</label>

          <input
            type="text"
            value={pageurlname}
            name="pageurlname"
            id="pageurlname"
            className="form-control"
            onChange={(e) => setPageUrlName(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="pagename">Page Name:</label>

          <input
            type="text"
            value={pagename}
            name="pagename"
            id="pagename"
            className="form-control"
            onChange={(e) => setPageName(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="pagetitle">Page Title:</label>

          <input
            type="text"
            value={pagetitle}
            name="pagetitle"
            id="pagetitle"
            className="form-control"
            onChange={(e) => setPageTitle(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="pagesubtitle">Page Sub Title:</label>

          <input
            type="text"
            value={pagesubtitle}
            name="pagesubtitle"
            id="pagesubtitle"
            className="form-control"
            onChange={(e) => setPageSubtitle(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="pagetype">Page Type:</label>

          <input
            type="text"
            value={pagetype}
            name="pagetype"
            id="pagetype"
            className="form-control"
            onChange={(e) => setPageType(e.target.value)}
            maxLength={200}
          />
        </div>
        <div>
          <label htmlFor="pagesubtype">Page Sub Type:</label>

          <input
            type="text"
            value={pagesubtype}
            name="pagesubtype"
            id="pagesubtype"
            className="form-control"
            onChange={(e) => setPageSubtype(e.target.value)}
            maxLength={200}
          />
        </div>
        <div>
          <label htmlFor="pagecontent">Page Content:</label>
          <JoditEditor
            ref={editor}
            value={pagecontent}
            name="pagecontent"
            id="pagecontent"
            className="form-control"
            onChange={(newContent) => setPageContent(newContent)}
          />
        </div>
        <div>
          <label htmlFor="pagetheme">Page Theme:</label>
          <input
            type="text"
            value={pagetheme}
            name="pagetheme"
            id="pagetheme"
            className="form-control"
            onChange={(e) => setPageTheme(e.target.value)}
            maxLength={20}
          />
        </div>
        <div>
          <label htmlFor="tobeaddedinmenu">To be added in menu:</label>
          <input
            type="number"
            value={tobeaddedinmenu}
            name="tobeaddedinmenu"
            id="tobeaddedinmenu"
            className="form-control"
            onChange={(e) => setToBeAddedInMenu(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="tobeaddedinsubmenu1">To be added in sub menu1:</label>
          <input
            type="number"
            value={tobeaddedinsubmenu1}
            name="tobeaddedinsubmenu1"
            id="tobeaddedinsubmenu1"
            className="form-control"
            onChange={(e) => setToBeAddedInSubmenu1(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="parentofsubmenu1">Parent of submenu1:</label>
          <input
            type="number"
            value={parentofsubmenu1}
            name="parentofsubmenu1"
            id="parentofsubmenu1"
            className="form-control"
            onChange={(e) => setParentofSubmenu1(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="tobeaddedinsubmenu2">To be added in sub menu2:</label>
          <input
            type="number"
            value={tobeaddedinsubmenu2}
            name="tobeaddedinsubmenu2"
            id="tobeaddedinsubmenu2"
            className="form-control"
            onChange={(e) => setToBeAddedInSubmenu2(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="parentofsubmenu2">Parent of submenu1:</label>
          <input
            type="number"
            value={parentofsubmenu2}
            name="parentofsubmenu2"
            id="parentofsubmenu2"
            className="form-control"
            onChange={(e) => setParentofSubmenu2(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="iscommon">Is common:</label>
          <input
            type="number"
            value={iscommon}
            name="iscommon"
            id="iscommon"
            className="form-control"
            onChange={(e) => setIsCommon(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="issecure">Is secure:</label>
          <input
            type="number"
            value={issecure}
            name="issecure"
            id="issecure"
            className="form-control"
            onChange={(e) => setIsSecure(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="templateid">Template id:</label>
          <input
            type="number"
            value={templateid}
            name="templateid"
            id="templateid"
            className="form-control"
            onChange={(e) => setTemplateId(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="hasmenubar">Has Menubar:</label>
          <input
            type="number"
            value={hasmenubar}
            name="hasmenubar"
            id="hasmenubar"
            className="form-control"
            onChange={(e) => setHasMenubar(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="hasheader">Has Header:</label>
          <input
            type="number"
            value={hasheader}
            name="hasheader"
            id="hasheader"
            className="form-control"
            onChange={(e) => setHasHeader(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="hasfooter">Has footer:</label>
          <input
            type="number"
            value={hasfooter}
            name="hasfooter"
            id="hasfooter"
            className="form-control"
            onChange={(e) => setHasFooter(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="hasleftsidebar">Has rightside bar:</label>
          <input
            type="number"
            value={hasleftsidebar}
            name="hasleftsidebar"
            id="hasleftsidebar"
            className="form-control"
            onChange={(e) => setHasLeftSidebar(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="hasrightsidebar">Has rightside bar:</label>
          <input
            type="number"
            value={hasrightsidebar}
            name="hasrightsidebar"
            id="hasrightsidebar"
            className="form-control"
            onChange={(e) => setHasRightSidebar(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="leftsidebarid">Left sidebar id:</label>
          <input
            type="number"
            value={leftsidebarid}
            name="leftsidebarid"
            id="leftsidebarid"
            className="form-control"
            onChange={(e) => setLeftSidebarId(e.target.value)}
            maxLength={11}
          />
        </div>
        <div>
          <label htmlFor="rightsidebarid">Right sidebar id:</label>
          <input
            type="number"
            value={rightsidebarid}
            name="rightsidebarid"
            id="rightsidebarid"
            className="form-control"
            onChange={(e) => setRightSidebarId(e.target.value)}
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

export default CreatePage;