import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ImagesList2 = () => {

    const [image, setImage] = useState('');

    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0])
    }

    function handleApi() {
        const formData = new FormData();
        formData.append('mypic', image);
        axios.post('http://localhost:4000/images/uploadImage', formData).then((res) => {
            console.log(res);
        })
    }

   


    return (
        <div>




            <div>

                <input type='file' name='mypic' onChange={handleImage} />
                <button onClick={handleApi}>Submit</button>


            </div>


        </div>
    )
}

export default ImagesList2
