import { Link, useNavigate } from "react-router";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { jsPDF } from "jspdf";
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
            Report.failure(
              "Something went Wrong!",
              error.message,
              'Okay',
            );
          } else {
            setFetchTask(!fetchTask)
            setTask("");
          }

        } else {
          const { error } = await supabase
            .from('todos')
            .update({ text: task })
            .eq('id', flag)

          if (error) {
            Report.failure(
              "Something went Wrong!",
              error.message,
              'Okay',
            );
          } else {
            setFetchTask(!fetchTask);
            setTask("");
            setFlag(null)

          }
        }



      } else {
        Report.failure(
          "Error",
          "Write Your today's task!",
          'Okay',
        );
      }

    } catch (error) {

      Report.failure(
        "Error",
        error?.message || error,
        'Okay',
      );


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
      Report.failure(
        "Error",
        error?.message || error,
        'Okay',
      );

    }

  }

  const edit_task = async (text, index) => {

    setTask(text)

    setFlag(index)

  }

  const navigate = useNavigate();
  const get_user = async () => {

    try {

      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setSupabaseUser(user.id)
      } else {
        Report.failure(
          "Error",
          "There is no User login",
          'Okay',
        );
        navigate("/")
      }

    } catch (error) {
      Report.failure(
        "Error",
        error?.message || error,
        'Okay',
      );

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
        Report.failure(
          "Something went Wrong!",
          error.message,
          'Okay',
        );
      }

    } catch (error) {
      Report.failure(
        "Error",
        error?.message || error,
        'Okay',
      );

    }



  }


  const signOut = async () => {

    try {

      const { error } = await supabase.auth.signOut()

      if (error) {
        Report.failure(
          "Something went Wrong!",
          error.message,
          'Okay',
        );

      } else {
        setSupabaseUser(null)
        Report.success(
          "Sign Out Success",
          '<p>You are signed out! <br/><br/>- Ocean Todo<p/>',
        );
        navigate("/")
      }

    } catch (error) {
      Report.failure(
        "Error",
        error?.message || error,
        'Okay',
      );

    }

  }



  function downloadPdf(tasks) {

    if (tasksArray.length === 0) {
      Report.warning(
        'No Tasks List',
        "There is no Tasks Lists to be printed!",
        'Okay',
      );
      return
    }

    const doc = new jsPDF();

    doc.setFontSize(18); // for heading
    doc.text("Ocean Todo - My Tasks", 14, 20);

    doc.setFontSize(12); // for all tasks
    tasks.forEach((task, index) => {
      doc.text(`${index + 1}. ${task.text}`, 14, 35 + index * 10);
    });

    doc.save("ocean-todo.pdf");
  }

  useEffect(() => {

    get_user()



  }, [])

  useEffect(() => {

    if (supabaseUser) {

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
        <Link to="/" className="btn btn-ghost" onClick={() => {
          signOut()
        }}>
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
            onChange={(e) => setTask(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTask();
              }
            }}
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
          <span>{tasksArray.length} items left</span>
          <div className="footer-actions">
            <button className="btn btn-ghost">Clear completed</button>
            <button className="btn btn-primary pdf-btn" onClick={() => downloadPdf(tasksArray)}>Download PDF</button>
          </div>
        </div>
      </main>
    </div>
  );
}


// jaha error nhi ha jese empty input feild waha waring alert kerna ha or uska tile "Empty field " kerna ha
// delete ke btn pr conform change kerna ha