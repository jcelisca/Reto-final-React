import React, { useContext, useRef, useState } from 'react';

const Form = ({HOST_API, Store }) => {

    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const listTodo = todo.listTodo;
    const [state, setState] = useState(listTodo);

    // Agrega una lista pricipal haciendo una petición post a la API
    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
        };

        fetch(HOST_API + "/todolist", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "add-ListaTodo", listTodo: todo });
                setState({ name: "" });
                formRef.current.reset();
            });

    }

    //Hace una petición Put a la API para actualizar el nombre de una lista
    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: listTodo.id,
        };


        fetch(HOST_API + "/todolist", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-listaTodo", listTodo: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    return (
        <form ref={formRef}>
            <input type="text" name="name" defaultValue={listTodo.name}
                onChange={(event) => setState({ ...state, name: event.target.value })
                } ></input>
            {listTodo.id && <button onClick={onEdit}>Actualizar</button>}
            {!listTodo.id && <button onClick={onAdd}>Crear</button>}
        </form>
     );
}

export default Form;