import React, { useContext, useEffect} from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const List = ({ HOST_API, Store }) => {

    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.listAll;
    const currentitem = todo.item;

    //Actualiza la la lista de listas haciendo petición get a la API
    useEffect(() => {
        fetch(HOST_API + "/todolist")
            .then(response => response.json())
            .then((listAll) => {
                dispatch({ type: "update-listAll", listAll })
            })
    }, [currentList]);

    //Elimina una lista
    const onDelete = (id) => {
        fetch(HOST_API + "/todolist/" + id, {
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
                            <button onClick={() => { onDelete(list.id) }}>Eliminar</button>
                            <button onClick={() => onEdit(list)}>Editar</button>
                        </div>
                        <div>
                            <div><TodoList HOST_API={HOST_API} item={currentitem} Store={Store} todolist_id={list}/></div>
                            <div><TodoForm HOST_API={HOST_API} Store={Store} todolist_id={list} id_id={list.id} /></div>
                        </div>
                    </li>
                })
            }
        </ul>
    );
}

export default List;