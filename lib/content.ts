// All copy lives here so the page files stay structural and one edit changes one
// thing. Every figure is drawn from dossier/ and is defensible; if you change a
// number here, change it there too.

export type Photo = {
  /** Where the file goes, relative to /public. */
  src: string;
  /** What the photo should actually be, shown in the placeholder until it exists. */
  brief: string;
  alt: string;
  /** width/height, so the box reserves its space and nothing shifts on load. */
  ratio: [number, number];
};

export const site = {
  name: "Adam Mirmina",
  role: "Data science and cognitive science at Purdue",
  // The thesis. Everything below is evidence for this sentence, which is why it
  // is the only claim on the site stated without a number attached.
  thesis:
    "I build software for problems I can point at, usually because someone I know had one.",
  email: "amirmina@purdue.edu",
  links: {
    github: "https://github.com/AdamMirmina",
    linkedin: "https://linkedin.com/in/adam-mirmina",
    studio: "https://ramsgatestudio.com",
  },
  portrait: {
    src: "/photos/portrait.jpg",
    brief: "A portrait. Not a studio headshot; somewhere with real light.",
    alt: "Adam Mirmina",
    ratio: [4, 5] as [number, number],
  },
};

export const now = [
  {
    label: "Studying",
    body: "B.S. Data Science and B.A. Cognitive Science at Purdue, statistics concentration. Class of 2029.",
  },
  {
    label: "Researching",
    body: "Cardiovascular Imaging Research Lab under Dr. Craig Goergen, measuring aortic disease from ultrasound.",
  },
  {
    label: "Running",
    body: "Ramsgate Studio, a web design studio in South Jersey building and hosting sites for small businesses.",
  },
  {
    label: "Starting",
    body: "A year with The Data Mine and the World Wildlife Fund, using satellite data to monitor mangrove coastline.",
  },
];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  /** The human reason it exists. This leads, before any technical description. */
  origin: string;
  body: string;
  /** At most three. Rendered as large type, never as stat cards. */
  facts: { value: string; label: string }[];
  stack: string[];
  href?: string;
  photo: Photo;
};

export const projects: Project[] = [
  {
    slug: "poolvision",
    name: "PoolVision",
    kind: "Computer vision",
    year: "2026",
    origin:
      "I run a summer pool-basketball league with my friends, and every score was being typed in by hand.",
    body:
      "One fixed camera watches the pool. The pipeline finds each shot, calls it a make or a miss, and is learning to say who took it. Identity comes from colored swim caps, because people who are wet and half-submerged thirty feet away carry none of the cues a face model needs.",
    facts: [
      { value: "82.2%", label: "on shots it never saw in training" },
      { value: "146", label: "shots judged by hand to train it" },
      { value: "118 min", label: "of 4K footage recorded and labeled" },
    ],
    stack: ["Python", "PyTorch", "YOLO11", "OpenCV"],
    href: "https://github.com/AdamMirmina/poolvision",
    photo: {
      src: "/photos/poolvision.jpg",
      brief:
        "The camera rig over the pool, or a frame from the footage with the hoop in view. A real shot in progress beats a clean empty pool.",
      alt: "The fixed camera view over the pool basketball hoop",
      ratio: [16, 10],
    },
  },
  {
    slug: "bro-science",
    name: "Bro Science",
    kind: "iOS app",
    year: "2026",
    origin: "I lift, and I wanted a coach that would tell me when it did not know.",
    body:
      "A training app with an AI coach that reads your actual routine and history before it proposes anything. It cites the study behind each change, only where a study really tested that exercise, and says when none has rather than inventing one. It works with no signal and reconciles when it reconnects.",
    facts: [
      { value: "5", label: "people logging their training in it" },
      { value: "19", label: "entity types reconciled offline-first" },
    ],
    stack: ["React Native", "Expo", "SQLite", "PocketBase", "Anthropic API"],
    photo: {
      src: "/photos/bro-science.jpg",
      brief:
        "Two phone screens side by side: a workout mid-session, and the coach mid-conversation with a citation visible.",
      alt: "Bro Science running on a phone",
      ratio: [16, 10],
    },
  },
  {
    slug: "spectra",
    name: "Spectra",
    kind: "Web app",
    year: "2026",
    origin:
      "My partner has chromesthesia. She sees color when she hears music, and had no way to write any of it down.",
    body:
      "A tool for recording what a note or a chord actually looks like to her, with microphone chord recognition so capture keeps up with playing. The point was never the visualization, it was the data: a record that survives the device it was entered on.",
    facts: [{ value: "1", label: "person it was built for" }],
    stack: ["Vite", "React", "Cloudflare Workers", "PocketBase"],
    photo: {
      src: "/photos/spectra.jpg",
      brief:
        "The capture screen with several notes already mapped to colors. Color is the whole subject, so let it fill the frame.",
      alt: "Spectra mapping notes to colors",
      ratio: [16, 10],
    },
  },
  {
    slug: "mirmina-tiles",
    name: "Mirmina Tiles",
    kind: "Real-time game",
    year: "2026",
    origin: "My family plays word games, and we are spread across three states.",
    body:
      "Scrabble rules, played in a browser, in real time. The server owns every move: it validates the board, keeps each player's rack private, and settles who played what. Doing that on the client would mean trusting five relatives not to read each other's letters.",
    facts: [{ value: "Server", label: "authoritative on every move" }],
    stack: ["Vite", "React", "Cloudflare Workers", "PocketBase"],
    href: "https://mirminatiles.com",
    photo: {
      src: "/photos/mirmina-tiles.jpg",
      brief: "A game in progress on a laptop, board mid-game with a rack visible.",
      alt: "A Mirmina Tiles game in progress",
      ratio: [16, 10],
    },
  },
];

