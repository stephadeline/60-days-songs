# Data processing - documentation of code

The [`datacleaning.js`](https://github.com/stephadeline/mvtec2022-final/blob/main/src/data/datacleaning.js) is used to generate the json data files that we use for the visualization.

In order to run this data cleaning script, simply run `npm start`.


The script will generate these datasets:
- `joined.json` - for the line chart and scatterplot
- `meatChart.json` - for the type of meat small multiple line chart
- `totalMeatDifference.json` - for the difference bar chart

## Description of tasks - what do we need to do to clean the data?

**1) Standardise country names:**
At first look at the data, we found that the 4 datasets we use all have different columns that refer to the country. Some use the country name, some use the Alpha 2 code and some use the Alpha 3 code. We'll also need to filter to remove data points that are not countries, such as regions, continents or global data.

**2) Get all indicators into columns**:
The datasets are also in different formats. The Penn World dataset and the inequality dataset both have the indicators as column names. The Climate Action Tracker dataset and meat consumption dataset has the name/key of the indicator in a column, and the value in another. We'll want them all to be in columns.

**3) Filter/select to just the indicators we want**:
We've discussed the indicators that we want to include in the visualization that's relevant to our topic. The list is here in the [exploratory Observable notebook](https://observablehq.com/d/1b27b0c79547839b).

We'll also want to scope it to just 1990 to 2018, years when most of the data is available.

**4) Joining the datasets into one dataset for the interactive**, and generate the datasets for the other charts as necessary.

We'll create one json file with all of the data we need. 
We'll also create another json file that contains the meat consumption data for the meat consumption line chart, and perform calculations on percentage changes for the bar chart.

5) Other tasks for optimization
Such as rounding off the values

## Libraries used
Based on the needs above, we will use a few libraries to help:
1. Arquero - for performing the data cleaning such as filtering, selecting, renaming, joining, pivoting, and mutating the columns.
2. `country-locale-map` for helping with the standardisation of country names and code.


## Steps to perform the data cleaning

Based on the above, the script is broken down to:

**Step 1:** importing data and declaring variables or any other necessary list such as indicators desired. Here we also listed the `NAME_OVERRIDES` which is the key value pairs of country names for those that are listed differently from the list of countries we have in the `country-locale-map` library. We also generated a list of all countries (excluding regions, worldwide, etc) so that we can use this to filter out the rows that are not part of this list.

**Step 2:** loading each individual dataset to arquero and performing any necessary tweaks.

*CAT data*
1. Filter the indicators column to the indicators we have listed.
2. Filter to just the historic data (we are not visualizing projections here)
3. Grouping by country and year, then pivoting so that the indicators are in the column names.
4. Since this dataset uses Alpha2 codes, we derive and create a new column with the alpha3 code and the country name, and we rename the `country` column to `alpha2`.
5. Then we filter to the country list we created.

*Inequality data and Penn World data*
1. Select the columns we want.
(No further steps needed because we'll add the alpha2, etc. after joining)

*Meat data*
1. Filter to just the rows with the measure of kg/capita, we're not using the other one (tonnes).
2. Renaming the columns

**Step 3**: perform joins, and further transforms to the joined data.
1. First, we perform the joins with datasets that are more similar - Penn World and Inequality. They both have the column "Entity" which contains its country name.
2. Then, we get the alpha2 code (and use the `NAME_OVERRIDES` we've set earlier), and filter to the list of countries we want. We also a new column for consumption per capita.
3. Once its country names and codes are standardised, we can join it with the meat consumption datasets.
4. After joining, we do some more transforms for finishing touches such as adding continents, filtering to just the year we want, and rounding off for optimization.

The rest of the code involves creating a separate dataset for the types of meat small multiples, and calculating percentage change for the bar chart.
