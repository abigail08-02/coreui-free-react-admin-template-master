import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const DatosAuditorias = ({}) => {

    const refFirestore = useFirestore();
    const [auditorias, setAuditorias] = useState([])
    const [libMensuales, setLibMensuales] = useState([])

    useEffect(() => {
        const traerDatos = async () =>{
            const auditorias = await refFirestore.collection('auditorias').doc()
            const libMensuales = await refFirestore.collection('lib_mensuales').get()

            setAuditorias(auditorias)
            setLibMensuales(libMensuales)
            }

            traerDatos()

        }, [refFirestore])


        return (
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Auditorias</h2>
                </div>
            </div>
        )       

}

export default DatosAuditorias