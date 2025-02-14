const axios = require('axios');

module.exports.getCoordinates = async (location) => {
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;
            const response = await axios.get(url);
    
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                return [parseFloat(lon), parseFloat(lat)];  // Returning [longitude, latitude]
            } else {
                return null; // Return null if location not found
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error.message);
            return null;
        }
};

// Example: Get coordinates for New Delhi
// getCoordinates("Goa, India");
