import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import JoditEditor from "jodit-react";

export default function TestimonialUpdate() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const { testimonialid } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    name_bio: "",
    category: "",
    image: "",
    testimonial: "",
    isactive: false,
  });

  const callApiTestimonialList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}testimonials/fetchtestimonials_byid/${testimonialid}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (testimonialid) {
      callApiTestimonialList();
    }
  }, [testimonialid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleEditorChange = (newContent) => {
    setFormData((prevData) => ({ ...prevData, testimonial: newContent }));
  };

  const callApiUpdateTestimonial = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("name_bio", formData.name_bio);
      data.append("category", formData.category);
      data.append("testimonial", formData.testimonial);
      data.append("isactive", formData.isactive);

      if (imageFile) {
        data.append("image", imageFile);
      } else {
        data.append("image", formData.image);
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}testimonials/updatetestimonial/${testimonialid}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update testimonial.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update testimonial data?")) {
      await callApiUpdateTestimonial();
      toast.success("Testimonial updated successfully.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/testimonialsList");
      }, 2000);
    } else {
      toast.error("Testimonial not updated", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Update Testimonial</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="srno" className="form-label">
              Sr. No:
            </label>
            <input
              type="number"
              name="srno"
              className="form-control"
              value={formData.srno || ""}
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="testimonialid" className="form-label">
              Testimonial ID:
            </label>
            <input
              type="number"
              name="testimonialid"
              className="form-control"
              value={formData.testimonialid || ""}
              disabled
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
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name_bio" className="form-label">
              Name Bio:
            </label>
            <input
              type="text"
              name="name_bio"
              className="form-control"
              value={formData.name_bio}
              onChange={handleChange}
              placeholder="Name Bio"
            />
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
            <label htmlFor="image" className="form-label">
              Image URL:
            </label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={formData.image}
              onChange={handleChange}
            />
            <input
              type="file"
              name="imageFile"
              className="form-control mt-2"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="testimonial" className="form-label">
              Testimonial:
            </label>
            <JoditEditor
              ref={editor}
              value={formData.testimonial}
              name="testimonial"
              id="testimonial"
              className="form-control"
              onChange={handleEditorChange}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="isactive"
              className="form-check-input"
              checked={formData.isactive}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  isactive: e.target.checked,
                }))
              }
            />
            <label htmlFor="isactive" className="form-check-label">
              Is Active
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Update Testimonial
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}