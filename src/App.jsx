import React, { useState } from 'react';
import shortid from 'shortid'; // tbm se puede usar nanoid(mas nuevo), devuelve un id aleatoreo

function App() {
    const [tarea, setTarea] = useState('');
    const [tareas, setTareas] = useState([]);
    const [modoEdicion, setModoedicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const agregarTarea = e => {
        e.preventDefault();
        if (!tarea.trim()) {
            setError('Sin tarea ...')
            return // corta el ciclo
        }
        console.log(tarea)
        setTareas([
            ...tareas,
            { id: shortid.generate(), nombreTarea: tarea }
        ])
        setTarea('');
        setError(null);
    }

    const eliminarTarea = id => {
        const arrayFiltrado = tareas.filter(item => item.id !== id) // filtra todo lo distinto al id que se esta enviando
        setTareas(arrayFiltrado); // toma los elementos del array filtrado(state). elimina el mismo id de la tarea
    }

    const editar = item => {
        console.log(item)
        setModoedicion(true);
        setTarea(item.nombreTarea);
        setId(item.id);
    }

    const editarTarea = e => {
        e.preventDefault();
        if (!tarea.trim()) {
            setError('Sin tarea ...')
            return // corta el ciclo
        }

        const arrayEditado = tareas.map(item => item.id === id ? {id:id, nombreTarea:tarea} : item); // evalue el id, si es igual devolvemos el objeto, su propiedad y valor. En caso de que no sea igual, se devuelve el item    
        setTareas(arrayEditado);
        setModoedicion(false);
        setTarea('');
        setId('');
        setError(null);
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">CRUD SIMPLE</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center"> Lista de Tareas</h4>
                    <ul className="list-group">
                        {
                            tareas.length === 0 ?(
                                <li className="list-group-item">No hay tareas</li>
                            ): (
                            tareas.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead">{item.nombreTarea}</span>
                                    <button
                                        className="btn btn-sm btn-danger float-right mx-2"
                                        onClick={() => eliminarTarea(item.id)}
                                    >Eliminar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-warning float-right"
                                        onClick={() => editar(item)}

                                    >Editar
                                    </button>
                                </li>
                            ))
                         )
                        }
                    </ul>

                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
                        {
                            error ? <span className="text-danger">{error}</span> : null
                        }
                        <input type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese Tarea"
                            onChange={e => setTarea(e.target.value)}
                            value={tarea}// para resetear el valor del input
                        />
                        {
                            modoEdicion ? (
                                <button className="btn btn-warning btn-block" type="submit">Editar </button>
                            ) : (
                                <button className="btn btn-dark btn-block" type="submit">Agregar </button>
                            )
                        }

                    </form>



                </div>
            </div>
        </div>
    )
}

export default App;
