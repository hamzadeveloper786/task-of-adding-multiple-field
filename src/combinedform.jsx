// src/CombinedForm.js
import React, { useState } from 'react';
import './App.css';

const CombinedForm = () => {
  const [isInformationSubmitted, setIsInformationSubmitted] = useState(false);
  const [vehicleCount, setVehicleCount] = useState(1);

  const addVehicle = () => {
    setVehicleCount((prevCount) => prevCount + 1);
  };

  const displayInvoice = () => {
    setIsInformationSubmitted(true);
  };

  const createTable = (formElements) => {
    const rows = [];
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].name) {
        rows.push(
          <tr key={i}>
            <td>{formElements[i].name}</td>
            <td>{formElements[i].value}</td>
          </tr>
        );
      }
    }
    return rows;
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Combined Information Form</h2>

      <form
        id="combinedForm"
        className="max-w-2xl mx-auto"
        onSubmit={(event) => {
          event.preventDefault();
          if (!isInformationSubmitted) {
            displayInvoice();
          }
        }}
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">User Information</h3>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" required className="input-field" />

          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" required className="input-field" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required className="input-field" />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Vehicle Information</h3>
          <div id="vehiclesContainer">
            {[...Array(vehicleCount)].map((_, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={`make${index + 1}`}>Make:</label>
                <input type="text" id={`make${index + 1}`} name="make" required className="input-field" />

                <label htmlFor={`model${index + 1}`}>Model:</label>
                <input type="text" id={`model${index + 1}`} name="model" required className="input-field" />

                <label htmlFor={`year${index + 1}`}>Year:</label>
                <input type="number" id={`year${index + 1}`} name="year" required className="input-field" />
              </div>
            ))}
          </div>

          <button type="button" onClick={addVehicle} className="btn-secondary mr-2">
            Add Another Vehicle
          </button>
          <button type="submit" className="btn-primary" disabled={isInformationSubmitted}>
            Submit All Information
          </button>
        </div>
      </form>

      <div id="invoiceContainer" className="max-w-2xl mx-auto mt-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Invoice</h2>

        <div id="userInformation"></div>
        <div id="vehicleInformation">
          {isInformationSubmitted && (
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200">Field</th>
                  <th className="py-2 px-4 bg-gray-200">Value</th>
                </tr>
              </thead>
              <tbody>
                {createTable(document.getElementById('combinedForm').elements)}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedForm;