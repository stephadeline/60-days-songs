import fs from "fs";
import * as aq from "arquero";
const { op } = aq;

// load CSVs
const csv = fs.readFileSync("src/data/testdata3.csv", "utf8");

const key = fs.readFileSync("src/data/keyclouds.csv", "utf8");

// reading the climate action tracker data into arquero
const data = aq.fromCSV(csv);
const keyAq = aq.fromCSV(key);

// writing the json file
fs.writeFileSync("src/data/data.json", JSON.stringify(data.objects(), null, 2));

fs.writeFileSync("src/data/key.json", JSON.stringify(keyAq.objects(), null, 2));
