import React, { useState } from 'react';
import { generateCoverLetter } from './api/apiService';

const App = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { jobTitle, jobDescription };
        const result = await generateCoverLetter(data);
        setCoverLetter(result.coverLetter);
    };

    return (
        <div>
            <h1>Cover Letter Generator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <textarea
                    placeholder="Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <button type="submit">Generate</button>
            </form>
            {coverLetter && (
                <div>
                    <h2>Generated Cover Letter</h2>
                    <p>{coverLetter}</p>
                </div>
            )}
        </div>
    );
};

export default App;
