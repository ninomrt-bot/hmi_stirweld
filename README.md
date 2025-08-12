# hmi_stirweld

Demo project showing a PLC bridge over WebSocket with a React/Next.js frontend.

## Structure
- `frontend/` – Next.js interface connecting to the PLC bridge.
- `plc-bridge/` – Node.js WebSocket server forwarding data to/from the PLC.

## Setup
1. Copy `.env.example` to `.env` in both `frontend/` and `plc-bridge/` and adjust values.
2. Install dependencies and start the bridge:
   ```bash
   cd plc-bridge
   npm install
   npm run dev
   ```
3. Install dependencies and start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open the frontend (default http://localhost:3000) – it connects to the bridge via WebSocket.

## Authentication
The WebSocket connection requires a JWT token. Generate one with the same `JWT_SECRET` as the bridge:
```bash
node -e "console.log(require('jsonwebtoken').sign({}, process.env.JWT_SECRET))"
```
Set this token in `frontend/.env` as `NEXT_PUBLIC_JWT_TOKEN`.

## Commands
The Control page exposes Start / Stop / Reset buttons that send commands directly to the PLC through the WebSocket.
