// Every string on the site, which is now one card and its link preview.
//
// The full portfolio content (projects, research, studio, music) lived here
// until 2026-08-14 and is in git history. It was removed rather than left
// unused: a file full of copy nothing renders reads, to the next person, as a
// page that broke rather than a page that was retired on purpose.

export const site = {
  name: "Adam Mirmina",
  // Officially his major as of Aug 2026, when the CODO out of Computer Science
  // posted. It was written this way while the change was still pending, so it
  // needed no edit when it landed.
  role: "Data science and cognitive science at Purdue",
  // The one claim on the page. Everything he would otherwise argue for here now
  // lives on LinkedIn, which is the showcase.
  //
  // Adam's own line, 2026-08-14, chosen over four alternatives. The earlier
  // version ("problems I can point at") was writerly in a way he did not want.
  thesis: "I build software to solve our problems.",
  email: "amirmina@purdue.edu",
  // Digits kept separate from the display form so the tel: href is unambiguous
  // to a dialer while the page still reads the way a person writes a number.
  phone: { display: "(856) 419-9114", tel: "+18564199114" },
  links: {
    github: "https://github.com/AdamMirmina",
    linkedin: "https://linkedin.com/in/adam-mirmina",
    studio: "https://ramsgatestudio.com",
  },
};
