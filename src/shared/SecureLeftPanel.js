import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataAppContext } from '../DataContext';

const SecureLeftPanel = () => {
  const usertype = localStorage.getItem('usertype');
  const localContext = useContext(DataAppContext);
  console.log('localcontext in left panel - ', localContext);

  return (
    <div className='col-2 bg-body px-4 py-4'>
      {
        (localContext.appstate.loginstatus && (usertype === 'admin')) && (
          <>
            <Link to='' className='btn btn-success'>Admin Options</Link><br></br><br></br>
            <Link to='/imageslist' className='btn btn-outline-primary mb-2'>Images List</Link><br></br>
            <Link to='/career' className='btn btn-outline-primary mb-2'>Career CRUD</Link><br></br>
            <Link to='/contact' className='btn btn-outline-primary mb-2'>Contact CRUD</Link><br></br>
            <Link to='/blogslist' className='btn btn-outline-primary mb-2'>Blogs CRUD</Link><br></br>
            <Link to='/categorylist' className='btn btn-outline-primary mb-2'>Category CRUD</Link><br></br>
            <Link to='/postlist' className='btn btn-outline-primary mb-2'>Post Content CRUD</Link><br></br>
            <Link to='/pagecontentlist' className='btn btn-outline-primary mb-2'>Page Content CRUD</Link><br></br>
            <Link to='/pages' className='btn btn-outline-primary mb-2'>Pages CRUD</Link><br></br>
            <Link to='/portfoliolist' className='btn btn-outline-primary mb-2'>Portfolio CRUD</Link><br></br>
            <Link to='/testimonialslist' className='btn btn-outline-primary mb-2'>Testimonial CRUD</Link><br></br>
            <Link to='/' className='btn btn-outline-primary mb-2'>--</Link><br></br>
          </>
         )
      }

      {
        (localContext.appstate.loginstatus && (usertype === 'contentadmin')) && (
          <>
            <Link to='/blogslist' className='btn btn-outline-primary mb-2'>Blogs</Link><br></br>

          </>
        )
      }
    </div>
  )
}

export default SecureLeftPanel
