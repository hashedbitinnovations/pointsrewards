import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeletePageContentModal from './DeletePageContentModal';

function PagesCrud() {


  const [pagesList, setPagesList] = useState([]);
  const [pageTypes, setPageTypes] = useState([]);
  const [pageSubtypes, setPageSubtypes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);

  const callApiPageContent = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + 'pages/showAll';
      const response = await axios.get(url, { headers });
      setPagesList(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  const fetchPageTypes = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + 'pages/getPageTypes';
      const response = await axios.get(url, { headers });
      setPageTypes(response.data.pageTypes);
      setPageSubtypes(response.data.pageSubtypes);
    } catch (error) {
      console.error("Error fetching page types: ", error);
    }
  };

  useEffect(() => {
    callApiPageContent();
    fetchPageTypes();
  }, [])

  const handleOpenDeleteModal = (pagecontent) => {
    setPageToDelete(pagecontent);
    setShowDeleteModal(true);
  };
  const handleDeletePage = async (pageToDeleteSrno) => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + `pages/delete/${pageToDeleteSrno}`;
      await axios.delete(url, { headers });
      setShowDeleteModal(false);
      const updatedPagesList = pagesList.filter((item) => item.srno !== pageToDeleteSrno);
      setPagesList(updatedPagesList);
    } catch (error) {
      console.error(error);
      setShowDeleteModal(false);
    }
  };
  return (
    <div>
      <h1>Pages List</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Page Id</th>
            <th>Page Url Name</th>
            <th>Page  Name</th>
            <th>Page Title</th>
            <th>Page sub Title</th>
            <th>Page type</th>
            <th>Page subtype</th>
            <th>Page content</th>
            <th>Page Theme</th>
            <th>To be added in menu</th>
            <th>To be added in submenu1</th>
            <th>Parent of submenu1</th>
            <th>To be added in submenu2</th>
            <th>Parent of submenu2</th>
            <th>Is common</th>
            <th>Is secure</th>
            <th>Has menubar</th>
            <th>Has header</th>
            <th>Has footer</th>
            <th>Has left sidebar</th>
            <th>Has right sidebar</th>
            <th>Has right sidebar</th>
            <th>Left sidebar id</th>
            <th>Right sidebar id</th>
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
          {pagesList && pagesList
            .filter(item => item.isactive === 1)
            .map((item, index) => (
              <tr key={index + item.exam_id}>
                <td>{item.srno}</td>
                <td>{item.pageid}</td>
                <td>{item.pageurlname}</td>
                <td>{item.pagename}</td>
                <td>{item.pagetitle}</td>
                <td>{item.pagesubtitle}</td>
                <td>{pageTypes.find(type => type.id === item.pagetype)?.name || item.pagetype}</td>
                <td>{pageSubtypes.find(subtype => subtype.id === item.pagesubtype)?.name || item.pagesubtype}</td>
                <td>
                  <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                    {item.pagecontent}
                  </div></td>
                <td>{item.pagetheme}</td>
                <td>{item.tobeaddedinmenu}</td>
                <td>{item.tobeaddedinsubmenu1}</td>
                <td>{item.parentofsubmenu1}</td>
                <td>{item.tobeaddedinsubmenu2}</td>
                <td>{item.parentofsubmenu2}</td>
                <td>{item.iscommon}</td>
                <td>{item.issecure}</td> 
                <td>{item.templateid}</td>
                <td>{item.hasmenubar}</td>
                <td>{item.hasheader}</td>
                <td>{item.hasfooter}</td>
                <td>{item.hasleftsidebar}</td>
                <td>{item.hasrightsidebar}</td>
                <td>{item.leftsidebarid}</td>
                <td>{item.rightsidebarid}</td>
                <td>{item.isactive}</td>
                {/* <td>{item.createdby}</td>
              <td>{item.createdon}</td>
              <td>{item.updatedby}</td>
              <td>{item.updatedon}</td> */}

                <td>
                  <Link to={`/updatepage/${item.srno}`} className='btn btn-warning'>Edit</Link>
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
       <DeletePageContentModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeletePage(pageToDelete.srno)}
        pageToDelete={pageToDelete}
      />
      <div className="d-grid gap-2">
        <Link to='/createpage' className="btn btn-primary" type="button">
          Create New Page
        </Link>
      </div>
    </div>
  );
}

export default PagesCrud;
