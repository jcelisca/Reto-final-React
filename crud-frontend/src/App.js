
import React, { useReducer, createContext } from 'react';
import List from './components/List';
import Form from './components/Form';

//Conexión con la API
const HOST_API = "http://localhost:8080/api";

//Los estados que va a manejar el contexto general (Store)
const initialState = {
  todo: { listAll: [], listTodo: [], list: [], item: {} }
};


const Store = createContext(initialState)

function reducer(state, action) {
  switch (action.type) {

    /*case 'update-item':
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      todoUpItem.list = listUpdateEdit;
      todoUpItem.item = {};
      return { ...state, todo: todoUpItem }*/


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

    /*case 'delete-item':
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete }*/

    case 'delete-listaTodo':
      const listaTodo = state.todo;
      const listaUpdate = listaTodo.listAll.filter((i) => {
        return i.id !== action.id;
      });
      listaTodo.listAll = listaUpdate;
      return { ...state, todo: listaTodo }

    /*case 'update-list':
      const todoUpList = state.todo;
      todoUpList.list = action.list;
      return { ...state, todo: todoUpList }*/

    case 'update-listAll':
      const listaTodos = state.todo;
      listaTodos.listAll = action.listAll;
      return { ...state, todo: listaTodos }

    /*case 'edit-item':
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit }*/

    case 'edittt-item':
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit }


    case 'edit-listaTodo':
      const listaTodo1 = state.todo;
      listaTodo1.listTodo = action.listTodo;
      return { ...state, todo: listaTodo1 }

    /*case 'add-item':
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: { list: todoUp, item: {} } }*/

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