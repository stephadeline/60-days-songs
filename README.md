# Week 6 assignment — CSVs, arquero & JOINs

This assignment is testing the concepts from class in week 6:
* Working with CSV files in a Svelte project
* Loading CSVs into arquero
* Basic arquero data processing
* Using library documentation
* Svelte interactivity
* Joining tables in arquero

[App.svelte](./src/App.svelte) is the starting point for the task. You can refer back to the class material (video recordings, [exercise/week6-1](https://github.com/fndvit/opendataengineering-materials/blob/main/exercises/week6-1/src/App.svelte)) for help with this, as much of the syntax and the API usage required for this assignment are covered there.

## Setup

To install the dependencies and run a local dev server run the following commands in your terminal, and then open the link shown in your terminal in a browser. The dev server will monitor your project for changes and auto-update whenever you save a file.

```
npm i
npm run dev
```

## 1. Loading CSV data

- Load both CSV data files from this repo into `arquero`. The files can be found in this repo under `src/data`, e.g.:

    `src/data/Children that died before 5 years of age per woman - Gapminder (2017).csv`
    
    `src/data/Children that survived past 5 years of age per woman - Gapminder (2017).csv`

## 2. Join the datasets

Join the two datasets together in a sensible way (keeping task #3 in mind). Read through the arquero docs and related links to get an undersanding of the difference between left, right and inner joins. You can find the documentation for the `join` function [here](https://uwdata.github.io/arquero/api/verbs#join).

## 3. Display the data on a scatter plot

Use the provided `Scatter` component to display the joined data. Have the scatter points take both their x and y values from the value columns in the joined dataset.

## 4. Interactivity

Use the provided `selectedYear` variable to filter the data to a single year and have the year range slider / playback button control the scatter plot.

## 5. Domains

Calculate the domains for both the x and y axis (their min and max values) from the dataset and then use the result to fix the axis range on the `Scatter` component using its `xDomain` and `yDomain` props. This will stop the scale from moving around as the selectedYear changes.