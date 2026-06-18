/* ═══════════════════════════════════════════════════════
   LAST PUFF — Backend Server
   • Express API so the app can POST data to this server
   • Nodemailer to send Gmail
   • node-cron to schedule 11:59 PM daily email
   Run: node server.js
═══════════════════════════════════════════════════════ */

const express    = require('express');
const nodemailer = require('nodemailer');
const cron       = require('node-cron');
const cors       = require('cors');
const fs         = require('fs');
const path       = require('path');

const app  = express();
const PORT = 3000;

// ── Middleware ────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// ── Config file (created on first run) ───────────────
const CONFIG_FILE = path.join(__dirname, 'config.json');

function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  try { return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); }
  catch(e) { return null; }
}

function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2));
}

// ── Data store (in-memory + file backup) ─────────────
const DATA_FILE = path.join(__dirname, 'lastpuff_data.json');

let appData = {
  profile: { name: '', email: '', target: 5, cost: 12, reason: '', streak: 0 },
  logs: [],
  allLogs: [],
  triggers: [],
  weekData: [0,0,0,0,0,0,0],
  lastUpdated: null
};

function loadData() {
  if (!fs.existsSync(DATA_FILE)) return;
  try { appData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch(e) { console.log('No data file yet, starting fresh.'); }
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(appData, null, 2));
}

loadData();

// ── Nodemailer transporter ────────────────────────────
function createTransporter(config) {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmailUser,
      pass: config.gmailAppPassword   // Gmail App Password (not your real password)
    }
  });
}

