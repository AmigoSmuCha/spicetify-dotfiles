console.log('[NPRD] Automatic Proxy Fallback Loaded');

// --- CLEANUP ---
['nprd-api-btn', 'nprd-web-btn', 'nprd-modal', 'releaseDate', 'nprd-style'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.remove();
});

// --- CONFIG ---
const separator = "•";
const positionSelector = ".main-nowPlayingWidget-nowPlaying:not(#upcomingSongDiv) .main-trackInfo-name";
const CACHE_KEY = "spicetify-nprd-cache";

// --- STATE MANAGEMENT ---
let debounceTimer = null;

// --- PERSISTENT CACHE ---
function getCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch { return {}; }
}

function setCache(id, date) {
  const cache = getCache();
  cache[id] = date;
  // Keep last 500 entries
  const keys = Object.keys(cache);
  if (keys.length > 500) delete cache[keys[0]];
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

// ==========================================================
// 1. MAIN LOGIC CHAIN
// ==========================================================
async function updateDisplay() {
  // Clear pending timers
  clearTimeout(debounceTimer);

  // Instant Cleanup
  const old = document.getElementById('releaseDate');
  if (old) old.remove();

  // Reset Globe Button to "Idle" state
  const btnWeb = document.getElementById("nprd-web-btn");
  if (btnWeb) btnWeb.style.opacity = "1";

  // Debounce (Wait 1s to allow skipping)
  debounceTimer = setTimeout(async () => {
    const track = Spicetify.Player.data.item;
    if (!track) return;

    const albumURI = track.album?.uri || track.metadata?.album_uri;
    const albumID = albumURI ? albumURI.split(':')[2] : null;
    if (!albumID) return;

    // STEP 1: CHECK CACHE & METADATA
    const cache = getCache();
    let date = cache[albumID] || track.metadata?.release_date || track.album?.release_date || track.metadata?.year;

    if (date) {
      // Found in memory/cache -> Render Grey
      renderDate(date, "var(--spice-subtext)");
      return;
    }

    // STEP 2: TRY INTERNAL API (Safe & Fast)
    console.log("[NPRD] Date missing. Checking Internal API...");
    const foundInternal = await fetchInternal(albumURI, albumID, true);

    if (foundInternal) {
      return; // Done
    }

    // STEP 3: AUTOMATIC PROXY FALLBACK
    // If we reached here, Internal API failed. Run Proxy automatically.
    console.log("[NPRD] Internal failed. Running Auto-Proxy...");
    runWebScrape(true); // 'true' = Silent Auto Mode

  }, 1000);
}

function renderDate(rawDate, color) {
  const container = document.querySelector(positionSelector);
  if (!container) return;
  if (document.getElementById('releaseDate')) return;

  let display = rawDate;
  const parts = rawDate.split('-');
  if (parts.length === 3) display = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const span = document.createElement("span");
  span.id = 'releaseDate';
  span.style.color = color;
  span.style.fontSize = "0.9em";
  span.style.marginLeft = "8px";
  span.style.opacity = "0.9";
  span.style.fontWeight = "bold";
  span.innerText = `${separator} ${display}`;
  container.appendChild(span);
}

// ==========================================================
// 2. FETCHERS
// ==========================================================

async function fetchInternal(uri, id, renderNow) {
  if (!Spicetify.Platform?.PlayerAPI) return false;
  try {
    const data = await Spicetify.Platform.PlayerAPI.getAlbum(uri);
    if (data) {
      const date = data.releaseDate?.isoString || data.releaseDate || data.year;
      if (date) {
        setCache(id, date);
        if (renderNow) renderDate(date, "var(--spice-subtext)");
        return true;
      }
    }
  } catch (e) { }
  return false;
}

// THE PROXY SCRAPER
async function runWebScrape(isAuto = false) {
  const track = Spicetify.Player.data.item;
  if (!track) {
    if (!isAuto) showModal("Error", "No song playing.", true);
    return;
  }
  const albumID = track.album.uri.split(':')[2];

  // Visual Feedback: Dim the globe while working
  const btnWeb = document.getElementById("nprd-web-btn");
  if (btnWeb) btnWeb.style.opacity = "0.4";

  if (!isAuto) showModal("🌍 Web Scraper", "Contacting Public Proxy...", false);

  try {
    const publicUrl = `https://open.spotify.com/album/${albumID}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(publicUrl)}`;

    const res = await fetch(proxyUrl);
    const html = await res.text();

    let fullDate = null;
    const patterns = [
      /"datePublished"\s*:\s*"([0-9-]{10})"/,
      /meta property="music:release_date" content="([0-9-]{10})"/,
      /"releaseDate":"([0-9-]{10})"/
    ];

    for (let regex of patterns) {
      const match = html.match(regex);
      if (match && match[1]) {
        fullDate = match[1];
        break;
      }
    }

    // Restore button opacity
    if (btnWeb) btnWeb.style.opacity = "1";

    if (fullDate) {
      setCache(albumID, fullDate);

      // SUCCESS: Render in ACCENT COLOR to show it came from Proxy
      renderDate(fullDate, "var(--spice-accent)");

      if (!isAuto) {
        showModal("✅ Scraper Success", { "Source": "Proxy", "Date": fullDate }, false);
      } else {
        // Auto-Mode Success: Flash Globe Green
        if (btnWeb) {
          btnWeb.style.color = "var(--spice-notification)";
          setTimeout(() => btnWeb.style.color = "var(--spice-subtext)", 4000);
        }
      }
    } else {
      if (!isAuto) showModal("⚠️ Scraper Failed", "Date not found in HTML.", true);
    }
  } catch (e) {
    if (btnWeb) btnWeb.style.opacity = "1";
    if (!isAuto) showModal("❌ Network Error", "Proxy unreachable.", true);
  }
}

// ==========================================================
// 3. MANUAL API & UI
// ==========================================================
async function runApiFetch() {
  const track = Spicetify.Player.data.item;
  if (!track) return showModal("Error", "No song playing.", true);
  const token = Spicetify.Platform?.Session?.accessToken || Spicetify.Platform?.AuthorizationAPI?.token?.accessToken;
  const albumID = track.album.uri.split(':')[2];
  showModal("⚡ API Request", "Contacting Spotify Servers...", false);
  try {
    const res = await fetch(`https://api.spotify.com/v1/albums/${albumID}`, { headers: { 'Authorization': `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) {
      setCache(albumID, data.release_date);
      renderDate(data.release_date, "var(--spice-accent)");
      showModal("✅ Success", { "Date": data.release_date }, false);
    } else { showModal("❌ Failed", `Code: ${res.status}`, true); }
  } catch (e) { showModal("❌ Error", e.message, true); }
}

function showModal(title, content, isError) {
  const existing = document.getElementById('nprd-modal');
  if (existing) existing.remove();
  const wrapper = document.createElement('div');
  wrapper.id = 'nprd-modal';
  wrapper.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 450px; background: var(--spice-main); border: 2px solid ${isError ? 'var(--spice-notification-error, #ff5555)' : 'var(--spice-accent)'}; box-shadow: 0 0 50px rgba(0,0,0,0.9); z-index: 10000; border-radius: 4px; color: var(--spice-text); font-family: monospace; padding: 20px; text-align: left;`;
  const h2 = document.createElement('h2');
  h2.innerText = title;
  h2.style.cssText = `margin-top:0; color: ${isError ? 'var(--spice-notification-error, #ff5555)' : 'var(--spice-accent)'}; border-bottom: 1px solid var(--spice-border-inactive); padding-bottom:10px; font-size: 18px;`;
  wrapper.appendChild(h2);
  const body = document.createElement('div');
  body.style.marginTop = "15px";
  if (typeof content === 'object' && content !== null) {
    let html = '<table style="width:100%; border-collapse:collapse; font-size:13px;">';
    for (const [key, val] of Object.entries(content)) { html += `<tr><td style="color:var(--spice-subtext); padding:5px 0; width:100px;">${key}:</td><td style="padding:5px 0; color:var(--spice-text);">${val}</td></tr>`; }
    html += '</table>';
    body.innerHTML = html;
  } else { body.innerText = content; }
  wrapper.appendChild(body);
  const closeBtn = document.createElement('button');
  closeBtn.innerText = "[ CLOSE WINDOW ]";
  closeBtn.style.cssText = "margin-top:20px; width:100%; padding:10px; background:var(--spice-card); color:var(--spice-subtext); border:1px solid var(--spice-border-inactive); cursor:pointer; font-family:monospace;";
  closeBtn.onclick = () => wrapper.remove();
  wrapper.appendChild(closeBtn);
  document.body.appendChild(wrapper);
}

// ==========================================================
// 4. INIT
// ==========================================================
(async function () {
  while (!Spicetify || !Spicetify.Player) { await new Promise(r => setTimeout(r, 100)); }

  const style = document.createElement('style');
  style.id = 'nprd-style';
  style.innerHTML = `.nprd-btn { position: fixed; top: 16px; z-index: 2147483647; width: 24px; height: 24px; border: none; background-color: transparent; color: var(--spice-subtext); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; transition: color 0.2s ease, transform 0.2s ease; opacity: 0.8; -webkit-app-region: no-drag; } .nprd-btn:hover { color: var(--spice-text); transform: scale(1.1); opacity: 1; }`;
  document.head.appendChild(style);

  // Manual API Button
  const btnApi = document.createElement("button");
  btnApi.id = "nprd-api-btn";
  btnApi.className = "nprd-btn";
  btnApi.innerText = "⚡";
  btnApi.style.right = "130px";
  btnApi.onclick = runApiFetch;
  document.body.appendChild(btnApi);

  // Proxy Button (Manual Trigger + Status Indicator)
  const btnWeb = document.createElement("button");
  btnWeb.id = "nprd-web-btn";
  btnWeb.className = "nprd-btn";
  btnWeb.innerText = "🌍";
  btnWeb.style.right = "100px";
  btnWeb.onclick = () => runWebScrape(false); // False = Manual Mode (Show Modal)
  document.body.appendChild(btnWeb);

  Spicetify.Player.addEventListener("songchange", updateDisplay);
  updateDisplay();
})();
