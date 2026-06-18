/* ═══════════════════════════════════════════
   LAST PUFF — App Logic (clean final version)
═══════════════════════════════════════════ */

// ── State ──────────────────────────────────
const STATE = {
  name: '',
  email: '',
  target: 5,
  cost: 12,
  reason: 'Fitness',
  streak: 0,
  count: 0,
  logs: [],
  allLogs: [],
  weekData: [0,0,0,0,0,0,0],
  weekDays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  nextId: 1
};

const TRIGGERS = [
  { t: 'Tea',     i: '☕', count: 0 },
  { t: 'Coding',  i: '💻', count: 0 },
  { t: 'Stress',  i: '😮‍💨', count: 0 },
  { t: 'Friends', i: '👥', count: 0 }
];

const MILESTONES = [
  { label: 'Heart rate normalized',        time: '8 hrs ✓',   state: 'done' },
  { label: 'Carbon monoxide cleared',      time: '24h ✓',     state: 'done' },
  { label: 'Taste & smell improving',      time: 'in 1 day →',state: 'next' },
  { label: 'Lung cilia regenerating',      time: 'in 1 week', state: 'pending' },
  { label: 'Circulation improved',         time: 'in 1 month',state: 'pending' },
  { label: 'Lung function up 30%',         time: 'in 3 months',state: 'pending' },
  { label: 'Heart disease risk halved',    time: 'in 1 year', state: 'pending' }
];

const EQUIV = ['🏋️ Gym membership','🥛 Protein powder','📱 New smartphone','✈️ Short trip','💻 Laptop fund','☕ 240 coffees'];

