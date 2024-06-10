//asegura que los props del componente son de un tipo concreto
import { PropTypes } from "prop-types";

//libreria color.js para sacar distintos colores. La uso para seleccionar dinamicamente colores de un gradiente
import Color from "../../node_modules/colorjs.io/src/index.js";

//creo un prop metiendolo entre llaves
function Termometro({ temperatura }) {

    //lanzo error si el prop introducido mas adelante no es del tipo deseado
    if (typeof temperatura !== 'number') {
        throw new Error('La prop velocidad debe ser un número');
    }

    //creacion de objetos Color con la libreria color.js.
    const colorInicial = new Color('#3498DB')
    const colorFinal = new Color('#C0392B')

    //creacion de gradiente con los colores anteriores, del cual podre sacar colores intermedios mas adelante
    const interpolacion = colorInicial.range(colorFinal , {space: "srgb"})

    //variable donde inserto el calculo final de la anchura de la barra interior del termometro, y el color sacado del gradiente
    let style = {
        width: ''+porcentaje(temperatura)+'%',
        backgroundColor : interpolacion(porcentaje(temperatura) / 100).to('srgb').toString({ format: 'hex' })
    }

    //componente que devuelve. Inserta el style directamente, y la temperatura del prop
    return (
        <div className="w-full h-12 bg-gray-200 rounded-full dark:bg-gray-700">
            <div style={style} className="flex items-center justify-center h-12 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"><span>{temperatura}ºC</span></div>
        </div>
    )
}

//comprobacion de tipo del prop usando la libreria de proptypes
Termometro.propTypes = {
    temperatura : PropTypes.number.isRequired
}

//funcion que calcula el porcentaje de la barra interior. Siempre mantiene un minimo del 20% y nunca pasa del 100%
function porcentaje (temperatura) {
    if (temperatura < 10) {
        return 20
    } else if (temperatura > 45) {
        return 100
    }

    return (((temperatura + 10)/55)*80 + 20)
}
  
//exportacion del componente
export default Termometro