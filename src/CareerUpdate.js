import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CareerUpdate() {
  const navigate = useNavigate();
  const { srno } = useParams();
  const [formData, setFormData] = useState({
    srno: "",
    name: "",
    email: "",
    mobile: "",
    whatsapp_mobile: "",
    city: "",
    hometown: "",
    college: "",
    university: "",
    passing_year: "",
    branch: "",
    linkedinid: "",
    githubid: "",
    referredby: "",
    currentcompany: "",
    yearsOfExperience: "",
    currentDesignation: "",
    noticePeriod: "",
    currentSalary: "",
    skills: "",
    dob: "",
    workLocation: "",
    typePartFull: "",
    typeFullIntern: "",
    jobType: "",
    uploadCV: "",
  });

  const [careerList, setCareerList] = useState([]);   
  const callApiCareerList = async () => {
  try {
    const headers = {
      'x-access-token': localStorage.getItem('jwttoken')
    };
     const url = process.env.REACT_APP_API_URL + 'career/alluser';
     const response = await axios.get(url, {headers});
     setCareerList(response.data);
    }
    catch (error) {
     console.log(error);
    }
  }
  useEffect(() => {
    if (careerList.length === 0) {
      callApiCareerList();
    }
      const matchingCareer= careerList.find((item) => item.srno === parseInt(srno, 10));
    if (matchingCareer) {
         setFormData(matchingCareer)
       }
    }, [srno, careerList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const callApiUpdateCareer = async() => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + 'career/updatecareer';
      const response = await axios.put(url, formData, {headers});
      console.log(response)
    } catch (err) {
      console.error(err);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    var val = window.confirm('sure you want to update data?')
    if(val===true){
       await callApiUpdateCareer();
       toast.success('Career Updated Successfully',{
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      })
      setTimeout(() => {
        navigate('/career');
      }, 2000);
    }
    else{
      toast.error('Career not updated',{
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      })
    }
  };

  return (
    <>
    <div>
      <h1>Update Career</h1>
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
            <label>Mobile Number:</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" maxlength="10" />
          </div>
          <div>
            <label>Whatsapp Number:</label>
            <input type="text" name="whatsapp_mobile" value={formData.whatsapp_mobile} onChange={handleChange} placeholder="WhatsApp Mobile" maxlength="10" />
          </div>
          <div>
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          </div>
          <div>
            <label>Hometown:</label>
            <input type="text" name="hometown" value={formData.hometown} onChange={handleChange} placeholder="Hometown" />
          </div>
          <div>
          <label>College Name:</label>
            <input  type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College" />
          </div>
          <div>
          <label>University:</label>
            <input type="text" name="university" value={formData.university} onChange={handleChange} placeholder="University" />
          </div>
          <div>
          <label>Passing Year:</label>
            <input type="number" name="passing_year" value={formData.passing_year} onChange={handleChange} placeholder="Passing Year" />
          </div>
          <div>
          <label>Branch:</label>
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" />
          </div>
          <div>
          <label>Linkdin ID(url):</label>
            <input type="url" name="linkedinid" value={formData.linkedinid} onChange={handleChange} placeholder="LinkedIn ID" />
          </div>
          <div>
          <label>Github ID(url):</label>
            <input type="url" name="githubid" value={formData.githubid} onChange={handleChange} placeholder="GitHub ID" />
          </div>
          <div>
          <label>Refrence ID:</label>
            <input type="text" name="referredby" value={formData.referredby} onChange={handleChange} placeholder="Referred By" />
          </div>
          <div>
          <label>Current Company:</label>
            <input type="text" name="currentcompany" value={formData.currentcompany} onChange={handleChange} placeholder="Current Company" />
          </div>
          <div>
          <label>Year of Experience:</label>
            <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} placeholder="Years of Experience" />
          </div>
          <div>
          <label>Current Designation:</label>
            <input type="text" name="currentDesignation" value={formData.currentDesignation} onChange={handleChange} placeholder="Current Designation" />
          </div>
          <div>
          <label>Notece Period (in days):</label>
            <input type="number" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} placeholder="Notice Period" />
          </div>
          <div>
          <label>Current Sallary (In lakhs):</label>
            <input type="number" name="currentSalary" value={formData.currentSalary} onChange={handleChange} placeholder="Current Salary" />
          </div>
          <div>
          <label>Skills:</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" />
          </div>
          <div>
          <label>DOB:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
          </div>
          <div>
          <label>Work Location:</label>
            <input type="text" name="workLocation" value={formData.workLocation} onChange={handleChange} placeholder="Work Location" />
          </div>
          <div>
          <label>Part Time/Full Time:</label>
            <input type="text" name="typePartFull" value={formData.typePartFull} onChange={handleChange} placeholder="Type (Part/Full)" />
          </div>
          <div>
          <label>Full Time/Intern:</label>
            <input type="text" name="typeFullIntern" value={formData.typeFullIntern} onChange={handleChange} placeholder="Type (Full/Intern)" />
          </div>
          <div>
          <label>Job Type:</label>
            <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} placeholder="Job Type" />
          </div>
         
        <button type="submit" className='btn btn-warning'>Update Career</button>
      </form>
    </div>
    <ToastContainer />
    </>
  );
}

export default CareerUpdate;
