//asegura que los props del componente son de un tipo concreto
import { PropTypes } from "prop-types";

//componente de la libreria weather-icons
import { WiWindDeg } from "weather-icons-react"

//creo un prop metiendolo entre llaves
function DireccionViento({ rotacion }) {

    //lanzo error si el prop introducido mas adelante no es del tipo deseado
    if (typeof rotacion !== 'number') {
        throw new Error('La prop velocidad debe ser un número');
    }

    //calculo del angulo del icono y almacenamiento para usarlo en style
    let style = {
        transform: 'rotate('+rotacion+'deg)'
    }

    //componente que devuelve. Cambia la rotacion insertando directamente en style, y el tamaño del icono esta hardcodeado
    return (
        <div style={style}>
            <WiWindDeg size={90}/>
        </div>
    )
}

//comprobacion de tipo del prop usando la libreria de proptypes
DireccionViento.propTypes = {
    rotacion : PropTypes.number.isRequired
}

//exportacion del componente
export default DireccionViento