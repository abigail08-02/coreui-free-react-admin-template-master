import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Iglesias = ({history})=> {

    const refFirestore = useFirestore();
    const [iglesias, setIglesias] = useState([])


    useEffect(() =>{
        const traerDatos = async () =>{
           const snapshots = await refFirestore.collection('iglesias').get()
           const temporales = []
           snapshots.docs.forEach( (doc) => {
                const elem = {
                    id: doc.id, 
                    ...doc.data()
                }
                temporales.push(elem)
           })
           setIglesias(temporales)
        }

        traerDatos()

    }, [refFirestore])

    const eliminar = async (id) => {    
        const respuesta = window.confirm('¿Seguro que quiere eliminar?');
        if (respuesta) {
            await refFirestore.collection('iglesias').doc(id).delete();
            toast('Eliminado')   
            const temp = iglesias.filter ((iglesia) => {
                console.log(iglesia, id)
                return iglesia.id !== id 
            })
            setIglesias(temp)
        }
       
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Iglesias</h2>
                <Link className="btn btn-primary" to="/iglesias/add">Crear</Link>
                <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Distrito_id</th>
                        <th>Tipo</th>
                        <th>Zona</th>
                    </tr>
                </thead>
                <tbody>
                            {
                                iglesias.map((iglesia, index) => (
                                    <tr key={iglesia.id}>
                                        <td>{index + 1}</td>
                                            <td>{
                                            
                                                iglesia.nombre
                                            
                                            }</td>
                                            <td>{
                                                
                                                iglesia.codigo
                                            
                                            }</td>
                                            <td>{
                                                
                                                iglesia.distrito_id
                                            
                                            }</td>
                                            <td>{
                                                
                                                iglesia.tipo
                                            
                                            }</td>
                                            <td>{
                                                
                                                iglesia.zona
                                            
                                            }</td>
                                            <td>
                                            <button onClick={ () => {
                                                    history.push(`/iglesias/edit/${iglesia.id}`)
                                                }}
                                                className="btn btn-success btn-sm">
                                                    <i className="cil-pencil"></i>
                                                </button>
                                                <button onClick={ () => eliminar(iglesia.id)} className="btn btn-danger btn-sm">
                                                    <i className="cil-trash"></i>
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

export default Iglesias