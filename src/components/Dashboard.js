import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Dashboard = () => {

  const [userdetails, setUserDetails] = useState({});
  const [badge, setBadge] = useState({});
  const username = window.localStorage.getItem('userid')

  // const [allPosts, setAllPosts] = useState([]);
  const callApiPostContent = async () => {

    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "users/userdetails/" + username;
      const response = await axios.get(url, { headers });
      setUserDetails(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiPostContent();
  }, [])

  useEffect(() => {
    console.log('userdetails', userdetails)
  }, [userdetails])

  useEffect(() => {
    console.log('badge', badge)
  }, [badge])

  const fetchBadge = async (userdetails) => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "users/findbadge/" + userdetails.rewardpointsearned;
      const response = await axios.get(url, { headers });
      setBadge(response.data);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchBadge(userdetails)
  }, [userdetails])

  const shareSocial = () => {
    console.log('sharing on social media.....')
  }


  return (
    <div>
      <h2>Name - {userdetails.name}</h2>
      <h2>Email - {userdetails.email}</h2>
      <h2>Mobile - {userdetails.mobile}</h2>
      <h2>Points - {userdetails.rewardpointsearned}</h2>
      <h2>Badge - {badge.badgename || 'Badge Not Unlocked'}</h2>
      {badge.badgename &&
        <>
          <img src={badge.image} alt='Badge Image' />

          <button onClick={shareSocial}>Share</button>
        </>
      }
    </div>
  )
}

export default Dashboard
