import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'
import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const [isLoggedIn, setIsLoggedIn] = useState(false);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = (e) => {
  e.preventDefault();
  // This is a simple example - in a real app you would validate against a backend
  if (username === 'admin' && password === 'password123') {
    setIsLoggedIn(true);
    // You could store the login state in localStorage if needed
    localStorage.setItem('isLoggedIn', 'true');
  } else {
    alert('Invalid credentials');
  }
}

const handleLogout = () => {
  setIsLoggedIn(false);
  setUsername('');
  setPassword('');
  localStorage.removeItem('isLoggedIn');
}

// Check if user was previously logged in
useEffect(() => {
  const loginStatus = localStorage.getItem('isLoggedIn');
  if (loginStatus === 'true') {
    setIsLoggedIn(true);
  }
}, []);

function App() {

  const [inputValue, setinputValue] = useState("")
  const [todo, setTodo] = useState([])
  const [showFineshed, setshowFineshed] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todo")
    if (todoString) {
      let todosad = JSON.parse(localStorage.getItem("todo"))
      setTodo(todosad)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todo", JSON.stringify(todo))
  }

  try {
    localStorage.setItem("key", "value");
  } catch (e) {
    if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      // Handle the storage quota being exceeded
      console.error("Local storage limit exceeded");
    } else {
      // Handle other errors
      console.error("An error occurred while saving to local storage", e);
    }
  }


  const toggleFinished = (e) => {
    setshowFineshed(!showFineshed)
  }


  const handleInputChange = (e) => {
    setinputValue(e.target.value)

  }
  const handleDelete = (e, id) => {
    let newTodo = todo.filter(item => {
      return item.id !== id

    })
    setTodo(newTodo)
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todo.filter(i => i.id === id)
    setinputValue(t[0].text)
    let newTodo = todo.filter(item => {
      return item.id !== id

    })
    setTodo(newTodo)

    saveToLS()
  }

  const handleSave = () => {
    setTodo([...todo, { id: uuidv4(), text: inputValue, isCompleted: false }])
    setinputValue("")
    saveToLS()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }
  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todo.findIndex(item => {
      return item.id === id

    })
    console.log(`the index is ${index} and ${id}`)
    let newTodo = [...todo];
    newTodo[index].isCompleted = !newTodo[index].isCompleted
    setTodo(newTodo)
    saveToLS()
  };


  return (

    <div className="container  bg-violet-50 min-h-[100vh]  w-[100vw]">
      <Navbar />
      <div className="card md:w-[40vw] min-h-[85vh] bg-violet-200 mx-auto my-5 rounded-lg">
        <div className="title    md:my-5  flex flex-col justify-center">
          <div className='my-3 flex justify-center font-bold gap-5 '>
            ITask - Manage your Todo at one place
          </div>
 
          <div className="font-bold flex justify-start mx-3">
            Add a Todo
          </div>
          <div className="feild">
            <input onKeyDown={handleKeyPress} onChange={handleInputChange} className=' focus:border-blue-500 focus:ring-0 focus:ring-offset-0 w-3/4 mx-3 my-2 rounded-full py-1' type="text" value={inputValue} />
            <button disabled={inputValue.length <= 2} onClick={handleSave} className='bg-violet-600 rounded-full px-3 py-1 text-white font-bold  hover:bg-violet-800  cursor-pointer'>Save</button>
          </div>
          <div className="show mx-3 flex items-center gap-2">
            <input className='w-4 h-4' type="checkbox" onChange={toggleFinished} checked={showFineshed} />
            <label className='font-semibold' htmlFor="show"> ShowFinished</label>
          </div>
          <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
          <div className="todo mx-2 font-bold my-2">
            Your Todo
          </div>

          <div className="task ">
            {
              todo.map(
                (item, index) => {


                  return (showFineshed || !item.isCompleted) && <div key={index} className="flex mx-2 items-center gap-4 my-1 w-3/4 justify-between">
                    <div className="inp items-center flex mx-1">
                      <input name={item.id} className='w-4 h-4 ' checked={item.isCompleted} onChange={handleCheckBox} type="checkbox" />
                      <div className='mx-2 text-xl md:text-lg'>
                        <div className={item.isCompleted ? "line-through" : ""}>

                          {item.text}
                        </div>
                      </div>
                    </div>
                    <div className="button flex h-6 w-3 mx-1">
                      <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600  hover:bg-violet-800  cursor-pointer rounded-full px-2 text-sm  mx-1 py-1 text-white font-bold gap-4  w-20'><MdOutlineEditNote /></button>
                      <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600  hover:bg-violet-800  cursor-pointer rounded-full px-2 text-sm  py-1 text-white font-bold w-10'><MdDelete /></button>
                    </div>
                  </div>

                }
              )
            }


          </div>
        </div>
      </div>
    </div>


  )
}

export default App
