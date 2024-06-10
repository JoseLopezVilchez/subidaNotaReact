import React, { useState, useEffect } from 'react';
import DireccionViento from "./components/DireccionViento"
import Termometro from "./components/Termometro"
import VelocidadViento from "./components/VelocidadViento"

// https://open-meteo.com/en/docs#hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,wind_speed_10m,wind_direction_180m,soil_temperature_6cm,soil_moisture_3_to_9cm

//devuelve promesa en base a la peticion a la api de geolocalizacion del navegador.
//Si el navegador no tiene dicha api, rechaza la promesa.
//Si si tiene dicha api, devuelve la posicion
function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(resolve, reject);
  } else {
      reject(new Error('Geolocalización no soportada por el navegador.'));
  }
  })
}

//toma un array de fechas (tomado mas adelante de la api open-meteo) y compara con la
//fecha y hora actual. Si hay coincidencia, devuelve indice para ser usado de cara a
//sacar info de la llamada a la api
function encontrarIndiceDeFechaActual(arrayFechas) {
  const tiempoActual = new Date();
  for (let i = 0; i < arrayFechas.length; i++) {
      const fechaAComparar = new Date(arrayFechas[i]);
      if (
        tiempoActual.getFullYear() === fechaAComparar.getFullYear() &&
        tiempoActual.getMonth() === fechaAComparar.getMonth() &&
        tiempoActual.getDate() === fechaAComparar.getDate() &&
        tiempoActual.getHours() === fechaAComparar.getHours()
      ) {
          return i;
      }
  }
  return -1;
}

//componente sin props
function App() {

  //definicion de hooks
  const [posicion, setPosicion] = useState(null);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //llama a funcion para sacar geolocalizacion
    obtenerUbicacion()

    //cuando devuelve un valor la promesa, hace llamada a open-meteo usando las coordenadas
    //de geolocalizacion para la peticion get
    .then((posicion) => {
        //mete posicion a hook
        setPosicion(posicion);
        return fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${posicion.coords.latitude}&longitude=${posicion.coords.longitude}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m`
        );
    })

    //comprueba si ha devuelto algo
    .then((res) => {
        if (res) {
          return res.json();
        } else {
          throw new Error(`Error en la respuesta de la API: ${res.statusText}`);
        }
    })

    //mete datos a hook
    .then((res) => {
        setDatos(res);
    })
    //si hay problemas, mete error en hook
    .catch((error) => {
        setError(error);
    });
  }, []);

  //si el hook de error tiene algo, el componente devuelve esto
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //si el hook de datos aun no tiene nada, muestra esto
  if (!datos) {
    return <div>Cargando...</div>;
  }

  //invoca funcion para saber que indice usar para sacar datos de la llamda
  const indice = encontrarIndiceDeFechaActual(datos.hourly.time);

  //si la funcion no ha encontrado un indice con coincidencia, devuelve lo siguiente
  if (indice === -1) {
    console.log(indice)
    console.log(datos.hourly.time)
    return <div>No se encontró una fecha y hora coincidente.</div>;
  }

  //saco imagen de fondo para insertar en style

  const style = {
    backgroundImage : `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F6536893.jpg&f=1&nofb=1&ipt=ae33ea94e8f4105644ff7644b49c835923cad318aeaf7d80d7827e922dbcb25b&ipo=images)`,
  }

  //una vez encuentra un indice con coincidencia y los datos se han cargado, devuelve la pagina en si
  //inserta los distintos datos en los props de cada componente
  return (
    <div style={style} className="w-screen h-screen bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center">
      <div className="flex justify-center w-fit max-w-sm m-4 dark:text-white p-2 pr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700">
        <VelocidadViento velocidad={datos.hourly.wind_speed_10m[indice]} />
        <DireccionViento rotacion={datos.hourly.wind_direction_10m[indice]} />
      </div>
      <div className="flex justify-center w-full max-w-lg m-4 rounded-full dark:text-white p-2 pr-6 bg-white border border-gray-200 shadow dark:bg-slate-900 dark:border-gray-700">
        <Termometro temperatura={datos.hourly.temperature_2m[indice]} />
      </div>
    </div>
  );
}

//exporta pagina a mostrar
export default App
