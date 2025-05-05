import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ImagesListBkp = () => {

    const [avatarURL, setAvatarURL] = useState('DefaultImage');
    const fileUploadRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    };


    // const uploadImageDisplay = async () => {
    //     const uploadedFile = fileUploadRef.current.files[0];
    //     const cachedURL = URL.createObjectURL(uploadedFile);
    //     setAvatarURL(cachedURL);
    // }




    const uploadImageDisplay = async () => {
        try {
            setAvatarURL('UploadingAnimation');
            const uploadedFile = fileUploadRef.current.files[0];
            const formData = new FormData();

            formData.append("mypic", uploadedFile);

            // const cachedURL = URL.createObjectURL(uploadedFile);
            // setAvatarURL(cachedURL);

            const response = await fetch("http://localhost:4000/images/uploadImage", {
                method: "post",
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
                }
            });

            if (response.status === 201) {
                const data = await response.json();
                setAvatarURL(data?.location);
            }

        } catch (error) {
            console.error(error);
            setAvatarURL('DefaultImage');
        }


    }




    // const handleImageUpload = async (event) => {
    //     event.preventDefault();
    //     console.log('event.target.value', event.target.value);
    //     try {
    //         console.log('----------uploaidng----------------')
    //         setAvatarURL('UploadingAnimation');
    //         const uploadedFile = fileUploadRef.current.files[0];



    //         const cachedURL = URL.createObjectURL(uploadedFile);
    //         setAvatarURL(cachedURL);
    //         const formData = {};
    //         formData.mypic = uploadedFile;
    //         console.log(formData);



    //         const formData = new FormData();
    //         formData.append("file", uploadedFile);
    //         console.log('formData', formData);

    //         const response = await fetch("http://localhost:4000/images/uploadImage", {
    //             method: "post",
    //             body: formData,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
    //             }
    //         });

    //         if (response.status === 201) {
    //             const data = await response.json();
    //             setAvatarURL(data?.location);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setAvatarURL('DefaultImage');
    //     }
    // }



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

    return (
        <div>


            <div className="relative h-96 w-96 m-8">
                <img
                    src={avatarURL}
                    alt="Avatar"
                    className="h-96 w-96 rounded-full" />

                <form id="form" enctype="multipart/form-data">
                    <button onClick={() => handleImageUpload()}                 >
                        Submit
                    </button>
                    <input
                        type="file"
                        name="mypic"
                        id="file"
                        ref={fileUploadRef}
                        onChange={uploadImageDisplay}
                    />
                </form>
            </div>
            <br></br>
            <br></br>


            <div>


            </div>

            <a href={`${process.env.REACT_APP_API_URL}file`} target='_blank' className='btn btn-primary'>Upload New Image</a>

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

        </div>
    )
}

export default ImagesListBkp
