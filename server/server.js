import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import validator from "validator";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required:("});
        }

        if (!validator.isURL(url, {require_protocol: true})) {
            return res.status(400).json({error: "Invalid URL format. Include http:// or https://"})
        }

        const qrBuffer = await QRCode.toBuffer(url, {
            type: "jpeg",
            quality: 1.00,
            margin: 2, 
            width: 300
        });

        res.json({ qrImage });
        
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})