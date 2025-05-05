import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data'

const ImagesList = () => {

    const [image, setImage] = useState('');

    function handleImage(e) {
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
    }

    function handleApi() {
        const formData = new FormData();
        formData.append('mypic', image);
        const url = process.env.REACT_APP_API_URL + 'images/uploadImage';
        axios.post(url, formData, {
            headers: {
              'accept': 'application/json',
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
          }).then((res) => {
            console.log(res);
            fetchImages();
        })
    }

    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        const url = process.env.REACT_APP_API_URL + 'images/allimages';
        //console.log(url)

        const headers = {
            'x-access-token': localStorage.getItem('jwttoken')
        };

        try {
            //const response = await fetch(url);
            const response = await axios.get(url, { headers });
            //console.log(response.data);
            setImages(response.data)
        }
        catch (err) {
            console.log('Error In API Call - ', err)
        }
    }

    useEffect(() => {
        console.log('fetching images')
        fetchImages();
    }, [])

    // useEffect(() => {
    //     console.log('image - ', image.length);
    // }, [image])

    return (
        <div>

            <div className='alert alert-success'>

                <input type='file' onChange={handleImage} className='form-control' />
                <button onClick={handleApi} className='btn btn-success' disabled={image.length === 0}>Upload Image</button>

            </div>
            <br></br>
            <br></br>

            <table className='table table-responsive table-bordered'>

                {
                    images && images.map((item, index) => (
                        <tr>
                            <td>{item}</td>
                            <td width={200}><img src={process.env.REACT_APP_IMAGE_URL + item} alt='image' className='img-fluid' /></td>
                        </tr>
                    ))
                }

            </table>

            <br></br>
            <a href={`${process.env.REACT_APP_API_URL}file`} target='_blank' className='btn btn-primary'>Old - Upload New Image through express</a>

        </div>
    )
}

export default ImagesList
