# Group 2 Final project - Meat consumption

This repository contains the code for the Svelte project for the Cross-module final project in the Master's in Visual Tools to Empower Citizens program.

[Link to final project](https://mvtec2022-final.vercel.app/)

Prior to working on our final data visualizations in this repo, we started with exploratory notebooks in Observable.
1. [First Notebook - Initial exploration of data](https://observablehq.com/d/1b27b0c79547839b)
2. [2nd Notebook - D3 charts](https://observablehq.com/d/f9b6545ddbf85d55)

## Setup

To install the dependencies and run a local dev server run the following commands in your terminal, and then open the link shown in your terminal in a browser. The dev server will monitor your project for changes and auto-update whenever you save a file.

```
npm i
npm run dev
```

## Data processing

This repository also contains the a [`datacleaning.js`](https://github.com/stephadeline/mvtec2022-final/blob/main/src/data/datacleaning.js) we wrote for processing the data for our visualization.
It is located inside the [`data`](https://github.com/stephadeline/mvtec2022-final/tree/main/src/data) folder, along with the final datasets in json that we use for the charts, which includes:
- `joined.json` - for the line chart and scatterplot
- `meatChart.json` - for the type of meat small multiple line chart
- `totalMeatDifference.json` - for the difference bar chart

In order to run the data cleaning script, simply run `npm start`.

## Potential improvements
1. Improve the mobile version of the graphics. Currently it is only suitable for viewing on desktop.
2. Improve the dark mode compatibility.
3. Optimizing the dataset even more.
4. Improve UI/UX interactivity.

## Credits

Story, code and visualisation by Guifré Jordan, Marina Rovira Boix and Stephanie Adeline.
The template of this project was cloned from a previous [assignment repo](https://github.com/mvtec2022/week-6-stephadeline).
Special thanks to Anton Bardera and Matt Osborn for helping us with this project :)

