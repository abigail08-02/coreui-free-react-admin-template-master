import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

const Auditorias = ({history}) => {

    const refFirestore = useFirestore();
    const [auditorias, setAuditorias] = useState([])
    
    useEffect(() =>{
        const traerDatos = async () =>{
           const snapshots = await refFirestore.collection('auditorias').get()
           const temporales = []
           snapshots.docs.forEach( (doc) => {
                const elem = {
                    id: doc.id, 
                    ...doc.data()
                }
                temporales.push(elem)
           })
           setAuditorias(temporales)
        }

        traerDatos()

    }, [refFirestore])

    const eliminar = async (id) => {    
        const respuesta = window.confirm('¿Seguro que quiere eliminar?');
        if (respuesta) {
            await refFirestore.collection('auditorias').doc(id).delete();
            toast('Eliminado')   
            const temp = auditorias.filter ((auditoria) => {
                console.log(auditoria, id)
                return auditoria.id !== id 
            })
            setAuditorias(temp)
        }
       
    }


    const setActual = async (id)=> {
        let batch = refFirestore.batch();   
        auditorias.forEach((audit) =>{
            let elem = refFirestore.collection('auditorias').doc(audit.id)
            const actual = audit.id === id ? true : false;  
            batch.update(elem, { actual: actual })
        })
        await batch.commit();
        toast('Actualizada actual')
        //await refFirestore.collection('auditorias').doc(id).update({actual: true}) 
        //toast('Actualizada actual')
    }


    return(
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Auditorias</h2>
                <Link className="btn btn-primary" to="/auditorias/add">
                    <FaPlus style={{ marginRight: '5px', marginTop: '-3px' }}/>
                    Crear
                </Link>
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Fecha</th>
                                <th>Iglesias</th>
                                <th>Actual</th>
                                <th>Activo</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                auditorias.map((auditoria, index) => (
                                    <tr key={auditoria.id}>
                                        <td>{index + 1}</td>
                                            <td>{
                                                
                                                auditoria.fecha
                                            
                                            }</td>
                                            <td></td>
                                            <td>{
                                                
                                                auditoria.actual
                                                ?
                                                'ACTUAL'
                                                :
                                                <button onClick={ () => setActual(auditoria.id) } className="btn btn-primary btn-sm">
                                                    Poner como actual
                                                </button>
                                            
                                            }</td>
                                            <td>{
                                                
                                                auditoria.activo ? 'Si' : 'No'
                                            
                                            }</td>
                                            <td>
                                            <button onClick={ () => {
                                                    history.push(`/auditorias/edit/${auditoria.id}`)
                                                }}
                                                className="btn btn-success btn-sm">
                                                    <FaPen></FaPen>
                                                </button>
                                                <button onClick={ () => eliminar(auditoria.id)} className="btn btn-danger btn-sm">
                                                    <FaTrash></FaTrash>
                                                </button>
                                            
                                            </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default Auditorias