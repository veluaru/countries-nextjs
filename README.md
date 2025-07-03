# Consulta de Países (countries-nextjs)

Una aplicación frontend para explorar información sobre países, con funcionalidades de búsqueda por nombre, filtrado por región, visualización de detalles de cada país y un modo oscuro.
Se puede visualizar en este enlace [enlace](https://veluaru.github.io/countries-nextjs/).

## Tabla de Contenidos

* [Características](#características)
* [Tecnologías Utilizadas](#tecnologías-utilizadas)
* [Arquitectura del Proyecto](#arquitectura-del-proyecto)
* [Resolución del Reto](#resolución-del-reto)
* [Configuración y Ejecución Local](#configuración-y-ejecución-local)
* [Pruebas](#pruebas)
* [Despliegue](#despliegue)

## Características

* **Búsqueda de Países:** Permite buscar países por su nombre.
* **Filtrado por Región:** Filtra la lista de países por continente (África, América, Asia, Europa, Oceanía).
* **Modo Oscuro/Claro:** Alterna entre modo oscuro y claro para una mejor experiencia de usuario.
* **Detalles del País:** Al hacer clic en un país, se muestra una página con información detallada como capital, población, moneda, idiomas, etc.
* **Diseño Responsivo:** Adaptado para diferentes tamaños de pantalla.

## Tecnologías Utilizadas

* **Next.js:** Framework de React para el desarrollo de aplicaciones web con renderizado del lado del servidor y generación de sitios estáticos.
* **TypeScript:** Superset de JavaScript que añade tipado estático, mejorando la robustez y mantenibilidad del código.
* **next-themes:** Una biblioteca para manejar fácilmente el modo oscuro/claro en aplicaciones Next.js.
* **Axios:** Cliente HTTP basado en promesas para realizar peticiones a la API.
* **Zustand**: Librería de manejo de estado global y persistente, utilizada para centralizar la lógica de peticiones de datos. La store se encuentra en src/stores.
* **Font Awesome:** Biblioteca de iconos escalables.
* **Tailwind CSS:** Un framework CSS de primera utilidad para construir interfaces de usuario rápidamente.
* **Jest:** Un potente framework de pruebas de JavaScript.
* **React Testing Library:** Un conjunto de utilidades para probar componentes de React, enfocándose en las interacciones del usuario.

## Arquitectura del Proyecto

La aplicación sigue una arquitectura sencilla pero modular y escalable, ya que se trata de una aplicación pequeña. Sus principales rutas estan estructuradas de la siguiente manera:

* **`src/app`**: Este es el directorio principal de la aplicación Next.js, utilizando el nuevo App Router. Cada subdirectorio aquí puede representar una ruta de la aplicación.
    * **`components`**: Contiene componentes especificos para la página inicial, lista de países. (ej., `CountryCard`, `CountryFilters`).
    * **`details`**: Representa la ruta para la página de detalles de un país.
        * **`components`**: Contiene componentes específicos de la página de detalles (ej., `CountryInfo`).
        * **`page.tsx`**: Contiene la página principal de los detalles del país.
    * **`page.tsx`**: El archivo `page.tsx` en cualquier directorio define la UI para la ruta, en esta especificamente se encuentra la página principal de la lista de países.
    * **`layout.tsx`**: Define el layout compartido para una ruta o un segmento de rutas.
* **`src/components`**: Contiene componentes de UI que son utilizados globalmente o en múltiples páginas (ej., `Header`, `LoadingSpinner`).
* **`src/lib`**: Contiene archivos de utilidad, como constantes, funciones de ayuda, o configuración de la API.
* **`src/types`**: Centraliza las definiciones de tipos de TypeScript para mantener el código organizado y tipado. `country.d.ts` es crucial para definir la estructura de los datos de un país.
* **`src/stores`**: Contiene la store implementada con Zustand. Aquí se maneja el estado global y la lógica de fetching de datos, facilitando su reutilización en toda la aplicación.

## Resolución del Reto

El reto de construir una aplicación de consulta de países con búsqueda, filtrado, detalles y modo oscuro se abordó de la siguiente manera:

1.  **Manejo de Datos y API:**
    * Se utilizó **Axios** para realizar las peticiones HTTP a la API de países ya que facilita crear las peticiones.
    * La lógica de fetching de datos se encapsuló en la Store implementada con **Zustand** (src/stores), para mantener responsabilidades claras, facilitar la reutilización y centralizar el estado.

2.  **Búsqueda y Filtrado:**
    * El componente `CountryFilters.tsx` maneja la entrada de búsqueda y la selección de la región.
    * La lógica de filtrado y búsqueda se aplica a los datos obtenidos de la API, actualizando el estado de la lista de países de manera reactiva. Se consideró la eficiencia para grandes conjuntos de datos.

3.  **Visualización y Detalles:**
    * **`CountryCard.tsx`**: Componente reutilizable para mostrar un resumen de cada país en la lista.
    * **Rutas Dinámicas de Next.js**: La navegación se estructura aprovechando la convención de carpetas de Next.js para definir rutas. Para acceder a los detalles de un país, se utiliza una ruta dinámica que recibe el código del país como parámetro en la URL (por ejemplo, /details?countryCode=840).
    * **`CountryInfo.tsx`**: Muestra toda la información detallada del país seleccionado, utilizando el parámetro de la ruta para obtener los datos correspondientes desde la store.

4.  **Modo Oscuro:**
    * Se integró **`next-themes`** para gestionar el estado del tema (claro/oscuro) de forma persistente.
    * **Tailwind CSS** se configuró para soportar el modo oscuro, utilizando la estrategia `class` (`darkMode: 'class'`) para alternar las clases de color basadas en el tema actual.

5.  **Estilado:**
    * **Tailwind CSS** fue fundamental para el desarrollo rápido y consistente de la interfaz de usuario. Su enfoque de "utility-first" permitió construir diseños complejos con clases CSS directamente en el marcado HTML, lo que agiliza el desarrollo y mantiene un tamaño de archivo CSS pequeño.
    * Se definieron colores globales en `tailwind.config.js` para asegurar la consistencia y la capacidad de alternar entre temas.

6.  **Tipado con TypeScript:**
    * El uso de TypeScript en todo el proyecto (`.tsx`, `.ts`) garantizó la robustez del código y la detección temprana de errores.
    * Se definieron interfaces para las estructuras de datos de los países en `types/country.d.ts`, lo que facilitó el manejo de estos en todos los componentes.

7.  **Pruebas Unitarias:**
    * **Jest y React Testing Library** se utilizaron para asegurar la calidad del código.
    * Se escribieron pruebas para los componentes principales (`CountryCard`, `CountryFilters`, `Header`,  `CountryInfo`).
    * Se enfocaron en simular las interacciones del usuario y verificar que la UI responda correctamente a los cambios de estado y a los datos.

## Configuración y Ejecución Local

Para ejecutar esta aplicación en local:

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Ejecutar el servidor de desarrollo:**

    ```bash
    npm run dev
    # o
    yarn dev
    ```

    La aplicación estará disponible en `http://localhost:3000`.

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test
# o
yarn test
```

## Despliegue

La aplicación está desplegada y accesible a través de GitHub Pages en el siguiente [enlace](https://veluaru.github.io/countries-nextjs/).

