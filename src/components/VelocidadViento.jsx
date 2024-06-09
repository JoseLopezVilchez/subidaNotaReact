import { PropTypes } from "prop-types";
import { WiWindBeaufort0, WiWindBeaufort1, WiWindBeaufort10, WiWindBeaufort11, WiWindBeaufort12, WiWindBeaufort2, WiWindBeaufort3, WiWindBeaufort4, WiWindBeaufort5, WiWindBeaufort6, WiWindBeaufort7, WiWindBeaufort8, WiWindBeaufort9 } from "weather-icons-react"
import Color from "../../node_modules/colorjs.io/src/index.js";

function VelocidadViento({ velocidad }) {
    if (typeof velocidad !== 'number') {
        throw new Error('La prop velocidad debe ser un número');
    }

    const colorInicial = new Color('#28B463')
    const colorFinal = new Color('#E74C3C')
    const interpolacion = colorInicial.range(colorFinal , {space: "lch"})

    let beaufort
    let props = {
        size : 90,
        color : interpolacion(velocidad/120)
    }   

    switch (true) {
        case (velocidad > 117):
            beaufort = <WiWindBeaufort12 {...props} />
            break
        case (velocidad > 102):
            beaufort = <WiWindBeaufort11 {...props} />
          break
        case (velocidad > 88):
            beaufort = <WiWindBeaufort10 {...props} />
            break
        case (velocidad > 74):
            beaufort = <WiWindBeaufort9 {...props} />
            break
        case (velocidad > 61):
            beaufort = <WiWindBeaufort8 {...props} />
            break
        case (velocidad > 49):
            beaufort = <WiWindBeaufort7 {...props} />
            break
        case (velocidad > 38):
            beaufort = <WiWindBeaufort6 {...props} />
            break
        case (velocidad > 28):
            beaufort = <WiWindBeaufort5 {...props} />
            break
        case (velocidad > 19):
            beaufort = <WiWindBeaufort4 {...props} />
            break
        case (velocidad > 11):
            beaufort = <WiWindBeaufort3 {...props} />
            break
        case (velocidad > 5):
            beaufort = <WiWindBeaufort2 {...props} />
            break
        case (velocidad > 1):
            beaufort = <WiWindBeaufort1 {...props} />
            break
        default:
            beaufort = <WiWindBeaufort0 {...props} />
            break
    }

    return (
      <div className="flex justify-center w-fit max-w-sm dark:text-white p-2 pr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700">
        {beaufort}

        <p className="self-center text-4xl font-semibold">
            {velocidad} Km/h
        </p>
      </div>
    )
}

VelocidadViento.propTypes = {
    velocidad : PropTypes.number.isRequired
}

export default VelocidadViento