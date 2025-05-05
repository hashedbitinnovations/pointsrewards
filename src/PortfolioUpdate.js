import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PortfolioUpdate() {
  const navigate = useNavigate();
  const { portfolio_id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    portfolio_id: "",
    title: "",
    name: "",
    description: "",
    category: "",
    image: "",
    url: "",
    isactive: false,
  });
  useEffect(() => {
    if (portfolio_id) {
      callApiPortfolioList();
    }
  }, [portfolio_id]);

  const callApiPortfolioList = async () => {
    try {
      console.log("Calling API with portfolio_id:", portfolio_id);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}portfolio/getPortfolioFromID/${portfolio_id}`
      );
      console.log("API response:", response.data);
      setFormData(response.data);
    } catch (err) {
      console.error("API call error:", err);
      toast.error("Failed to fetch portfolio data", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const callApiUpdatePortfolio = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("isactive", formData.isactive);
  
      // Append image file if selected, otherwise append the old image URL
      if (imageFile) {
        data.append("image", imageFile);
      } else {
        data.append("image", formData.image || ""); // Ensure empty string if no image URL
      }
  
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}portfolio/updatePortfolio/${formData.portfolio_id}`, // Include portfolio_id in URL
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("API response:", response.data);
  
      toast.success("Portfolio updated successfully.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/portfolioList");
      }, 2000);
    } catch (err) {
      console.error("Failed to update portfolio:", err);
      toast.error("Failed to update portfolio", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update portfolio data?")) {
      callApiUpdatePortfolio();
    } else {
      toast.error("Portfolio not updated", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  

  return (
    <>
      <div className="container mt-5">
        <h1>Update Portfolio</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="portfolio_id" className="form-label">
              Portfolio ID:
            </label>
            <input
              type="text"
              name="portfolio_id"
              className="form-control"
              value={formData.portfolio_id}
              onChange={handleChange}
              placeholder="Portfolio ID"
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              Image URL:
            </label>
            <input
              type="text"
              name="url"
              className="form-control"
              value={formData.url}
              onChange={handleChange}
              placeholder="Image URL"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image:
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="isactive"
              className="form-check-input"
              checked={formData.isactive}
              onChange={handleChange}
            />
            <label htmlFor="isactive" className="form-check-label">
              Is Active
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Update Portfolio
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
