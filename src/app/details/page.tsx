import CountryInfo from "./components/CountryInfo"
import { Suspense } from 'react'

// For deploy purposes because 'useSearchParams' must be surrounded by a Suspense to be able to create static files for deploy
function SearchBarFallback() {
  return <>Loading</>
}

export default function CountryDetails() {

  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <CountryInfo />
      </Suspense>

    </>
  );
}