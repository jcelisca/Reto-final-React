import { useState, useEffect, useContext } from "react";
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core'

const ListaPrueba = ({ HOST_API, Store, todolist_id, id_id }) => {

    const { dispatch } = useContext(Store);

    const [list, setlist] = useState([]);

    //Actualiza la lista interna que dentro de una lista principal
    //Hace una petición a la API y muestra la lista que contiene el Id de la lista general
    useEffect(() => {
        fetch(HOST_API + "/todolist/todo/" + id_id,)
            .then(response => response.json())
            .then(data => {
                setlist(data);
            })
    }, [list]);

    //Permite eliminar un item dentro de las listas internas
    const onDelete = (id) => {
        fetch(HOST_API + "/todolist/" + id + "/todo", {
            method: "DELETE"
        }).then(() => {
            const newList = list.filter((item) => item.id !== id);
            setlist(newList);
        })
    };

    //Muestra en el formulario el nombre del item a editar
    const onEdit = (todo) => {
        dispatch({ type: "edittt-item", item: todo })

    };

    //permite cambiar el estado del checkbox que contiene el atributo completed
    const onChange = (event, todo) => {
        const request = {
            id: todo.id,
            name: todo.name,
            relation: todolist_id,
            completed: event.target.checked

        };

        fetch(HOST_API + "/todolist/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(() => {
                const todoUpItem = list;
                return { ...list, todoUpItem }

            })
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };


    return (
        <table >
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Tarea</td>
                    <td>¿Completado?</td>
                </tr>
            </thead>
            <tbody>
                {list.map((todo) => {
                    return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                        <td><button className="btn btn-danger" onClick={() => onDelete(todo.id)} >Eliminar</button></td>
                        <td><button onClick={() => onEdit(todo)} >Editar</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default ListaPrueba;