import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DataApp, { DataAppContext } from './DataContext';

import SecureHeader from './shared/SecureHeader';
import SecureFooter from './shared/SecureFooter';
import SecureLeftPanel from './shared/SecureLeftPanel';

import CareersList from './CareersList';
import CareerUpdate from './CareerUpdate';


import ContactList from './ContactList';
import ContactUpdate from './ContactUpdate';


import SecureRightPanel from './shared/SecureRightPanel';
import Header from './shared/Header';
import Footer from './shared/Footer';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ImagesList from './components/ImagesList';
import Contact from './components/Contact';
import Career from './components/Career';
import Login from './shared/Login';

import CategoryList from './CategoryList';
import CategoryAdd from './CategoryAdd';
import CategoryDelete from './CategoryDelete'
import CategoryUpdate from './CategoryUpdate'
import PostContentShowAll from './PostContentShowAll';
import UpdatePostContent from './UpdatePostContent';
import CreatePostContent from './CreatePostContent';

import PagesCrud from './PagesCrud';
import CreatePage from './CreatePage';
import UpdatePage from './UpdatePage';

import PageContentShowAll from './PageContentShowAll';
import UpdatePageContent from './UpdatePageContent';
import CreatePageContent from './CreatePageContent';
import PageContent from './components/PageContent';

import BlogList from './components/Blog/BlogList';
import CreateBlog from './components/Blog/CreateBlog';
import UpdateBlog from './components/Blog/UpdateBlog';
import DeleteBlogModal from './components/Blog/DeleteBlogModal';
import ViewBlog from './components/Blog/ViewBlog';
import PortfolioList from './PortfolioList';
import PortfolioUpdate from './PortfolioUpdate';
import CreatePortfolio from './CreatePortfolio';

import TestimonialsList from './TestimonialsList';
import TestimonialUpdate from './TestimonialUpdate'
import CreateTestimonials from './CreateTestimonials';
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

                      <Route path='/career' element={<CareersList />} />
                      <Route path='/careerupdate/:srno' element={<CareerUpdate />} />

                      <Route path='/contact' element={<ContactList />} />
                      <Route path='/contactupdate/:srno' element={<ContactUpdate />} />

                      <Route path='/categorylist' element={<CategoryList />} />
                      <Route path='/categoryupdate/:srno' element={<CategoryUpdate />} />
                      <Route path='/deleteId/:srno' element={<CategoryDelete />} />
                      <Route path='/addueserid' element={<CategoryAdd />} />

                      <Route path='/postlist' element={<PostContentShowAll />} />
                      <Route path='/postupdate/:srno' element={<UpdatePostContent />} />
                      <Route path='/createpost' element={<CreatePostContent />} />

                      <Route path='/pagecontentlist' element={<PageContentShowAll />} />
                      <Route path='/pagecontentupdate/:srno' element={<UpdatePageContent />} />
                      <Route path='/createpagecontent' element={<CreatePageContent />} />

                      <Route path='/imageslist' element={<ImagesList />} />
                      <Route path='/contact' element={<Contact />} />
                      <Route path='/career' element={<Career />} />
                      <Route path='/pagecontentlist' element={<PageContent />} />
                      <Route path='/login' element={<Login />} />
                      
                      <Route path='/pages' element={<PagesCrud />} />
                      <Route path='/createpage' element={<CreatePage />} />
                      <Route path='/updatepage/:srno' element={<UpdatePage />} />

                      <Route path='/blogslist' element={<BlogList />} />
                      <Route path='/blogcreate' element={<CreateBlog />} />
                      <Route path='/blogupdate/:blogid' element={<UpdateBlog />} />
                      <Route path='/blogview/:blogid' element={<ViewBlog />} />

                      <Route path='/portfoliolist' element={<PortfolioList />} />
                      <Route path='/portfolioUpdate/:portfolio_id' element={<PortfolioUpdate />} />
                      <Route path='/createPortfolio' element={<CreatePortfolio />} />
                      
                      <Route path='/testimonialslist' element={<TestimonialsList />} />
                      <Route path='/testimonialUpdate/:testimonialid' element={<TestimonialUpdate />} />
                      <Route path='/createTestimonials' element={<CreateTestimonials />} />
                      
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
