import React, { useReducer, createContext } from 'react';
import List from './components/List';
import Form from './components/Form';

//conexión a la API
const HOST_API = "http://localhost:8080/api";

//Los estados manejados por el reducer se inicializan vacíos
const initialState = {
  todo: { listAll: [], listTodo: [], list: [], item: {} }
};

//Contexto del reducer
const Store = createContext(initialState)

function reducer(state, action) {
  switch (action.type) {

      case 'update-itemm':
      state.todo.item = {};
      return { ...state, item: action.item }


    case 'update-listaTodo':
      const todoupListaTodo = state.todo;
      const listTodoUpdate = todoupListaTodo.listAll.map((i) => {
        if (i.id === action.listTodo.id) {
          return action.listTodo;
        }
        return i;
      });
      todoupListaTodo.listAll = listTodoUpdate;
      todoupListaTodo.listTodo = [];
      return { ...state, todo: todoupListaTodo }

    case 'delete-listaTodo':
      const listaTodo = state.todo;
      const listaUpdate = listaTodo.listAll.filter((i) => {
        return i.id !== action.id;
      });
      listaTodo.listAll = listaUpdate;
      return { ...state, todo: listaTodo }


    case 'update-listAll':
      const listaTodos = state.todo;
      listaTodos.listAll = action.listAll;
      return { ...state, todo: listaTodos }


    case 'edittt-item':
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit }


    case 'edit-listaTodo':
      const listaTodo1 = state.todo;
      listaTodo1.listTodo = action.listTodo;
      return { ...state, todo: listaTodo1 }


    case 'add-listaTodo':
      const todoUpList1 = state.todo.listAll;
      todoUpList1.push(action.listTodo);
      return { ...state, todo: { listAll: todoUpList1, listTodo: [] } }

    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}


function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form HOST_API={HOST_API} Store={Store} />
    <List HOST_API={HOST_API} Store={Store} />
  </StoreProvider>
}

export default App;