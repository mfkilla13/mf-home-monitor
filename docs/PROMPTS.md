# Pictures of your own house

**English** · [Русский](PROMPTS.ru.md) · [中文](PROMPTS.zh.md)

You need one **base render** and then **variants of the same render** (day, winter, rain, without the car).
Variants must keep the camera and every object in place, otherwise the dots and flows will not match.
Works in ChatGPT (image generation), Gemini and other generators that can edit an uploaded picture.

## 1. Base render (night)

Attach photos of your house, car, inverters and wall box if you want them to look like the real ones, and send:

```
Create an isometric 3D render of a residential solar home at night, viewed from above at a 3/4 angle,
like a clean smart-home dashboard illustration. Wide 16:9 picture.

Must contain, all clearly visible and not overlapping:
- a one-story house with a dark gable roof; solar panels on the roof in TWO even rows;
- on the front wall: two white inverters side by side and a white battery cabinet under them, connected by pipes;
- a carport next to the house with a white electric SUV parked under it, front facing the viewer;
- a white wall-box charger on a post at the back of the carport, cable plugged into the car;
- an electricity pole on the right with one wire going to the house;
- a small garden: lawn, bushes, a tree, a paved path and driveway, small garden lights;
- warm light in the windows.

The whole plot floats on a SOLID flat background of color #111111 — no sky, no horizon, no gradient,
no text, no logos, no watermark. Leave empty space in the top-left corner.
```

Use your own words for the house and car (number of floors, roof color, car model and color).
Generate until the composition is right — every next picture is made from this one.

## 2. Variants of the same picture

Open a **new message with the base picture attached** for every variant (always edit the base, not the previous variant).
Start each message with:

```
Edit this exact image. Keep the same size, camera, composition and the exact position and shape of every object.
Do not move, resize or redraw the house, carport, car, charger, pole, wire, inverters, battery or panels.
Keep the solid #111111 background. Change only:
```

and add one of:

| File | Add to the message |
|---|---|
| `house_day.jpg` | `daytime with soft sunlight and shadows, lights off in the windows.` |
| `house_winter_night.jpg` | `winter night: snow on the roofs, carport, bushes and ground, bare tree, lights stay on.` |
| `house_winter_day.jpg` | `winter day: snow on the roofs, carport, bushes and ground, bare tree, soft daylight.` |
| `house_rain_night.jpg` | `heavy rain at night: falling rain streaks, wet shiny surfaces, puddles, reflections of the lights.` |
| `house_rain_day.jpg` | `heavy rain in the daytime: falling rain streaks, wet shiny surfaces, puddles, overcast light.` |
| `house_night_nocar.jpg` | `remove the car from the carport; the charger cable hangs on the charger. Everything else identical.` |

For the `_nocar` versions of day, winter and rain, attach that variant (not the base) and use the last line.

## 3. Check and install

1. All pictures must have the same size. Lay two of them over each other (any image viewer with layers, or flip between them):
   the house must not jump. If a variant moved, generate it again.
2. Name the files as in the table and copy them to `/config/www/mf-home-monitor/`.
3. In the card set the pictures and `calibrate: true`, go through the wizard, copy the YAML into the card and remove `calibrate`.

Tips:
- The background is rarely exactly `#111111`. It is fine for the default card; with `frameless: true` a slightly different
  background shows as a faint frame — then fill it with `#111111` in any editor (bucket fill).
- If the car or charger end up hidden behind something, ask again: dots and flows need them visible.
