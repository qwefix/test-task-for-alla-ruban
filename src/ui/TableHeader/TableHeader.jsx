import c from './TableHeader.module.css'
import triangle from '../../assets/triangle.svg'

function TableHeader(props) {
    return <th onClick = {props.handler}>
        <div className={c.inner_th}>
            {props.name}
            <img className={c[props.arrow]}
            src={triangle} alt="" />
        </div>
    </th>
}
export default TableHeader