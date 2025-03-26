import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [Error , setError] = useState("");
    const navigate = useNavigate();

    const HandleSubmit  = async (e)=>{
        e.preventDefault();

        try{
            const response  = await fetch("http://localhost:8080/api/admin/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    loginId:username,
                    password:password
                }),
            });
            const data = await response.text();
            if(response.ok && data !=="Authentication failed"){
                const token = data;
                console.log(token);

                localStorage.setItem("token",token);
                navigate('/');
                setPassword("");
                setUsername("");
            } else{
                 setError("wrong Password");
                 console.log(Error);
            }
        }  catch(error){
            console.error("Error during login" + error)
            setError("An Error occured during login");
        }
    }
    return (
      <>
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={HandleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="email"
                    onChange={(e)=>setUsername(e.target.value)}
                    value={username}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
           
          </div>
        </div>
      </>
    )
  }
  