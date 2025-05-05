import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import JoditEditor from "jodit-react";

export default function CreateTestimonials() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [name, setName] = useState("");
  const [name_bio, setNameBio] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [testimonial, setTestimonial] = useState("");
  const [isactive, setIsActive] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setShowCreateModal(false);

    if (
      !name ||
      !name_bio ||
      !category ||
      !image ||
      !testimonial
    ) {
      toast.error("Missing required parameters.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("name_bio", name_bio);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("testimonial", testimonial);
    formData.append("isactive", isactive);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}testimonials/inserttestimonials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Testimonial created successfully", {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/testimonialsList");
        }, 2000);
      } else {
        toast.error("Testimonial was not added", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating the testimonial.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreateModal(true);
  };

  return (
    <>
      <div className="container mt-4">
        <h1>Add New Testimonial</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="name_bio">
              <Form.Label>Name Bio:</Form.Label>
              <Form.Control
                type="text"
                value={name_bio}
                onChange={(e) => setNameBio(e.target.value)}
                maxLength={100}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="category">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                maxLength={100}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="image">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImage}
              />
            </Form.Group>
          </Row>


          <Row className="mb-3">
            <Form.Group as={Col} controlId="testimonial">
              <Form.Label>Testimonial:</Form.Label>
              <Form.Control
                type="text"
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                maxLength={1000}
              />
            </Form.Group>

          </Row>

          <Form.Group className="mb-3" controlId="testimonial">
            <Form.Label>Testimonial:</Form.Label>
            <JoditEditor
              ref={editor}
              value={category!== 'testimonialvideo' ? testimonial : ''}
              onChange={newContent => setTestimonial(newContent)}
            />
          </Form.Group>

          <Form.Group controlId="isactive">
            <Form.Check
              type="checkbox"
              label="Is Active"
              checked={isactive === 1}
              onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Create Testimonial
          </Button>
        </Form>

        <ToastContainer />

        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Testimonial</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to create this testimonial?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Add New Testimonial
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}