// ── Helpers ────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function nowTime() {
  const d = new Date();
  let h = d.getHours(), m = d.getMinutes();
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2,'0')} ${ap}`;
}

function $(id) { return document.getElementById(id); }

// ── Navigation ─────────────────────────────
let currentScreen = 'landing';

function goto(id) {
  const oldEl = $('screen-' + currentScreen);
  const newEl = $('screen-' + id);
  if (!newEl || id === currentScreen) return;

  // Hide old IMMEDIATELY — prevents cigarette SVG bleeding into next screen
  if (oldEl) {
    oldEl.style.display = 'none';
    oldEl.classList.remove('active-landing');
  }

  // Show new with fade in
  newEl.style.display = (id === 'landing') ? 'flex' : 'block';
  if (id === 'landing') newEl.classList.add('active-landing');
  newEl.style.opacity = '0';
  newEl.style.transform = 'translateX(16px)';
  setTimeout(() => {
    newEl.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
    newEl.style.opacity = '1';
    newEl.style.transform = 'translateX(0)';
    setTimeout(() => { newEl.style.transition = ''; }, 300);
  }, 16);

  currentScreen = id;

  if (id === 'dashboard')     initDashboard();
  if (id === 'log')           initLog();
  if (id === 'analytics')     initAnalytics();
  if (id === 'email-preview') initEmailPreview();
}

// ── Onboarding ─────────────────────────────
function selReason(el) {
  document.querySelectorAll('.reason').forEach(r => r.classList.remove('sel'));
  el.classList.add('sel');
  STATE.reason = el.dataset.v;
}

function startApp() {
  const nameVal   = $('ob-name')   ? $('ob-name').value.trim()   : '';
  const targetVal = $('ob-target') ? $('ob-target').value.trim() : '';
  const costVal   = $('ob-cost')   ? $('ob-cost').value.trim()   : '';
  const emailVal  = $('ob-email')  ? $('ob-email').value.trim()  : '';

  STATE.name   = nameVal   || 'Friend';
  STATE.target = parseInt(targetVal) || 5;
  STATE.cost   = parseInt(costVal)   || 12;
  STATE.email  = emailVal  || 'user@example.com';

  // Reset today count from allLogs
  const today = todayStr();
  STATE.logs  = STATE.allLogs.filter(l => l.date === today);
  STATE.count = STATE.logs.length;

  saveToLocal();
  goto('dashboard');
}

// ── Dashboard ──────────────────────────────
function initDashboard() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';
  if ($('d-greet'))      $('d-greet').textContent = greet;
  if ($('d-name'))       $('d-name').textContent  = STATE.name || 'Friend';
  if ($('d-streak-chip')) $('d-streak-chip').textContent = `🔥 ${STATE.streak}-day streak`;

  updateRing();
  updateStats();
  renderTriggerBars();
  renderTimeline();
  renderMiniChart();
}

function updateRing() {
  const pct  = STATE.target > 0 ? STATE.count / STATE.target : 0;
  const circ = 2 * Math.PI * 80;
  const offset = circ - Math.min(pct, 1) * circ;

  const arc = $('ringArc');
  if (!arc) return;

  arc.style.transition = 'none';
  arc.setAttribute('stroke-dashoffset', circ);
  setTimeout(() => {
    arc.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.34,1.1,.64,1), stroke 0.4s';
    arc.setAttribute('stroke-dashoffset', Math.round(offset));
    arc.setAttribute('stroke', pct >= 1 ? '#e24b4a' : pct >= 0.8 ? '#ffcc44' : '#ff5e1a');
  }, 50);

  if ($('ringNum'))    $('ringNum').textContent    = STATE.count;
  if ($('ringTarget')) $('ringTarget').textContent = STATE.target;

  const pill = $('statusPill');
  if (!pill) return;
  pill.className = 'status-pill';
  if (pct < 1) {
    pill.textContent = '✓ Under target · Keep going!';
  } else if (pct === 1) {
    pill.classList.add('yellow');
    pill.textContent = '⚠ Reached your limit · Stay strong!';
  } else {
    pill.classList.add('red');
    pill.textContent = '✗ Goal exceeded · Tomorrow is a new start.';
  }
}

function updateStats() {
  const spent = STATE.count * STATE.cost;
  const saved = Math.max((STATE.target - STATE.count) * STATE.cost, 0);
  if ($('s-spent'))  $('s-spent').textContent  = '₹' + spent;
  if ($('s-saved'))  $('s-saved').textContent  = '₹' + saved;
  if ($('s-streak')) $('s-streak').textContent = STATE.streak;
}

function renderTriggerBars() {
  const wrap = $('triggerBars');
  if (!wrap) return;
  const activeTriggers = TRIGGERS.filter(t => t.count > 0);
  const list = activeTriggers.length > 0 ? activeTriggers : TRIGGERS;
  const total = list.reduce((a, t) => a + Math.max(t.count, 1), 0);
  wrap.innerHTML = list.map(t => {
    const pct = Math.round(Math.max(t.count, 0) / total * 100);
    return `<div class="trig-row">
      <div class="trig-ico">${t.i}</div>
      <div class="trig-nm">${t.t}</div>
      <div class="trig-track"><div class="trig-fill" style="width:0%" data-pct="${pct}%"></div></div>
      <div class="trig-pc">${pct}%</div>
    </div>`;
  }).join('');
  setTimeout(() => {
    wrap.querySelectorAll('.trig-fill').forEach(el => { el.style.width = el.dataset.pct; });
  }, 100);
}

function renderTimeline() {
  const tl = $('timeline');
  if (!tl) return;
  const cnt = $('tlCount');
  if (cnt) cnt.textContent = `${STATE.logs.length} cigarette${STATE.logs.length !== 1 ? 's' : ''}`;

  if (STATE.logs.length === 0) {
    tl.innerHTML = `<div style="padding:20px 0;text-align:center;color:#333;font-size:13px;">No cigarettes logged today 🎉</div>`;
    return;
  }

  tl.innerHTML = STATE.logs.map((log, i) => `
    <div class="tl-item${log.isNew ? ' tl-new' : ''}" style="animation-delay:${i*0.06}s">
      <div class="tl-time">${log.time}</div>
      <div class="tl-dot"></div>
      <div class="tl-body">
        <div class="tl-trig">${log.icon || '🚬'} ${log.trigger}${log.mood ? ` <span class="tl-mood">${log.mood}</span>` : ''}</div>
        <div class="tl-num">🚬 Cigarette #${log.num}</div>
        ${log.note ? `<div class="tl-note">"${log.note}"</div>` : ''}
        <div class="tl-rm" onclick="deleteLog(${log.id})">✕ remove</div>
      </div>
    </div>`).join('');
}

function deleteLog(id) {
  STATE.logs    = STATE.logs.filter(l => l.id !== id);
  STATE.allLogs = STATE.allLogs.filter(l => l.id !== id);
  STATE.count   = STATE.logs.length;
  STATE.logs.forEach((l, i) => { l.num = i + 1; });
  updateRing();
  updateStats();
  renderTimeline();
  saveToLocal();
}

function renderMiniChart() {
  const wrap = $('miniChart');
  if (!wrap) return;
  const data = [...STATE.weekData];
  const max  = Math.max(...data, STATE.target, 1);
  wrap.innerHTML = STATE.weekDays.map((d, i) => {
    const h   = Math.max(Math.round(data[i] / max * 68), 2);
    const cls = i === 6 ? 'today' : data[i] <= STATE.target ? 'good' : 'over';
    return `<div class="mc-col">
      <div class="mc-val">${data[i]}</div>
      <div class="mc-bar ${cls}" style="height:${h}px"></div>
      <div class="mc-lbl">${d}</div>
    </div>`;
  }).join('');
}

function animRing() {
  const arc = $('ringArc');
  if (!arc) return;
  const circ = 2 * Math.PI * 80;
  arc.style.transition = 'none';
  arc.setAttribute('stroke-dashoffset', circ);
  setTimeout(updateRing, 80);
}

// ── Log Screen ─────────────────────────────
function initLog() {
  if ($('logTime')) $('logTime').textContent = nowTime();
  document.querySelectorAll('.trig-tile').forEach((t, i) => t.classList.toggle('active', i === 0));
  document.querySelectorAll('.mood-btn').forEach((b, i)  => b.classList.toggle('active', i === 0));
  const notes = $('logNotes');
  if (notes) notes.value = '';
  const icon = $('logCigIcon');
  if (icon) icon.textContent = '☕';
  const success = $('logSuccess');
  if (success) { success.style.opacity = '0'; success.style.pointerEvents = 'none'; }
}

function selTrig(el) {
  document.querySelectorAll('.trig-tile').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const icon = $('logCigIcon');
  if (icon) icon.textContent = el.dataset.i;
}

function selMood(el) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function confirmLog() {
  const trigEl = document.querySelector('.trig-tile.active');
  const moodEl = document.querySelector('.mood-btn.active');
  const notes  = ($('logNotes') ? $('logNotes').value : '').trim();

  const trigger = trigEl ? trigEl.dataset.t : 'Other';
  const icon    = trigEl ? trigEl.dataset.i : '⚡';
  const mood    = moodEl ? moodEl.dataset.m : '😌';

  STATE.count++;
  STATE.weekData[6] = STATE.count;

  const entry = {
    id: STATE.nextId++,
    date: todayStr(),
    time: nowTime(),
    trigger, icon, mood,
    note: notes,
    num: STATE.count,
    isNew: true
  };

  STATE.logs.push(entry);
  STATE.allLogs.push(entry);

  // Update trigger counts
  const existing = TRIGGERS.find(t => t.t === trigger);
  if (existing) existing.count++;
  else TRIGGERS.push({ t: trigger, i: icon, count: 1 });

  // Show success
  const sub = $('successSub');
  const tip = $('successTip');
  const topTrig = TRIGGERS.filter(t=>t.count>0).reduce((a,b) => a.count > b.count ? a : b, TRIGGERS[0]);
  if (sub) sub.textContent = `Cigarette #${STATE.count} recorded`;
  if (tip && topTrig) tip.textContent = `${topTrig.i} ${topTrig.t} is your top trigger today.`;

  const overlay = $('logSuccess');
  if (overlay) {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
  }

  saveToLocal();

  setTimeout(() => {
    if (overlay) { overlay.style.opacity = '0'; overlay.style.pointerEvents = 'none'; }
    goto('dashboard');
  }, 2000);
}

