import { useEffect, useState } from 'react';
import { useFirestore } from 'reactfire';
import { toast } from 'react-toastify';
import useGetAuditorias from "./useGetAuditorias";
import EliminarLibMesModal from './EliminarLibMesModal';
import CardHeaderDatosAudit from "./CardHeaderDatosAudit";
import RowLibMes from "./RowLibMes";
import SelectAnioMes from "./SelectAnioMes";


const DatosAuditorias = ({ history }) => {

    const refFire = useFirestore();

    const [libMensuales, setLibMensuales] = useState([]);
    const [showDelModal, setShowDelModal] = useState(false)
    const [auditorias, getAuditorias, auditoriaActual] = useGetAuditorias()

    useEffect(() => {
        getAuditorias();
    }, []);

    useEffect(() => {

        if (auditoriaActual !== {}) {
            getLibrosMensuales()
        }
    }, [auditoriaActual]);


    const getLibrosMensuales = async () => {
        console.log({ auditoriaActual })
        if (auditoriaActual.id) {
            const lib_mensualesTemp = await refFire.collection("lib_mensuales").where("auditoria_id", "==", auditoriaActual.id).get();
            let lib_mensuales = [];
            lib_mensualesTemp.forEach((snapMens) => lib_mensuales.push({
                ...snapMens.data(),
                id: snapMens.id
            }));
            setLibMensuales(lib_mensuales);
            console.log({ lib_mensuales });
        }
    }


    const handlerInputChange = (e, libMensual, tipo) => {

        const { value } = e.target
        libMensual[tipo] = value
        console.log({ libMensual })

        const tempoLibros = libMensuales.map((libMens) => {
            return libMens.id === libMensual.id ? libMensual : libMens
        })

        setLibMensuales(tempoLibros)
    }

    const handlerClickDeleteLibMes = async (libMensual) => {
        setShowDelModal(true)
        //const res = await refFire.collection("lib_mensuales").doc(libMensual.id).delete();
        //console.log(res)
    }


    return (<div>

        <CardHeaderDatosAudit auditorias={auditorias} />

        <EliminarLibMesModal showDelModal={showDelModal}
            setShowDelModal={setShowDelModal} />


        <div className="card">
            <div className="card-body">

                <h5 className="card-title">Libros del mes</h5>

                {
                    auditoriaActual.id ? <SelectAnioMes auditoriaId={
                        auditoriaActual.id
                    } /> : 'Establezca auditoria actual.'

                }

                <table className="table table-responsive table-condensed">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Año</th>
                            <th>Mes</th>
                            <th>Diezmos</th>
                            <th>Ofrendas</th>
                            <th>Especial</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody> {
                        libMensuales ? (libMensuales.map((libMensual, index) => {
                            return <RowLibMes 
                                key={index} 
                                libMensual={libMensual} 
                                handlerInputChange={handlerInputChange} 
                                handlerClickDeleteLibMes={handlerClickDeleteLibMes}
                                index={index}>
                            </RowLibMes>
                        }))
                            : <tr>
                                <td>Nada aún</td>
                            </tr>
                    }</tbody>
                </table>
            </div>
        </div>
    </div>)
}

export default DatosAuditorias
