# Photos

Every file below is referenced by `lib/content.ts`. Until one exists the page
renders its brief in place, at the right aspect ratio, so nothing shifts when you
drop the real file in and the site doubles as a shot list.

| File | Ratio | What it should be |
|---|---|---|
| `portrait.jpg` | 4:5 | A portrait. Not a studio headshot; somewhere with real light. |
| `poolvision.jpg` | 16:10 | The camera rig over the pool, or a frame from the footage with the hoop in view. A real shot in progress beats a clean empty pool. |
| `bro-science.jpg` | 16:10 | Two phone screens: a workout mid-session, and the coach mid-conversation with a citation visible. |
| `spectra.jpg` | 16:10 | The capture screen with notes already mapped to colors. Color is the subject, let it fill the frame. |
| `mirmina-tiles.jpg` | 16:10 | A game in progress on a laptop, board mid-game with a rack visible. |
| `research.jpg` | 16:10 | An ultrasound frame with a traced contour, or the MATLAB tool mid-measurement. **Clear any real subject data with the lab before publishing.** |
| `ramsgate.jpg` | 16:10 | A client site on a laptop, or the admin dashboard. Real work rather than a logo on a wall. |
| `drumline.jpg` | 4:5 | Playing. Mid-performance, in uniform or behind a kit. Motion and hands beat a posed shot. |

Export at roughly 2x the displayed size (1800px wide is plenty for the 16:10s,
1200px for the portraits), JPEG at quality 80. The layout crops with
`object-fit: cover`, so keep the subject away from the extreme edges.