// ── Analytics ─────────────────────────────
function initAnalytics() {
  renderWeekChart();
  renderMoneySavings();
  renderTrigFull();
  renderMilestones();
  renderGrade();
}

function renderWeekChart() {
  const wrap = $('weekChart');
  if (!wrap) return;
  const data = [...STATE.weekData];
  const max  = Math.max(...data, STATE.target, 1);
  wrap.innerHTML = STATE.weekDays.map((d, i) => {
    const h   = Math.max(Math.round(data[i] / max * 96), 2);
    const cls = i === 6 ? 'today' : data[i] <= STATE.target ? 'good' : data[i] === 0 ? '' : 'over';
    return `<div class="wc-col">
      <div class="wc-num">${data[i]}</div>
      <div class="wc-bar ${cls}" style="height:0" data-h="${h}px"></div>
      <div class="wc-lbl">${d}</div>
    </div>`;
  }).join('');
  setTimeout(() => {
    wrap.querySelectorAll('.wc-bar').forEach(b => { b.style.height = b.dataset.h; });
  }, 100);
}

function renderMoneySavings() {
  const savedToday  = Math.max((STATE.target - STATE.count), 0) * STATE.cost;
  const monthSaved  = savedToday * 30;
  const yearSaved   = savedToday * 365;
  const weekSaved   = savedToday * 7;
  const equivIdx    = Math.min(Math.floor(monthSaved / 500), EQUIV.length - 1);

  const set = (id, v) => { if ($(id)) $(id).textContent = v; };
  set('m-today',       '₹' + savedToday);
  set('m-week',        '₹' + weekSaved);
  set('m-year',        '₹' + yearSaved.toLocaleString('en-IN'));
  set('mSavedMonthly', '₹' + monthSaved.toLocaleString('en-IN'));
  set('equivVal',      EQUIV[equivIdx] || EQUIV[0]);
}

