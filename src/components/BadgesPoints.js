import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data'

const BadgesPoints = () => {

    const [badges, setBadges] = useState([]);
    const [points, setPoints] = useState([]);



    const fetchPoints = async () => {
        const url = process.env.REACT_APP_API_URL + 'users/points';
        //console.log(url)

        const headers = {
            'x-access-token': localStorage.getItem('jwttoken')
        };

        try {
            const response = await axios.get(url, { headers });
            //console.log(response.data);
            setPoints(response.data)
        }
        catch (err) {
            console.log('Error In API Call - ', err)
        }
    }


    const fetchBadges = async () => {
        const url = process.env.REACT_APP_API_URL + 'users/badges';
        //console.log(url)

        const headers = {
            'x-access-token': localStorage.getItem('jwttoken')
        };

        try {
            //const response = await fetch(url);
            const response = await axios.get(url, { headers });
            //console.log(response.data);
            setBadges(response.data)
        }
        catch (err) {
            console.log('Error In API Call - ', err)
        }
    }

    useEffect(() => {
        console.log('fetching images')
        fetchBadges();
        fetchPoints();
    }, [])

    useEffect(() => {
        console.log('badges - ', badges);
        console.log('points - ', points);
    }, [badges, points])

    return (
        <div>
            <h2>Blog Reward Points Table</h2>
            <table className='table table-responsive table-bordered'>
                <tr>
                    <th>Level</th>
                    <th>Min Content Length</th>
                    <th>Max Content Length</th>
                    <th>Reward Points Earned</th>
                </tr>

                {
                    points && points.map((item, index) => (
                        <tr>
                            <td>{item.blogpointcategoryname}</td>
                            <td>{item.min}</td>
                            <td>{item.max}</td>
                            <td>{item.rewardpoints}</td>
                        </tr>
                    ))
                }

            </table>

            <br></br>
            <h2>Badge Unlock Points</h2>

            <table className='table table-responsive table-bordered table-striped'>
            <tr>
                    <th>Badge</th>
                    <th>Required Points to unlock</th>
                </tr>

                {
                    badges && badges.map((item, index) => (
                        <tr>
                            <td>{item.badgename}</td>
                            <td>{item.points}</td>
                        </tr>
                    ))
                }

            </table>


        </div>
    )
}

export default BadgesPoints
