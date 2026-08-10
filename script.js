/* =========================================================================
   OUR FIRSTS — SCRIPT
   All content comes from `SITE_DATA` in data.js. This file only renders it
   and handles interactions — no memory text/photos should live here.
   ========================================================================= */

(function () {
  "use strict";

  const DATA = SITE_DATA;

  /* ------------------------------------------------------------------ */
  /*  Tiny sound engine (no external audio files needed for SFX)         */
  /* ------------------------------------------------------------------ */
  const SFX = (() => {
    let ctx;
    function getCtx() {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      return ctx;
    }
    function tone(freq, start, dur, type = "sine", vol = 0.06) {
      try {
        const c = getCtx();
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, c.currentTime + start);
        gain.gain.setValueAtTime(0, c.currentTime + start);
        gain.gain.linearRampToValueAtTime(vol, c.currentTime + start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
        osc.connect(gain).connect(c.destination);
        osc.start(c.currentTime + start);
        osc.stop(c.currentTime + start + dur + 0.05);
      } catch (e) { /* audio not available, ignore */ }
    }
    return {
      pop() { tone(660, 0, 0.12, "sine", 0.05); tone(880, 0.05, 0.12, "sine", 0.04); },
      whoosh() { tone(220, 0, 0.25, "sine", 0.03); },
      chime() {
        [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.14, 0.5, "sine", 0.045));
      },
    };
  })();

  /* ------------------------------------------------------------------ */
  /*  Screen navigation                                                   */
  /* ------------------------------------------------------------------ */
  const screens = document.querySelectorAll(".screen");
  function showScreen(id) {
    screens.forEach((s) => s.classList.toggle("active", s.id === id));
    SFX.whoosh();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ------------------------------------------------------------------ */
  /*  Floating particles background                                      */
  /* ------------------------------------------------------------------ */
  (function particles() {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    let w, h, particlesArr;
    const glyphs = ["❤", "✨", "🌸", "💕"];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function makeParticle(fromBottom) {
      return {
        x: Math.random() * w,
        y: fromBottom ? h + 20 : Math.random() * h,
        size: 10 + Math.random() * 14,
        speed: 0.25 + Math.random() * 0.5,
        drift: Math.random() * 1.4 - 0.7,
        angle: Math.random() * Math.PI * 2,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        opacity: 0.25 + Math.random() * 0.35,
      };
    }
    function init() {
      resize();
      const count = window.innerWidth < 640 ? 14 : 22;
      particlesArr = Array.from({ length: count }, () => makeParticle(false));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      particlesArr.forEach((p) => {
        p.y -= p.speed;
        p.x += Math.sin(p.angle + p.y * 0.01) * p.drift * 0.3;
        if (p.y < -30) Object.assign(p, makeParticle(true));
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillText(p.glyph, p.x, p.y);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    }
    window.addEventListener("resize", resize);
    init();
    tick();
  })();

  /* ------------------------------------------------------------------ */
  /*  Cover screen                                                        */
  /* ------------------------------------------------------------------ */
  document.getElementById("coverSubtitle").textContent = DATA.couple.coverSubtitle;
  document.getElementById("openBtnLabel").textContent = DATA.couple.openButtonLabel;

  document.getElementById("openBookBtn").addEventListener("click", () => {
    SFX.pop();
    showScreen("mapScreen");
    setTimeout(startChibiWander, 600);
    audio.play().catch(() => {});
  });

  /* ------------------------------------------------------------------ */
  /*  Build the winding path + pins from DATA.memories                   */
  /* ------------------------------------------------------------------ */
  const memories = DATA.memories;
  const trailPath = document.getElementById("trailPath");
  const trailPathDirt = document.getElementById("trailPathDirt");
  const trailPathEdge = document.getElementById("trailPathEdge");
  const pinsLayer = document.getElementById("pinsLayer");
  let waypoints = [];

  function buildWaypoints() {
    const n = memories.length;
    waypoints = memories.map((m, i) => {
      const t = n <= 1 ? 0 : i / (n - 1);
      const y = 6 + t * 88; // percent, top to bottom
      const zigzag = Math.sin(i * 1.35) * 30; // -30..30
      const x = 50 + zigzag; // percent
      return { x: Math.max(14, Math.min(86, x)), y };
    });
  }

  // Catmull-Rom -> cubic bezier path string, smooth curve through points
  function smoothPathD(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y} `;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y} `;
    }
    return d;
  }

  function renderPins() {
    pinsLayer.innerHTML = "";
    memories.forEach((m, i) => {
      const pt = waypoints[i];
      const pin = document.createElement("button");
      pin.className = "pin" + (m.isFinal ? " final" : "");
      pin.style.left = pt.x + "%";
      pin.style.top = pt.y + "%";
      pin.style.animationDelay = (i * 0.15) + "s";
      pin.innerHTML = `
        <span class="pin-btn"><span>${m.icon || "📍"}</span></span>
        <span class="pin-label">${m.title}</span>
      `;
      pin.addEventListener("click", () => openMemory(i));
      pinsLayer.appendChild(pin);
    });
  }

  function init() {
    buildWaypoints();
    const pathD = smoothPathD(waypoints);
    trailPath.setAttribute("d", pathD);
    trailPathDirt.setAttribute("d", pathD);
    trailPathEdge.setAttribute("d", pathD);
    renderPins();
  }
  init();
  window.addEventListener("resize", () => {
    // path uses percentage viewBox (0-100), no rebuild needed on resize
  });

  /* ------------------------------------------------------------------ */
  /*  Memory modal                                                        */
  /* ------------------------------------------------------------------ */
  const modal = document.getElementById("memoryModal");
  let currentIndex = 0;

  function renderPhotos(container, photos) {
    container.innerHTML = "";
    const list = (photos && photos.length) ? photos : [null];
    list.forEach((src, i) => {
      const card = document.createElement("div");
      card.className = "polaroid";
      card.style.setProperty("--rot", (i % 2 === 0 ? "-4deg" : "3deg"));
      if (src) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "our memory";
        img.onerror = () => {
          img.replaceWith(placeholderPhoto());
        };
        card.appendChild(img);
      } else {
        card.appendChild(placeholderPhoto());
      }
      container.appendChild(card);
    });
  }
  function placeholderPhoto() {
    const div = document.createElement("div");
    div.className = "ph-placeholder";
    div.textContent = "📷";
    return div;
  }

  function openMemory(index) {
    currentIndex = index;
    const m = memories[index];
    document.getElementById("cardChapterNum").textContent = m.chapter;
    document.getElementById("cardTitle").textContent = m.title;
    const locEl = document.getElementById("cardLocation");
    locEl.querySelector(".note-txt").textContent = m.location || "";
    locEl.style.display = m.location ? "flex" : "none";
    const dateEl = document.getElementById("cardDate");
    dateEl.querySelector(".note-txt").textContent = m.date || "";
    dateEl.style.display = m.date ? "flex" : "none";
    // optional multi-event timeline (e.g. First Activity)
    const tl = document.getElementById("cardTimeline");
    tl.innerHTML = "";
    if (m.timeline && m.timeline.length) {
      m.timeline.forEach((t) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="tl-date">${t.date}</span><span class="tl-event">${t.event}</span>`;
        tl.appendChild(li);
      });
      tl.style.display = "block";
    } else {
      tl.style.display = "none";
    }
    // hide the whole note box if there's nothing to show
    document.getElementById("cardNote").style.display =
      (m.location || m.date || (m.timeline && m.timeline.length)) ? "block" : "none";
    document.getElementById("cardCaption").textContent = m.caption ? `"${m.caption}"` : "";
    let story = m.story || "";
    if (m.food) story += `\n\n🍴 เมนู: ${m.food.join(", ")}`;
    if (m.gift) story += `\n\n🎁 ของขวัญ: ${m.gift}`;
    document.getElementById("cardStory").textContent = story;
    renderPhotos(document.getElementById("cardPhotos"), m.photos);

    document.getElementById("prevCardBtn").disabled = index === 0;
    document.getElementById("nextCardBtn").disabled = index === memories.length - 1;

    modal.classList.add("open");
    SFX.pop();

    document.querySelectorAll(".pin")[index]?.classList.add("done");
  }
  function closeMemory() { modal.classList.remove("open"); }

  document.getElementById("closeMemoryBtn").addEventListener("click", closeMemory);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeMemory(); });
  document.getElementById("prevCardBtn").addEventListener("click", () => currentIndex > 0 && openMemory(currentIndex - 1));
  document.getElementById("nextCardBtn").addEventListener("click", () => currentIndex < memories.length - 1 && openMemory(currentIndex + 1));

  /* ------------------------------------------------------------------ */
  /*  Chibi characters wandering the map                                  */
  /* ------------------------------------------------------------------ */
  const chibiHer = document.getElementById("chibiHer");
  const chibiHim = document.getElementById("chibiHim");
  let wanderStarted = false;
  const ACTIONS = ["wave", "jump", "look-away", "idle"];

  function moveChibi(el, pt) {
    el.style.left = pt.x + "%";
    el.style.top = pt.y + "%";
  }

  function randomPointNear(base, spread) {
    return {
      x: Math.max(10, Math.min(90, base.x + (Math.random() * spread - spread / 2))),
      y: Math.max(6, Math.min(94, base.y + (Math.random() * spread - spread / 2))),
    };
  }

  function clearActionClasses(el) {
    el.classList.remove("idle", "wave", "jump", "sit", "look-away", "hearting");
  }

  function spawnHeart(el) {
    el.classList.add("hearting");
    setTimeout(() => el.classList.remove("hearting"), 1600);
  }

  function togetherMoment(pt) {
    const modeRoll = Math.random();
    moveChibi(chibiHer, { x: pt.x - 4, y: pt.y });
    moveChibi(chibiHim, { x: pt.x + 4, y: pt.y });
    setTimeout(() => {
      clearActionClasses(chibiHer);
      clearActionClasses(chibiHim);
      if (modeRoll < 0.5) {
        chibiHer.classList.add("sit");
        chibiHim.classList.add("sit");
      } else {
        chibiHer.classList.add("look-away");
        chibiHim.classList.add("look-away");
      }
      spawnHeart(chibiHer);
      setTimeout(() => spawnHeart(chibiHim), 300);
    }, 3300);
  }

  function wanderCycle() {
    const anchor = waypoints[Math.floor(Math.random() * waypoints.length)];
    const together = Math.random() < 0.4;

    if (together) {
      togetherMoment(anchor);
    } else {
      const herPt = randomPointNear(anchor, 22);
      const himPt = randomPointNear(anchor, 22);
      moveChibi(chibiHer, herPt);
      moveChibi(chibiHim, himPt);
      setTimeout(() => {
        clearActionClasses(chibiHer);
        clearActionClasses(chibiHim);
        chibiHer.classList.add(ACTIONS[Math.floor(Math.random() * ACTIONS.length)]);
        chibiHim.classList.add(ACTIONS[Math.floor(Math.random() * ACTIONS.length)]);
        if (Math.random() < 0.3) { spawnHeart(chibiHer); }
      }, 3300);
    }

    const nextDelay = 6500 + Math.random() * 4000;
    setTimeout(wanderCycle, nextDelay);
  }

  function startChibiWander() {
    if (wanderStarted) return;
    wanderStarted = true;
    const first = waypoints[0] || { x: 50, y: 10 };
    moveChibi(chibiHer, randomPointNear(first, 10));
    moveChibi(chibiHim, randomPointNear(first, 10));
    setTimeout(wanderCycle, 1500);
  }

  /* ------------------------------------------------------------------ */
  /*  Love letter — typewriter                                            */
  /* ------------------------------------------------------------------ */
  const letterFullText =
    DATA.letter.paragraphs.join("\n\n") +
    "\n\n" + DATA.letter.closingLine + " " + DATA.letter.closingEmoji;

  let typeTimer = null;

  function typewrite() {
    const el = document.getElementById("typewriterText");
    el.textContent = "";
    let i = 0;
    clearInterval(typeTimer);
    typeTimer = setInterval(() => {
      el.textContent += letterFullText[i];
      i++;
      if (i % 6 === 0) {
        document.getElementById("letterScroll").scrollTop = el.scrollHeight;
      }
      if (i >= letterFullText.length) clearInterval(typeTimer);
    }, 32);
  }

  document.getElementById("toLetterBtn").addEventListener("click", () => {
    showScreen("letterScreen");
    setTimeout(typewrite, 400);
  });
  document.getElementById("closeLetterBtn").addEventListener("click", () => {
    clearInterval(typeTimer);
    showScreen("mapScreen");
  });

  /* ------------------------------------------------------------------ */
  /*  Secret moon easter egg                                              */
  /* ------------------------------------------------------------------ */
  let moonClicks = 0;
  document.getElementById("moonBtn").addEventListener("click", () => {
    moonClicks++;
    SFX.pop();
    if (moonClicks >= 5) {
      moonClicks = 0;
      unlockSecret();
    }
  });

  function unlockSecret() {
    document.getElementById("secretMsg").textContent = DATA.secret.message;
    showScreen("secretScreen");
    SFX.chime();
    spawnShootingStars();
  }
  document.getElementById("closeSecretBtn").addEventListener("click", () => showScreen("mapScreen"));

  function spawnShootingStars() {
    const sky = document.getElementById("nightSky");
    sky.innerHTML = "";
    let count = 0;
    const interval = setInterval(() => {
      if (!document.getElementById("secretScreen").classList.contains("active")) {
        clearInterval(interval);
        return;
      }
      const star = document.createElement("div");
      star.className = "star-shot";
      star.style.top = Math.random() * 40 + "%";
      star.style.left = 60 + Math.random() * 35 + "%";
      sky.appendChild(star);
      setTimeout(() => star.remove(), 1500);
      count++;
      if (count > 40) clearInterval(interval);
    }, 900);
  }

  /* ------------------------------------------------------------------ */
  /*  Floating music player (starts automatically when the book opens)     */
  /* ------------------------------------------------------------------ */
  const audio = document.getElementById("bgAudio");
  audio.src = DATA.music.src;
  document.getElementById("musicSongTitle").textContent = DATA.music.title;
  audio.volume = 0.15;

  const player = document.getElementById("musicPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const loopBtn = document.getElementById("loopBtn");
  const volumeSlider = document.getElementById("volumeSlider");

  document.getElementById("musicToggleBtn").addEventListener("click", () => {
    player.classList.toggle("collapsed");
  });

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        alert("ยังไม่มีไฟล์เพลง — วางไฟล์ไว้ที่ music/bg-music.mp3 แล้วลองใหม่นะ 🎵");
      });
    } else {
      audio.pause();
    }
  });
  audio.addEventListener("play", () => { playPauseBtn.textContent = "⏸"; playPauseBtn.classList.add("active"); });
  audio.addEventListener("pause", () => { playPauseBtn.textContent = "▶"; playPauseBtn.classList.remove("active"); });

  loopBtn.addEventListener("click", () => {
    audio.loop = !audio.loop;
    loopBtn.classList.toggle("active", audio.loop);
  });
  audio.loop = true;
  loopBtn.classList.add("active");

  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });

})();