function renderTrigFull() {
  const wrap = $('trigFullList');
  if (!wrap) return;
  const active = TRIGGERS.filter(t => t.count > 0);
  const list   = active.length > 0 ? active : TRIGGERS;
  const sorted = [...list].sort((a,b) => b.count - a.count);
  const total  = sorted.reduce((s,t) => s + Math.max(t.count,1), 0);
  wrap.innerHTML = sorted.map(t => {
    const pct = Math.round(Math.max(t.count,0) / total * 100);
    return `<div class="trig-row">
      <div class="trig-ico">${t.i}</div>
      <div class="trig-nm" style="width:70px">${t.t}</div>
      <div class="trig-track"><div class="trig-fill" style="width:0%" data-pct="${pct}%"></div></div>
      <div class="trig-pc">${pct}%</div>
    </div>`;
  }).join('');
  setTimeout(() => {
    wrap.querySelectorAll('.trig-fill').forEach(el => { el.style.width = el.dataset.pct; });
  }, 120);
}

function renderMilestones() {
  const wrap = $('milestones');
  if (!wrap) return;
  wrap.innerHTML = MILESTONES.map(m => `
    <div class="ms-row">
      <div class="ms-dot ${m.state}"></div>
      <div class="ms-lbl ${m.state}">${m.label}</div>
      <div class="ms-time">${m.time}</div>
    </div>`).join('');
}

function renderGrade() {
  const avg   = STATE.weekData.reduce((a,b)=>a+b,0) / 7;
  const ratio = STATE.target > 0 ? avg / STATE.target : 1;
  let grade = 'A+', note = 'Perfect week. Outstanding control.';
  if (ratio > 1.5)      { grade='F';  note='Way over target. Let\'s reset and try again.'; }
  else if (ratio > 1.2) { grade='D';  note='Consistently over target. Reduce by 1 per day.'; }
  else if (ratio > 1.0) { grade='C';  note='Slightly over target. Keep pushing.'; }
  else if (ratio > 0.8) { grade='B+'; note='Good progress. Cut 1 more to reach A.'; }
  else if (ratio > 0.5) { grade='A-'; note='Great discipline. Nearly a perfect week!'; }
  if ($('gradeLetter')) $('gradeLetter').textContent = grade;
  if ($('gradeNote'))   $('gradeNote').textContent   = note;
}

// ── Email Preview ─────────────────────────
function initEmailPreview() {
  if ($('ep-to')) $('ep-to').textContent = STATE.email || 'your@email.com';
  const now = new Date();
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  if ($('ep-date')) $('ep-date').textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  if ($('emailCard')) $('emailCard').innerHTML = buildEmailHTML();
  const ov = $('emailSentOverlay');
  if (ov) { ov.style.opacity = '0'; ov.style.pointerEvents = 'none'; }
}

function buildEmailHTML() {
  const pct    = STATE.target > 0 ? Math.round(STATE.count / STATE.target * 100) : 0;
  const active = TRIGGERS.filter(t=>t.count>0);
  const topT   = active.length > 0 ? active.reduce((a,b) => a.count>b.count?a:b) : TRIGGERS[0];
  const saved  = Math.max((STATE.target - STATE.count) * STATE.cost, 0);
  const spent  = STATE.count * STATE.cost;
  let statusColor='#16a34a', statusBg='#dcfce7', statusMsg='Great day! You stayed under target.', statusIcon='🎉';
  let headerBg='linear-gradient(135deg,#14532d,#16a34a)';
  if (STATE.count >= STATE.target && STATE.count > 0) {
    statusColor='#dc2626'; statusBg='#fee2e2';
    statusMsg='You exceeded today\'s goal. Tomorrow is a fresh start.'; statusIcon='💪';
    headerBg='linear-gradient(135deg,#7f1d1d,#dc2626)';
  } else if (STATE.target > 0 && STATE.count >= STATE.target * 0.8) {
    statusColor='#d97706'; statusBg='#fef3c7';
    statusMsg='Almost at limit. Stay strong!'; statusIcon='⚠️';
    headerBg='linear-gradient(135deg,#78350f,#d97706)';
  }
  const tlRows = STATE.logs.map(l =>
    `<tr><td style="padding:8px 10px;font-size:12px;color:#555;">${l.time}</td>
     <td style="padding:8px 10px;font-size:12px;">${l.icon||'🚬'} ${l.trigger}</td>
     <td style="padding:8px 10px;font-size:14px;">${l.mood||''}</td>
     <td style="padding:8px 10px;font-size:12px;color:#888;font-style:italic;">${l.note||'—'}</td></tr>`
  ).join('') || `<tr><td colspan="4" style="padding:12px;text-align:center;color:#888;font-size:13px;">No cigarettes logged today 🎉</td></tr>`;

  return `<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;background:#fff;">
    <div style="background:${headerBg};padding:28px;text-align:center;">
      <div style="font-size:26px;font-weight:900;letter-spacing:4px;color:#fff;">LAST<span style="color:rgba(255,255,255,0.5)">PUFF</span></div>
      <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:4px;letter-spacing:2px;">DAILY REPORT</div>
    </div>
    <div style="background:${statusBg};padding:16px 24px;border-bottom:1px solid #e5e7eb;">
      <div style="font-size:20px;margin-bottom:4px;">${statusIcon}</div>
      <div style="font-size:14px;font-weight:600;color:${statusColor};">${statusMsg}</div>
    </div>
    <div style="padding:20px 24px;">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
        <div style="background:#f9fafb;border-radius:10px;padding:14px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#111;">${STATE.count}</div>
          <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Smoked</div>
        </div>
        <div style="background:#f9fafb;border-radius:10px;padding:14px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#111;">${STATE.target}</div>
          <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Target</div>
        </div>
        <div style="background:#f9fafb;border-radius:10px;padding:14px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:${statusColor};">${pct}%</div>
          <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;">Of goal</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:14px;">
          <div style="font-size:10px;color:#c2410c;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">💸 Spent</div>
          <div style="font-size:22px;font-weight:700;color:#9a3412;">₹${spent}</div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;">
          <div style="font-size:10px;color:#15803d;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">💚 Saved</div>
          <div style="font-size:22px;font-weight:700;color:#166534;">₹${saved}</div>
        </div>
      </div>
      <div style="background:#fffbeb;border-left:4px solid #ff5e1a;border-radius:0 10px 10px 0;padding:14px 16px;margin-bottom:20px;">
        <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;margin-bottom:4px;">Top trigger</div>
        <div style="font-size:15px;font-weight:600;color:#111;">${topT ? topT.i+' '+topT.t : 'None yet'}</div>
      </div>
      <div style="margin-bottom:20px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#374151;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e5e7eb;">📋 Timeline</div>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr>
            <th style="padding:5px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:500;">Time</th>
            <th style="padding:5px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:500;">Trigger</th>
            <th style="padding:5px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:500;">Mood</th>
            <th style="padding:5px 10px;text-align:left;font-size:10px;color:#9ca3af;font-weight:500;">Note</th>
          </tr></thead>
          <tbody>${tlRows}</tbody>
        </table>
      </div>
      <div style="background:#0a0a0a;border-radius:12px;padding:18px;text-align:center;margin-bottom:20px;">
        <div style="font-size:14px;color:#e5e7eb;line-height:1.7;font-style:italic;">
          "${STATE.count <= STATE.target
            ? `You are ${Math.max(STATE.target-STATE.count,0)} cigarette${STATE.target-STATE.count!==1?'s':''} under target. Keep going!`
            : `Every cigarette not lit tomorrow is a win. No guilt — just progress.`}"
        </div>
      </div>
      <div style="text-align:center;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:18px;">
        <div style="font-size:10px;color:#c2410c;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Tomorrow's Target</div>
        <div style="font-size:40px;font-weight:800;color:#ff5e1a;">${Math.max(STATE.target-1,1)}</div>
        <div style="font-size:11px;color:#9a3412;margin-top:4px;">cigarettes · reducing by 1 each week</div>
      </div>
    </div>
    <div style="background:#0a0a0a;padding:20px;text-align:center;">
      <div style="font-size:18px;font-weight:900;letter-spacing:3px;color:#f5f0e8;">LAST<span style="color:#ff5e1a">PUFF</span></div>
      <div style="font-size:11px;color:#555;margin-top:6px;">Track smarter. Smoke less. Live better.</div>
      <div style="font-size:10px;color:#333;margin-top:4px;">Sent to: ${STATE.email}</div>
    </div>
  </div>`;
}

function showEmailSent() {
  if ($('sentSub')) $('sentSub').textContent = `Delivered to ${STATE.email}`;
  const ov = $('emailSentOverlay');
  if (ov) {
    ov.style.opacity = '1';
    ov.style.pointerEvents = 'auto';
    setTimeout(() => {
      ov.style.opacity = '0';
      ov.style.pointerEvents = 'none';
      goto('dashboard');
    }, 2500);
  }
}

// ── Smoke Particles ────────────────────────
function spawnSmoke() {
  const canvas = $('smokeCanvas');
  if (!canvas) return;
  canvas.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'smoke-puff';
    const sz  = 18 + Math.random() * 40;
    p.style.cssText = `width:${sz}px;height:${sz}px;left:${28+Math.random()*44}%;bottom:${33+Math.random()*8}%;animation-duration:${4.5+Math.random()*4}s;animation-delay:${Math.random()*5}s;`;
    canvas.appendChild(p);
  }
}

// ── localStorage ───────────────────────────
function todayStr() { return new Date().toISOString().slice(0,10); }

function saveToLocal() {
  try {
    localStorage.setItem('lp_profile', JSON.stringify({
      name:STATE.name, email:STATE.email,
      target:STATE.target, cost:STATE.cost, reason:STATE.reason
    }));
    localStorage.setItem('lp_allLogs', JSON.stringify(STATE.allLogs));
    localStorage.setItem('lp_streak',  STATE.streak);
    localStorage.setItem('lp_nextId',  STATE.nextId);
    localStorage.setItem('lp_triggers',JSON.stringify(TRIGGERS));
    localStorage.setItem('lp_weekdata',JSON.stringify(STATE.weekData));
    localStorage.setItem('lp_lastdate',todayStr());
  } catch(e) { console.warn('save failed', e); }
}

function loadFromLocal() {
  try {
    const profile = JSON.parse(localStorage.getItem('lp_profile') || 'null');
    if (!profile || !profile.name) return false;

    STATE.name   = profile.name;
    STATE.email  = profile.email  || '';
    STATE.target = profile.target || 5;
    STATE.cost   = profile.cost   || 12;
    STATE.reason = profile.reason || 'Fitness';

    const allLogs = JSON.parse(localStorage.getItem('lp_allLogs') || '[]');
    STATE.allLogs = allLogs;
    const today   = todayStr();
    STATE.logs    = allLogs.filter(l => l.date === today);
    STATE.count   = STATE.logs.length;
    STATE.logs.forEach((l, i) => l.num = i + 1);

    STATE.streak  = parseInt(localStorage.getItem('lp_streak')  || '0');
    STATE.nextId  = parseInt(localStorage.getItem('lp_nextId')  || '1');

    const savedTriggers = JSON.parse(localStorage.getItem('lp_triggers') || 'null');
    if (savedTriggers) {
      savedTriggers.forEach(st => {
        const ex = TRIGGERS.find(t => t.t === st.t);
        if (ex) ex.count = st.count;
        else TRIGGERS.push(st);
      });
    }

    const savedWeek = JSON.parse(localStorage.getItem('lp_weekdata') || 'null');
    if (savedWeek) STATE.weekData = savedWeek;
    STATE.weekData[6] = STATE.count;

    return true;
  } catch(e) { return false; }
}

