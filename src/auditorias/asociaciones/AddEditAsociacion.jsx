//import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object().shape({
    nombre: yup.string().required('Es requerido'),
    codigo: yup.string(),
    zona: yup.string(),
    union_id: yup.string(),
    tesorero: yup.string(),
  });


const AddEdditAsociacion = ({history})=> {


    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (datos)=> {
        console.log(datos)
    }

    const onCancelar = ()=> {
        history.push('/asociaciones')
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
                            
                        <label>Zona</label>
                        <input className="form-control" {...register('zona')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Union_Id</label>
                        <input className="form-control" {...register('union_id')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Tesorero</label>
                        <input className="form-control" {...register('tesorero')} />
                    </div>

                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEdditAsociacion