import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react';

import SelectAnioMes from "./SelectAnioMes"

const DatosAuditoria = ({ history }) => {
    const refFirestore = useFirestore();

    const [auditorias, setAuditorias] = useState([])
    const [auditoriaActual, setAuditoriaActual] = useState({})
    const [libMensuales, setLibMensuales] = useState([])
    

    useEffect(() => {
        const traerDatos = async () =>{

            //Traer auditorias y la actual
            const auditoriasFix = [];
            const auditoriasTemp = await refFirestore.collection('auditorias').get();
            let auditTemp = {};
   
            
            auditoriasTemp.forEach(async (snapshot) => {
                auditTemp = { ...snapshot.data(), id: snapshot.id };
                auditoriasFix.push(auditTemp);

                if (auditTemp.actual === true) {
                    setAuditoriaActual(auditTemp);

                    //Traer libros de la auditoria actual
                    console.log({ auditTemp });
                    const lib_mensualesTemp = await refFirestore
                    .collection("lib_mensuales")
                    .where("auditoria_id", "==", auditTemp.id)
                    .get();
                    let lib_mensuales = [];
                    lib_mensualesTemp.forEach((spanMens) =>
                        lib_mensuales.push({ ...spanMens.data(), id: spanMens.id })
                    );
                    setLibMensuales(lib_mensuales);
                    console.log({ lib_mensuales });
                }
            });
            
            setAuditorias(auditoriasFix);
            toast.info("Datos traídos.");

            };                      

            traerDatos();

        }, [refFirestore]);

        return (
            <div>
                <CCard>
                    <CCardHeader>Datos Auditorias</CCardHeader>
                        <CCardBody>
                            <div>
                                {
                                    auditorias &&
                                    auditorias.map((audit) => {
                                        return (
                                            <button key={audit.id} className="btn btn-primary">
                                                {audit.fecha}
                                            </button>
                                        )
                                    })    
                                }

                            </div>
                        </CCardBody>
                </CCard>

                <div className="card">
                    <div className="card-body">

                        <h5 className="card-title">Libros del mes</h5>

                          {
                              auditoriaActual.id
                              ?
                              <SelectAnioMes auditoriaId = {auditoriaActual.id}/>
                              :
                              'Establezca auditoria actual'
                          }

                    <table className="table table-responsive table-condensed">
                        <thead>
                            <tr>
                                <th>Nro</th>                              
                                <th>Año</th>                          
                                <th>Mes</th>
                                <th>Diezmo</th>
                                <th>Ofrendas</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {libMensuales &&
                                libMensuales.map((libMensual, index) => {
                                    return (
                                        <tr key={libMensual.id}>
                                            <td>{index + 1}</td>
                                            <td>{libMensual.anio}</td>
                                            <td>
                                                <CButton color="success" size="sm">{libMensual.mes}</CButton>
                                            </td>
                                        </tr>
                                    )
                                })    
                            }
                        </tbody>
                    </table>   
                </div>
            </div>
            
        </div>
    );       

};

export default DatosAuditoria;