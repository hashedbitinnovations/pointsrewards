import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeletePageContentModal from './DeletePageContentModal';

function PageContentShowAll() {
 

    const [pageContentList, setPageContentList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pageContentToDelete, setPageContentToDelete] = useState(null);
  
    const callApiPageContent = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + 'pagecontent/showAll';
      const response = await axios.get(url, {headers});
      setPageContentList(response.data);
    }
    catch (error) {
      console.log(error);
    }
   }
   useEffect(() => {
     callApiPageContent();
   }, [])

   const handleOpenDeleteModal = (pagecontent) => {
    setPageContentToDelete(pagecontent);
    setShowDeleteModal(true);
  };
  const handleDeletePage = async (pageContentToDeleteSrno) => {
    try {
      const headers = {
       'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + `pagecontent/delete/${pageContentToDeleteSrno}`;
      await axios.delete(url, {headers});
      setShowDeleteModal(false);
      const updatedPageContentList = pageContentList.filter((item) => item.srno !== pageContentToDeleteSrno);
      setPageContentList(updatedPageContentList);
    } catch (error) {
      console.error(error);
      setShowDeleteModal(false);
    }
  };
  return (
    <div>
      <h1>Page Content List</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Page Content Id</th>
            <th>Page Content Name</th>
            <th>Page Content Tilte</th>
            <th>Page Content</th>  
            <th>Page Content Type</th>
            <th>Page Id</th>
            <th>Page Location Id</th> 
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
          {pageContentList && pageContentList
            .filter(item => item.isactive === 1)
            .map((item, index) => (
            <tr key={index + item.exam_id}>
              <td>{item.srno}</td>
              <td>{item.contentid}</td>
              <td>{item.contentname}</td>
              <td>{item.contenttitle}</td>
              <td>{item.content}</td>
              <td>{item.contenttype}</td>
              <td>{item.pageid}</td>
              <td>{item.pagelocationid}</td>
              <td>{item.isactive}</td>
              {/* <td>{item.createdby}</td>
              <td>{item.createdon}</td>
              <td>{item.updatedby}</td>
              <td>{item.updatedon}</td> */}
              
              <td>
                <Link to={`/pagecontentupdate/${item.srno}`} className='btn btn-warning'>Edit</Link>
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
        onConfirm={() => handleDeletePage(pageContentToDelete.srno)}
        pageContentToDelete={pageContentToDelete}
      />
      <div className="d-grid gap-2">
        <Link to='/createpagecontent' className="btn btn-primary" type="button">
          Create New Page
        </Link>
      </div>
    </div>
  );
}

export default PageContentShowAll;