// ── Excel Export (SheetJS) ─────────────────
function exportToExcel() {
  if (typeof XLSX === 'undefined') {
    showToast('⏳ Library loading, try again in 2 sec', 'ember'); return;
  }
  const wb = XLSX.utils.book_new();

  // Sheet 1: All logs
  const logRows = [["#","Date","Day","Time","Trigger","Mood","Notes","Cig#"]];
  const byDate  = {};
  STATE.allLogs.forEach(l => { const d=l.date||todayStr(); if(!byDate[d])byDate[d]=[]; byDate[d].push(l); });
  let n=1;
  Object.keys(byDate).sort().forEach(date => {
    const dLogs = byDate[date];
    const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(date).getDay()];
    dLogs.forEach((log,i) => {
      logRows.push([n++, date, dayName, log.time||'', log.trigger||'', log.mood||'', log.note||'', i+1]);
    });
  });
  const ws1 = XLSX.utils.aoa_to_sheet(logRows);
  ws1['!cols'] = [6,14,8,10,14,10,28,8].map(w=>({wch:w}));
  XLSX.utils.book_append_sheet(wb, ws1, '📋 Daily Logs');

  // Sheet 2: Daily summary
  const sumRows = [["Date","Day","Cigarettes","Target","Under/Over","₹ Spent","₹ Saved","Status"]];
  Object.keys(byDate).sort().forEach(date => {
    const cnt  = byDate[date].length;
    const day  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(date).getDay()];
    const diff = cnt - STATE.target;
    sumRows.push([date, day, cnt, STATE.target, diff,
      cnt*STATE.cost, Math.max((STATE.target-cnt)*STATE.cost,0),
      diff<0?'🟢 Under':diff===0?'🟡 At limit':'🔴 Exceeded']);
  });
  const ws2 = XLSX.utils.aoa_to_sheet(sumRows);
  ws2['!cols'] = [14,8,12,10,12,12,12,14].map(w=>({wch:w}));
  XLSX.utils.book_append_sheet(wb, ws2, '📊 Daily Summary');

  // Sheet 3: Trigger stats
  const trigRows = [["Trigger","Count","Rank"]];
  [...TRIGGERS].sort((a,b)=>b.count-a.count).forEach((t,i)=>{
    trigRows.push([t.i+' '+t.t, t.count, i+1]);
  });
  const ws3 = XLSX.utils.aoa_to_sheet(trigRows);
  ws3['!cols'] = [18,10,8].map(w=>({wch:w}));
  XLSX.utils.book_append_sheet(wb, ws3, '📈 Triggers');

  // Sheet 4: Profile
  const profRows = [["Setting","Value"],
    ["Name",STATE.name],["Email",STATE.email],["Daily Target",STATE.target],
    ["Cost/Cigarette (₹)",STATE.cost],["Quit Reason",STATE.reason],
    ["Streak",STATE.streak],["Total Logged",STATE.allLogs.length],
    ["Exported",new Date().toLocaleString('en-IN')]];
  const ws4 = XLSX.utils.aoa_to_sheet(profRows);
  ws4['!cols'] = [24,20].map(w=>({wch:w}));
  XLSX.utils.book_append_sheet(wb, ws4, '⚙️ Profile');

  XLSX.writeFile(wb, `lastpuff_${todayStr()}.xlsx`);
  showToast('📥 Excel exported!', 'green');
}

