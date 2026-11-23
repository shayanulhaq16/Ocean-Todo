import { Link } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../credentials";
import "../styles.css";

export default function Todo() {

  const [task, setTask] = useState("")
  const [tasksArray, setTasksArray] = useState([])

  const [fetchTask, setFetchTask] = useState(true);

  const [flag, setFlag] = useState(null)

  const [supabaseUser, setSupabaseUser] = useState(null);

  const addTask = async () => {


    try {

      if (task.trim() !== "") {

        if (flag === null) {

          const { error } = await supabase
            .from('todos')
            .insert({ user_id: supabaseUser, text: task.trim() })

          if (error) {
            console.log(error.message);
          } else {
            console.log('success');
            setFetchTask(!fetchTask)
            setTask("");
          }

        } else {
          const { error } = await supabase
            .from('todos')
            .update({ text: task })
            .eq('id', flag)

          if (error) {
            console.log(error.message);
          } else {
            console.log('success');
            setFetchTask(!fetchTask);
            setTask("");
            setFlag(null)

          }
        }



      } else {
        alert("Write Your today's task!")
      }

    } catch (error) {

      console.log(error);


    }


  }

  
  const delete_task = async (index) => {
    
    try {

      const response = await supabase
        .from('todos')
        .delete()
        .eq('id', index)

      setFetchTask(!fetchTask)

    } catch (error) {
      console.log(error);
      
    }
    
  }

  const edit_task = async (text, index) => {
    
    setTask(text)

    setFlag(index)

  }

  const get_user = async () => {

    try {

      const { data: { user }, error } = await supabase.auth.getUser()

      if (user) {
        console.log(user.id);
        setSupabaseUser(user.id)
      } else {
        console.error(error.message);
      }
      
    } catch (error) {
      console.log(error);
      
    }

  }

  
  const fetching_allTasks = async () => {

    try {

      const { data, error } = await supabase
        .from('todos')
        .select()
        .eq("user_id", supabaseUser)
        .order('id', { ascending: true })

      if (data) {
        
        setTasksArray(data)
        
        

      } else {
        console.log(error.message);
      }

    } catch (error) {
      console.log("error");

    }



  }
  useEffect(() => {

    get_user()



  }, [])

  useEffect(()=>{

    if(supabaseUser){

      fetching_allTasks();
    }
    

  }, [supabaseUser, fetchTask])



  return (
    <div className="todo-page">
      <header className="todo-header">
        <div className="brand">
          <span className="brand-icon">🌊</span>
          <h1>Ocean Todo</h1>
        </div>
        <Link to="/" className="btn btn-ghost">
          Logout
        </Link>
      </header>

      <main className="todo-card">
        <h2>My Tasks</h2>

        <form className="add-form">
          <input
            type="text"
            name="task"
            placeholder="What do I need to do?"
            autoComplete="off"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={addTask}>
            {flag
              ?
              "Update"
              :
              "Add"}
          </button>
        </form>

        <div className="filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Completed</button>
        </div>

        <ul className="todo-list">

          {tasksArray.map((element, index) => {
            return (<li className="todo-item" key={index}>
              <input type="checkbox" />
              <span className="todo-text">{element.text}</span>
              <div className="todo-actions">
                <button className="edit-btn" aria-label="Edit task" onClick={() => {
                  edit_task(element.text, element.id)
                }}>
                  ✎
                </button>
                <button className="delete-btn" aria-label="Delete task" onClick={() => {
                  if (confirm("Have you complete it!")) {
                    delete_task(element.id)
                  }
                }}>
                  ✕
                </button>
              </div>
            </li>)
          })}


        </ul>

        <div className="todo-footer">
          <span>2 items left</span>
          <button className="btn btn-ghost">Clear completed</button>
        </div>
      </main>
    </div>
  );
}