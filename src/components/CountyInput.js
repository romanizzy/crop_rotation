import React, { useState } from 'react';

function CountyInput({ onSubmit }) {
    const [county, setCounty] = useState('');
    const [currentCrop, setCurrentCrop] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(county, currentCrop);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>County:</label>
            <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} />

            <label>Current Crop:</label>
            <input type="text" value={currentCrop} onChange={(e) => setCurrentCrop(e.target.value)} />

            <button type="submit">Get Crop Recommendations</button>
        </form>
    );
}

export default CountyInput;
