import { Link } from "react-router";
import "../styles.css";

export default function Todo() {
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
            placeholder="What do you need to do?"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        <div className="filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Active</button>
          <button className="filter-btn">Completed</button>
        </div>

        <ul className="todo-list">
          <li className="todo-item">
            <input type="checkbox" />
            <span className="todo-text">Buy groceries</span>
            <button className="delete-btn" aria-label="Delete task">
              ✕
            </button>
          </li>

          <li className="todo-item completed">
            <input type="checkbox" defaultChecked />
            <span className="todo-text">Finish React assignment</span>
            <button className="delete-btn" aria-label="Delete task">
              ✕
            </button>
          </li>

          <li className="todo-item">
            <input type="checkbox" />
            <span className="todo-text">Call a friend</span>
            <button className="delete-btn" aria-label="Delete task">
              ✕
            </button>
          </li>
        </ul>

        <div className="todo-footer">
          <span>2 items left</span>
          <button className="btn btn-ghost">Clear completed</button>
        </div>
      </main>
    </div>
  );
}