"use client";
import { useEffect } from "react";
import page from "./upperPage.module.css";
import Image from "next/image";

export default function UpperPage() {
    const color1 = '#FFEB3B';
    const color2 = '#CCBC2F';
    const logoutButton = "/icons/logoutIcon.png";


    return (
        <div className={page.main}>
            <div className={page.header} style={{ background: `linear-gradient(${color1}, ${color2})`}}>
                <Image src="/main-backgrounds/logo.png" alt="logo" width={100} height={100} style={{marginLeft:'1em'}} />
                <button className={page.logout}>
                    <img src={logoutButton} alt="Logout Button" width={35}/>
                </button>
            </div>

        </div>
    )
}