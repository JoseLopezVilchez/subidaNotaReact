//asegura que los props del componente son de un tipo concreto
import { PropTypes } from "prop-types";

//componentes de la libreria weather-icons. Solo la uso para iconos y ya
import { WiWindBeaufort0, WiWindBeaufort1, WiWindBeaufort10, WiWindBeaufort11, WiWindBeaufort12, WiWindBeaufort2, WiWindBeaufort3, WiWindBeaufort4, WiWindBeaufort5, WiWindBeaufort6, WiWindBeaufort7, WiWindBeaufort8, WiWindBeaufort9 } from "weather-icons-react"

//libreria color.js para sacar distintos colores. La uso para seleccionar dinamicamente colores de un gradiente
import Color from "../../node_modules/colorjs.io/src/index.js";

//creo un prop metiendolo entre llaves
function VelocidadViento({ velocidad }) {

    //lanzo error si el prop introducido mas adelante no es del tipo deseado
    if (typeof velocidad !== 'number') {
        throw new Error('La prop velocidad debe ser un número');
    }

    //creacion de objetos Color con la libreria color.js.
    const colorInicial = new Color('#28B463')
    const colorFinal = new Color('#E74C3C')

    //creacion de gradiente con los colores anteriores, del cual podre sacar colores intermedios mas adelante
    const interpolacion = colorInicial.range(colorFinal , {space: "lch"})

    //variable donde almacenare el icono deseado para mostrar visualmente el viento en forma de componente
    let beaufort

    //props que introducire en los componentes del icono
    let props = {
        size : 90,
        //funcion para sacar el color que introducire en el icono
        color : interpolacion(velocidad/120)
    }   

    //segun la velocidad, cambia el icono a usar
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

    //componente que devuelve. Inserta el icono seleccionado en el switch en 'beaufort', y saca la velocidad del prop directamente
    return (
      <div className="flex justify-center w-fit max-w-sm dark:text-white p-2 pr-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700">
        {beaufort}

        <p className="self-center text-4xl font-semibold">
            {velocidad} Km/h
        </p>
      </div>
    )
}

//comprobacion de tipo del prop usando la libreria de proptypes
VelocidadViento.propTypes = {
    velocidad : PropTypes.number.isRequired
}

//exportacion del componente
export default VelocidadViento