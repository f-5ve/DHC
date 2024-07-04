const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading template');
            return;
        }

        const today = new Date();
        const lastUpdated = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const htmlContent = data.replace('{{LAST_UPDATED}}', lastUpdated);
        res.send(htmlContent);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
