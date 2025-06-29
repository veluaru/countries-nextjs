// src/app/country/[countryCode]/page.tsx

interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string;
  currencies: Array<string>;
  languages: Array<string>;
  borders: Array<string>;
}

export default async function CountryDetails({ params }: { params: { countryCode: string } }) {
  const { countryCode } = params;

  // Aquí puedes hacer una solicitud fetch para obtener los detalles del país
  // Basado en el `countryCode` de la URL
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  const countryData: Country = await res.json();

  if (!countryData) {
    // Puedes manejar el caso de país no encontrado aquí
    return <div>País no encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold mb-4">{countryData.name}</h1>
      <p>Capital: {countryData.capital}</p>
      <p>Región: {countryData.region}</p>
      <p>Población: {countryData.population.toLocaleString()}</p>
      {/* Más detalles del país aquí */}
    </div>
  );
}