import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [postid, setPostId] = useState("");
  const [posttitle, setPostTitle] = useState("");
  const [postheading, setPostHeading] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [featuredimage, setFeaturedimage] = useState("");
  const [featuredicon, setFeaturedicon] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [parameter, setParameter] = useState("");

  const url = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      postid,
      posttitle,
      postheading,
      author,
      content,
      featuredimage,
      featuredicon,
      category,
    };

    if (
      !postheading ||
      !content ||
      !category
    ) {
      setParameter("Missing required parameters.");
    } else {
      try {
        const headers = {
          'x-access-token': localStorage.getItem('jwttoken')
        };
        const response = await axios.post(
          url + "posts/addNewData",
          postData, {headers}
        );

        if (response.status === 201) {
          setSuccess("Post created successfully");
          setTimeout(() => {
            navigate("/blogslist");
          }, 1000);
        } else {
          setError("Post was not added");
        }
      } catch (err) {
        console.error("Error creating post:", err);
        setError("An error occurred while creating the post.");
      }
    }
  };
  
  const [categories, setCategories] = useState([]);
  async function getData() {
    const url = `${process.env.REACT_APP_API_URL}category/fetchallcategories`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setCategories(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
  }, [categories]);
  return (
    <>
      <h1>Post Add</h1>
      <form onSubmit={handleSubmit} className="form-row">
        <div>
          <label htmlFor="postcontentid">Post Content Id:</label>
          <input
            type="text"
            value={postid}
            name="postcontentid"
            id="postcontentid"
            className="form-control"
            onChange={(e) => setPostId(e.target.value)}
            maxLength={50}
            disabled
          />
        </div>

        <div>
          <label htmlFor="postcontentname">Post Content Title (URL):</label>

          <input
            type="text"
            value={posttitle}
            name="postcontentname"
            id="postcontentname"
            className="form-control"
            onChange={(e) => setPostTitle(e.target.value)}
            maxLength={100}
            disabled
          />
        </div>
        
        <div>
          <label htmlFor="postid">Category:</label>
          <select name="categories" className="form-control">
          <option value="">-- Please Select --</option>
            {categories.map((category, index) => (
              <option value={category.displayname} key={index}> {category.displayname}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="postcontenttitle">Post Content Heading:</label>

          <input
            type="text"
            value={postheading}
            name="postcontenttitle"
            id="postcontenttitle"
            className="form-control"
            onChange={(e) => setPostHeading(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="postcontenttitle">Post Author:</label>
          <input
            type="text"
            value={author}
            name="postauthor"
            id="postauthor"
            className="form-control"
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={200}
          />
        </div>
        <div>
          <label htmlFor="postcontenttitle">Content:</label>
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div>
          <label htmlFor="postcontent">Featured Image:</label>
          <textarea
            rows={6}
            type="text"
            value={featuredimage}
            name="postcontent"
            id="postcontent"
            className="form-control"
            onChange={(e) => setFeaturedimage(e.target.value)}
            disabled
          />
        </div>
        <div>
          <label htmlFor="postcontenttype">Featured Icon:</label>
          <input
            type="text"
            value={featuredicon}
            name="postcontenttype"
            id="postcontenttype"
            className="form-control"
            onChange={(e) => setFeaturedicon(e.target.value)}
            disabled
          />
        </div>


        <td>
          <button type="submit" className="btn btn-success">
            Add Post
          </button>
        </td>
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && <div className="alert alert-success mt-2">{success}</div>}
      {parameter && <div className="alert alert-danger mt-2">{parameter}</div>}
    </>
  );
};

export default CreateBlog;
