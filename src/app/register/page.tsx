"use client";

import { useRouter } from "next/navigation";
import page from "./register.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Register() {
    const bg2 = "/main-backgrounds/bg2.png";

    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [pwOpened, setPwOpened] = useState<string>('redCheckIcon');

    /* const passwordCheck = () => {
        
    } */

    useEffect(()=>{
        (password === confirmPassword && password !== '' && confirmPassword !== '') ? setPwOpened("greenCheckIcon") : setPwOpened("redCheckIcon");
    },[password, confirmPassword])


    const router = useRouter();

    const handleEmail = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setEmail(e.target.value);
    }

    const handleName = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setFullName(e.target.value);
    }

    const handlePassword = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(e.target.value);
    }

    const handleConfirm = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setConfirmPassword(e.target.value);
    }


    const register = async () => {

        
        if (email.length !== 0
             && password.length !== 0 
             && fullName.length !== 0 
             && confirmPassword.length !== 0
            ) {

                if(password !== confirmPassword){
                    alert('Las contraseñas no coinciden');
                }
                else{
                    const userData = {
                        email,
                        userType: 'user',
                        fullName,
                        passW: password,
                    };


                    try {

                        const response = await fetch(`/api/user`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userData),
                        });


                        if (!response.ok) {
                            throw new Error(`Error (status: ${response.status}, statusText: ${response.statusText})`)
                        }

                        else {
                            const json = await response.json();
                            const status = json.message;

                            if (status === "User already exists") {
                                alert('El usuario ya existe');
                            }
                            else if (status === "User added successfully") {
                                alert('¡Registro exitoso!');
                                router.push('/login'); //navigate to login
                            }
                        }



                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }

                }
                
        }

    }

    return (
        <main style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "100vh"
        }}>

            <div className={page.mainContainer}>

                <Image src="/main-backgrounds/logo.png" alt="logo" width={200} height={200} />

                <span className={page.title}>
                    Crear cuenta
                </span>

                <div className={page.credentials}>
                    <img src="/icons/emailIcon.png" alt="user icon" width="30" height="auto" />
                    <form action="">

                        <input type="text" placeholder="Correo electrónico" className={page.fillIn} onChange={handleEmail} />
                    </form>
                    <div className={page.phantomDiv}>

                    </div>
                </div>

                <div className={page.credentials}>
                    <img src="/icons/userIcon.png" alt="user icon" width="30" height="auto" />
                    <form action="">

                        <input type="text" placeholder="Nombre completo" className={page.fillIn} onChange={handleName} />
                    </form>
                    <div className={page.phantomDiv}>

                    </div>
                </div>

                <div className={page.credentials}>
                    <img src="/icons/passwordIcon.png" alt="user icon" width="28" height="auto" />

                    <form action="">
                        <input type="text" placeholder="Contraseña" className={page.fillIn} style={{ marginRight: '-2em' }} onChange={handlePassword} />
                    </form>

                    <img src={`/icons/${pwOpened}.png`} alt="password shown" width="20" />
                    

                </div>

                <div className={page.credentials}>
                    <img src="/icons/passwordIcon.png" alt="user icon" width="28" height="auto" />

                    <form action="">
                        <input type="text" placeholder="Confirmar contraseña" className={page.fillIn} style={{ marginRight: '-2em' }} onChange={handleConfirm} />
                    </form>

                    <img src={`/icons/${pwOpened}.png`} alt="password shown" width="20" />

                </div>

                <button className={page.login} onClick={() => register()}>
                    Registrarme
                </button>

            </div>


        </main>
    );
}
