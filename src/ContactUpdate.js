import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContactUpdate = () => {
  const navigate = useNavigate();
    const { srno } = useParams();
    const [formData, setFormData] = useState({
      srno: "",
      name: "",
      email: "",
      subject: "",
      message: "",
      responseStatus: "",
      responseMessage: "",
      responseNextStep: "",
      responseNextPerson: "",
      finalStatus: "",
    });
  
    const [contactList, setContactList] = useState([]);   
    const callApiContactList = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
       const url = process.env.REACT_APP_API_URL + 'contact/alluser';
       const response = await axios.get(url, {headers});
       setContactList(response.data);
      }
      catch (error) {
       console.log(error);
      }
    }
    useEffect(() => {
      if (contactList.length === 0) {
        callApiContactList();
      }
        const matchingContact= contactList.find((item) => item.srno === parseInt(srno, 10));
      if (matchingContact) {
           setFormData(matchingContact)
         }
      }, [srno, contactList]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const callApiUpdateContact = async () => {
      try {
        const headers = {
          'x-access-token': localStorage.getItem('jwttoken')
        };
        const url = process.env.REACT_APP_API_URL + 'contact/updatecontact';
        const response = await axios.put(url, formData, {headers});
      }
      catch (err) {
        console.error(err);
      }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
       var val = window.confirm('Sure you want to update data?');
       if (val === true) {
           await callApiUpdateContact();
               toast.success('Contact Updated Successfully',{
               position: "top-center",
               autoClose: 1000,
               theme: "colored",
              })
           setTimeout(() => {
             navigate('/contact');
           }, 1500); 
         } else {
            toast.error('Contact not updated',{
            position: "top-center",
            autoClose: 1000,
            theme: "colored",
          })
       }
      } 
    return (
      <>
      <div>
        <h1>Update Contact</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="srno">Sr No:</label>
              <input type="number" name="srno" value={formData.srno} onChange={handleChange} placeholder="srno"/>
            </div>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name"/>
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div>
              <label>Subject:</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="subject" />
            </div>
            <div>
              <label>Message:</label>
              <input type="text" name="message" value={formData.message} onChange={handleChange} placeholder="Message" maxlength="10" />
            </div>
            <div>
              <label>Response Status:</label>
              <input type="text" name="responseStatus" value={formData.responseStatus} onChange={handleChange} placeholder="Response Status" />
            </div>
            <div>
              <label>Response Message:</label>
              <input type="text" name="responseMessage" value={formData.responseMessage} onChange={handleChange} placeholder="Response Message" maxlength="10" />
            </div>
            <div>
              <label>Response Next Step:</label>
              <input type="text" name="responseNextStep" value={formData.responseNextStep} onChange={handleChange} placeholder="Response Next Step" />
            </div>
            <div>
            <label>Response Next Person:</label>
              <input  type="text" name="responseNextPerson" value={formData.responseNextPerson} onChange={handleChange} placeholder="Response Next Person" />
            </div>
            <div>
            <label>Final Status:</label>
              <input type="text" name="finalStatus" value={formData.finalStatus} onChange={handleChange} placeholder="Final Status" />
            </div>
            
           
          <button type="submit" className='btn btn-warning'>Update Contact</button>
        </form>
      </div>
      <ToastContainer />
      </>
    );
}

export default ContactUpdate