// ── Build the HTML email ──────────────────────────────
function buildEmail(data) {
  const profile  = data.profile || {};
  const logs     = data.logs    || [];
  const today    = new Date().toISOString().slice(0, 10);
  const todayLogs= data.allLogs ? data.allLogs.filter(l => l.date === today) : logs;

  const count    = todayLogs.length;
  const target   = profile.target || 5;
  const cost     = profile.cost   || 12;
  const name     = profile.name   || 'Friend';
  const pct      = target > 0 ? Math.round(count / target * 100) : 0;
  const spent    = count * cost;
  const saved    = Math.max((target - count) * cost, 0);

  // triggers
  const trigCounts = {};
  todayLogs.forEach(l => { const t = l.trigger||'Other'; trigCounts[t]=(trigCounts[t]||0)+1; });
  const topTrig = Object.entries(trigCounts).sort((a,b)=>b[1]-a[1])[0];

  // status
  let headerBg    = 'linear-gradient(135deg,#14532d,#16a34a)';
  let statusBg    = '#dcfce7';
  let statusColor = '#16a34a';
  let statusMsg   = `Great job today, ${name}! You stayed under your daily target.`;
  let statusIcon  = '🎉';

  if (count >= target && count > 0) {
    headerBg    = 'linear-gradient(135deg,#7f1d1d,#dc2626)';
    statusBg    = '#fee2e2';
    statusColor = '#dc2626';
    statusMsg   = `You exceeded today's goal, ${name}. Tomorrow is a fresh start — no guilt.`;
    statusIcon  = '💪';
  } else if (target > 0 && count >= target * 0.8) {
    headerBg    = 'linear-gradient(135deg,#78350f,#d97706)';
    statusBg    = '#fef3c7';
    statusColor = '#d97706';
    statusMsg   = `Almost at your limit today, ${name}. Stay strong for the rest of the night.`;
    statusIcon  = '⚠️';
  }

  // timeline rows
  const tlRows = todayLogs.length > 0
    ? todayLogs.map(l => `
        <tr style="border-top:1px solid #f3f4f6;">
          <td style="padding:10px 10px;font-size:13px;color:#6b7280;">${l.time||''}</td>
          <td style="padding:10px 10px;font-size:13px;">${l.icon||'🚬'} ${l.trigger||''}</td>
          <td style="padding:10px 10px;font-size:15px;">${l.mood||''}</td>
          <td style="padding:10px 10px;font-size:12px;color:#9ca3af;font-style:italic;">${l.note||'—'}</td>
        </tr>`).join('')
    : `<tr><td colspan="4" style="padding:16px;text-align:center;color:#9ca3af;font-size:13px;">No cigarettes logged today 🎉</td></tr>`;

  const now   = new Date();
  const days  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months= ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:520px;margin:24px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.1);">

  <!-- Header -->
  <div style="background:${headerBg};padding:32px 28px;text-align:center;">
    <div style="font-size:28px;font-weight:900;letter-spacing:5px;color:#fff;margin-bottom:4px;">
      LAST<span style="color:rgba(255,255,255,0.45)">PUFF</span>
    </div>
    <div style="font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:3px;margin-bottom:20px;">DAILY REPORT · ${dateStr.toUpperCase()}</div>
    <div style="background:rgba(255,255,255,0.12);border-radius:16px;padding:18px 20px;">
      <div style="font-size:30px;margin-bottom:8px;">${statusIcon}</div>
      <div style="font-size:17px;font-weight:700;color:#fff;line-height:1.4;">${statusMsg}</div>
    </div>
  </div>

  <!-- Status bar -->
  <div style="background:${statusBg};padding:14px 28px;border-bottom:1px solid #e5e7eb;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="font-size:12px;color:${statusColor};font-weight:600;">Daily progress</span>
      <span style="font-size:12px;color:${statusColor};font-weight:700;">${count} / ${target} cigarettes</span>
    </div>
    <div style="background:rgba(0,0,0,0.1);border-radius:6px;height:10px;overflow:hidden;">
      <div style="background:${statusColor};height:100%;width:${Math.min(pct,100)}%;border-radius:6px;"></div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding:24px 24px 8px;">

    <!-- 3 stat cards -->
    <table style="width:100%;border-collapse:separate;border-spacing:8px;margin-bottom:4px;">
      <tr>
        <td style="background:#f9fafb;border-radius:12px;padding:16px;text-align:center;width:33%;">
          <div style="font-size:30px;font-weight:800;color:#111;">${count}</div>
          <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-top:3px;">Smoked</div>
        </td>
        <td style="background:${count<=target?'#f0fdf4':'#fff1f2'};border:1px solid ${count<=target?'#bbf7d0':'#fecdd3'};border-radius:12px;padding:16px;text-align:center;width:33%;">
          <div style="font-size:30px;font-weight:800;color:${statusColor};">${target}</div>
          <div style="font-size:10px;color:${statusColor};text-transform:uppercase;letter-spacing:1px;margin-top:3px;opacity:0.7;">Target</div>
        </td>
        <td style="background:#f9fafb;border-radius:12px;padding:16px;text-align:center;width:33%;">
          <div style="font-size:30px;font-weight:800;color:#111;">${profile.streak||0}🔥</div>
          <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-top:3px;">Streak</div>
        </td>
      </tr>
    </table>

    <!-- Money -->
    <table style="width:100%;border-collapse:separate;border-spacing:8px;margin-bottom:16px;">
      <tr>
        <td style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:14px;width:50%;">
          <div style="font-size:10px;color:#c2410c;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;">💸 Spent today</div>
          <div style="font-size:24px;font-weight:800;color:#9a3412;">₹${spent}</div>
          <div style="font-size:11px;color:#f97316;margin-top:3px;">${count} × ₹${cost}</div>
        </td>
        <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px;width:50%;">
          <div style="font-size:10px;color:#15803d;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;">💚 Saved today</div>
          <div style="font-size:24px;font-weight:800;color:#166534;">₹${saved}</div>
          <div style="font-size:11px;color:#22c55e;margin-top:3px;">${Math.max(target-count,0)} cigarettes avoided</div>
        </td>
      </tr>
    </table>

    ${topTrig ? `
    <!-- Top trigger -->
    <div style="background:#fffbeb;border-left:4px solid #ff5e1a;border-radius:0 12px 12px 0;padding:14px 16px;margin-bottom:16px;">
      <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;">🔥 Top trigger today</div>
      <div style="font-size:16px;font-weight:700;color:#111;">${topTrig[0]}</div>
      <div style="font-size:12px;color:#6b7280;margin-top:3px;">${Math.round(topTrig[1]/count*100)}% of today's cigarettes</div>
    </div>` : ''}

    <!-- Timeline -->
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#374151;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #f3f4f6;">
        📋 Today's Timeline
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:8px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;">Time</th>
            <th style="padding:8px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;">Trigger</th>
            <th style="padding:8px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;">Mood</th>
            <th style="padding:8px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;">Note</th>
          </tr>
        </thead>
        <tbody>${tlRows}</tbody>
      </table>
    </div>

    <!-- Quote -->
    <div style="background:linear-gradient(135deg,#0a0a0a,#1a1a1a);border-radius:14px;padding:20px;text-align:center;margin-bottom:20px;">
      <div style="font-size:20px;margin-bottom:8px;">💡</div>
      <div style="font-size:14px;color:#e5e7eb;line-height:1.7;font-style:italic;">
        "${count <= target
          ? `You avoided ${Math.max(target-count,0)} cigarette${target-count!==1?'s':''} today. That's ₹${saved} saved and one step closer to quitting.`
          : `Every cigarette you don't light tomorrow is a real win. No guilt — just awareness and forward motion.`}"
      </div>
    </div>

    <!-- Tomorrow -->
    <div style="text-align:center;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:20px;margin-bottom:8px;">
      <div style="font-size:10px;color:#c2410c;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Tomorrow's Target</div>
      <div style="font-size:48px;font-weight:900;color:#ff5e1a;line-height:1;">${Math.max(target-1,1)}</div>
      <div style="font-size:12px;color:#9a3412;margin-top:6px;">cigarettes · reducing by 1 each week</div>
    </div>

  </div>

  <!-- Footer -->
  <div style="background:#0a0a0a;padding:24px;text-align:center;">
    <div style="font-size:20px;font-weight:900;letter-spacing:4px;color:#f5f0e8;margin-bottom:8px;">
      LAST<span style="color:#ff5e1a">PUFF</span>
    </div>
    <div style="font-size:11px;color:#555;line-height:1.8;">
      Track smarter. Smoke less. Live better.<br/>
      Auto-sent at 11:59 PM · ${dateStr}
    </div>
    <div style="font-size:10px;color:#333;margin-top:8px;">
      Sent to: ${profile.email||''}
    </div>
  </div>

