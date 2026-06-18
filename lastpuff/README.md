# LAST PUFF 🚬
### Smart Smoking Analytics & Reduction Platform

---

## How to Run (that's it, nothing to install)

1. Unzip the folder anywhere on your laptop
2. Double-click `index.html`
3. It opens in your browser — done ✅

**Always open from the same browser** (Chrome recommended) so your data stays saved.

---

## Files

```
lastpuff/
├── index.html           ← Open this in browser
├── css/style.css        ← All visual styling
├── js/app.js            ← All logic + localStorage + Excel
├── emails/
│   └── daily-report.html  ← Standalone email template
└── lastpuff_data.xlsx   ← Sample Excel data (90 days)
```

---

## Screens & What They Do

| Screen | How to reach | What it does |
|---|---|---|
| Landing | Open the app | Tap the cigarette to start |
| Onboarding | First time only | Set name, target, cost, email |
| Dashboard | After onboarding | See today's progress, timeline, stats |
| Log Cigarette | Tap 🚬 in nav | Select trigger + mood → logs instantly |
| Analytics | Tap 📈 in nav | Weekly chart, money savings, milestones |
| Email Preview | Tap ✉️ on dashboard | See your daily report, click Send |

---

## Data — Will My Data Be Saved?

**YES.** Data is saved automatically to your browser's localStorage every time you log a cigarette.

- Close tab → reopen `index.html` → **all data is there** ✅
- Restart laptop → reopen → **still there** ✅
- The landing screen shows a green dot 🟢 when saved data is found

**The only way data is lost:**
- You clear browser cache/history manually
- You switch to a different browser

---

## Excel Backup

On the dashboard header you'll see two buttons:

- **📥 Excel** — exports ALL your logs to a `.xlsx` file (save it to Google Drive)
- **📂 Import** — pick a previously exported file to restore your data

**Recommended:** Export to Excel every Sunday as a backup.

The exported Excel has 4 sheets:
- `📋 Daily Logs` — every cigarette with time, trigger, mood, notes
- `📊 Daily Summary` — one row per day
- `📈 Triggers` — trigger frequency ranking
- `⚙️ Profile` — your settings

---

## Editable Fields

All onboarding fields (name, target, cost, email) are fully editable.
If you want to change them later, just tap the cigarette on landing again.
Your logs are preserved — only your profile settings update.

---

## Tips

- Log every cigarette immediately for accurate data
- Check Analytics weekly to see your grade and trigger patterns
- Export Excel once a week as a backup
- The ✉️ button shows you exactly what your 11:59 PM daily email will look like
