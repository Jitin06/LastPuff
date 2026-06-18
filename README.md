# 🚬 LAST PUFF
### Smart Smoking Analytics & Reduction Platform

> Track every cigarette. Understand your triggers. Get a beautiful daily email report at 11:59 PM. Save 1 year of data. All on your own laptop.

---

## Table of Contents

- [What is Last Puff?](#what-is-last-puff)
- [Folder Structure](#folder-structure)
- [Running the App](#running-the-app)
- [Server Setup](#server-setup)
- [Gmail Setup](#gmail-setup)
- [Auto-Start on Windows Boot](#auto-start-on-windows-boot)
- [All Screens](#all-screens)
- [Logging Cigarettes](#logging-cigarettes)
- [Data & Storage](#data--storage)
- [Excel Export & Import](#excel-export--import)
- [Server API Reference](#server-api-reference)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

---

## What is Last Puff?

Last Puff is a personal smoking tracker that runs entirely on your laptop as a local HTML file. No subscription, no cloud, no account needed. Everything stays on your machine.

**Features:**
- Animated dashboard with progress ring, trigger bars, timeline, and weekly chart
- Log every cigarette with trigger, mood, and notes
- Money savings calculator (daily / weekly / yearly)
- Health milestone tracker
- Weekly grade (A+ to F) based on your performance
- Beautiful daily HTML email report auto-sent at **11:59 PM every night**
- All data saved in browser localStorage — persists across restarts
- Export full history to Excel (.xlsx) with 4 sheets
- Import Excel back into app to restore data

---

## Folder Structure

```
lastpuff-complete/
│
├── lastpuff/                        ← The web app (open index.html)
│   ├── index.html                   ← OPEN THIS in Chrome
│   ├── css/
│   │   └── style.css                ← All styling
│   ├── js/
│   │   └── app.js                   ← All logic + localStorage + Excel + server sync
│   ├── emails/
│   │   └── daily-report.html        ← Standalone email template (sample)
│   ├── lastpuff_data.xlsx           ← Sample Excel with 90 days of data
│   ├── README.html                  ← Full visual documentation (open in browser)
│   └── README.md                    ← This file
│
└── lastpuff-server/                 ← Email server (Node.js)
    ├── server.js                    ← Run: node server.js
    ├── setup.html                   ← Configure Gmail (open in browser)
    ├── package.json                 ← Dependencies
    ├── config.json                  ← Gmail credentials (auto-created after setup)
    └── lastpuff_data.json           ← Server-side data backup (auto-created)
```

> ⚠️ **Never delete `config.json` or `lastpuff_data.json`** — these hold your Gmail credentials and data backup. Everything else can be replaced.

---

## Running the App

The app is a plain HTML file. No installation, no build step.

**Steps:**

1. Unzip `lastpuff-complete.zip` anywhere on your laptop
2. Open the `lastpuff` folder
3. Double-click `index.html` — it opens in Chrome
4. Tap the animated cigarette on the landing screen
5. Fill in your profile → click **Start Tracking**

> ✅ **Always use the same browser (Chrome) and always open from the same folder path.** localStorage is tied to the browser and file path. Moving the folder or switching browsers means starting fresh.

---

## Server Setup

The server enables the daily 11:59 PM email. One-time setup only.

### Step 1 — Install Node.js

Download from [nodejs.org](https://nodejs.org) → click the **LTS** button → run the `.msi` installer → keep all defaults → Finish.

Close and reopen PowerShell, then verify:

```powershell
node --version
npm --version
```

Both should print version numbers like `v20.x.x`.

---

### Step 2 — Fix PowerShell Script Policy (one time only)

Open PowerShell **as Administrator** (right-click → Run as administrator):

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Type `Y` and press Enter when prompted.

---

### Step 3 — Install Dependencies

```powershell
cd C:\Users\jitin\Downloads\lastpuff-complete\lastpuff-server
npm install
```

You'll see "added 73 packages". Ignore any warnings — they are harmless.

---

### Step 4 — Start the Server

```powershell
node server.js
```

You should see:

```
╔══════════════════════════════════════╗
║     🚬  LAST PUFF SERVER  🚬          ║
║     Running on port 3000              ║
╚══════════════════════════════════════╝
```

The server is now running on `http://localhost:3000`.

---

## Gmail Setup

The server uses Gmail to send your daily report. You need a **Gmail App Password** — NOT your real Gmail password. It's a special 16-character code.

### Step 1 — Enable 2-Step Verification

Go to [myaccount.google.com/security](https://myaccount.google.com/security) → find **2-Step Verification** → turn it on.

### Step 2 — Create an App Password

On the same security page, search for **"App Passwords"** in the search bar.

- Click **Create a new App Password**
- Name it `Last Puff`
- Google shows a **16-character password** like `abcd efgh ijkl mnop`
- **Copy it — you only see it once**

### Step 3 — Open setup.html

Double-click `lastpuff-server → setup.html` in your browser (server must be running first).

- Enter your Gmail address
- Enter the App Password (spaces are fine)
- Click **Save Configuration**

### Step 4 — Send a Test Email

Click **"Send Test Email Now"** in setup.html.

Check your inbox — the full HTML report should arrive within 30 seconds. Check spam too.

---

### Sender vs Receiver

| Field | Where | Purpose |
|---|---|---|
| Gmail address | `setup.html` | The Gmail account that **sends** the email |
| App Password | `setup.html` | 16-char code that authenticates the sender |
| Report email | App onboarding screen | Where the daily report is **delivered** (any email) |

Both can be the same Gmail address — that's fine.

---

## Auto-Start on Windows Boot

Set this up once so the server runs automatically — no terminal needed ever again.

### Step 1 — Install PM2

Open PowerShell **as Administrator**:

```powershell
npm install -g pm2
```

### Step 2 — Register the Server with PM2

```powershell
pm2 start "C:\Users\jitin\Downloads\lastpuff-complete\lastpuff-server\server.js" --name lastpuff
pm2 save
```

### Step 3 — Create a Windows Task to Auto-Start

```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -Command `"pm2 resurrect`""
$trigger = New-ScheduledTaskTrigger -AtLogon
Register-ScheduledTask -TaskName "LastPuff Server" -Action $action -Trigger $trigger -RunLevel Highest -Force
```

Restart your laptop once. After boot, run `pm2 status` — **lastpuff** should show **online** automatically.

### PM2 Commands

| Command | What it does |
|---|---|
| `pm2 status` | Check if server is running |
| `pm2 stop lastpuff` | Stop the server |
| `pm2 restart lastpuff` | Restart the server |
| `pm2 logs lastpuff` | See server logs and email send history |

---

## All Screens

| Screen | How to reach | What it does |
|---|---|---|
| 🚬 Landing | Open the app | Tap the animated cigarette to begin. Green dot = saved data found |
| 📝 Onboarding | First launch | Set name, daily target, cost per cigarette, email, quit reason |
| 🏠 Dashboard | After onboarding | Progress ring, stats, trigger bars, today's timeline, weekly chart |
| 🚬 Log Cigarette | Tap 🚬 in bottom nav | Pick trigger + mood + notes → logs instantly |
| 📈 Analytics | Tap 📈 in bottom nav | Weekly chart, money savings, trigger breakdown, milestones, grade |
| ✉️ Email Preview | Tap ✉️ on dashboard | Preview tonight's report. Tap Send to deliver right now |

---

## Logging Cigarettes

Tap the orange **🚬** button in the bottom navigation from the dashboard.

| Field | Options | Required? |
|---|---|---|
| Trigger | Tea ☕ · Coding 💻 · Stress 😮‍💨 · Friends 👥 · Gaming 🎮 · Party 🍺 · Studying 📚 · Other ⚡ | Yes (Tea by default) |
| Mood | Calm 😌 · Stressed 😤 · Bored 😴 · Social 🥳 · Low 😔 | Yes (Calm by default) |
| Notes | Free text — "after lunch", "during coding session" | No |

After logging, a success animation plays and you return to the dashboard. The entry appears in the timeline immediately with an orange highlight. Tap **✕ remove** under any entry to delete it.

---

## Data & Storage

Three layers keep your data safe:

### 1. Browser localStorage — Primary

- Saves automatically on every cigarette log
- Persists across tab closes, browser closes, and laptop restarts
- Tied to Chrome + the exact file path of `index.html`
- Landing screen shows a **green dot** 🟢 when saved data is found

### 2. Server JSON — Backup

- `lastpuff_data.json` inside the server folder
- Updated silently every time you log a cigarette (when server is running)
- Used by the email system to build the nightly report

### 3. Excel Export — Manual Backup

- Export weekly from the dashboard using the **📥 Excel** button
- Full log history stored across 4 sheets
- Import back anytime using **📂 Import**

### Dashboard Indicators

| Indicator | Meaning |
|---|---|
| 🟢 Email server on | Server running, data syncing, email fires at 11:59 PM |
| ⚪ Email server off | Server not running — app works fine but no email tonight |
| 🟢 Green dot on landing screen | localStorage has your saved data from a previous session |

> ⚠️ **Data is lost if you clear browser cache.** Always export to Excel before clearing any browser data.

---

## Excel Export & Import

### Export

On the dashboard header, click **📥 Excel**.

A file named `lastpuff_2026-06-19.xlsx` downloads with all your data.

### Import

Click **📂 Import** → pick a previously exported `.xlsx` file → data restores instantly.

### Sheet Structure

| Sheet | Contents |
|---|---|
| 📋 Daily Logs | Every cigarette — date, day, time, trigger, mood, notes, sequence number |
| 📊 Daily Summary | One row per day — count, target, under/over, ₹ spent, ₹ saved, status |
| 📈 Triggers | All triggers ranked by frequency |
| ⚙️ Profile | Name, email, target, cost per cigarette, streak, export timestamp |

> 💡 Export to Excel every Sunday and save to Google Drive. This is your permanent 1-year archive.

---

## Server API Reference

The server runs on `http://localhost:3000`.

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/ping` | Health check — returns `ok` if server is running |
| POST | `/api/sync` | App pushes all data here after every cigarette log |
| GET | `/api/data` | Returns all stored data from the server |
| POST | `/api/config` | Saves Gmail credentials (used by setup.html) |
| POST | `/api/send-email` | Sends the daily report immediately |
| POST | `/api/test-email` | Same as send-email — used by the test button in setup.html |

The cron job fires at **23:59 IST (11:59 PM Asia/Kolkata)** every night. If the server is not running at that time, the email will not send for that day.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Cigarette click does nothing | Click the cigarette SVG directly, not the smoke around it. Try a single slow click. |
| Onboarding fields not editable | Click directly inside the input box. Refresh the page if still stuck. |
| Start Tracking doesn't navigate | Open browser console (F12 → Console tab) and share any red errors. |
| Data gone after reopening | You may have cleared cache, used a different browser, or moved the folder. Import from your Excel backup. |
| `npm` not recognized | Node.js not installed or PowerShell not restarted after install. Close and reopen PowerShell. |
| Scripts disabled error | Run: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| Email not arriving | Check spam. Make sure you used App Password (not real password) in setup.html. |
| Invalid login error in server | Re-create App Password at myaccount.google.com and save it again in setup.html. |
| ⚪ Email server off on dashboard | Server stopped. Run `pm2 restart lastpuff` or `node server.js` again. |
| `pm2-windows-startup` shows errored | Ignore it — use the Windows Task Scheduler method from the Auto-Start section. |
| Cigarette overlapping onboarding | Download the latest version — this bug was fixed in the final release. |

---

## FAQ

**Will my data still be there when I reopen the app?**
Yes — as long as you use Chrome and don't clear browser cache. localStorage persists across tab closes, browser closes, and laptop restarts.

**Do I need internet to use the app?**
No. The app runs completely offline. Only the nightly email and Google Fonts loading need internet.

**What if my laptop is off at 11:59 PM?**
The email won't send for that night. Keep your laptop on or in sleep mode (not shut down) for guaranteed nightly delivery.

**Do I need to open the terminal every day?**
No — after setting up PM2 + Windows Task Scheduler, the server starts silently every time you log into Windows. No terminal ever needed.

**Can I change my daily target or email later?**
Yes. Tap the cigarette on the landing screen → update any field → click Start Tracking. Your existing logs are preserved.

**Is my Gmail App Password stored securely?**
It's stored in `config.json` on your own laptop only — it never leaves your machine. The server only uses it to authenticate with Gmail SMTP at 11:59 PM.

**How do I completely reset everything?**
Open Chrome → F12 → Application tab → Local Storage → right-click → Clear. Also delete `lastpuff_data.json` from the server folder. Then reopen the app and go through onboarding again.

---

## Tech Stack

| Part | Technology |
|---|---|
| App UI | HTML + CSS + Vanilla JavaScript |
| Data persistence | Browser localStorage |
| Email sending | Node.js + Nodemailer (Gmail SMTP) |
| Email scheduling | node-cron (23:59 IST daily) |
| Server | Express.js |
| Excel read/write | SheetJS (xlsx) via CDN |
| Process manager | PM2 |
| Auto-start | Windows Task Scheduler |
| Fonts | Inter + Poppins (Google Fonts) |

---

## Daily Workflow

Once everything is set up:

1. Open `lastpuff/index.html` in Chrome
2. Tap 🚬 every time you smoke → pick trigger + mood → confirm
3. Check your dashboard anytime to see today's progress
4. At **11:59 PM** → beautiful HTML report lands in your inbox automatically
5. Every Sunday → click **📥 Excel** to back up your full history

---

*LAST PUFF — Track smarter. Smoke less. Live better.*
