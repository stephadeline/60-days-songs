
// These countries have no Alpha3
const noMatches = [
    // 'Africa',
    // 'Asia',
    // 'Asia (excluding Middle East)',
    'Brunei',
    'Cape Verde',
    // 'Central Asia',
    // 'China - rural',
    // 'China - urban',
    "Cote d'Ivoire",
    'Democratic Republic of Congo',
    // 'East Africa',
    // 'East Asia',
    // 'East Germany',
    // 'Eastern Europe',
    // 'Europe',
    // 'European Union',
    'Laos',
    // 'Latin America',
    // 'MENA',
    // 'Middle Africa',
    // 'Middle East',
    // 'North Africa',
    // 'North America',
    // 'North America and Oceania',
    // 'Oceania',
    // 'Other East Asia',
    // 'Other Latin America',
    // 'Other MENA',
    // 'Other Russia and Central Asia',
    // 'Other South & South-East Asia',
    // 'Other Sub-Saharan Africa',
    // 'Other Western Europe',
    // 'Russia and Central Asia',
    // 'South & South-East Asia',
    // 'South Africa region',
    // 'South Asia',
    // 'South-East Asia',
    // 'Sub-Saharan Africa',
    'Syria',
    'Timor',
    'Vietnam',
    // 'West Africa',
    // 'West Asia',
    // 'Western Europe',
    // 'World',
    'Zanzibar'
  ]

  const noAlpha3Dupe = [];

  const noAlpha3Penn = [  
  'British Virgin Islands',
  'Brunei',
  'Cape Verde',
  "Cote d'Ivoire",
  'Curacao',
  'Democratic Republic of Congo',
  'Laos',
  'Micronesia (country)',
  'Sint Maarten (Dutch part)',
  'Syria',
  'Timor',
  'Vietnam',
//   'World'
]


const CODES = [
    "BN",
    "CV",
    "CI",
    "CD",
    "LA",
    "SY",
    "TL",
    "VN",
    "VG",
    "CW",
    "FM",
    "SX"
]

// .derive({alpha3: aq.escape( d => {
    //     const alpha3 = clm.getAlpha3ByName(d.Entity)
    //     if(!alpha3) noAlpha3Dupe.push(d.Entity)
    //     return alpha3
    // }),
    //         alpha2: aq.escape( d => clm.getAlpha2ByAlpha3(d.country))},
    //         {before: "Year"})
    
    // const names = new Set(cleanCat.array('unit'))
    
    // cleanCat.print()
    
    // console.log(names)


const cleanInequality = inequalityTable
.derive(
  {
    alpha2: aq.escape((d) => {
      const countryName = NAME_OVERRIDES[d.Entity] || d.Entity;
      const alpha2 = clm.getAlpha2ByName(countryName);
      return alpha2;
    }),
  },
  { before: "Year" }
)
.filter(aq.escape((d) => allAlpha2.includes(d.alpha2)))
.derive(
  {
    alpha3: aq.escape((d) => clm.getAlpha3ByAlpha2(d.alpha2)),
    country_name: aq.escape((d) => clm.getCountryNameByAlpha2(d.alpha2)),
  },
  { before: "Year" }
)
.rename({ Year: "year" })
.select(aq.not("Entity"));

const cleanPennworld = pennworldTable
.derive(
  {
    alpha2: aq.escape((d) => {
      const countryName = NAME_OVERRIDES[d.Entity] || d.Entity;
      const alpha2 = clm.getAlpha2ByName(countryName);
      return alpha2;
    }),
  },
  { before: "Year" }
)
.filter(aq.escape((d) => allAlpha2.includes(d.alpha2)))
.derive(
  {
    alpha3: aq.escape((d) => clm.getAlpha3ByAlpha2(d.alpha2)),
    country_name: aq.escape((d) => clm.getCountryNameByAlpha2(d.alpha2)),
  },
  { before: "Year" }
)
.rename({ Year: "year" })
.select(aq.not("Entity"));
