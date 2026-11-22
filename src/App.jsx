import { BrowserRouter, Routes, Route } from "react-router";
import Todo from "./pages/Todo.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/todo" element={<Todo/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
