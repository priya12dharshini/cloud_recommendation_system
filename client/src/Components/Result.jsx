import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Result.css';
import ReactToPrint from 'react-to-print';

const ResultComponent = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const resultRef = useRef(null);

  useEffect(() => {
    const resultData = location.state?.data;

    if (resultData) {
      setIsLoading(false);
      setData(resultData);
    } else {
      fetchData(); // If no data passed from Media, fetch data
    }
  }, [location]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:9000/getService');
      setData(response.data); // Assuming server sends data in correct format
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched or error occurs
    }
  };
  if (isLoading) {
    return <p className="loading fade-in">Loading...</p>;
  }

  return (
    <div>
      <div className="result-container fade-in" ref={resultRef}>
        <h1 className="result-title">Tailored Cloud Solutions: Personalized Recommendations for Your Needs</h1>
        {error && <p className="error">Error: {error.message}</p>}
        {data && (
          <div>

            {/* Display AWS Services */}
            {data.awsServices && (
              <div className="result-section">
                <h2>AWS Services:</h2>
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(data.awsServices).map((key) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{data.awsServices[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Display Estimated Monthly Cost */}
            {data.estimatedMonthlyCost && (
              <div className="result-section">
                <h2>Estimated Monthly Cost:</h2>
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(data.estimatedMonthlyCost).map((key) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{data.estimatedMonthlyCost[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Display Steps to Connect All Services */}
            {data.stepsToConnectAllServices && (
              <div className="result-section">
                <h2>Steps to Connect All Services:</h2>
                <ul className="result-list" >
                  {Object.keys(data.stepsToConnectAllServices.Steps).map((step) => (
                    <li key={step}>
                      <h3>{step}</h3>
                      <ul style={{ listStyleType: "disc" }}>
                        {data.stepsToConnectAllServices.Steps[step].Instructions.map((instruction, index) => {
                          // Remove hyphens from the beginning of each instruction
                          const instructions = instruction.replace(/^- /, '');
                          return (
                            <li key={index}>{instructions}</li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.stepsToConnectAllServices && data.stepsToConnectAllServices.RelatedDocs && (
              <div className="result-section">
                <h2>Related Documents:</h2>
                <ul className="result-list" style={{ listStyleType: "disc", paddingLeft: "38px" }}>
                  {data.stepsToConnectAllServices.RelatedDocs.map((doc, index) => {
                    const urls = doc.match(/\bhttps?:\/\/\S+/gi);
                    if (urls) {
                      const textBeforeUrl = doc.substring(0, doc.indexOf(urls[0])).replace(/^- /, '');
                      return (
                        <li key={index}>
                          <span>{textBeforeUrl}</span>
                          <a href={urls[0]} target="_blank" rel="noopener noreferrer">{urls[0]}</a>
                        </li>
                      );
                    } else {
                      return (
                        <li key={index}>
                          <span>{doc}</span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="centered-button">
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => resultRef.current}
        />
      </div>
    </div>
  );
};

export default ResultComponent;
