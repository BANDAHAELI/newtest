
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import https from 'https';
import extract from 'extract-zip'; // ✅ ZIP Extractor
import { exec } from 'child_process';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const zipPath = path.join(__dirname, 'Sarkarorder.zip');
const extractPath = path.join(__dirname, 'joelXtec');
const FILE_URL = 'https://your-server.com/Sarkarorder.zip'; // 🔥 Replace with actual URL

// ✅ File Download System
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); // Delete partial file if error
            reject(err);
        });
    });
}

// ✅ Extract ZIP File
async function extractFile(zipPath, dest) {
    try {
        await extract(zipPath, { dir: dest });
        console.log("✅ File Extracted Successfully!");
    } catch (err) {
        console.error("❌ Error Extracting File:", err);
    }
}

// ✅ Initialize System
async function init() {
    console.log("📥 Downloading Required File...");
    await downloadFile(FILE_URL, zipPath);
    console.log("✅ File Downloaded Successfully!");

    console.log("📂 Extracting File...");
    await extractFile(zipPath, extractPath);

    console.log("🚀 Starting Main Bot...");
    exec('node main.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`⚠️ Warning: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
}

init();
