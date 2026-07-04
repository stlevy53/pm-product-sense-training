/* Trade-off Drills — app logic. No dependencies, no build step. */

const CONVERTKIT_FORM_ID = ""; /* set before launch; empty = store email locally only */
const FREE_DRILLS = 3;
const DRILL_SECONDS = 8 * 60;
const STORE_KEY = "tradeoff-drills-v1";

const VERDICTS = [
  { label: "Strong no hire", cls: "bad" },
  { label: "No hire", cls: "bad" },
  { label: "Lean no hire", cls: "mid" },
  { label: "Hire", cls: "good" },
  { label: "Strong hire", cls: "good" }
];

if (new URLSearchParams(location.search).has("reset")) {
  localStorage.removeItem(STORE_KEY);
  history.replaceState(null, "", location.pathname);
}

let state = load();
let timerId = null;

function load() {
  try {
    return Object.assign({ current: 0, results: [], email: "" }, JSON.parse(localStorage.getItem(STORE_KEY) || "{}"));
  } catch (e) {
    return { current: 0, results: [], email: "" };
  }
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function verdictFor(n) { return VERDICTS[Math.max(0, Math.min(4, n))]; }
function checksOf(r) { return r ? r.checks.filter(Boolean).length : 0; }

function render() {
  if (timerId) { clearInterval(timerId); timerId = null; }
  const app = document.getElementById("app");
  if (state.results.length >= DRILLS.length) return renderScorecard(app);
  if (state.current >= FREE_DRILLS && !state.email) return renderGate(app);
  renderDrill(app, state.current);
}

function renderDrill(app, i) {
  const d = DRILLS[i];
  app.innerHTML = `
    <div class="card">
      <div class="meta">
        <span>Drill ${i + 1} of ${DRILLS.length} · ${esc(d.title)}</span>
        <span class="timer" id="timer">8:00</span>
      </div>
      <p class="setup">${esc(d.setup)}</p>
      <p class="prompt">${esc(d.prompt)}</p>
      <textarea id="answer" placeholder="Make your call and defend it — the reveal unlocks when you commit"></textarea>
      <div class="btn-row">
        <button class="primary" id="reveal-btn" disabled>Reveal the trap</button>
        <button class="linkish" id="outloud-btn">I answered out loud</button>
      </div>
      <p class="hint">There is no right answer. You're scored on how you defend the call.</p>
      <div id="reveal"></div>
    </div>
    <p class="progress">${state.results.length ? runningLine() : "Four behaviors decide your score: clarify the goal, name options, price the trade-off, state a reversal condition."}</p>`;

  const answer = document.getElementById("answer");
  const revealBtn = document.getElementById("reveal-btn");
  answer.addEventListener("input", () => { revealBtn.disabled = answer.value.trim().length < 40; });
  revealBtn.addEventListener("click", () => reveal(i));
  document.getElementById("outloud-btn").addEventListener("click", () => reveal(i));
  startTimer();
}

function startTimer() {
  let left = DRILL_SECONDS;
  const el = document.getElementById("timer");
  timerId = setInterval(() => {
    left--;
    if (left <= 0) { el.textContent = "Time — answer anyway"; el.classList.add("over"); clearInterval(timerId); timerId = null; return; }
    el.textContent = Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0");
  }, 1000);
}

function reveal(i) {
  if (timerId) { clearInterval(timerId); timerId = null; }
  const d = DRILLS[i];
  document.getElementById("reveal-btn").disabled = true;
  document.getElementById("outloud-btn").style.display = "none";
  document.getElementById("reveal").innerHTML = `
    <div class="panel trap"><span class="label">The trap</span>${esc(d.trap)}</div>
    <h2>Score yourself — check what your answer actually did</h2>
    <div class="checks" id="checks">
      ${BEHAVIORS.map((b, j) => `<label><input type="checkbox" data-j="${j}"> ${esc(b.label)}</label>`).join("")}
    </div>
    <div class="verdict-row">
      <span class="verdict bad" id="verdict">Strong no hire</span>
      <span class="note">interviewers score these four behaviors, not your pick</span>
    </div>
    <details><summary>What Strong Hire sounds like</summary>
      <div class="panel model">${esc(d.model)}</div>
    </details>
    <div class="drill-footer">
      <span>${runningLine()}</span>
      <button class="primary" id="next-btn">${i + 1 === DRILLS.length ? "See your scorecard" : "Next drill"}</button>
    </div>`;

  document.getElementById("checks").addEventListener("change", () => {
    const n = document.querySelectorAll("#checks input:checked").length;
    const v = verdictFor(n);
    const el = document.getElementById("verdict");
    el.textContent = v.label;
    el.className = "verdict " + v.cls;
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    const checks = Array.from(document.querySelectorAll("#checks input")).map(c => c.checked);
    state.results[i] = { checks };
    state.current = i + 1;
    save();
    window.scrollTo(0, 0);
    render();
  });
}

function runningLine() {
  const done = state.results.length;
  if (!done) return `${DRILLS.length} drills`;
  const avg = state.results.reduce((a, r) => a + checksOf(r), 0) / done;
  return `Running score: trending ${verdictFor(Math.round(avg)).label.toLowerCase()} · ${DRILLS.length - done} drills left`;
}

function renderGate(app) {
  app.innerHTML = `
    <div class="card">
      <h1>That's the free three.</h1>
      <p>${runningLine().replace(" · 7 drills left", "")}. The remaining seven drills — plus your full scorecard showing which of the four behaviors is costing you the most — unlock with your email.</p>
      <p style="color: var(--text-2); font-size: 14.5px;">One email when new drills or tools ship. No sequence, no spam, unsubscribe works.</p>
      <form id="gate-form">
        <input type="email" id="email" placeholder="name@company.com" required>
        <div class="btn-row"><button class="primary" type="submit">Unlock the remaining 7 drills</button></div>
      </form>
    </div>`;
  document.getElementById("gate-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    state.email = email;
    save();
    if (CONVERTKIT_FORM_ID) {
      fetch(`https://app.convertkit.com/forms/${CONVERTKIT_FORM_ID}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: email, tags: [weakestBehavior().key] })
      }).catch(() => {});
    }
    render();
  });
}

function weakestBehavior() {
  const counts = BEHAVIORS.map((b, j) => ({
    key: b.key, label: b.label,
    hits: state.results.reduce((a, r) => a + (r.checks[j] ? 1 : 0), 0)
  }));
  return counts.sort((a, b) => a.hits - b.hits)[0];
}

function renderScorecard(app) {
  const total = state.results.length;
  const behaviorCounts = BEHAVIORS.map((b, j) => ({
    label: b.label,
    hits: state.results.reduce((a, r) => a + (r.checks[j] ? 1 : 0), 0)
  }));
  const weakest = weakestBehavior();
  const avg = state.results.reduce((a, r) => a + checksOf(r), 0) / total;
  const overall = verdictFor(Math.round(avg));

  app.innerHTML = `
    <div class="card">
      <h1>Your scorecard</h1>
      <div class="verdict-row" style="margin-bottom: 16px;">
        <span class="verdict ${overall.cls}">Trending: ${overall.label}</span>
        <span class="note">across ${total} drills</span>
      </div>
      <ul class="scorelist">
        ${DRILLS.map((d, i) => {
          const v = verdictFor(checksOf(state.results[i]));
          return `<li><span>${i + 1}. ${esc(d.title)}</span><span class="verdict ${v.cls}">${v.label}</span></li>`;
        }).join("")}
      </ul>
      <h2>The four behaviors</h2>
      <div class="bars">
        ${behaviorCounts.map(b => `
          <div class="bar-row">${esc(b.label)} — ${b.hits}/${total}
            <div class="bar-track"><div class="bar-fill" style="width:${Math.round(100 * b.hits / total)}%"></div></div>
          </div>`).join("")}
      </div>
      <div class="callout">
        <p><strong>Your gap:</strong> ${esc(weakest.label.toLowerCase())} — ${weakest.hits} of ${total} drills. That's the difference between Hire and Strong Hire, and it's trainable.</p>
      </div>
      <div class="btn-row">
        <button id="share-btn">Copy my result</button>
        <button class="linkish" id="reset-btn">Start over</button>
      </div>
    </div>`;

  document.getElementById("share-btn").addEventListener("click", (e) => {
    const text = `Trade-off Drills: trending "${overall.label}" across ${total} PM interview drills. No right answers — you're scored on how you defend the call. ${location.href}`;
    navigator.clipboard.writeText(text).then(() => { e.target.textContent = "Copied"; });
  });
  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!confirm("Clear your progress and scores?")) return;
    state = { current: 0, results: [], email: state.email };
    save();
    render();
  });
}

render();
