import { useRef, useState, useContext } from "react";

const FormPrueba = ({ HOST_API, item, Store, todolist_id }) => {

    const { dispatch } = useContext(Store);
    const item2 = item;
    const formRef = useRef(null);
    const [state, setState] = useState(item2);

    //Permite agregar un item dentro de la lista interna
    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            id: null,
            name: state.name,
            relation: todolist_id,
            completed: false
        };

        fetch(HOST_API + "/todolist/todo", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                setState({ name: "" });
                formRef.current.reset();
                return { ...state, data }

            });
    }

    //Envía una petición Put para actualizar un nombre de ítem dentro de la lista interna
    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            id: item2.id,
            name: state.name,
            relation: todolist_id,
            completed: item2.completed
        };


        fetch(HOST_API + "/todolist/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-itemm", item: todo });
                setState({ name: "" });
                formRef.current.reset();

            });
    }

    return (
        <form ref={formRef} >
            <input type="text" name="name" defaultValue={ (JSON.stringify(item.relation) === JSON.stringify(todolist_id)) ? item.name : ""}
                onChange={(event) => setState({ ...state, name: event.target.value })
                } ></input>
            {(JSON.stringify(item.relation) === JSON.stringify(todolist_id)) && <button onClick={onEdit}>Actualizar</button>}
            {!(JSON.stringify(item.relation) === JSON.stringify(todolist_id)) && <button className="btn btn-success" onClick={onAdd}>Crear</button>}
        </form>
    );
}

export default FormPrueba;