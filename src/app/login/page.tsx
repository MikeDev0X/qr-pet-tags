"use client";

import { useRouter } from "next/navigation";
import page from "./login.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    const bg1 = "/main-backgrounds/bg1.png";
    const [pwOpened, setPwOpened]= useState<string> ('password');
    const [email, setEmail] = useState<string> ('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    const openEye = () =>{
        pwOpened === "password" ? setPwOpened("text") : setPwOpened("password");
    }

    const handleEmail = (e: {
        target: { value: React.SetStateAction<string> };
    }) =>{
        setEmail(e.target.value);
    }

    const handlePassword = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(e.target.value);
    }

    const login = async () =>{

        if(email.length !== 0 && password.length !== 0){
            try {
                const response = await fetch(`/api/user?email=${email}&password=${password}`);
                if (!response.ok) {
                    throw new Error(`Error (status: ${response.status}, statusText: ${response.statusText})`)
                }
                else{
                    const json = await response.json();
                    const status = json.message;

                    if (status === "Incorrect credentials") {
                        alert('Credenciales Incorrectas');
                    }
                    else if (status === "Token set successfully") {
                        router.push('/register');
                    }
                }

                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
    }
    
    return (
        <main style={{backgroundImage: `url(${bg1})`, 
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100vw",
                        height: "100vh"}}
                        
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    login();
                }
            }}>

            <div className={page.mainContainer} >

                <Image src="/main-backgrounds/logo.png" alt="logo" width={200} height={200}/>

                <span className={page.title}>
                    Iniciar sesión
                </span>

                <div className={page.credentials}>
                        <img src="/icons/emailIcon.png" alt="user icon" width="30" height="auto"/>

                            <input type="text" placeholder="ejemplo@hotmail.com" className={page.fillIn} onChange={handleEmail} />

                        <div className={page.phantomDiv}> 
                        </div>
                </div>

                <div className={page.credentials}>
                    <img src="/icons/passwordIcon.png" alt="user icon" width="28" height="auto"/>
                    
                        <input type={pwOpened} placeholder="••••••••••••" className={page.fillIn} style={{ marginRight: '-1.9em' }} onChange={handlePassword} />

                    <button onClick={() => openEye()} className={page.eye}>
                        <img src={`/icons/${pwOpened === 'text' ? 'eyeOpened.png' : 'eyeClosed.png'}`} alt="password shown" width="20" />
                    </button>

                </div>


                <span className={page.gotoLogin}> ¿Aún no tienes cuenta? <Link href="/register" className={page.link}> regístrate aquí </Link></span>

                <footer>

                    <button tabIndex={0} className={page.login} onClick={() => login()}>
                    Ingresar
                </button>


                </footer>
            </div>


        </main>
    );
}
