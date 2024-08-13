"use client";

import page from "./login.module.css";
import { useState } from "react";

export default function Login() {
    const bg1 = "/main-backgrounds/bg1.png";
    const [pwOpened, setPwOpened]= useState<string> ('password');

    const [email, setEmail] = useState<string> ('');
    const [password, setPassword] = useState<string>('');


    const openEye = () =>{
        pwOpened === "password" ? setPwOpened("text") : setPwOpened("password");
    }
    
    return (
        <main style={{backgroundImage: `url(${bg1})`, 
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100vw",
                        height: "100vh"}}>

            <div className={page.mainContainer}>

                <img src="/main-backgrounds/logo.png" alt="logo" width="200" />

                <span className={page.title}>
                    Iniciar sesión
                </span>

                <div className={page.credentials}>
                        <img src="/icons/userIcon.png" alt="user icon" width="30" height="auto"/>
                        <form action="">

                            <input type="text" placeholder="ejemplo@hotmail.com" className={page.fillIn}/>
                        </form>
                        <div className={page.phantomDiv}>
                            
                        </div>
                </div>

                <div className={page.credentials}>
                    <img src="/icons/passwordIcon.png" alt="user icon" width="28" height="auto"/>
                    

                    <input type={pwOpened} placeholder="••••••••••••" className={page.fillIn} style={{ marginRight: '-2em' }} />
                    <button onClick={() => openEye()} className={page.eye}>
                        <img src={`/icons/${pwOpened === 'text' ? 'eyeOpened.png' : 'eyeClosed.png'}`} alt="password shown" width="20" />
                    </button>

                </div>

                <button className={page.login}>
                    Ingresar
                </button>

            </div>


        </main>
    );
}