</div>
</body>
</html>`;
}

// ── Send email function ───────────────────────────────
async function sendDailyEmail() {
  const config = loadConfig();
  if (!config || !config.gmailUser || !config.gmailAppPassword) {
    console.log('[LAST PUFF] ⚠️  Email not configured. Run setup first.');
    return;
  }

  const to = appData.profile?.email;
  if (!to) {
    console.log('[LAST PUFF] ⚠️  No recipient email in app data.');
    return;
  }

  const count  = (appData.logs || []).length;
  const target = appData.profile?.target || 5;
  const subject = count <= target
    ? `🟢 Last Puff Report — Great day! ${count}/${target} cigarettes`
    : count <= target * 1.2
    ? `🟡 Last Puff Report — Almost there. ${count}/${target} cigarettes`
    : `🔴 Last Puff Report — Over target today. ${count}/${target} cigarettes`;

  try {
    const transporter = createTransporter(config);
    await transporter.sendMail({
      from: `"Last Puff" <${config.gmailUser}>`,
      to,
      subject,
      html: buildEmail(appData)
    });
    console.log(`[LAST PUFF] ✅ Daily report sent to ${to} at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('[LAST PUFF] ❌ Email failed:', err.message);
  }
}

// ── Cron: every day at 11:59 PM ──────────────────────
cron.schedule('59 23 * * *', () => {
  console.log('[LAST PUFF] ⏰ Sending daily report...');
  sendDailyEmail();
}, { timezone: 'Asia/Kolkata' });

console.log('[LAST PUFF] ⏰ Scheduler active — daily email will fire at 11:59 PM IST');

// ── API Routes ────────────────────────────────────────

// Health check
app.get('/ping', (req, res) => {
  res.json({ status: 'ok', message: 'Last Puff server running 🚬' });
});

// App pushes data here whenever user logs a cigarette
app.post('/api/sync', (req, res) => {
  try {
    const { profile, logs, allLogs, triggers, weekData } = req.body;
    if (profile)  appData.profile  = profile;
    if (logs)     appData.logs     = logs;
    if (allLogs)  appData.allLogs  = allLogs;
    if (triggers) appData.triggers = triggers;
    if (weekData) appData.weekData = weekData;
    appData.lastUpdated = new Date().toISOString();
    saveData();
    console.log(`[LAST PUFF] 📥 Data synced — ${(allLogs||logs||[]).length} total logs`);
    res.json({ ok: true, message: 'Synced', count: (allLogs||logs||[]).length });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Get current data
app.get('/api/data', (req, res) => {
  res.json(appData);
});

// Send email immediately (manual trigger from app)
app.post('/api/send-email', async (req, res) => {
  try {
    await sendDailyEmail();
    res.json({ ok: true, message: 'Email sent!' });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Save config (Gmail credentials)
app.post('/api/config', (req, res) => {
  try {
    const { gmailUser, gmailAppPassword } = req.body;
    if (!gmailUser || !gmailAppPassword) {
      return res.status(400).json({ ok: false, error: 'Both gmailUser and gmailAppPassword required' });
    }
    saveConfig({ gmailUser, gmailAppPassword });
    console.log(`[LAST PUFF] ✅ Gmail configured: ${gmailUser}`);
    res.json({ ok: true, message: 'Gmail configured!' });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Test email (send one right now to verify setup)
app.post('/api/test-email', async (req, res) => {
  try {
    await sendDailyEmail();
    res.json({ ok: true, message: 'Test email sent! Check your inbox.' });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Start server ──────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════╗');
  console.log('║     🚬  LAST PUFF SERVER  🚬          ║');
  console.log(`║     Running on port ${PORT}              ║`);
  console.log('╚══════════════════════════════════════╝');
  console.log('');
  console.log('📋 API endpoints:');
  console.log(`   GET  http://localhost:${PORT}/ping`);
  console.log(`   POST http://localhost:${PORT}/api/sync       ← app syncs data here`);
  console.log(`   POST http://localhost:${PORT}/api/config     ← save Gmail credentials`);
  console.log(`   POST http://localhost:${PORT}/api/test-email ← send test email now`);
  console.log('');

  const config = loadConfig();
  if (!config) {
    console.log('⚠️  Gmail not configured yet!');
    console.log('   Open setup.html in your browser to configure Gmail.');
    console.log('');
  } else {
    console.log(`✅ Gmail configured: ${config.gmailUser}`);
    console.log('   Daily email will send at 11:59 PM IST automatically.');
    console.log('');
  }
});
