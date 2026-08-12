## Adam Mirmina

Purdue University, B.S. Data Science and B.A. Cognitive Science, statistics
concentration. I run a web design studio and do cardiovascular imaging research.

Most of what I build is private, either because it is client work or because it holds
someone's real data. The links below go to the running versions.

### Ramsgate Studio

A web design studio for small local businesses in South Jersey. Flat-fee builds plus
monthly managed hosting, at [ramsgatestudio.com](https://ramsgatestudio.com).

I built and run the platform behind it: a client dashboard, an admin side for tracking
each project and running client calls off a shared agenda, a four-step intake, contract
signing for both sides, Stripe payments, and push notifications. It has been migrated
three times while clients were using it, from Vercel to Cloudflare Workers, from
Supabase to self-hosted PocketBase, and from GitHub Actions to builds that run on the
hosting platform itself.

### Cardiovascular Imaging Research Lab, Purdue

Undergraduate research assistant under Dr. Craig Goergen, working on aortic measurement
from ultrasound. A writeup of the summer's work is at
[share.adammirmina.com/cvirl](https://share.adammirmina.com/cvirl).

The main result is a detector that measures a mouse's aortic root by reading each frame
on its own rather than tracking motion between frames, so it cannot accumulate drift. It
agrees with hand-traced measurements to within 3% on two animals. Along the way it
turned out the lab's existing tracker was overstating how much the vessel expands with
each heartbeat, by two to three times, in the direction that makes a stiffening vessel
read as healthy.

### Things I have built

**PoolVision** finds shot attempts in pool basketball from a single fixed camera with no
manual tagging, then calls each one a make or a miss. 82.2% accurate on shots it never
saw in training, holding at 76.5% on a separate recording. Python and PyTorch.

**Bro Science** is a strength-training app with an AI coach that reads the lifter's own
routine and history before proposing changes. It cites the study behind a
recommendation, only where a study actually tested that exercise, and says so when it
lacks the data to answer. React Native and PocketBase.

**Cashbook** is a personal ledger that keeps itself current, pulling from a bank
connection, business income and expenses, and statements read out of my own inbox, then
emailing my accountant monthly. Cloudflare Workers and PocketBase.

**[Corridor](https://github.com/AdamMirmina/corridor)** tracks leadership turnover
across 101 Philadelphia community development corporations, built from Form 990 filings
and public records. It is the dataset behind a Drexel STAR Scholars study. Live at
[corridor.adammirmina.com](https://corridor.adammirmina.com).

### Reach me

[amirmina@purdue.edu](mailto:amirmina@purdue.edu) ·
[linkedin.com/in/adam-mirmina](https://linkedin.com/in/adam-mirmina)
