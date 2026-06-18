<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>LAST PUFF — Documentation</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --ember:#ff5e1a;--ember-lt:#ff8c4a;
  --cream:#f5f0e8;--bg:#080808;--bg1:#0f0f0f;--bg2:#141414;--bg3:#1c1c1c;
  --border:#1e1e1e;--muted:#666;--green:#5ecf5e;--amber:#ffcc44;--red:#e24b4a;
  --font:'Inter',sans-serif;--font-hd:'Poppins',sans-serif;--mono:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth;}
body{font-family:var(--font);background:var(--bg);color:var(--cream);line-height:1.7;font-size:15px;}

/* ── Sidebar ── */
.layout{display:flex;min-height:100vh;}
.sidebar{
  width:240px;flex-shrink:0;background:var(--bg1);border-right:1px solid var(--border);
  position:fixed;top:0;left:0;bottom:0;overflow-y:auto;padding:28px 0;
}
.sidebar::-webkit-scrollbar{width:3px;}
.sidebar::-webkit-scrollbar-thumb{background:#222;}
.sidebar-logo{padding:0 20px 24px;border-bottom:1px solid var(--border);margin-bottom:16px;}
.sidebar-logo .mark{font-family:var(--font-hd);font-size:20px;font-weight:800;letter-spacing:3px;}
.sidebar-logo .mark span{color:var(--ember);}
.sidebar-logo .version{font-size:11px;color:#444;margin-top:3px;}
.nav-section{font-size:10px;color:#444;letter-spacing:1.5px;text-transform:uppercase;padding:12px 20px 6px;}
.nav-link{display:block;padding:7px 20px;font-size:13px;color:#666;text-decoration:none;transition:all 0.15s;border-left:2px solid transparent;}
.nav-link:hover{color:var(--cream);background:var(--bg2);}
.nav-link.active{color:var(--ember);border-left-color:var(--ember);background:rgba(255,94,26,0.05);}

/* ── Main content ── */
.main{margin-left:240px;max-width:820px;padding:48px 52px 80px;}

/* ── Hero ── */
.hero{margin-bottom:56px;padding-bottom:40px;border-bottom:1px solid var(--border);}
.hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,94,26,0.1);border:1px solid rgba(255,94,26,0.25);border-radius:20px;padding:4px 14px;font-size:11px;color:var(--ember);letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;}
.hero-title{font-family:var(--font-hd);font-size:48px;font-weight:800;letter-spacing:2px;line-height:1.1;margin-bottom:12px;}
.hero-title span{color:var(--ember);}
.hero-sub{font-size:17px;color:#888;margin-bottom:28px;max-width:520px;line-height:1.6;}
.hero-chips{display:flex;gap:10px;flex-wrap:wrap;}
.chip{background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:5px 14px;font-size:12px;color:#888;}
.chip.green{border-color:rgba(94,207,94,0.25);color:var(--green);background:rgba(94,207,94,0.06);}
.chip.ember{border-color:rgba(255,94,26,0.25);color:var(--ember);background:rgba(255,94,26,0.06);}

/* ── Sections ── */
.section{margin-bottom:52px;scroll-margin-top:32px;}
h2{font-family:var(--font-hd);font-size:24px;font-weight:700;color:var(--cream);margin-bottom:6px;display:flex;align-items:center;gap:10px;}
h2 .icon{font-size:20px;}
.section-sub{font-size:13px;color:var(--muted);margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border);}
h3{font-size:16px;font-weight:600;color:var(--cream);margin:24px 0 10px;}
p{color:#aaa;margin-bottom:14px;line-height:1.75;}
p strong{color:var(--cream);font-weight:500;}

/* ── Steps ── */
.steps{display:flex;flex-direction:column;gap:0;}
.step{display:flex;gap:20px;padding:20px 0;border-bottom:1px solid #111;}
.step:last-child{border-bottom:none;}
.step-num{
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,var(--ember),#cc3d0a);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--font-hd);font-size:14px;font-weight:700;color:white;
  flex-shrink:0;margin-top:2px;
}
.step-body h3{margin:0 0 6px;}
.step-body p{margin:0;font-size:14px;}
.step-body p+p{margin-top:8px;}

/* ── Code blocks ── */
.code-block{background:var(--bg1);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin:14px 0;}
.code-header{background:var(--bg2);padding:10px 16px;font-size:11px;color:#555;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
.code-header .copy-btn{background:none;border:1px solid #333;border-radius:6px;padding:3px 10px;color:#666;font-size:10px;cursor:pointer;font-family:var(--font);transition:all 0.15s;}
.code-header .copy-btn:hover{border-color:#555;color:var(--cream);}
pre{padding:18px;overflow-x:auto;font-family:var(--mono);font-size:13px;line-height:1.65;color:#ccc;}
pre::-webkit-scrollbar{height:4px;}
pre::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px;}
code.inline{font-family:var(--mono);font-size:12px;background:var(--bg2);border:1px solid var(--border);padding:2px 8px;border-radius:5px;color:var(--ember-lt);}

/* ── Cards ── */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0;}
.card{background:var(--bg1);border:1px solid var(--border);border-radius:14px;padding:18px;}
.card-icon{font-size:24px;margin-bottom:10px;}
.card-title{font-size:13px;font-weight:600;color:var(--cream);margin-bottom:5px;}
.card-body{font-size:12px;color:#666;line-height:1.6;}
.card.green{border-color:rgba(94,207,94,0.2);}
.card.ember{border-color:rgba(255,94,26,0.2);}
.card.amber{border-color:rgba(255,204,68,0.2);}

/* ── Alert boxes ── */
.alert{border-radius:12px;padding:16px 18px;margin:16px 0;display:flex;gap:12px;align-items:flex-start;}
.alert.info {background:rgba(94,94,255,0.07);border:1px solid rgba(94,94,255,0.2);}
.alert.warn {background:rgba(255,204,68,0.07);border:1px solid rgba(255,204,68,0.2);}
.alert.danger{background:rgba(226,75,74,0.07);border:1px solid rgba(226,75,74,0.2);}
.alert.ok  {background:rgba(94,207,94,0.07);border:1px solid rgba(94,207,94,0.2);}
.alert-icon{font-size:18px;flex-shrink:0;margin-top:1px;}
.alert-body{font-size:13px;line-height:1.65;}
.alert.info  .alert-body{color:#aaaaff;}
.alert.warn  .alert-body{color:#ffcc44;}
.alert.danger .alert-body{color:#f08080;}
.alert.ok    .alert-body{color:#5ecf5e;}
.alert-body strong{font-weight:600;}

/* ── Table ── */
.tbl{width:100%;border-collapse:collapse;margin:16px 0;font-size:13px;}
.tbl th{text-align:left;padding:10px 14px;font-size:10px;color:#555;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid var(--border);}
.tbl td{padding:12px 14px;border-bottom:1px solid #111;color:#aaa;vertical-align:top;}
.tbl td:first-child{color:var(--cream);font-weight:500;white-space:nowrap;}
.tbl tr:last-child td{border-bottom:none;}
.tbl tr:hover td{background:var(--bg2);}

/* ── File tree ── */
.tree{background:var(--bg1);border:1px solid var(--border);border-radius:12px;padding:20px;font-family:var(--mono);font-size:13px;line-height:2;margin:14px 0;}
.tree .folder{color:var(--ember-lt);}
.tree .file{color:#888;}
.tree .comment{color:#444;}
.tree .highlight{color:var(--green);}

/* ── Status indicators ── */
.status-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #0f0f0f;}
.status-row:last-child{border-bottom:none;}
.dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
.dot.green{background:var(--green);box-shadow:0 0 6px rgba(94,207,94,0.5);}
.dot.red{background:var(--red);}
.dot.amber{background:var(--amber);}
.status-label{font-size:13px;color:var(--cream);flex:1;}
.status-note{font-size:12px;color:#555;}

/* ── FAQ ── */
.faq-item{border-bottom:1px solid var(--border);padding:18px 0;}
.faq-item:last-child{border-bottom:none;}
.faq-q{font-size:14px;font-weight:600;color:var(--cream);margin-bottom:8px;}
.faq-a{font-size:13px;color:#888;line-height:1.7;}

/* ── Footer ── */
.footer{margin-top:64px;padding-top:28px;border-top:1px solid var(--border);text-align:center;}
.footer-logo{font-family:var(--font-hd);font-size:22px;font-weight:800;letter-spacing:4px;margin-bottom:8px;}
.footer-logo span{color:var(--ember);}
.footer-sub{font-size:12px;color:#444;}

@media(max-width:768px){
  .sidebar{display:none;}
  .main{margin-left:0;padding:28px 20px 60px;}
  .hero-title{font-size:32px;}
}
</style>
</head>
<body>

<!-- Sidebar -->
<aside class="sidebar">
  <div class="sidebar-logo">
    <div class="mark">LAST<span>PUFF</span></div>
    <div class="version">Documentation v1.0</div>
  </div>
  <div class="nav-section">Getting Started</div>
  <a class="nav-link active" href="#overview">Overview</a>
  <a class="nav-link" href="#structure">Folder Structure</a>
  <a class="nav-link" href="#running-app">Running the App</a>

  <div class="nav-section">Email Server</div>
  <a class="nav-link" href="#server-setup">Server Setup</a>
  <a class="nav-link" href="#gmail-setup">Gmail Setup</a>
  <a class="nav-link" href="#autostart">Auto-Start on Boot</a>

  <div class="nav-section">Using the App</div>
  <a class="nav-link" href="#screens">All Screens</a>
  <a class="nav-link" href="#logging">Logging Cigarettes</a>
  <a class="nav-link" href="#data">Data & Storage</a>
  <a class="nav-link" href="#excel">Excel Export</a>

  <div class="nav-section">Reference</div>
  <a class="nav-link" href="#api">Server API</a>
  <a class="nav-link" href="#troubleshoot">Troubleshooting</a>
  <a class="nav-link" href="#faq">FAQ</a>
</aside>

<!-- Main -->
<main class="main">

  <!-- Hero -->
  <div class="hero" id="overview">
    <div class="hero-badge">🚬 Smart Smoking Tracker</div>
    <div class="hero-title">LAST<span>PUFF</span></div>
    <div class="hero-sub">A personal smoking analytics platform that tracks every cigarette, sends a beautiful daily email report at 11:59 PM, and saves 1 year of data — all running on your own laptop.</div>
    <div class="hero-chips">
      <div class="chip green">✓ Runs offline</div>
      <div class="chip green">✓ No subscription</div>
      <div class="chip green">✓ Data stays on your laptop</div>
      <div class="chip ember">Auto email at 11:59 PM</div>
      <div class="chip ember">Excel export</div>
    </div>
  </div>

  <!-- Folder Structure -->
  <div class="section" id="structure">
    <h2><span class="icon">📁</span> Folder Structure</h2>
    <div class="section-sub">Everything lives in two folders inside your downloaded zip.</div>
    <div class="tree">
      <div><span class="folder">lastpuff-complete/</span></div>
      <div>&nbsp;&nbsp;<span class="folder">lastpuff/</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← The web app</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="highlight">index.html</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← Open this in Chrome</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="folder">css/</span><span class="file">style.css</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← All styling</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="folder">js/</span><span class="file">app.js</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← All logic + localStorage</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="folder">emails/</span><span class="file">daily-report.html</span> <span class="comment">← Email template</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="file">lastpuff_data.xlsx</span> &nbsp;&nbsp;<span class="comment">← Sample Excel data</span></div>
      <div>&nbsp;&nbsp;</div>
      <div>&nbsp;&nbsp;<span class="folder">lastpuff-server/</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← Email server</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="highlight">server.js</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← Run: node server.js</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="highlight">setup.html</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← Configure Gmail here</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="file">package.json</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← Dependencies</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="file">config.json</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">← Gmail credentials (auto-created)</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="file">lastpuff_data.json</span> &nbsp;<span class="comment">← Server data backup (auto-created)</span></div>
    </div>

    <div class="alert warn">
      <div class="alert-icon">⚠️</div>
      <div class="alert-body"><strong>Never delete config.json or lastpuff_data.json</strong> — these are auto-created by the server and hold your Gmail credentials and data backup. The rest of the files are the app code and can always be replaced.</div>
    </div>
  </div>

  <!-- Running the App -->
  <div class="section" id="running-app">
    <h2><span class="icon">🚀</span> Running the App</h2>
    <div class="section-sub">The app is a local HTML file — no installation needed.</div>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h3>Open index.html in Chrome</h3>
          <p>Navigate to <code class="inline">lastpuff-complete → lastpuff → index.html</code> and double-click it. Chrome is recommended — use the same browser every time so localStorage data persists.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h3>Tap the cigarette on the landing screen</h3>
          <p>The animated glowing cigarette is the entry point. Tap it to go to the onboarding screen.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h3>Fill in your profile</h3>
          <p>Enter your name, daily target (how many cigarettes you want to limit yourself to), cost per cigarette in ₹, your email address, and your quit reason. Click <strong>Start Tracking</strong>.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h3>You're on the Dashboard</h3>
          <p>Your data is now saved. Close the tab, restart your laptop, reopen — everything is still there.</p>
        </div>
      </div>
    </div>

    <div class="alert ok">
      <div class="alert-icon">✅</div>
      <div class="alert-body"><strong>Always use the same browser from the same location.</strong> Data is stored in Chrome's localStorage tied to the file path. Moving the folder or switching browsers means starting fresh.</div>
    </div>
  </div>

  <!-- Server Setup -->
  <div class="section" id="server-setup">
    <h2><span class="icon">⚙️</span> Server Setup</h2>
    <div class="section-sub">One-time setup to enable daily emails. Takes about 5 minutes.</div>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h3>Install Node.js (if not done)</h3>
          <p>Download from <strong>nodejs.org</strong> → click the LTS button → run the installer → keep all defaults → Finish.</p>
          <p>Close and reopen PowerShell, then verify:</p>
          <div class="code-block">
            <div class="code-header">PowerShell</div>
            <pre>node --version
npm --version</pre>
          </div>
          <p>Both should print version numbers.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h3>Fix PowerShell script policy (one time)</h3>
          <div class="code-block">
            <div class="code-header">PowerShell — Run as Administrator</div>
            <pre>Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</pre>
          </div>
          <p>Type <strong>Y</strong> and press Enter when prompted.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h3>Install dependencies</h3>
          <div class="code-block">
            <div class="code-header">PowerShell</div>
            <pre>cd C:\Users\jitin\Downloads\lastpuff-complete\lastpuff-server
npm install</pre>
          </div>
          <p>Ignore the warnings — they are harmless. You'll see "added 73 packages".</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h3>Start the server</h3>
          <div class="code-block">
            <div class="code-header">PowerShell</div>
            <pre>node server.js</pre>
          </div>
          <p>You should see the LAST PUFF banner and "Running on port 3000". The server is now live.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Gmail Setup -->
  <div class="section" id="gmail-setup">
    <h2><span class="icon">📧</span> Gmail Setup</h2>
    <div class="section-sub">Configure which Gmail account sends your daily report.</div>

    <div class="alert info">
      <div class="alert-icon">ℹ️</div>
      <div class="alert-body">You need a <strong>Gmail App Password</strong> — this is NOT your real Gmail password. It's a separate 16-character code that lets the server send email on your behalf safely.</div>
    </div>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h3>Enable 2-Step Verification on Gmail</h3>
          <p>Go to <strong>myaccount.google.com/security</strong> → find "2-Step Verification" → turn it on if not already enabled.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h3>Create an App Password</h3>
          <p>On the same security page, search for <strong>"App Passwords"</strong> in the search bar at the top. Create a new one → name it <code class="inline">Last Puff</code> → click Create.</p>
          <p>Google shows you a <strong>16-character password</strong> like <code class="inline">abcd efgh ijkl mnop</code>. Copy it — you only see it once.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h3>Open setup.html</h3>
          <p>Double-click <code class="inline">lastpuff-server → setup.html</code> in your browser. The server must already be running (step 4 above).</p>
          <p>Enter your Gmail address and the App Password → click <strong>Save Configuration</strong>.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <h3>Send a test email</h3>
          <p>Click <strong>"Send Test Email Now"</strong> in setup.html. Check your inbox — the full HTML report should arrive within 30 seconds. Also check your spam folder if you don't see it.</p>
        </div>
      </div>
    </div>

    <h3>Which email receives the report?</h3>
    <p>The report is sent to <strong>the email you entered in the app's onboarding screen</strong> (the "Email for daily reports" field). The Gmail in setup.html is the sender. They can be the same address.</p>

    <table class="tbl">
      <tr><th>Field</th><th>Where</th><th>What it does</th></tr>
      <tr><td>Gmail address</td><td>setup.html</td><td>The account that sends the email. Must be Gmail.</td></tr>
      <tr><td>App Password</td><td>setup.html</td><td>16-char Google password that authenticates the sender.</td></tr>
      <tr><td>Report email</td><td>App onboarding</td><td>Where the daily report is delivered. Any email works.</td></tr>
    </table>
  </div>

  <!-- Auto-start -->
  <div class="section" id="autostart">
    <h2><span class="icon">🔄</span> Auto-Start on Windows Boot</h2>
    <div class="section-sub">Set this up once so the server runs automatically — no terminal needed daily.</div>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h3>Install PM2 globally</h3>
          <div class="code-block">
            <div class="code-header">PowerShell — Run as Administrator</div>
            <pre>npm install -g pm2</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h3>Start server via PM2 and save</h3>
          <div class="code-block">
            <div class="code-header">PowerShell — Run as Administrator</div>
            <pre>pm2 start "C:\Users\jitin\Downloads\lastpuff-complete\lastpuff-server\server.js" --name lastpuff
pm2 save</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h3>Create Windows Task to auto-resurrect on login</h3>
          <div class="code-block">
            <div class="code-header">PowerShell — Run as Administrator</div>
            <pre>$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -Command `"pm2 resurrect`""
$trigger = New-ScheduledTaskTrigger -AtLogon
Register-ScheduledTask -TaskName "LastPuff Server" -Action $action -Trigger $trigger -RunLevel Highest -Force</pre>
          </div>
          <p>Restart your laptop once to confirm it works. After boot, run <code class="inline">pm2 status</code> — lastpuff should show <strong>online</strong>.</p>
        </div>
      </div>
    </div>

    <h3>Useful PM2 commands</h3>
    <table class="tbl">
      <tr><th>Command</th><th>What it does</th></tr>
      <tr><td><code class="inline">pm2 status</code></td><td>See if server is running</td></tr>
      <tr><td><code class="inline">pm2 stop lastpuff</code></td><td>Stop the server</td></tr>
      <tr><td><code class="inline">pm2 restart lastpuff</code></td><td>Restart the server</td></tr>
      <tr><td><code class="inline">pm2 logs lastpuff</code></td><td>See server logs and email send history</td></tr>
    </table>
  </div>

  <!-- Screens -->
  <div class="section" id="screens">
    <h2><span class="icon">📱</span> All Screens</h2>
    <div class="section-sub">The app has 6 screens. Here's what each one does.</div>

    <div class="cards">
      <div class="card ember">
        <div class="card-icon">🚬</div>
        <div class="card-title">Landing</div>
        <div class="card-body">Animated cigarette with smoke particles. Tap it to begin. Shows a green dot if saved data exists.</div>
      </div>
      <div class="card">
        <div class="card-icon">📝</div>
        <div class="card-title">Onboarding</div>
        <div class="card-body">Set your name, daily target, cost per cigarette, quit reason, and email. One-time setup — revisit anytime to update.</div>
      </div>
      <div class="card green">
        <div class="card-icon">🏠</div>
        <div class="card-title">Dashboard</div>
        <div class="card-body">Progress ring, money stats, trigger bars, today's full timeline, and a weekly mini chart.</div>
      </div>
      <div class="card ember">
        <div class="card-icon">🚬</div>
        <div class="card-title">Log Cigarette</div>
        <div class="card-body">Pick a trigger, select your mood, add optional notes. Hit the big button — entry appears in timeline instantly.</div>
      </div>
      <div class="card">
        <div class="card-icon">📈</div>
        <div class="card-title">Analytics</div>
        <div class="card-body">Weekly bar chart, money savings card, full trigger breakdown, health milestones, and weekly grade (A+ to F).</div>
      </div>
      <div class="card amber">
        <div class="card-icon">✉️</div>
        <div class="card-title">Email Preview</div>
        <div class="card-body">See exactly what your 11:59 PM report looks like. Tap "Send" to deliver it immediately.</div>
      </div>
    </div>
  </div>

  <!-- Logging -->
  <div class="section" id="logging">
    <h2><span class="icon">🚬</span> Logging Cigarettes</h2>
    <div class="section-sub">Tap the orange 🚬 button in the bottom nav from the dashboard.</div>

    <table class="tbl">
      <tr><th>Field</th><th>Options</th><th>Required?</th></tr>
      <tr><td>Trigger</td><td>Tea, Coding, Stress, Friends, Gaming, Party, Studying, Other</td><td>Yes (Tea selected by default)</td></tr>
      <tr><td>Mood</td><td>Calm 😌, Stressed 😤, Bored 😴, Social 🥳, Low 😔</td><td>Yes (Calm by default)</td></tr>
      <tr><td>Notes</td><td>Free text — "after lunch", "during break"</td><td>No</td></tr>
    </table>

    <p>After logging, a success animation plays and you're returned to the dashboard. The entry appears in the timeline immediately. You can <strong>remove</strong> any entry by tapping "✕ remove" under it.</p>
  </div>

  <!-- Data & Storage -->
  <div class="section" id="data">
    <h2><span class="icon">💾</span> Data & Storage</h2>
    <div class="section-sub">Three layers of data storage — browser, server, and Excel.</div>

    <div class="cards">
      <div class="card green">
        <div class="card-icon">🌐</div>
        <div class="card-title">Browser localStorage</div>
        <div class="card-body">Primary storage. Saves automatically on every log. Survives tab closes and laptop restarts. Tied to Chrome + file path.</div>
      </div>
      <div class="card ember">
        <div class="card-icon">🖥️</div>
        <div class="card-title">Server JSON</div>
        <div class="card-body">lastpuff_data.json in the server folder. Updated every time you log a cigarette. Used for the 11:59 PM email.</div>
      </div>
      <div class="card amber">
        <div class="card-icon">📊</div>
        <div class="card-title">Excel Export</div>
        <div class="card-body">Manual backup. Export weekly from the dashboard. Stores up to 1 year of logs across 4 sheets.</div>
      </div>
    </div>

    <div class="alert warn">
      <div class="alert-icon">⚠️</div>
      <div class="alert-body"><strong>Data is lost if you clear browser cache.</strong> Export to Excel before doing any browser cleanup. The server JSON is a second backup but only has data from sessions where the server was running.</div>
    </div>

    <h3>Dashboard indicators</h3>
    <div style="background:var(--bg1);border:1px solid var(--border);border-radius:12px;padding:16px;margin-top:8px;">
      <div class="status-row"><div class="dot green"></div><div class="status-label">🟢 Email server on</div><div class="status-note">Server running, data syncing, emails will fire</div></div>
      <div class="status-row"><div class="dot red"></div><div class="status-label">⚪ Email server off</div><div class="status-note">Server not running — app still works, no email tonight</div></div>
      <div class="status-row"><div class="dot green"></div><div class="status-label">Save dot on landing screen</div><div class="status-note">Green dot means localStorage has your saved data</div></div>
    </div>
  </div>

  <!-- Excel -->
  <div class="section" id="excel">
    <h2><span class="icon">📊</span> Excel Export & Import</h2>
    <div class="section-sub">Export all your logs to a real .xlsx file. Import it back anytime.</div>

    <h3>How to Export</h3>
    <p>On the dashboard header, click <code class="inline">📥 Excel</code>. A file named <code class="inline">lastpuff_2026-06-19.xlsx</code> downloads automatically.</p>

    <h3>How to Import</h3>
    <p>Click <code class="inline">📂 Import</code> on the dashboard header → pick a previously exported Excel file → your data restores instantly.</p>

    <h3>Excel Sheet Structure</h3>
    <table class="tbl">
      <tr><th>Sheet</th><th>Contents</th></tr>
      <tr><td>📋 Daily Logs</td><td>Every cigarette — date, time, trigger, mood, notes, sequence number</td></tr>
      <tr><td>📊 Daily Summary</td><td>One row per day — count, target, under/over, ₹ spent, ₹ saved, status</td></tr>
      <tr><td>📈 Triggers</td><td>All triggers ranked by frequency</td></tr>
      <tr><td>⚙️ Profile</td><td>Your name, email, target, cost, streak, export timestamp</td></tr>
    </table>

    <div class="alert ok">
      <div class="alert-icon">💡</div>
      <div class="alert-body"><strong>Recommended routine:</strong> Export to Excel every Sunday → save to Google Drive. This gives you a permanent 1-year archive that's safe even if you reinstall Windows or switch laptops.</div>
    </div>
  </div>

  <!-- API Reference -->
  <div class="section" id="api">
    <h2><span class="icon">🔌</span> Server API Reference</h2>
    <div class="section-sub">The server runs on port 3000. These endpoints are called automatically by the app.</div>

    <table class="tbl">
      <tr><th>Method</th><th>Endpoint</th><th>What it does</th></tr>
      <tr><td>GET</td><td><code class="inline">/ping</code></td><td>Health check — returns "ok" if server is running</td></tr>
      <tr><td>POST</td><td><code class="inline">/api/sync</code></td><td>App pushes all data here after every cigarette log</td></tr>
      <tr><td>GET</td><td><code class="inline">/api/data</code></td><td>Get all stored data from the server</td></tr>
      <tr><td>POST</td><td><code class="inline">/api/config</code></td><td>Save Gmail credentials (called by setup.html)</td></tr>
      <tr><td>POST</td><td><code class="inline">/api/send-email</code></td><td>Send the daily report immediately (manual trigger)</td></tr>
      <tr><td>POST</td><td><code class="inline">/api/test-email</code></td><td>Same as send-email — used by setup.html test button</td></tr>
    </table>

    <div class="alert info">
      <div class="alert-icon">ℹ️</div>
      <div class="alert-body">The cron job fires at <strong>23:59 IST (11:59 PM)</strong> every day using the Asia/Kolkata timezone. If your laptop is off or the server isn't running at that time, the email won't send for that day.</div>
    </div>
  </div>

  <!-- Troubleshooting -->
  <div class="section" id="troubleshoot">
    <h2><span class="icon">🔧</span> Troubleshooting</h2>
    <div class="section-sub">Common issues and how to fix them.</div>

    <table class="tbl">
      <tr><th>Problem</th><th>Fix</th></tr>
      <tr><td>Cigarette click does nothing</td><td>Make sure you're clicking the cigarette SVG directly, not the smoke particles around it. Try a single slow click.</td></tr>
      <tr><td>Fields not editable in onboarding</td><td>Click directly inside the input box. If still stuck, try a different browser or refresh the page.</td></tr>
      <tr><td>Start Tracking doesn't navigate</td><td>Open browser console (F12 → Console tab) — look for red errors and share them.</td></tr>
      <tr><td>Data gone after reopening</td><td>You may have cleared browser cache, opened in a different browser, or moved the folder. Import from your Excel backup.</td></tr>
      <tr><td>npm not recognized</td><td>Node.js not installed or PowerShell not restarted after install. Close and reopen PowerShell.</td></tr>
      <tr><td>scripts disabled error</td><td>Run: <code class="inline">Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</code></td></tr>
      <tr><td>Email not arriving</td><td>Check spam folder. Verify App Password in setup.html. Make sure you used App Password, not your real Gmail password.</td></tr>
      <tr><td>Invalid login error in server</td><td>Re-create the App Password at myaccount.google.com → App Passwords and save it again in setup.html.</td></tr>
      <tr><td>⚪ Email server off on dashboard</td><td>Server stopped. Run <code class="inline">pm2 restart lastpuff</code> or <code class="inline">node server.js</code> again.</td></tr>
      <tr><td>pm2-windows-startup errored</td><td>Ignore it — use the Task Scheduler method instead (see Auto-Start section).</td></tr>
    </table>
  </div>

  <!-- FAQ -->
  <div class="section" id="faq">
    <h2><span class="icon">❓</span> FAQ</h2>
    <div class="section-sub">Frequently asked questions.</div>

    <div class="faq-item">
      <div class="faq-q">Will my data be there when I reopen the app?</div>
      <div class="faq-a">Yes — as long as you use the same browser (Chrome) and don't clear browser cache. localStorage persists across tab closes, browser closes, and laptop restarts indefinitely.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Do I need internet to use the app?</div>
      <div class="faq-a">No. The app runs completely offline. The only things that need internet are: loading Google Fonts on first open, and sending the email (server needs internet at 11:59 PM).</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">What if my laptop is off at 11:59 PM?</div>
      <div class="faq-a">The email won't send for that night. The server can only fire the cron job if it's running. If you want guaranteed delivery, keep your laptop on or in sleep mode (not shut down) at night.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Do I need to open the terminal every day?</div>
      <div class="faq-a">No — if you set up the PM2 + Windows Task Scheduler method (see Auto-Start section), the server starts silently in the background every time you log into Windows. No terminal needed.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I change my daily target or email later?</div>
      <div class="faq-a">Yes. Tap the cigarette on the landing screen → update any field → click Start Tracking. Your logs are preserved — only your profile settings update.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Which email sends the report and which receives it?</div>
      <div class="faq-a">The Gmail you enter in setup.html is the sender (needs an App Password). The email you entered in the app's onboarding is the receiver. They can be the same Gmail address.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Can I use this on my phone?</div>
      <div class="faq-a">The app is designed for desktop/laptop. You can open index.html in Chrome on Android and it will work, but the layout is optimized for a desktop browser window.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Is my Gmail password stored securely?</div>
      <div class="faq-a">Your App Password is stored in config.json on your own laptop only — it never leaves your machine. The server only uses it to authenticate with Gmail's SMTP server when sending email.</div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-logo">LAST<span>PUFF</span></div>
    <div class="footer-sub">Track smarter. Smoke less. Live better.<br/>Built for personal use — all data stays on your laptop.</div>
  </div>

</main>

<script>
// Highlight active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const id = e.target.id;
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// Copy buttons
document.querySelectorAll('.code-header').forEach(header => {
  const btn = header.querySelector('.copy-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const pre = header.nextElementSibling;
    navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    });
  });
});
</script>

</body>
</html>
