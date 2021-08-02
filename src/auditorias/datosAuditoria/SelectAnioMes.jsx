import PropTypes from 'prop-types'
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react'
import { CTooltip } from '@coreui/react'

const SelectAnioMes = ({auditoriaId}) => {

    const refFire = useFirestore()
    const [datosNewLibroMes, setDatosNewLibroMes] = useState({})

    const handlerDatosLibroMes = (e) => {
        const { name } = e.target
        setDatosNewLibroMes( (datos) => {
            return {
                ...datos,
                [name]: e.target.value
            }
        })
    }


    const crearLibroMes = async () => {
        console.log('A guardar')
        const tokeep =  {
            ...datosNewLibroMes,
            diezmos: 0,
            ofrendas: 0,
            especiales: 0
        }
        setDatosNewLibroMes((estado) => tokeep )
        console.log(tokeep)
        const res = await refFire.collection('lib_mensuales').doc().set({...tokeep, auditoria_id: auditoriaId})
        console.log(res)
        toast.success('Agregado.')
    }

    return (
        <>
            <select onChange={ (e) => handlerDatosLibroMes(e)} name="anio" multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
            
            <select onChange={ (e) => handlerDatosLibroMes(e)} name="mes" multiple style={{padding: 5, margin: 5, borderRadius: 5}}>
                <option value="Enero">Enero</option>
                <option value="Febrero">Febrero</option>
                <option value="Noviembre">Marzo</option>
                <option value="Noviembre">Abril</option>
                <option value="Noviembre">Mayo</option>
                <option value="Noviembre">Junio</option>
                <option value="Noviembre">Julio</option>
                <option value="Noviembre">Agosto</option>
                <option value="Noviembre">Septiembre</option>
                <option value="Noviembre">Octubre</option>
                <option value="Noviembre">Noviembre</option>
                <option value="Diciembre">Diciembre</option>
            </select>


            <CTooltip content="Agregar libro mes">
                <button className="btn btn-primary" onClick={() => crearLibroMes() }>
                    <FaPlus />
                </button>
            </CTooltip>

        </>
    )
}

SelectAnioMes.propTypes = {
    auditoriaId: PropTypes.string
}

export default SelectAnioMes