import { Link, useNavigate } from "react-router";
import {supabase}  from "../credentials";
import "../styles.css";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const login_user = async ()=>{

    
    
    try {
      
      if(email !== "" && password !== ""){

        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })

        if(error){
          console.log(error.message);
          
        }else{
          navigate("./todo")
        }
        
      }else{
        alert("Email or Password is Undefined")
      }
    } catch (error) {
      console.log("Error", error);
    }


  }


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <span className="brand-icon">🌊</span>
          <h1>Ocean Todo</h1>
        </div>

        <h2>Welcome back</h2>
        <p className="subtitle">Log in to manage your tasks</p>

        <form className="auth-form">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={login_user}>
            Login
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}