/* =========================================================================
   OUR FIRSTS — DATA FILE
   -------------------------------------------------------------------------
   This is the ONLY file you should need to touch every month. 💌

   ➜ To add a new memory each month:
       1. Copy one object inside `memories` array below.
       2. Change id (next number), title, location, date, caption, story.
       3. Make a new subfolder inside /images (one folder per chapter keeps
          photos organized) and put your photos in it. List their paths in
          the `photos` array (e.g. "images/09-buffet/photo1.jpg").
       4. Save the file — the map, pins and cards update automatically.
          No need to touch index.html, style.css or script.js at all.

   ➜ Photos: if a photo file doesn't exist yet, the site automatically
     shows a cute placeholder instead, so you never get a broken image.

   ➜ caption / story / letter text below are left EMPTY on purpose —
     fill them in with your own words. Everything else (location, date,
     food, gift) is just the factual info you gave me, kept as a hint.
   ========================================================================= */

const SITE_DATA = {

  // ---- Basic info, edit freely ----
  couple: {
    herName: "แป๋ม",
    himName: "พี่กิต",
    coverSubtitle: "💕 Love & Little Things 💕",
    openButtonLabel: "Click to open",
  },

  // ---- Floating music player ----
  music: {
    // วางไฟล์เพลงไว้ในโฟลเดอร์ music/ แล้วใส่ชื่อไฟล์ตรงนี้
    src: "music/bg-music.mp3",
    title: "🎵 Jelly's Love",
  },

  // ---- Ending love letter (typewriter animation) ----
  letter: {
    paragraphs: [
      "To. ที่รัก",
      "สวัสดีวันที่ 29 เดือน 8 คั้บที่รัก ดูแลกันมา 4 เดือนแง้ว แต่ถ้านับจริงๆ ก็ครึ่งปีแล้วคับ\nขอบคุณนะคะที่รักหนู และดูแลอย่างดีมาตลอดเลย เดือนที่แล้วกับเดือนนี้เป็นเดือนที่เราสองคนค่อนข้างหนักเลย\nแต่ดีใจและขอบคุณมากๆ เลยนะคะ ที่เราจับมือกันไว้ คอยให้กำลังใจกัน กอดๆ กัน โลกสดใสขึ้นเยอะเลยแหละคับ",
      "แป๋มรักพี่กิตมากๆเลยน้าา ทุกอย่างที่ให้หรือทำให้ หนูตั้งใจมากๆ และหวังว่าที่รักจะชอบมันนะคะ",
      "รักมากคั้บ\njelly <3\n29082026",
    ],
    closingLine: "Thank you for making every first become my favorite memory.",
    closingEmoji: "❤️",
  },

  // ---- Secret moon easter egg ----
  secret: {
    message: "I hope we never run out of firsts.",
  },

  // ---- All memories / chapters live here ----
  // Add a new object to this array every month. Order = order on map & path.
  memories: [
    {
      id: 1,
      chapter: "Chapter 01",
      title: "First Trip",
      icon: "🌊",
      location: "หัวหิน",
      date: "10–12 Apr",
      caption: "ทริปแรกของหนูกะพี่กิต",
      story: "ไปหัวหินกันนน! ขาไปหนูนั่งหลับป๊อกคอพับ ที่รักเบาเพลงให้ด้วยน่ารักที่สุดในโลก\nตอนเช้าตื่นมาไป Bluport เจอพี่ๆ ที่ทำงานที่รักด้วยล่ะ เจลลี่เดินตามต้อยๆ เหมือนลูกเจี๊ยบ\nมื้อเย็นกินไก่ทอดบอนชอน ขากลับตื่นเช้าไปกินกะเต๋วกะข้าวซอย แวะร้านโรงคั่วกาแฟพิเศษสุดอร่อย\nมีความสุขมากเยยคั้บ ไว้ไปกันอีกน้าาา",
      photos: ["images/03-first-trip/images.jpg", "images/03-first-trip/the-square-is-an-event.jpg"],
    },
    {
      id: 2,
      chapter: "Chapter 02",
      title: "First Meal",
      icon: "🍚",
      location: "หัวหิน",
      date: "11 Apr",
      caption: "ข้าวมื้อแรกที่กินด้วยกันน",
      story: "ตื่นแล้วไม่รู้จะกินไร เจลลี่ก็ตอบแต่แล้วแต่ที่รักเลย เดินเล่น Bluport สุดท้ายได้กินวิ๊งแซ่บของโปรด คนละ 6 ชิ้น\nซื้อเค้บซีเสร็จ เดินผ่านร้านกะเพรา ที่รักบอกว่ากะเพราร้านนี้อร่อยที่สุดเลยย ได้เลยกะเพราไข่ดาวมาหนึ่งกล่อง วันนั้นที่รักป้อนกะเพราด้วยล่ะ น่ารักที่สุดเล้ย\nมื้อแรกง่ายๆ ที่โรงแรมแต่มีฟามสุขที่สุดเยยคั้บ",
      photos: ["images/01-first-meal/หอมฉุย.jpg", "images/01-first-meal/winkzab.jpg"],
      food: ["ผัดกะเพรา (Pad Kra Pao)", "วิ้งแจ้บบบ (Wing Zab)"],
    },
    {
      id: 3,
      chapter: "Chapter 03",
      title: "First Gift",
      icon: "🎁",
      location: "ของขวัญชิ้นแรก",
      date: "26 Apr",
      caption: "ของขวัญชิ้นแรกของหนู",
      story: "กินอาหารญี่ปุ่นอิ่มๆ ยืนรอพี่เปรม พี่ตงเคลียร์บิล เจลลี่มองกล่องสุ่มคุโรมิในตู้ อยู่ๆ แฟนเดินมากดให้บอกว่า เห็นมองนานแล้วเลยรู้ว่าอยากได้ สุ่มออกมาได้คุโรมิอีก แฟนหนูนี่เก่งสุดยอดเลย",
      photos: ["images/02-first-gift/IMG_2262.jpg"],
      gift: "Kuromi Blind Box",
    },
    {
      id: 4,
      chapter: "Chapter 04",
      title: "First Activity",
      icon: "🎲",
      location: "",
      date: "",
      caption: "เล่นอะไรก็ได้ เล่นกับแฟนก็สนุกหมด",
      story: "แต่ก่อนเจลลี่ไม่ค่อยกล้าเล่นบอร์ดเกมเลย รู้สึกว่าเด๋อ และเวลาโกหกแล้วคนจับได้\nพอมาเจอที่รัก เจอพี่ๆ พอลองออกจากเซฟโซนแล้วลองเล่นดู ก็สนุกเหมือนกันนี่นาาา\nขอบคุณนะคะที่พาไปเล่นด้วย รักที่รักที่สุดเลยค่ะ",
      timeline: [
        { date: "26 Apr", event: "เล่นบอร์ดเกมด้วยกันครั้งแรกที่ GameSmith" },
        { date: "1 Jun", event: "ตีแบดด้วยกันครั้งแรก" },
        { date: "1 Jun", event: "ไปเล่นบอร์ดเกมบ้านพี่ๆ ครั้งแรก" },
      ],
      photos: [
        "images/05-activitie/IMG_2261.jpg",
        "images/05-activitie/IMG_3846.jpg",
        "images/05-activitie/IMG_3859.jpg",
      ],
    },
    {
      id: 5,
      chapter: "Chapter 05",
      title: "First Adventure",
      icon: "🚞",
      location: "กาญจนบุรี",
      date: "1–2 May",
      caption: "ไปเท่วกาญญญ",
      story: "ทริปไปเที่ยวกับแกงค์พี่ๆ สนุกมากเลย ได้เล่นทั้งบอร์ดเกม แพเปียก\nวันแรกเจลลี่โดนแฟนโกรธด้วย ไม่คุยกับหนูตั้งหลายชั่วโมง เพราะหนูดื้อวิ่งตากฝน ที่รักเป็นห่วงหนูมากเลย ขอบคุณนะคะ\nรักแฟนที่ชู้ดดดดดดด\nมีรูปที่เจลลี่ถ่ายแฟน แล้วแฟนลงไอจีด้วยล่ะ แฟนใครน่ารักชะมัดเลย",
      photos: [
        "images/04-first-adventure/IMG_2443.jpg",
        "images/04-first-adventure/IMG_2452.jpg",
        "images/04-first-adventure/IMG_2473.jpg",
        "images/04-first-adventure/472FAF5D-C5CC-42F2-9D40-081E05B0531E.jpg",
      ],
    },
    {
      id: 6,
      chapter: "Chapter 06",
      title: "First Buffet",
      icon: "🍽️",
      location: "Haris' พรีเมียม บุฟเฟต์ สาขากัลปพฤกษ์",
      date: "13 Jun",
      caption: "เจลลี่หม่ำๆ พี่กิตหม่ำๆ",
      story: "บุฟเฟ่ต์ที่กินด้วยกันมื้อแรกกก อิ่มมั้กๆ เลยคั้บ\nแต่กินเสร็จที่รักป่วยเยย รอบหน้าไม่กินแซลม่อนเยอะแบบนั้นแย้วนะ เจลลี่เป็นห่วงคับ",
      photos: [
        "images/07-buffet/IMG_4663.jpg",
        "images/07-buffet/food1.webp",
        "images/07-buffet/food2.webp",
      ],
    },
    {
      id: 7,
      chapter: "Chapter 07",
      title: "To Be Continued...",
      icon: "✨",
      location: "และอีกมากมายที่กำลังจะมาถึง",
      date: "",
      caption: "",
      story: "ที่รักค้าบบ ไว้มาสร้าง Journey เราต่ออีกเยอะๆ เลยน้าา\nหนูรักพี่กิตนะคะ <3",
      photos: [
        "images/08-to-be-continued/IMG_7929.jpg",
        "images/08-to-be-continued/IMG_7930.jpg",
        "images/08-to-be-continued/IMG_7931.jpg",
        "images/08-to-be-continued/IMG_7932.jpg",
      ],
      isFinal: true,
    },
  ],
};
