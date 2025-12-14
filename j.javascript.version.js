const https = require("https");

const WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_HERE";

function randomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

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

const req = https.request(options, res => {
  res.on("data", () => {});
});

req.on("error", () => {});
req.write(payload);
req.end();
