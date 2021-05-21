import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify'


const schema = yup.object().shape({
    fecha: yup.string().required('Es requerido'),
    activo: yup.boolean(),
    iglesia_id: yup.string(),
    iglesia: yup.object().shape({
        id: yup.string(),
        nombre: yup.string(),
        direccion: yup.string(),
        telefono: yup.string(),
    }),
    actual: yup.boolean(),
    createdAt: yup.date().default(function (){
        return new Date;
    }),
  });


  const AddEdditAuditorias = ({history, match})=> {

    const { id } = match.params;
    const isAddMode = !id;
    const refFirestore = useFirestore().collection('auditorias');

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        const traerDatos = async ()=> {
            const res = await (await refFirestore.doc(id).get()).data()
            const fields = ['fecha', 'activo', 'iglesia_id', 'actual']
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
        toast('Auditoria Creada con éxito')
        history.push('/auditorias')
    }

    const actualizar = async  (id, datos) =>{
        console.log(datos)
        await refFirestore.doc(id).set(datos)
        toast('Auditoria Editada con éxito')
        history.push('/auditorias')
    }

    const onCancelar = ()=> {
        history.push('/auditorias')
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-gruop">
                            
                        <label>Id</label>
                        <input className="form-control" {...register('id')} />
                        { errors.nombre?.message}
                    </div>
                    <div className="input-gruop">
                            
                        <label>Fecha</label>
                        <input className="form-control" {...register('fecha')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Activo</label>
                        <input className="form-control" {...register('activo')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Iglesia_id</label>
                        <input className="form-control" {...register('iglesia_id')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Actual</label>
                        <input className="form-control" {...register('actual')} />
                    </div>

                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEdditAuditorias