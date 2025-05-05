import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}testimonials/fetchalltestimonials`
      );
      const updatedTestimonials = result.data.map((testimonial) => ({
        ...testimonial,
        image: `${process.env.REACT_APP_API_URL}${testimonial.image.replace(
          /\\/g,
          "/"
        )}`,
      }));
      setTestimonials(updatedTestimonials);
    };
    fetchTestimonials();
  }, []);

  const handleDelete = async (testimonial_id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}testimonials/deletetestimonial/${testimonial_id}`
      );

      setTestimonials(
        testimonials.filter(
          (testimonial) => testimonial.testimonialid !== testimonial_id
        )
      );

      setAlertMessage("Testimonial deleted successfully");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.log(error);
    }
  };

  const isArray = Array.isArray(testimonials);
  return (
    <div>
      {showAlert && (
                <div className="alert alert-success" role="alert">
                    {alertMessage}
                </div>
            )}
      <h1>Testimonials List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>SR No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>Name_bio</th>
            <th>Category</th>
            <th>Image</th>
            <th>Testimonial</th>
            <th>Isactive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isArray &&
            testimonials.map((testimonial, index) => (
              <tr key={testimonial.testimonialid}>
                <td>{index + 1}</td>
                <td>{testimonial.testimonialid}</td>
                <td>{testimonial.name}</td>
                <td>{testimonial.name_bio}</td>
                <td>{testimonial.category}</td>
                <td>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>{testimonial.testimonial}</td>
                <td>{testimonial.isactive}</td>
                <td>
                  <Link
                    to={`/testimonialUpdate/${testimonial.testimonialid}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(testimonial.testimonialid)}
                    className="ms-2 btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Link to={"/createTestimonials"} className="btn btn-success">
        Add new Testimonial
      </Link>
    </div>
  );
}
