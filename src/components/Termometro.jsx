import { PropTypes } from "prop-types";
import Color from "../../node_modules/colorjs.io/src/index.js";

function Termometro({ temperatura }) {
    if (typeof temperatura !== 'number') {
        throw new Error('La prop velocidad debe ser un número');
    }

    const colorInicial = new Color('#3498DB')
    const colorFinal = new Color('#C0392B')
    const interpolacion = colorInicial.range(colorFinal , {space: "srgb"})

    let style = {
        width: ''+porcentaje(temperatura)+'%',
        backgroundColor : interpolacion(porcentaje(temperatura) / 100).to('srgb').toString({ format: 'hex' })
    }

    return (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div style={style} className="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">{temperatura}ºC</div>
        </div>
    )
}

Termometro.propTypes = {
    temperatura : PropTypes.number.isRequired
}

function porcentaje (temperatura) {
    if (temperatura < 10) {
        return 20
    } else if (temperatura > 45) {
        return 100
    }

    return (((temperatura + 10)/55)*80 + 20)
}
  
export default Termometro