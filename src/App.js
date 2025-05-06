import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DataApp, { DataAppContext } from './DataContext';

import SecureHeader from './shared/SecureHeader';
import SecureFooter from './shared/SecureFooter';
import SecureLeftPanel from './shared/SecureLeftPanel';



import SecureRightPanel from './shared/SecureRightPanel';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './shared/Login';

import CategoryList from './CategoryList';
import CategoryAdd from './CategoryAdd';
import CategoryDelete from './CategoryDelete'
import CategoryUpdate from './CategoryUpdate'
import PostContentShowAll from './PostContentShowAll';
import UpdatePostContent from './UpdatePostContent';
import CreatePostContent from './CreatePostContent';

import BlogList from './components/Blog/BlogList';
import CreateBlog from './components/Blog/CreateBlog';
import UpdateBlog from './components/Blog/UpdateBlog';
import ViewBlog from './components/Blog/ViewBlog';

import BadgesPoints from './components/BadgesPoints';

function App() {

  //temp code to keep server live
  const callApiQsList = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      
      const url = process.env.REACT_APP_API_URL + 'blog/recentblogs';
      const response = await axios.get(url, {headers});
    }
    catch (error) { console.log(error); }
  }
  useEffect(() => {
    setInterval(() => callApiQsList(), 10000)
  }, [])
  //temp code to keep server live

  const clearStorage = () => {
    window.localStorage.clear();
  }


  return (
    <>
      <div className='container-fluid'>
        <BrowserRouter>

        <DataApp>
              <>
                <SecureHeader />
                <div className='row maincontent'>
                  <SecureLeftPanel />
                  <div className='col-8 bg-light scrollContent border-end border-start px-4 py-4'>
                    <Routes>
                      <Route path='/home' element={<Home />} />
                      <Route path='/dashboard' element={<Dashboard />} />


                      <Route path='/categorylist' element={<CategoryList />} />
                      <Route path='/categoryupdate/:srno' element={<CategoryUpdate />} />
                      <Route path='/deleteId/:srno' element={<CategoryDelete />} />
                      <Route path='/addueserid' element={<CategoryAdd />} />

                      <Route path='/postlist' element={<PostContentShowAll />} />
                      <Route path='/postupdate/:srno' element={<UpdatePostContent />} />
                      <Route path='/createpost' element={<CreatePostContent />} />

                      <Route path='/login' element={<Login />} />
                      <Route path='/badgespoints' element={<BadgesPoints />} />

                      <Route path='/blogslist' element={<BlogList />} />
                      <Route path='/blogcreate' element={<CreateBlog />} />
                      <Route path='/blogupdate/:blogid' element={<UpdateBlog />} />
                      <Route path='/blogview/:blogid' element={<ViewBlog />} />

                  
                      
                      <Route path='/' element={<Home />} />
                    </Routes>
                  </div>

                  <SecureRightPanel />
                </div>
                <SecureFooter />
              </>
              </DataApp>    
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
