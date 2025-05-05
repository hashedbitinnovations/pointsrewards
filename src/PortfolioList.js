import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    const fetchPortfolios = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}portfolio/getAllPortfolio`
      );
      const updatedPortfolio = result.data.map((portfolio) => ({
        ...portfolio,
        image: `${process.env.REACT_APP_API_URL}${portfolio.image.replace(
          /\\/g,
          "/"
        )}`,
      }));
      setPortfolios(updatedPortfolio);
    };

    fetchPortfolios();
  }, []);

  const handleDelete = async (portfolio_id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}portfolio/deletePortfolio`,
        { data: { portfolio_id } }
      );
      setPortfolios(
        portfolios.filter(
          (portfolio) => portfolio.portfolio_id !== portfolio_id
        )
      );
      setAlertMessage("Portfolio deleted successfully");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showAlert && (
        <div className="alert alert-success" role="alert">
            {alertMessage}
        </div>
    )}
      <h1>Portfolio List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>SR No.</th>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((portfolio, index) => (
            <tr key={portfolio.portfolio_id}>
              <td>{index + 1}</td>
              <td>{portfolio.portfolio_id}</td>
              <td>{portfolio.title}</td>
              <td>{portfolio.name}</td>
              <td>{portfolio.description}</td>
              <td>{portfolio.category}</td>
              <td>
              <img
                    src={portfolio.image}
                    alt={portfolio.name}
                    style={{ width: "80px", height: "80px" }}
                  />
              </td>
              <td>
                <a href={portfolio.url}>View</a>
              </td>
              <td>
                <Link
                  to={`/portfolioUpdate/${portfolio.portfolio_id}`}
                  className="ms-2 btn btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(portfolio.portfolio_id)}
                  className="ms-2 btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/createPortfolio"} className="btn btn-primary">
        Add new portfolio
      </Link>
    </div>
  );
}
