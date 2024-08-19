"use client";
import page from "./login.module.css";

export default function UpperPage() {
    const color1 = '#FFEB3B';
    const color2 = '#CCBC2F';

    return (
        <div>
            <div className={page.header} style={{ background: `linear-gradient(${color1}, ${color2});`}}>

            </div>

        </div>
    )
}