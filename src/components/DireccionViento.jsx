import { PropTypes } from "prop-types";
import { WiWindDeg } from "weather-icons-react"

function DireccionViento({ rotacion }) {
    if (typeof rotacion !== 'number') {
        throw new Error('La prop velocidad debe ser un número');
    }

    let style = {
        transform: 'rotate('+rotacion+'deg)'
    }

    return (
        <div style={style}>
            <WiWindDeg size={90}/>
        </div>
    )
}

DireccionViento.propTypes = {
    rotacion : PropTypes.number.isRequired
}
  
export default DireccionViento