import React from 'react';
import CropCard from './CropCard';

function CropRecommendations({ crops }) {
    return (
        <div>
            <h2>Recommended Crops</h2>
            <div className="crop-list">
                {crops.map((crop) => (
                    <CropCard key={crop.id} crop={crop} />
                ))}
            </div>
        </div>
    );
}

export default CropRecommendations;