export const alsoBuilt = [
  { name: "Cashbook", note: "A ledger that reconciles four sources into one book and files itself." },
  { name: "Drop", note: "Moves a file between my phone and my computer without going through email." },
  { name: "Roots", note: "A private family tree, built because the commercial ones want your data." },
  { name: "Semester", note: "A coursework planner that replaced a spreadsheet I maintained by hand." },
  { name: "Share", note: "Turns a markdown file into a page worth sending someone." },
  { name: "Mesh", note: "Group scheduling with no accounts. Share a link, mark when you are free." },
  { name: "Birthday Bird", note: "Add a birthday, get reminded. Nothing else." },
  { name: "Corridor", note: "Leadership turnover across 101 Philadelphia development corporations." },
];

export const research = {
  lab: "Cardiovascular Imaging Research Laboratory, Purdue",
  pi: "Dr. Craig Goergen",
  supervisor: "Shubh Mehta, American Heart Association Predoctoral Fellow",
  period: "December 2025 to present",
  // Plain-language framing first. A reader who does not know what an aortic root
  // is should still understand why an overstated number is dangerous.
  context:
    "The lab studies aortopathy, where the aortic root widens and its wall weakens on the way to an aneurysm. Two numbers track it: how wide the root is, and how much it expands with each heartbeat. The second falls as the wall stiffens, which makes measurement error dangerous in one direction. A tool that overstates movement makes a diseased vessel look healthy, and it does that most on exactly the clips where measuring is hardest.",
  findings: [
    {
      head: "Built a detector that measures the aortic root from ultrasound video",
      body:
        "It reads each frame on its own instead of tracking motion between frames, so it cannot accumulate drift. It agrees with hand-traced measurements within 3% on two animals, and refuses to report at all below 80% frame coverage rather than returning a number nobody could tell was wrong.",
    },
    {
      head: "Found the lab's existing tracker overstating expansion by two to three times",
      body:
        "In the direction that makes a stiffening vessel read as healthy. The cause was accumulated seeding error making the two tracked walls cross, producing negative vessel widths on 49 of 300 frames that had been flowing silently into analysis and export.",
    },
    {
      head: "Diagnosed why one measurement had never been possible",
      body:
        "Cyclic strain was not a method problem, it was a sampling problem. The standard scan gives about 8 frames per heartbeat, too few to separate real motion from noise. A scan mode already sitting in the archive gives about 110, and produced a clean heartbeat curve for the first time.",
    },
  ],
  photo: {
    src: "/photos/research.jpg",
    brief:
      "An ultrasound frame with a traced contour on it, or the MATLAB tool mid-measurement. Check with the lab before publishing any real subject data.",
    alt: "Aortic root measurement from an ultrasound frame",
    ratio: [16, 10],
  } satisfies Photo,
};

export const studio = {
  name: "Ramsgate Studio",
  href: "https://ramsgatestudio.com",
  period: "May 2026 to present",
  body:
    "A web design studio in Cherry Hill, New Jersey. Flat fee to build, then a monthly fee to host and look after it. I do the design, the code, and the infrastructure, and I run the client calls.",
  points: [
    "Built the whole client platform: intake that saves as you type so an abandoned form still arrives as a lead, contract signing where a change after signing needs the other side to accept it, payments, and a revenue surface that exports the workbook an accountant asked for.",
    "Migrated it three times while clients were working in it, without downtime. The last one moved builds onto the hosting platform, so a deploy can no longer report success without shipping.",
    "Delivered client sites including an e-commerce build, where event capacity is enforced on the server so a payment for a seat already gone refunds itself.",
  ],
  photo: {
    src: "/photos/ramsgate.jpg",
    brief:
      "A client site on a laptop, or the admin dashboard. Something that shows real work rather than a logo on a wall.",
    alt: "A Ramsgate Studio client site",
    ratio: [16, 10],
  } satisfies Photo,
};

export const music = {
  body:
    "I have played percussion for most of my life and I teach it. Writing for a drumline is the closest thing I do to engineering that is not engineering: fixed constraints, a fixed number of hands, and it has to survive being played outdoors by teenagers at full tempo.",
  points: [
    {
      head: "Wrote the music",
      body:
        "Battery music for all three movements of a field show, a cadence for battery and front ensemble, and six transcriptions. Drumline co-captain in 2023.",
    },
    {
      head: "Teach it",
      body:
        "Private instruction in drum set, drumline, and non-melodic percussion through Mirmina Music. In the first seven months, every student with no marching experience earned the placement they auditioned for.",
    },
    {
      head: "Still play",
      body:
        "Purdue Varsity Band as a concert percussionist and soloist, and snare with the Boiler Beats drumline. Before that, jazz ensemble rated outstanding by every adjudicator at the Pennsbury jazz festival.",
    },
  ],
  photo: {
    src: "/photos/drumline.jpg",
    brief:
      "Playing. Mid-performance, in uniform or behind a kit. Motion and hands matter more than a posed shot.",
    alt: "Adam playing percussion",
    ratio: [4, 5],
  } satisfies Photo,
};

export const elsewhere = [
  {
    head: "Purdue Lunabotics",
    body: "Software team on an autonomous lunar excavation robot for NASA's competition, working on the perception stack.",
  },
  { head: "Salsa Club", body: "Purdue Salsa Club, 2025 to present." },
  { head: "Longboarding Club", body: "Purdue Longboarding Club, 2025 to present." },
];
