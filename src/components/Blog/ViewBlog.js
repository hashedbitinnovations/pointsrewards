import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewBlog() {
  const navigate = useNavigate();
  const { blogid } = useParams();
  const [formData, setFormData] = useState({});
  const [imagepath,setimagepath]=useState('');

  // const [allPosts, setAllPosts] = useState([]);
  const callApiPostContent = async () => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('jwttoken')
      };
      const url = process.env.REACT_APP_API_URL + "blog/fetchblogdetail/"+blogid;
      const response = await axios.get(url, {headers});
      setFormData(response.data.blog);
      const fullimageurl =`${process.env.REACT_APP_API_URL}${response.data.blog.featuredimage}`;
      setimagepath(fullimageurl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiPostContent();
  }, [])

  useEffect(() => {
    console.log('formData', formData)
  }, [formData])
  // useEffect(() => {
  //   if (allPosts.length === 0) {
  //     callApiPostContent();
  //   }
  //   console.log('allPosts', allPosts)
  //   const matchingPost = allPosts.find(
  //     (item) => item.srno === parseInt(srno, 10)
  //   );
  //   if (matchingPost) {
  //     console.log('matchingPost', matchingPost);
  //     setFormData(matchingPost);
  //   }
  // }, [srno, allPosts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const callApiUpdateContent = async () => {
  //   try {
  //     const url = process.env.REACT_APP_API_URL + "postcontent/updates/" + srno;
  //     const response = await axios.put(url, formData);
  //     console.log(response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   var val = window.confirm("sure you want to update data?");
  //   if (val === true) {
  //     try {
  //       await callApiUpdateContent();
  //       toast.success("Post Updated Successfully", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         theme: "colored",
  //       });
  //     } catch (error) {
  //       toast.error("Post not updated", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         theme: "colored",
  //       });
  //     }
  //     setTimeout(() => {
  //       navigate("/postlist");
  //     }, 2000);
  //   } else {
  //     toast.error("Post not updated", {
  //       position: "top-center",
  //       autoClose: 1000,
  //       theme: "colored",
  //     });
  //   }
  // };

  return (
    <>
      <div>
        <h1>View Post</h1>
        {/* <form onSubmit={handleSubmit} className="form-row"> */}
        <form className="form-row">
          <div>
            <label htmlFor="srno">Sr No:</label>
            <input
              type="number"
              name="srno"
              id="srno"
              className="form-control"
              value={formData.srno}
              readOnly
              placeholder="srno"
            />
          </div>
          <div>
            <label htmlFor="postcontentid">Post Id:</label>
            <input
              type="text"
              name="postcontentid"
              id="postcontentid"
              className="form-control"
              value={formData.postid}
              onChange={handleChange}
              placeholder="Post Content"
              maxlength="50"
            />
          </div>
          <div>
            <label htmlFor="postcontentname">Post Title:</label>
            <input
              type="text"
              name="postcontentname"
              id="postcontentname"
              className="form-control"
              value={formData.posttitle}
              onChange={handleChange}
              placeholder="Post Content Name"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="postcontenttitle">Post Heading:</label>
            <input
              type="text"
              name="postcontenttitle"
              id="postcontenttitle"
              className="form-control"
              value={formData.postheading}
              onChange={handleChange}
              placeholder="Post Content Title"
              maxlength="100"
            />
          </div>
          <div>
            <label htmlFor="postcontent">Post Content:</label>
            <div dangerouslySetInnerHTML={{ __html: formData.content}} />
          </div>
          <div>
            <label htmlFor="postcontenttype">Featured Image:</label>
            {/* <input
              type="text"
              name="postcontenttype"
              id="postcontenttype"
              className="form-control"
              value={formData.featuredimage}
              onChange={handleChange}
              placeholder="Post Content Type"
              maxlength="20"
            /> */}
            {formData.featuredimage && (
              <img
                src={imagepath}
                alt="Featured"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
          <div>
            <label htmlFor="postid">Featured Icon:</label>
            <input
              type="number"
              name="postid"
              id="postid"
              className="form-control"
              value={formData.featuredicon}
              onChange={handleChange}
              placeholder="Post Id"
              maxlength="11"
            />
          </div>
          <div>
            <label htmlFor="postlocationid">Category:</label>
            <input
              type="number"
              name="postlocationid"
              id="postlocationid"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              placeholder="Post Location Id"
              maxlength="11"
            />
          </div>
          <div>
            <label htmlFor="isactive">Is Active:</label>
            <input
              type="number"
              name="isactive"
              id="isactive"
              className="form-control"
              value={formData.isactive}
              onChange={handleChange}
              placeholder="Is Active"
              maxlength="11"
            />
          </div>
          <Link to='/blogslist' className="btn btn-warning">
            Back to List
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default ViewBlog;
