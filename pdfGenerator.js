const fs = require('fs');
const path = require('path')
const ejs = require('ejs');
const htmlToPdf = require('html-pdf');

async function createPdf(data) {
    // Render HTML template using EJS
    const htmlTemplate = await ejs.renderFile('template.ejs', { data });

    // PDF generation options
    const pdfOptions = {
        format: 'Letter',
        orientation: 'portrait',
        border: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    };

    return new Promise((resolve, reject) => {
        // Generate PDF from HTML
        htmlToPdf.create(htmlTemplate, pdfOptions).toFile(`./generated-pdfs/${Date.now()}.pdf`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                const relativeUrl = `/generated-pdfs/${path.basename(res.filename)}`;
                resolve(relativeUrl);
            }
        });
    });
}

module.exports = { createPdf };
