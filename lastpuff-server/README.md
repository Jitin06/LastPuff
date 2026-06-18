# LAST PUFF — Email Server Setup

Sends a beautiful daily HTML report to your email at **11:59 PM every night**, automatically.

---

## One-Time Setup (takes 5 minutes)

### Step 1 — Install Node.js

Download from https://nodejs.org and install the **LTS version**.

Verify it works — open Command Prompt / Terminal and type:
```
node --version
```
You should see something like `v20.x.x`

---

### Step 2 — Install dependencies

Open Command Prompt inside the `lastpuff-server` folder:

```
cd path\to\lastpuff-server
npm install
```

This installs: nodemailer, node-cron, express, cors.

---

### Step 3 — Start the server

```
node server.js
```

You'll see:
```
╔══════════════════════════════════════╗
║     🚬  LAST PUFF SERVER  🚬          ║
║     Running on port 3000              ║
╚══════════════════════════════════════╝
```

Keep this terminal window open.

---

### Step 4 — Configure Gmail

Open `setup.html` in your browser (just double-click it).

You need a **Gmail App Password** (not your real password):

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** if not already on
3. Search for **"App Passwords"**
4. Create one — name it `Last Puff`
5. Copy the 16-character password

Enter your Gmail + App Password in setup.html and click **Save Configuration**.

Then click **Send Test Email Now** — check your inbox to confirm it works.

---

### Step 5 — Open the app

Open `lastpuff/index.html` in the same browser.

On the dashboard you'll see:
- **🟢 Email server on** — server is running, data is syncing
- **⚪ Email server off** — server isn't running (start it with `node server.js`)

Every time you log a cigarette, the app silently sends your data to the server.
At 11:59 PM the server sends the full HTML report to your email.

---

## Daily Routine

1. Open `lastpuff/index.html` in Chrome → log cigarettes during the day
2. Keep the `node server.js` terminal running in the background
3. At 11:59 PM → beautiful email arrives automatically

---

## Running Server in Background (Windows)

So you don't need to keep the terminal open:

```
npm install -g pm2
pm2 start server.js --name lastpuff
pm2 save
pm2 startup
```

Now the server auto-starts when your laptop boots.

---

## Folder Structure

```
lastpuff-server/
├── server.js          ← Main server (run this)
├── setup.html         ← Open in browser to configure Gmail
├── package.json       ← Dependencies
├── config.json        ← Gmail credentials (auto-created after setup)
└── lastpuff_data.json ← Your data backup (auto-created)

lastpuff/
├── index.html         ← The app (open this)
├── css/style.css
└── js/app.js
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Cannot reach server" in setup.html | Run `node server.js` first |
| Email not arriving | Check spam folder; verify App Password in setup.html |
| "Invalid login" error | Re-create App Password at myaccount.google.com |
| Server crashes | Run `node server.js` again |
| 🟢 turns ⚪ in app | Server stopped — restart it |

---

## Email won't send — common mistake

Make sure you're using an **App Password**, NOT your Gmail login password.
Your real password will always fail. App Password is the 16-letter one from Google Account settings.
