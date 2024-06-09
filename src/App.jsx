import DireccionViento from "./components/DireccionViento"
import Termometro from "./components/Termometro"
import VelocidadViento from "./components/VelocidadViento"

// https://open-meteo.com/en/docs#hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,wind_speed_10m,wind_direction_180m,soil_temperature_6cm,soil_moisture_3_to_9cm

function App() {

  return (
    <>
      <div className="flex justify-center w-fit max-w-sm dark:text-white p-2 pr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700">
        <VelocidadViento velocidad={80}/>
        <DireccionViento rotacion={90}/>
      </div>
      <div className="flex justify-center w-48 max-w-sm dark:text-white p-2 pr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700">
        <Termometro temperatura={22}/>
      </div>
    </>
  )
}

export default App
