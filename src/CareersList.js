import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CareersList() {
  const [careerList, setCareerList] = useState([]);

  const callApiCareerList = async () => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("jwttoken"),
      };
      const url = process.env.REACT_APP_API_URL + "career/alluser";
      const response = await axios.get(url, { headers });
      setCareerList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callApiCareerList();
  }, []);

  return (
    <div>
      <h1>Career List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Date</th>
            <th>Reg Id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>WhatsApp Mobile</th>
            <th>City</th>
            <th>Hometown</th>
            <th>College</th>
            <th>University</th>
            <th>Passing Year</th>
            <th>Branch</th>
            <th>LinkedIn ID</th>
            <th>GitHub ID</th>
            <th>Referred By</th>
            <th>Current Company</th>
            <th>Years of Experience</th>
            <th>Current Designation</th>
            <th>Notice Period</th>
            <th>Current Salary</th>
            <th>Skills</th>
            <th>DOB</th>
            <th>Work Location</th>
            <th>Type (Part/Full)</th>
            <th>Type (Full/Intern)</th>
            <th>Job Type</th>
            <th>Create Date</th>
            <th>Update Date</th>
          </tr>
        </thead>
        <tbody>
          {careerList &&
            careerList.map((item, index) => (
              <tr key={index + item.exam_id}>
                <td>{item.srno}</td>
                <td>{item.createdon}</td>
                <td>{item.regid}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.whatsapp_mobile}</td>
                <td>{item.city}</td>
                <td>{item.hometown}</td>
                <td>{item.college}</td>
                <td>{item.university}</td>
                <td>{item.passing_year}</td>
                <td>{item.branch}</td>
                <td>{item.linkdinid}</td>
                <td>{item.githubid}</td>
                <td>{item.referredby}</td>
                <td>{item.currentcompany}</td>
                <td>{item.yearsOfExperience}</td>
                <td>{item.currentDesignation}</td>
                <td>{item.noticePeriod}</td>
                <td>{item.currentSalary}</td>
                <td>{item.skills}</td>
                <td>{item.dob}</td>
                <td>{item.workLocation}</td>
                <td>{item.typePartFull}</td>
                <td>{item.typeFullIntern}</td>
                <td>{item.jobType}</td>
                <td>{item.createdon}</td>
                <td>{item.updatedon}</td>
                <td>
                  <Link
                    to={`/careerupdate/${item.srno}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>
    </div>
  );
}

export default CareersList;
