/*
 * Local enquiry mail helper for Travel Explorer.
 *
 * Run alongside the static site (`node mail-server.js`). The form in app.js
 * POSTs JSON to http://localhost:3000/send and this script delivers it via
 * SMTP using the credentials in .env.
 *
 * Required env vars (see .env.example):
 *   SMTP_HOST       e.g. smtp.gmail.com
 *   SMTP_PORT       e.g. 465
 *   SMTP_SECURE     "true" for 465, "false" for 587
 *   SMTP_USER       your sending address
 *   SMTP_PASS       app password (NOT your normal Google password)
 *   MAIL_TO         where enquiries should be delivered
 *   PORT            optional, defaults to 3000
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    let value = m[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}
loadEnv();

const {
  SMTP_HOST,
  SMTP_PORT = "465",
  SMTP_SECURE = "true",
  SMTP_USER,
  SMTP_PASS,
  MAIL_TO,
  PORT = "3000",
} = process.env;

for (const [k, v] of Object.entries({ SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_TO })) {
  if (!v) {
    console.error(`[mail-server] Missing required env var: ${k}. Copy .env.example to .env and fill it in.`);
    process.exit(1);
  }
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true",
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) {
        reject(new Error("payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function buildEmail(d) {
  const lines = [
    `Name: ${d.name || "-"}`,
    `Email: ${d.email || "-"}`,
    `Phone: ${d.phone || "-"}`,
    `Destination: ${d.destination || "-"}`,
    `Travel Date: ${d.travelDate || "-"}`,
    `Travellers: ${d.travellers || "-"}`,
    "",
    "Message:",
    d.message || "-",
  ];
  return {
    from: `Travel Explorer <${SMTP_USER}>`,
    to: MAIL_TO,
    replyTo: d.email,
    subject: `New Travel Explorer enquiry from ${d.name || "anonymous"}`,
    text: lines.join("\n"),
  };
}

const server = http.createServer(async (req, res) => {
  cors(res);

  if (req.method === "OPTIONS") { res.statusCode = 204; return res.end(); }
  if (req.method === "GET" && req.url === "/health") return send(res, 200, { ok: true });
  if (req.method !== "POST" || req.url !== "/send") return send(res, 404, { error: "not found" });

  try {
    const data = await readJsonBody(req);
    if (!data.name || !data.email || !data.message) {
      return send(res, 400, { error: "name, email, and message are required" });
    }
    const info = await transporter.sendMail(buildEmail(data));
    console.log(`[mail-server] sent ${info.messageId} -> ${MAIL_TO}`);
    send(res, 200, { ok: true });
  } catch (err) {
    console.error("[mail-server] send failed:", err.message);
    send(res, 500, { error: err.message });
  }
});

transporter.verify().then(
  () => {
    server.listen(Number(PORT), () => {
      console.log(`[mail-server] ready on http://localhost:${PORT} — forwarding to ${MAIL_TO}`);
    });
  },
  (err) => {
    console.error("[mail-server] SMTP verification failed:", err.message);
    process.exit(1);
  }
);
