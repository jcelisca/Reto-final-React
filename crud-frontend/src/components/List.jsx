import React, { useContext, useEffect } from 'react';
import ListaPrueba from './ListaPrueba';
import FormPrueba from './FormPrueba';

const List = ({ HOST_API, Store }) => {

    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.listAll;
    const currentitem = todo.item;

    //Actualiza la lista de listas haciendo petición Get a la API
    useEffect(() => {
        fetch(HOST_API + "/todolist")
            .then(response => response.json())
            .then((listAll) => {
                dispatch({ type: "update-listAll", listAll })
            })
    }, [currentList]);

    //Elimina una lista
    const onDelete = (id) => {
        fetch(HOST_API + "/todolist/delete/" + id, {
            method: "DELETE"
        }).then(() => {
            dispatch({ type: "delete-listaTodo", id })
        })
    };

    //carga en el formulario el nombre de la lista a editar
    const onEdit = (todo) => {
        dispatch({ type: "edit-listaTodo", listTodo: todo })
    };


    return (
        <ul>
            {
                currentList.map((list) => {
                    return <li key={list.id}>
                        <div><h2>{list.name}</h2>
                            <button className="btn btn-danger" onClick={() => { onDelete(list.id) }}>Eliminar</button>
                            <button onClick={() => onEdit(list)}>Editar</button>
                        </div>
                        <div>
                            <div><FormPrueba HOST_API={HOST_API} item={currentitem} Store={Store} todolist_id={list}/></div>
                            <div><ListaPrueba HOST_API={HOST_API} Store={Store} todolist_id={list} id_id={list.id} /></div>
                        </div>
                    </li>
                })
            }
        </ul>
    );
}

export default List;