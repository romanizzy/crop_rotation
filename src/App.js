import React, { useState } from 'react';
import CsvLoader from './components/CsvLoader';
import './App.css';


function App() {
  const [counties, setCounties] = useState([]);  // Store all counties from CSV
  const [crops, setCrops] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');  // Selected county
  const [selectedCrop, setSelectedCrop] = useState('');  // Selected crop type
  const [availableCrops, setAvailableCrops] = useState([]);  // Filtered crops

  // Log parsed CSV data to verify
  const handleDataLoaded = (csvData) => {
    console.log('Parsed CSV Data:', csvData);  // Log the parsed CSV data
    setCounties(csvData);  // Store parsed county data
  };

  const handleCropsDataLoaded = (csvData) => {
    console.log('Parsed Crops CSV Data:', csvData); // Log the parsed crops CSV data
    setCrops(csvData);  // Store parsed crops data
  }

  const handleCountyChange = (e) => {
    console.log('Selected County:', e.target.value);  // Log selected county
    setSelectedCounty(e.target.value);  // Update selected county
  };

  const handleCropChange = (e) => {
    console.log('Selected Crop:', e.target.value);  // Log selected crop type
    setSelectedCrop(e.target.value);  // Update selected crop type
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter the crops based on selected county and crop type
    const filteredCrops = counties.filter(county =>
      (selectedCounty === '' || county['County Name'] === selectedCounty) &&
      (selectedCrop === '' || county['Crop'] === selectedCrop)
    );
    setAvailableCrops(filteredCrops);  // Set the filtered crops to display
  };

  return (
    <div className="App">
      <header className="mission-statement">
        <h1>Welcome to the Texas Crop Rotation Planner</h1>
        <p>
          Our mission is to provide sustainable crop rotation recommendations to
          farmers across Texas, helping them optimize yield, protect the soil,
          and promote environmentally-friendly farming practices.
        </p>
      </header>

      {/* Load and parse the CSV data */}
      <CsvLoader 
        filePath='public/Counties for Texas Agricultural Statistical Districts.csv'
        onDataLoaded={handleDataLoaded} 
      />
      <CsvLoader 
        filePath='public/Crop Data.csv'
        onDataLoaded={handleDataLoaded} 
      />

      {/* Form for filtering crops */}
      <form onSubmit={handleSubmit} className="form-group">
        {/* Dropdown for county selection */}
        <label htmlFor="county-select" className="form-label">Select County:</label>
        <select id="county-select" value={selectedCounty} onChange={handleCountyChange} className="form-select">
          <option value="">--Choose a county--</option>
          {Array.from(new Set(counties.map(county => county['County Name']))).map((countyName, index) => (
            <option key={index} value={countyName}>
              {countyName}
            </option>
          ))}
        </select>

        {/* Dropdown for crop type selection */}
        <label htmlFor="crop-type-select" className="form-label">Select Crop Type:</label>
        <select id="crop-type-select" value={selectedCrop} onChange={handleCropChange} className="form-select">
          <option value="">--Choose a crop type--</option>
          {Array.from(new Set(counties.map(county => county['Crop Type']))).map((crop, index) => (
            <option key={index} value={crop}>
              {crop}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">Get Crop Recommendations</button>
      </form>

      {/* Display filtered crops */}
      {availableCrops.length > 0 && (
        <div>
          <h2>Available Crops</h2>
          <ul>
            {availableCrops.map((crop, index) => (
              <li key={index}>
                <h3>{crop.Crop}</h3>  {/* Display the crop name */}
                <p><strong>Type:</strong> {crop['Crop Type']}</p> {/* Display the crop type */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
