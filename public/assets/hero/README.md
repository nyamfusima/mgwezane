# Hero video sources

Illustrative stock footage (drone shot of an SUV on a desert road). It does **not** show a Mgwezane vehicle; do not imply endorsement.

Source: [Drone Footage of a Car Driving on Desert](https://www.pexels.com/video/drone-footage-of-a-car-driving-on-desert-9318299/) by Kelly (https://www.pexels.com/@kelly/), Pexels ID 9318299, used under the [Pexels licence](https://www.pexels.com/license/) (free commercial use, no attribution required). The original 1080p download is kept outside the repo.

Production files:

- `hero.mp4` (H.264) and `hero.webm` (VP9): 1280x720, 30fps, ~11.5s, no audio. Segment 1.5-13s of the source, with the final 1.5s dissolving into the opening 1.5s for a seamless loop. Encoded with `libx264 -preset slow -crf 27 -profile:v high -movflags +faststart -an`.
- `hero-poster.webp/.jpg` (1600x900) and `hero-poster-mobile.webp` (720x960 portrait crop): frame at 4s.
