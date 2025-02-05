import { useState } from 'react'
import AddTodos from './components/AddTodos'
import Todos from './components/Todos'
import { ToastContainer } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";


function App() {
  // const [todos, setTodos] = useState([]);

  const todos = useSelector((state) => state.todos.todos);


  

  return (
    <>
    <div className='min-h-[100vh] w-full flex pt-[100px] justify-center'>
      <div className='max-w-xl  w-full'>
        <div>
        <AddTodos />
        </div>

        <div className='mt-6'> 
        <Todos todo={todos} />
        </div>
      </div>

      <ToastContainer />
    </div>
    </>
  )
}

export default App
