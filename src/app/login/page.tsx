"use client";

import page from "./login.module.css";

export default function Login() {
    const bg1 = "/main-backgrounds/bg1.png";
    
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

                            <input type="text" placeholder="ejemplo@hotmail.com" className={page.fillIn} />
                        </form>
                </div>

                <div className={page.credentials}>
                    <img src="/icons/passwordIcon.png" alt="user icon" width="28" height="auto"/>
                    

                    <input type="text" placeholder="**********" className={page.fillIn} />
                </div>

                <button className={page.login}>
                    Ingresar
                </button>

            </div>


        </main>
    );
}
