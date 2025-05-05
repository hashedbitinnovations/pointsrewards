import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreatePortfolio() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [isactive, setIsActive] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setShowCreateModal(false);

    
    if (!name || !title || !description || !category || !image || !url) {
      toast.error("Missing required parameters.", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("url", url);
    formData.append("isactive", isactive);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}portfolio/createPortfolio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Portfolio created successfully", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/portfolioList");
        }, 2000);
      } else {
        toast.error("Portfolio was not added", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("An error occurred while creating the portfolio.", {
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
      <h1>Create Portfolio</h1>
      <form onSubmit={handleSubmit} className="form-row">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            value={name}
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            value={description}
            name="description"
            id="description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            maxLength={255}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <input
            type="text"
            value={category}
            name="category"
            id="category"
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
            maxLength={50}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={handleImage}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL:
          </label>
          <input
            type="url"
            value={url}
            name="url"
            id="url"
            className="form-control"
            onChange={(e) => setUrl(e.target.value)}
            maxLength={255}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            checked={isactive}
            name="isactive"
            id="isactive"
            className="form-check-input"
            onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
          />
          <label htmlFor="isactive" className="form-check-label">
            Is Active
          </label>
        </div>
        <button type="submit" className="btn btn-success">
          Create Portfolio
        </button>
      </form>
      <ToastContainer />
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Portfolio</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to create this portfolio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleCreate} variant="primary">
            Create Portfolio
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
