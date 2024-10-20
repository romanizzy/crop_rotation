import React from 'react';

function CropCard({ crop }) {
    return (
        <div className="crop-card">
            <h3>{crop.name}</h3>
            <p>Planting Season: {crop.plantingSeason}</p>
            <p>Harvest Season: {crop.harvestSeason}</p>
        </div>
    );
}

export default CropCard;
