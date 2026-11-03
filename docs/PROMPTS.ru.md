# Картинки своего дома

[English](PROMPTS.md) · **Русский** · [中文](PROMPTS.zh.md)

Нужен один **базовый рендер**, а потом **варианты этого же рендера** (день, зима, дождь, без машины).
В вариантах камера и все объекты должны остаться на местах, иначе точки и потоки не совпадут.
Подходят ChatGPT (генерация картинок), Gemini и другие генераторы, которые умеют редактировать загруженную картинку.
Промпты лучше отправлять на английском — генераторы понимают его точнее.

## 1. Базовый рендер (ночь)

Приложите фото своего дома, машины, инверторов и зарядки, если хотите, чтобы они были похожи на настоящие, и отправьте:

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

Опишите свой дом и машину своими словами: этажность, цвет крыши, модель и цвет машины.
Генерируйте, пока композиция не понравится: все следующие картинки делаются из этой.

## 2. Варианты той же картинки

Для каждого варианта откройте **новое сообщение и приложите базовую картинку**: правьте всегда базовую, а не предыдущий вариант.
Начните сообщение с:

```
Edit this exact image. Keep the same size, camera, composition and the exact position and shape of every object.
Do not move, resize or redraw the house, carport, car, charger, pole, wire, inverters, battery or panels.
Keep the solid #111111 background. Change only:
```

и допишите одно из:

| Файл | Что дописать |
|---|---|
| `house_day.jpg` | `daytime with soft sunlight and shadows, lights off in the windows.` |
| `house_winter_night.jpg` | `winter night: snow on the roofs, carport, bushes and ground, bare tree, lights stay on.` |
| `house_winter_day.jpg` | `winter day: snow on the roofs, carport, bushes and ground, bare tree, soft daylight.` |
| `house_rain_night.jpg` | `heavy rain at night: falling rain streaks, wet shiny surfaces, puddles, reflections of the lights.` |
| `house_rain_day.jpg` | `heavy rain in the daytime: falling rain streaks, wet shiny surfaces, puddles, overcast light.` |
| `house_night_nocar.jpg` | `remove the car from the carport; the charger cable hangs on the charger. Everything else identical.` |

Для версий `_nocar` дня, зимы и дождя приложите сам этот вариант (а не базовую) и допишите последнюю строку.

## 3. Проверка и установка

1. Все картинки должны быть одного размера. Наложите две друг на друга или быстро переключайтесь между ними в просмотрщике:
   дом не должен прыгать. Если вариант сдвинулся, сгенерируйте его заново.
2. Назовите файлы как в таблице и скопируйте в `/config/www/mf-home-monitor/`.
3. В карточке укажите картинки и `calibrate: true`, пройдите мастер разметки, скопируйте YAML в карточку и уберите `calibrate`.

Советы:
- Фон редко получается ровно `#111111`. В обычной карточке это незаметно; с `frameless: true` чуть другой фон виден как
  бледная рамка — тогда залейте фон цветом `#111111` в любом редакторе (заливка).
- Если машина или зарядка оказались за чем-то спрятаны, попросите заново: точкам и потокам нужно их видеть.
