const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors'); // Importing CORS middleware
const { createPdf } = require('./pdfGenerator');

const app = express();
const PORT = 5000;

app.use(cors()); // Using CORS middleware
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

app.use('/generated-pdfs', express.static(path.join(__dirname, 'generated-pdfs')));
app.get("/", (req, res) => res.send("Express on Vercel"));
app.post('/generate-pdf', async (req, res) => {
    try {
        const pdfLink = await createPdf(req.body.data);
        res.json({ pdfLink });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
