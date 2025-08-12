import { Client } from "ads-client";          // ← nouveau nom
import { WebSocketServer } from "ws";

interface PlcMsg { tag: string; val: unknown }

(async () => {
  /* 1. Connexion ADS */
  const plc = new Client({
    targetAmsNetId: "169.254.47.152.1.1",
    targetAdsPort : 851,
    routerAddress : "192.168.128.123"
  });
  await plc.connect();

  /* 2. Variables suivies */
  const symbols = [
    "GVL.ToolTemp",
    "GVL.ToolTempDevice",
    "GVL.HeadTemp1",
    "GVL.HeadTemp2",
    "GVL.Force",
    "GVL.ZPosition",
    "GVL.RotationSpeed"
  ];

  /* 3. WebSocket broadcast */
  const wss = new WebSocketServer({ port: 8080 });
  const broadcast = (msg: PlcMsg) =>
    wss.clients.forEach(c =>
      c.readyState === 1 && c.send(JSON.stringify(msg))
    );

  /* 4. Souscriptions ADS */
  for (const s of symbols) {
    await plc.subscribe(s, (val: unknown) => broadcast({ tag: s, val }));
  }

  console.log("⇢ Bridge ADS → WS actif sur ws://localhost:8080");
})();
