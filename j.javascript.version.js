console.log("Starting j.javascript.verison.js...")

console.log("Initializing package.json...");

const https = require("https");

console.log("Checking Webhook URL...");

const WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_HERE";

if (!WEBHOOK_URL.startsWith("https://discord.com/api/webhooks/")) {
  console.error("❌ Invalid webhook URL");
  process.exit(1);
}

function randomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

console.log("Generating fake Discord gift links...");

const links = [];
for (let i = 0; i < 29; i++) {
  links.push(`https://discord.gift/${randomCode()}`);
}

const payload = JSON.stringify({
  content: links.join("\n")
});

const url = new URL(WEBHOOK_URL);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload)
  }
};

console.log("Sending webhook request...");

const req = https.request(options, res => {
  if (res.statusCode >= 200 && res.statusCode < 300) {
    console.log("✅ Webhook sent successfully");
  } else {
    console.error(`❌ Webhook failed with status code: ${res.statusCode}`);
  }

  res.on("data", () => {});
});

req.on("error", err => {
  console.error("❌ Error sending webhook:", err.message);
});

req.write(payload);
req.end();
