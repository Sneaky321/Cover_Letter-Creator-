import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const generateCoverLetter = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/generate`, data);
        return response.data;
    } catch (error) {
        console.error('Error generating cover letter:', error);
        throw error;
    }
};