function importFromExcel(file) {
  if (!file) return;
  if (typeof XLSX === 'undefined') { showToast('⏳ Library loading...','ember'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const wb   = XLSX.read(new Uint8Array(e.target.result), {type:'array'});
      const ws   = wb.Sheets['📋 Daily Logs'];
      if (!ws) { alert('Invalid file.'); return; }
      const rows = XLSX.utils.sheet_to_json(ws, {header:1}).slice(1);
      const imported = rows.filter(r=>r[1]).map((r,i) => ({
        id:i+1, date:String(r[1]), time:r[3]||'', trigger:r[4]||'',
        mood:r[5]||'', note:r[6]||'', num:r[7]||i+1,
        icon:(r[4]||'').split(' ')[0], isNew:false
      }));

      const ps = wb.Sheets['⚙️ Profile'];
      if (ps) {
        XLSX.utils.sheet_to_json(ps,{header:1}).slice(1).forEach(r => {
          if(r[0]==='Name')           STATE.name   = r[1]||STATE.name;
          if(r[0]==='Email')          STATE.email  = r[1]||STATE.email;
          if(r[0]==='Daily Target')   STATE.target = Number(r[1])||STATE.target;
          if(r[0]==='Cost/Cigarette (₹)') STATE.cost = Number(r[1])||STATE.cost;
          if(r[0]==='Streak')         STATE.streak = Number(r[1])||STATE.streak;
        });
      }

      STATE.allLogs = imported;
      STATE.nextId  = imported.length + 1;
      const today   = todayStr();
      STATE.logs    = imported.filter(l => l.date === today);
      STATE.count   = STATE.logs.length;
      STATE.weekData[6] = STATE.count;

      saveToLocal();
      showToast(`✅ Imported ${imported.length} logs!`, 'green');
      goto('dashboard');
    } catch(err) { alert('Could not read file: ' + err.message); }
  };
  reader.readAsArrayBuffer(file);
}

// ── Toast ──────────────────────────────────
function showToast(msg, type='ember') {
  let t = $('lp-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'lp-toast';
    t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(16px);padding:10px 20px;border-radius:24px;font-size:13px;font-weight:600;z-index:9999;opacity:0;pointer-events:none;transition:all 0.3s cubic-bezier(.34,1.5,.64,1);font-family:Inter,sans-serif;white-space:nowrap;';
    document.body.appendChild(t);
  }
  const cols = {
    green:{bg:'#0d2d0d',border:'#2a6a2a',fg:'#5ecf5e'},
    ember:{bg:'#1a0800',border:'#552200',fg:'#ff8c4a'},
    red:  {bg:'#1a0808',border:'#5a1a1a',fg:'#e24b4a'}
  };
  const c = cols[type]||cols.ember;
  Object.assign(t.style, {background:c.bg, border:`1px solid ${c.border}`, color:c.fg, boxShadow:'0 4px 20px rgba(0,0,0,0.6)'});
  t.textContent = msg;
  requestAnimationFrame(()=>{ t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)'; });
  setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(10px)'; }, 3000);
}

// ── Boot ──────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  spawnSmoke();

  const hasData = loadFromLocal();

  if (hasData) {
    // Pre-fill onboarding with saved values (still editable)
    if ($('ob-name'))   $('ob-name').value   = STATE.name;
    if ($('ob-target')) $('ob-target').value = STATE.target;
    if ($('ob-cost'))   $('ob-cost').value   = STATE.cost;
    if ($('ob-email'))  $('ob-email').value  = STATE.email;

    const hint = document.querySelector('.tap-hint');
    if (hint) hint.innerHTML = '— tap to continue · <span class="save-dot"></span> data saved —';
  }
});

// ── Server Sync ────────────────────────────
// Silently pushes data to local server after every log
// Server then uses this for the 11:59 PM email
const SERVER = 'http://localhost:3000';

async function syncToServer() {
  try {
    await fetch(`${SERVER}/api/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile:  { name: STATE.name, email: STATE.email, target: STATE.target, cost: STATE.cost, reason: STATE.reason, streak: STATE.streak },
        logs:     STATE.logs,
        allLogs:  STATE.allLogs,
        triggers: TRIGGERS,
        weekData: STATE.weekData
      })
    });
    // silent — no toast, no log
  } catch(e) {
    // Server not running — app still works fine, just no email
  }
}

// Patch confirmLog to also sync
const _baseConfirmLog = confirmLog;
confirmLog = async function() {
  _baseConfirmLog();
  await syncToServer();
};

// Check if server is running, show badge on dashboard
async function checkServerStatus() {
  const badge = document.getElementById('server-badge');
  if (!badge) return;
  try {
    const r = await fetch(`${SERVER}/ping`, { signal: AbortSignal.timeout(1500) });
    const d = await r.json();
    if (d.status === 'ok') {
      badge.textContent = '🟢 Email server on';
      badge.style.color = '#5ecf5e';
    }
  } catch(e) {
    badge.textContent = '⚪ Email server off';
    badge.style.color = '#444';
  }
}

// Run server check when dashboard loads
const _baseInitDashboard = initDashboard;
initDashboard = function() {
  _baseInitDashboard();
  checkServerStatus();
  syncToServer();
};
