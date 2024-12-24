import React, { useEffect, useState } from "react";
import "./homepage.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

const HomePage = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const writeDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    })
      .then(() => {
        setTodo("");
      })
      .catch((error) => {
        alert("Error writing to database: " + error.message);
      });
  };

  const handleDelete = (uid) =>{
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
  }

  return (
    <div className="home-cont">
      <div className="logout">
        <button onClick={handleSignOut} className="logout-btn">
          Sign-out
        </button>
      </div>
      <div className="todo-cont">
        <div className="input-add">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="Enter the todo"
            className="todo-input"
          />
          <button className="add-btn" onClick={writeDatabase}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="list">
              {todo.todo}
              <div className="up-del">
                <button className="update" onClick={() => handleDelete(todo.uidd)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
