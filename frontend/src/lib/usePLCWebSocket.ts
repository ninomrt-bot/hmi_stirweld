import { useEffect, useRef, useState } from 'react';

export interface PlcSample {
  [key: string]: unknown;
}

export function usePLCWebSocket() {
  const [lastSample, setLastSample] = useState<PlcSample | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const queueRef = useRef<string[]>([]);
  const token = process.env.NEXT_PUBLIC_JWT_TOKEN;
  const url = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';

  useEffect(() => {
    let stop = false;
    function connect() {
      if (stop) return;
      const ws = new WebSocket(`${url}?token=${token}`);
      wsRef.current = ws;
      ws.onopen = () => {
        queueRef.current.forEach((m) => ws.send(m));
        queueRef.current = [];
      };
      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === 'sample') {
            setLastSample(msg.data);
          }
        } catch {}
      };
      ws.onclose = () => {
        wsRef.current = null;
        setTimeout(connect, 1000);
      };
    }
    connect();
    return () => {
      stop = true;
      wsRef.current?.close();
    };
  }, [url, token]);

  function sendCommand(command: 'Start' | 'Stop' | 'Reset') {
    const msg = JSON.stringify({ type: 'command', command });
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(msg);
    else queueRef.current.push(msg);
  }

  return { lastSample, sendCommand };
}
