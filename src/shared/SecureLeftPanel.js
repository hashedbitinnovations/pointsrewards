import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataAppContext } from '../DataContext';

const SecureLeftPanel = () => {
  //const usertype = localStorage.getItem('usertype');
  const localContext = useContext(DataAppContext);
  //console.log('localcontext in left panel - ', localContext);

  return (
    <div className='col-2 bg-body px-4 py-4'>
          <>
            <Link to='/dashboard' className='btn btn-outline-primary mb-2'>Dashboard</Link><br></br>
            <Link to='/blogslist' className='btn btn-outline-primary mb-2'>Blogs</Link><br></br>
            <Link to='/badgespoints' className='btn btn-outline-primary mb-2'>Badges & Points</Link><br></br>
          </>
    </div>
  )
}

export default SecureLeftPanel
