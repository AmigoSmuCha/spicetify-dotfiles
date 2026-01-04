(function main() {
  if (!document.body) {
    setTimeout(main, 300);
    return;
  }

  // =============================================================
  // ⬇️ PASTE YOUR color.ini CONTENT BETWEEN THE BACKTICKS (`) ⬇️
  // =============================================================
  const colorIniContent = `
[Spotify]
accent             = 1db954
accent-active      = 1ed760
accent-inactive    = 121212
banner             = d5c4a1
border-active      = 1ed760
border-inactive    = 535353
header             = 535353
highlight          = 1a1a1a
main               = 121212
notification       = 4687d6
notification-error = e22134
subtext            = b3b3b3
text               = FFFFFF

[Spicetify]
accent             = 00e089
accent-active      = 00e089
accent-inactive    = 2E2837
banner             = d5c4a1
border-active      = 00e089
border-inactive    = 483b5b
header             = 483b5b
highlight          = 483b5b
main               = 2E2837
notification       = 00e089
notification-error = e22134
subtext            = DEDEDE
text               = FFFFFF

[FutureSoundOfLondon]
accent             = 83a598
accent-active      = 458588
accent-inactive    = 282828 
banner             = d5c4a1   
border-active      = 458588
border-inactive    = 282828
header             = d5c4a1
highlight          = 504945
main               = 201d1b
notification       = 98971a
notification-error = fb4934
subtext            = a89984
text               = d5c4a1

[GruvRed]
accent             = fb4934
accent-active      = cc241d
accent-inactive    = 282828
banner             = d5c4a1
border-active      = cc241d
border-inactive    = 282828
header             = d5c4a1
highlight          = 504945
main               = 201d1b
notification       = 98971a
notification-error = fb4934
subtext            = a89984
text               = d5c4a1

[Subwoofer-Lullaby]
accent             = 98971a
accent-active      = 79740e
accent-inactive    = 282828
banner             = d5c4a1
border-active      = 79740e
border-inactive    = 282828
header             = d5c4a1
highlight          = 504945
main               = 201d1b
notification       = 98971a
notification-error = fb4934
subtext            = a89984
text               = d5c4a1

[Gruvbox]
;https://github.com/morhetz/gruvbox/
accent             = 98971a
accent-active      = b8bb26
accent-inactive    = 282828
banner             = d5c4a1
border-active      = b8bb26
border-inactive    = 3c3836
header             = 665c54
highlight          = 7c6f64
main               = 282828
notification       = 458588
notification-error = cc241d
subtext            = bdae93
text               = fbf1c7

[DarkRed-SteveLacy]
accent             = fb4934
accent-active      = cc241d
accent-inactive    = 282828
banner             = d5c4a1
border-active      = cc241d
border-inactive    = 282828
header             = d5c4a1
highlight          = 504945
main               = 201d1b
notification       = 98971a
notification-error = fb4934
subtext            = a89984
text               = d5c4a1

[CatppuccinMocha]
;https://github.com/catppuccin/catppuccin
accent             = cba6f7
accent-active      = cba6f7
accent-inactive    = 1e1e2e
banner             = d5c4a1
border-active      = cba6f7
border-inactive    = 313244
header             = 585b70
highlight          = 585b70
main               = 1e1e2e
notification       = 89b4fa
notification-error = f38ba8
subtext            = a6adc8
text               = cdd6f4

[CatppuccinMacchiato]
;https://github.com/catppuccin/catppuccin
accent             = a6da95
accent-active      = 83a598
accent-inactive    = a6da95
banner             = d5c4a1
border-active      = a6da95
border-inactive    = 363a4f
header             = 5b6078
highlight          = 5b6078
main               = 24273a
notification       = 8aadf4
notification-error = ed8796
subtext            = a5adcb
text               = cad3f5

[CatppuccinLatte]
;https://github.com/catppuccin/catppuccin
accent             = a6d189
accent-active      = a6d189
accent-inactive    = 303446
banner             = d5c4a1
border-active      = a6d189
border-inactive    = 414559
header             = 626880
highlight          = 626880
main               = 303446
notification       = 8caaee
notification-error = e78284
subtext            = a5adce
text               = c6d0f5

[Dracula]
;https://github.com/dracula/dracula-theme
accent             = 50fa7b
accent-active      = 50fa7b
accent-inactive    = 282a36
banner             = d5c4a1
border-active      = 50fa7b
border-inactive    = 44475a
header             = 44475a
highlight          = 44475a
main               = 282a36
notification       = 8be9fd
notification-error = ff5555
subtext            = 6272a4
text               = f8f8f2

[Kanagawa]
;https://github.com/rebelot/kanagawa.nvim
accent             = 76946A
accent-active      = 98BB6C
accent-inactive    = 1F1F28
banner             = d5c4a1
border-active      = 98BB6C
border-inactive    = 2A2A37
header             = 54546D
highlight          = 363646
main               = 1F1F28
notification       = 7E9CD8
notification-error = E82424
subtext            = C8C093
text               = DCD7BA

[Nord]
;https://github.com/nordtheme/nord
accent             = 88c0d0
accent-active      = 8fbcbb
accent-inactive    = 2e3440
banner             = d5c4a1
border-active      = 8fbcbb
border-inactive    = 3b4252
header             = 4c566a
highlight          = 4c566a
main               = 2e3440
notification       = 5e81ac
notification-error = bf616a
subtext            = d8dee9
text               = eceff4

[Rigel]
;https://github.com/Rigellute/rigel/
accent             = 00cccc
accent-active      = 00ffff
accent-inactive    = 00384d
banner             = d5c4a1
border-active      = 00cccc
border-inactive    = 517f8d
header             = 517f8d
highlight          = 00384d
main               = 002635
notification       = 7eb2dd
notification-error = ff5a67
subtext            = 77929e
text               = b7cff9

[RosePine]
;https://github.com/rose-pine/rose-pine-theme
accent             = ebbcba
accent-active      = ebbcba
accent-inactive    = 1f1d2e
banner             = d5c4a1
border-active      = ebbcba
border-inactive    = 26233a
header             = 6e6a86
highlight          = 403d52
main               = 191724
notification       = 31748f
notification-error = eb6f92
subtext            = 908caa
text               = e0def4

[RosePineMoon]
;https://github.com/rose-pine/rose-pine-theme
accent             = ea9a97
accent-active      = ea9a97
accent-inactive    = 2a273f
banner             = d5c4a1
border-active      = ea9a97
border-inactive    = 393552
header             = 6e6a86
highlight          = 44415a
main               = 232136
notification       = 3e8fb0
notification-error = eb6f92
subtext            = 908caa
text               = e0def4

[RosePineDawn]
;https://github.com/rose-pine/rose-pine-theme
accent             = d7827e
accent-active      = d7827e
accent-inactive    = fffaf3
banner             = d5c4a1
border-active      = d7827e
border-inactive    = f2e9e1
header             = 9893a5
highlight          = dfdad9
main               = faf4ed
notification       = 286983
notification-error = b4637a
subtext            = 797593
text               = 575279

[Solarized]
;https://github.com/altercation/solarized
accent             = 859900
accent-active      = 859900
accent-inactive    = 073642
banner             = d5c4a1
border-active      = 859900
border-inactive    = 073642
header             = 586e75
highlight          = 073642
main               = 002b36
notification       = 268bd2
notification-error = dc322f
subtext            = 586e75
text               = 839496

[TokyoNight]
;https://github.com/enkia/tokyo-night-vscode-theme
accent             = 9ece6a
accent-active      = 9ece6a
accent-inactive    = 1a1b26
banner             = d5c4a1
border-active      = 9ece6a
border-inactive    = 24283b
header             = 565f89
highlight          = 24283b
main               = 1a1b26
notification       = 7aa2f7
notification-error = f7768e
subtext            = 565f89
text               = a9b1d6

[TokyoNightStorm]
;https://github.com/enkia/tokyo-night-vscode-theme
accent             = 9ece6a
accent-active      = 9ece6a
accent-inactive    = 24283b
banner             = d5c4a1
border-active      = 9ece6a
border-inactive    = 414868
header             = 9aa5ce
highlight          = 414868
main               = 24283b
notification       = 7aa2f7
notification-error = f7768e
subtext            = 9aa5ce
text               = c0caf5

[ForestGreen]
banner             = d5c4a1
accent             = 939393
accent-active      = 939393
accent-inactive    = 3e3e29
border-active      = 939393
border-inactive    = 515235
header             = 656641
highlight          = 656641
main               = 3e3e29
notification       = 8c8e59
notification-error = 787a4d
subtext            = 838383
text               = a3a3a3

[EverforestDarkHard]
;https://github.com/sainnhe/everforest
accent             = a7c080
accent-active      = a7c080
accent-inactive    = 272e33
banner             = d5c4a1
border-active      = a7c080
border-inactive    = 2e383c
header             = 414b50
highlight          = 3c4841
main               = 272e33
notification       = 83c092
notification-error = e67e80
subtext            = 859289
text               = d3c6aa

[EverforestDarkMedium]
;https://github.com/sainnhe/everforest
accent             = a7c080
accent-active      = a7c080
accent-inactive    = 2d353b
banner             = d5c4a1
border-active      = a7c080
border-inactive    = 343f44
header             = 475258
highlight          = 425047
main               = 2d353b
notification       = 83c092
notification-error = e67e80
subtext            = 859289
text               = d3c6aa

[EverforestDarkSoft]
;https://github.com/sainnhe/everforest
accent             = a7c080
accent-active      = a7c080
accent-inactive    = 333c43
banner             = a7c080
border-active      = a7c080
border-inactive    = 3a464c
header             = 4d5960
highlight          = 48584E
main               = 333c43
notification       = 83c092
notification-error = e67e80
subtext            = 859289
text               = d3c6aa
`;
  // =============================================================
  // ⬆️ END OF PASTE AREA ⬆️
  // =============================================================

  // --- INI PARSER ---
  function parseIni(content) {
    const schemes = [];
    let currentScheme = null;

    content.split(/\r?\n/).forEach(line => {
      line = line.trim();
      if (!line || line.startsWith(';')) return; // Ignore empty lines and comments

      // Check for [SectionName]
      const sectionMatch = line.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        if (currentScheme) schemes.push(currentScheme);
        currentScheme = { name: sectionMatch[1], colors: {} };
      } else if (currentScheme && line.includes('=')) {
        // Check for key = value
        let [key, val] = line.split('=').map(s => s.trim());
        if (key && val) {
          // Spicetify logic: if hex is 3 or 6 chars, map it. 
          // Also handles mapping ini keys to CSS variables.
          currentScheme.colors[`--spice-${key}`] = `#${val.replace('#', '')}`;

          // Helper: RGB values are often needed for some themes
          // Simple hex-to-rgb converter for --spice-rgb-x variables
          if (val.length === 6 || val.length === 3) {
            const hex = val.length === 3 ? val.split('').map(c => c + c).join('') : val;
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            currentScheme.colors[`--spice-rgb-${key}`] = `${r},${g},${b}`;
          }
        }
      }
    });
    if (currentScheme) schemes.push(currentScheme);
    return schemes;
  }

  const schemes = parseIni(colorIniContent);

  // --- STYLES ---
  const existingStyle = document.getElementById('theme-switcher-style');
  if (existingStyle) existingStyle.remove();

  const style = document.createElement('style');
  style.id = 'theme-switcher-style';
  style.innerHTML = `
        #theme-switcher-btn {
            position: fixed;
            top: 16px;              /* Aligned with standard top bar icons */
            right: 160px;           /* Safe distance from Close/Profile */
            z-index: 2147483647;    
            width: 24px;
            height: 24px;
            border: none;
            background-color: transparent;
            color: var(--spice-subtext);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: color 0.2s ease, transform 0.2s ease;
            opacity: 0.8;
            -webkit-app-region: no-drag;
        }
        #theme-switcher-btn:hover {
            color: var(--spice-text);
            transform: scale(1.1);
            opacity: 1;
        }
        #theme-switcher-menu {
            position: fixed;
            top: 50px;              
            right: 160px;
            background-color: var(--spice-main);
            border: 1px solid var(--spice-border-active);
            border-radius: 4px;
            padding: 8px;
            display: none;
            flex-direction: column;
            gap: 4px;
            z-index: 2147483647;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            min-width: 100px;
        }
        #theme-switcher-menu.visible {
            display: flex;
        }
        .theme-option {
            background: transparent;
            border: none;
            color: var(--spice-text);
            padding: 6px 12px;
            text-align: right;
            cursor: pointer;
            font-family: var(--font-family, monospace);
            font-size: 13px;
            border-radius: 2px;
        }
        .theme-option:hover {
            background-color: var(--spice-accent-active);
            color: var(--spice-main);
        }
    `;
  document.head.appendChild(style);

  // --- CREATE UI ---
  const existingBtn = document.getElementById('theme-switcher-btn');
  if (existingBtn) existingBtn.remove();
  const existingMenu = document.getElementById('theme-switcher-menu');
  if (existingMenu) existingMenu.remove();

  const btn = document.createElement('button');
  btn.id = 'theme-switcher-btn';
  // Square Icon
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="12" height="12" rx="2"/></svg>`;

  const menu = document.createElement('div');
  menu.id = 'theme-switcher-menu';

  schemes.forEach(scheme => {
    const item = document.createElement('button');
    item.className = 'theme-option';
    item.innerText = scheme.name;
    item.onclick = () => {
      applyScheme(scheme);
      menu.classList.remove('visible');
    };
    menu.appendChild(item);
  });

  document.body.appendChild(btn);
  document.body.appendChild(menu);

  // --- LOGIC ---
  btn.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle('visible');
  };

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('visible');
    }
  });

  function applyScheme(scheme) {
    const root = document.documentElement;
    for (const [variable, color] of Object.entries(scheme.colors)) {
      root.style.setProperty(variable, color);
    }
    localStorage.setItem("spicetify-custom-scheme-index", scheme.name); // Save Name instead of Index for safety
  }

  // Load by name
  const savedName = localStorage.getItem("spicetify-custom-scheme-index");
  if (savedName) {
    const found = schemes.find(s => s.name === savedName);
    if (found) applyScheme(found);
  }
})();
