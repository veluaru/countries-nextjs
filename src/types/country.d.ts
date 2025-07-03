export interface Flags {
  alt: string,
  png: string;
  svg: string;
}

export interface ReducedCountry {
  name: CountryName;
  population: number;
  region: string;
  capital: string;
  ccn3: string;
  flags: Flags;
}

interface NativeNameOptions {
  official: string;
  common: string;
}

interface NativeName {
  [key: string]: NativeNameOptions;
}

interface CountryName {
  common: string,
  nativeName: NativeName;
  official: string;
}

interface Languages {
  [key: string]: string;
}

interface Currency {
  [key: string]: string;
}

interface Currencies {
  [key: string]: Currency;
}

interface FullCountry {
  altSpellings: Array<string>;
  area: number;
  borders: Array<Any>;
  capital: Array<string>;
  capitalInfo: Object;
  car: Object;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: Object;
  continents: Array<string>;
  currencies: Currencies;
  demonyms: Object;
  fifa: string;
  flag: string;
  flags: Flags;
  gini: Object;
  idd: Object;
  independent: Boolean;
  landlocked: Boolean;
  languages: Languages;
  latlng: Array<number>;
  maps: Object;
  name: CountryName;
  population: number;
  postalCode: Object;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: Array<string>;
  tld: Array<string>;
  translations: Object
  unMember: Boolean;
}