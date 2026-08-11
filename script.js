/* ==========================================================================
   CONFIG - edit everything below to update the site content.
   No HTML editing needed for repos, client sites, or contact info.
   ========================================================================== */
const CONFIG = {

  github: {
    username: "aardmann",
    // Exact repo names (case-sensitive) to keep OFF the site.
    // e.g. hiddenRepos: ["old-school-project", "private-experiment"]
    hiddenRepos: [],
    // Forked repos are excluded by default since they're not original work.
    hideForks: true,
    // Max number of repos to show, most recently updated first.
    maxRepos: 9,
  },

  // SAMPLE DATA - replace with your real client projects.
  // Each entry becomes one "browser window" card in the Client Work section.
  clientSites: [
    {
      name: "The Outback Hotel",
      url: "theoutbackhotelgh.com",
      description: "Online booking Hotel websute for The Outbac Hotel",
      sample: true,
    },
    {
      name: "RM",
      url: "aardmann.github.io/rm-store",
      description: "Beta version of RM Store. Simple online custom clothing shop.",
      sample: true,
    },
    {
      name: "Ghana Trotro Transit Mobile App",
      url: "gtt.nxnx.tech",
      description: "Ghana's first public transport app.",
      sample: false,
    },
  ],

  contact: [
    { label: "Email", value: "nananketia07@gmail.com", href: "mailto:nananketia07@gmail.com" },
    { label: "Phone", value: "+233 20 915 6811", href: "tel:+233209156811" },
    { label: "Phone (alt)", value: "+233 20 915 6822", href: "tel:+233209156822" },
    { label: "LinkedIn", value: "Nana Nketia", href: "https://www.linkedin.com/in/nana-nketia-905339212" },
    { label: "X / Twitter", value: "@aardmann", href: "https://x.com/aardmann" },
  ],

};

/* ==========================================================================
   FOOTER YEAR
   ========================================================================== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ==========================================================================
   NAV TOGGLE (mobile)
   ========================================================================== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ==========================================================================
   HERO TERMINAL - typed intro
   ========================================================================== */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const terminalLines = [
  { prompt: "$ whoami", output: "Nketia Nana Yaw Junior" },
  { prompt: "$ status", output: "Final-year ICT student - Takoradi Technical University" },
  { prompt: "$ building", output: "NxNx Tech - mobile apps, websites, custom software" },
  { prompt: "$ location", output: "Ghana" },
];

function renderTerminalInstant() {
  const body = document.getElementById("terminalBody");
  body.innerHTML = terminalLines
    .map(l => `<span class="line"><span class="prompt">${l.prompt}</span></span><span class="line">${l.output}</span>`)
    .join("") + `<span class="cursor"></span>`;
}

function typeTerminal() {
  const body = document.getElementById("terminalBody");
  body.innerHTML = "";
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= terminalLines.length) {
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      body.appendChild(cursor);
      return;
    }
    const { prompt, output } = terminalLines[lineIndex];

    const promptEl = document.createElement("span");
    promptEl.className = "line prompt";
    body.appendChild(promptEl);
    typeText(promptEl, prompt, () => {
      const outputEl = document.createElement("span");
      outputEl.className = "line";
      body.appendChild(outputEl);
      typeText(outputEl, output, () => {
        lineIndex++;
        setTimeout(typeLine, 220);
      });
    });
  }

  function typeText(el, text, done) {
    let i = 0;
    const speed = 22;
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        done();
      }
    })();
  }

  typeLine();
}

if (reducedMotion) {
  renderTerminalInstant();
} else {
  typeTerminal();
}

/* ==========================================================================
   CLIENT WORK - render "browser window" cards from CONFIG.clientSites
   ========================================================================== */
function renderClientSites() {
  const grid = document.getElementById("clientGrid");
  grid.innerHTML = CONFIG.clientSites.map(site => `
    <div class="browser-card">
      <div class="browser-chrome">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        <span class="browser-url">${site.url}</span>
      </div>
      <div class="browser-body">
        ${site.sample ? '<span class="browser-tag">Sample - edit me</span>' : ""}
        <h3>${site.name}</h3>
        <p>${site.description}</p>
        <a class="browser-link" href="https://${site.url}" target="_blank" rel="noopener noreferrer">Visit site →</a>
      </div>
    </div>
  `).join("");
}
renderClientSites();

/* ==========================================================================
   CONTACT - render rows from CONFIG.contact
   ========================================================================== */
function renderContact() {
  const card = document.getElementById("contactCard");
  card.innerHTML = CONFIG.contact.map(c => `
    <a class="contact-row" href="${c.href}" target="${c.href.startsWith("http") ? "_blank" : "_self"}" rel="noopener noreferrer">
      <span class="contact-label">${c.label}</span>
      <span class="contact-value">${c.value}</span>
    </a>
  `).join("");
}
renderContact();

/* ==========================================================================
   GITHUB PROJECTS - live fetch, filtered by CONFIG.github.hiddenRepos
   ========================================================================== */
const langColors = {
  JavaScript: "#f1c40f", TypeScript: "#3178c6", Python: "#3776ab",
  HTML: "#e34c26", CSS: "#264de4", Java: "#b07219", "C++": "#f34b7d",
  C: "#555555", PHP: "#4F5D95", Ruby: "#701516", Swift: "#F05138",
  Go: "#00ADD8", Shell: "#89e051", Dart: "#00B4AB", Kotlin: "#A97BFF",
};

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(months / 12)} yr ago`;
}

async function loadRepos() {
  const statusEl = document.getElementById("projectsStatus");
  const grid = document.getElementById("repoGrid");
  const { username, hiddenRepos, hideForks, maxRepos } = CONFIG.github;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const repos = await res.json();

    const visible = repos
      .filter(r => !hiddenRepos.includes(r.name))
      .filter(r => !(hideForks && r.fork))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, maxRepos);

    if (visible.length === 0) {
      statusEl.textContent = "No public repos to show right now - check the GitHub profile below.";
      return;
    }

    statusEl.textContent = `Showing ${visible.length} most recently updated repositories.`;
    grid.innerHTML = visible.map(r => `
      <div class="repo-card">
        <p class="repo-name"><a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a></p>
        <p class="repo-desc">${r.description ? r.description : "No description provided."}</p>
        <div class="repo-meta">
          ${r.language ? `<span><span class="repo-lang-dot" style="background:${langColors[r.language] || "#3E5A1E"}"></span>${r.language}</span>` : ""}
          <span>★ ${r.stargazers_count}</span>
          <span>Updated ${timeAgo(r.updated_at)}</span>
        </div>
      </div>
    `).join("");

  } catch (err) {
    statusEl.textContent = "Couldn't load live projects right now - view the full profile on GitHub below.";
    grid.innerHTML = "";
    console.error("GitHub fetch failed:", err);
  }
}
loadRepos();

/* ==========================================================================
   SCROLL REVEAL - subtle fade-up per section, respects reduced motion
   ========================================================================== */
if (!reducedMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(".section-inner");
  revealTargets.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
}