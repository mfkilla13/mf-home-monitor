# 制作自己住宅的图片

[English](PROMPTS.md) · [Русский](PROMPTS.ru.md) · **中文**

需要一张**基础渲染图**，然后制作**同一张图的多个版本**（白天、冬季、雨天、无车）。
各版本必须保持相机角度和每个物体的位置不变，否则圆点和能量流会对不上。
可使用 ChatGPT（图像生成）、Gemini 或其他能够编辑上传图片的生成工具。提示词建议使用英文，生成效果更准确。

## 1. 基础渲染图（夜晚）

如果希望与实物相似，可附上住宅、汽车、逆变器和充电桩的照片，然后发送：

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

用自己的描述替换住宅和汽车（层数、屋顶颜色、车型和颜色）。反复生成直到构图满意 —— 之后所有图片都基于这一张。

## 2. 同一张图的各个版本

每个版本都**新开一条消息并附上基础图**（始终编辑基础图，而不是上一个版本）。消息开头为：

```
Edit this exact image. Keep the same size, camera, composition and the exact position and shape of every object.
Do not move, resize or redraw the house, carport, car, charger, pole, wire, inverters, battery or panels.
Keep the solid #111111 background. Change only:
```

然后添加以下之一：

| 文件 | 追加内容 |
|---|---|
| `house_day.jpg` | `daytime with soft sunlight and shadows, lights off in the windows.` |
| `house_winter_night.jpg` | `winter night: snow on the roofs, carport, bushes and ground, bare tree, lights stay on.` |
| `house_winter_day.jpg` | `winter day: snow on the roofs, carport, bushes and ground, bare tree, soft daylight.` |
| `house_rain_night.jpg` | `heavy rain at night: falling rain streaks, wet shiny surfaces, puddles, reflections of the lights.` |
| `house_rain_day.jpg` | `heavy rain in the daytime: falling rain streaks, wet shiny surfaces, puddles, overcast light.` |
| `house_night_nocar.jpg` | `remove the car from the carport; the charger cable hangs on the charger. Everything else identical.` |

白天、冬季和雨天的 `_nocar` 版本：附上对应的版本图（而不是基础图），并追加最后一行。

## 3. 检查与安装

1. 所有图片尺寸必须相同。将两张图叠放或在看图软件中快速切换：住宅不能跳动。若某个版本发生偏移，请重新生成。
2. 按表格命名文件，并复制到 `/config/www/mf-home-monitor/`。
3. 在卡片中设置图片和 `calibrate: true`，完成布局向导，将 YAML 复制到卡片配置中，然后删除 `calibrate`。

提示：
- 背景很少恰好是 `#111111`。普通卡片中不明显；使用 `frameless: true` 时，略有差异的背景会显示为淡淡的边框 ——
  这时用任意编辑器把背景填充为 `#111111`（油漆桶工具）。
- 如果汽车或充电桩被遮挡，请重新生成：圆点和能量流需要它们可见。
