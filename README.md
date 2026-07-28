# doQR

A QR code generator for the web. Paste a URL, get a scannable QR code, download it as a PNG image file.

Built with a React frontend and an Express backend.

## Project layout

```
client/    React app (create-react-app)
server/    Express API
```

## Requirements

Node.js 18 or newer. The server uses `node --watch` for its dev script, which needs 18.11+.

## Setup

Install dependencies for each half of the project separately:

```bash
cd server && npm install
cd ../client && npm install
```

## Running it

You need both processes running at once, so use two terminals.

Terminal 1, the API on port 5000:

```bash
cd server
npm run dev
```

Terminal 2, the React app on port 3000:

```bash
cd client
npm start
```

Then open http://localhost:3000.

The client's `package.json` sets `"proxy": "http://localhost:5000"`, so requests to `/api/*` from the dev server are forwarded to Express automatically. That's why the frontend can call `/api/generate` without a hostname.

## API

### `POST /api/generate`

Request body:

```json
{ "url": "https://example.com" }
```

Success responds with a base64 PNG data URL, ready to drop straight into an `<img src>`:

```json
{ "qrImage": "data:image/png;base64,..." }
```

Errors respond with `{ "error": "..." }` and status `400` for a missing or malformed URL, or `500` if generation itself fails. The URL must include its protocol — `example.com` is rejected, `https://example.com` is accepted.
