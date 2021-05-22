import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify'


const schema = yup.object().shape({
    nombre: yup.string().required('Es requerido'),
    codigo: yup.string(),
    distrito_id: yup.string(),
    tipo: yup.string(),
    zona: yup.string(),
  });


const AddEdditIglesia = ({history, match})=> {

    const { id } = match.params;
    const isAddMode = !id;
    const refFirestore = useFirestore().collection('iglesias');

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        const traerDatos = async ()=> {
            const res = await (await refFirestore.doc(id).get()).data()
            const fields = ['nombre', 'direccion', 'telefono']
            fields.forEach(field => setValue(field, res[field]))
        }

        if (!isAddMode)  {
            traerDatos()
        }

    }, [refFirestore, setValue, isAddMode, id])

    const onSubmit = (datos)=> {
        return isAddMode
        ? crear (datos)
        : actualizar(id, datos)
    }

    const crear = async  (datos) =>{
        console.log(datos)
        await refFirestore.doc().set(datos)
        toast('Iglesia Creada con éxito')
        history.push('/iglesias')
    }

    const actualizar = async  (id, datos) =>{
        console.log(datos)
        await refFirestore.doc(id).set(datos)
        toast('Iglesia Editada con éxito')
        history.push('/iglesias')
    }

    const onCancelar = ()=> {
        history.push('/iglesias')
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-gruop">
                            
                        <label>Nombre</label>
                        <input className="form-control" {...register('nombre')} />
                        { errors.nombre?.message}
                    </div>
                    <div className="input-gruop">
                            
                        <label>Código</label>
                        <input className="form-control" {...register('codigo')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Distrito_id</label>
                        <input className="form-control" {...register('distrito_id')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Tipo</label>
                        <input className="form-control" {...register('tipo')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Zona</label>
                        <input className="form-control" {...register('zona')} />
                    </div>
                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEdditIglesia