import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function CsvLoader({ filePath, onDataLoaded }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Update the path to your CSV file
        Papa.parse(filePath, {
            download: true,
            header: true,  // Assumes the CSV has headers
            complete: (results) => {
                console.log('Parsed CSV Results:', results);  // Log full parse results
                console.log('Parsed CSV Data:', results.data);  // Log just the data array
                setData(results.data);  // Store parsed data
                onDataLoaded(results.data);  // Pass data to parent component
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);  // Log parsing errors
            },
        });
    }, [filePath]);

    return null;
}

export default CsvLoader;
