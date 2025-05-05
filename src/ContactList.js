import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ContactList = () => {
  const [userContactList, setUserContactList] = useState([]);

  const callApiContactList = async () => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("jwttoken"),
      };
      const url = process.env.REACT_APP_API_URL + "contact/alluser";
      const response = await axios.get(url, { headers });
      setUserContactList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callApiContactList();
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Email Id</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Response Status</th>
            <th>Response Message</th>
            <th>Response Next Step</th>
            <th>Response Next Person</th>
            <th>Final Status</th>
            <th>Create Date</th>
            <th>Update Date</th>
          </tr>
        </thead>
        <tbody>
          {userContactList &&
            userContactList.map((item, index) => (
              <tr key={index + item.exam_id}>
                <td>{item.srno}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td>{item.responseStatus}</td>
                <td>{item.responseMessage}</td>
                <td>{item.responseNextStep}</td>
                <td>{item.responseNextPerson}</td>
                <td>{item.finalStatus}</td>
                <td>{item.createdon}</td>
                <td>{item.updatedon}</td>

                <td>
                  <Link
                    to={`/contactupdate/${item.srno}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
