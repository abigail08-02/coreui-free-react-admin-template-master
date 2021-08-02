import { 
    CButtonGroup,
    CPopover,
    CButton,
 } from "@coreui/react";
 import { FaTimes } from "react-icons/fa";

function RowLibMes({libMensual, index, handlerInputChange, handlerClickDeleteLibMes}) {
    console.log({libMensual, index, handlerInputChange, handlerClickDeleteLibMes})
    return (<tr>
        <td>{
            index + 1
        }</td>
        <td>{
            libMensual.anio
        }</td>
        <td>{
            <CButtonGroup>
                <CButton color="info" size="sm">{
                    libMensual.mes
                }</CButton>
                <CButton color="danger"
                    onClick={
                        () => handlerClickDeleteLibMes(libMensual)
                    }>
                        <FaTimes/>
                    </CButton>
            </CButtonGroup>
        }</td>
        <td>
            <CPopover header="Diezmos semanales" content="Todo">
                <input type="text" min="0" className="form-control"
                    onChange={
                        (e) => handlerInputChange(e, libMensual, 'ofrendas')
                    }
                    value={
                        libMensual.ofrendas
                    }/>
            </CPopover>
        </td>
        <td>

        </td>

        </tr>
        
    )
}

export default RowLibMes