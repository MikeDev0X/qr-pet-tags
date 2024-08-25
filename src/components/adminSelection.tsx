"use client";
import page from './adminSelection.module.css';
import { useState } from "react";
import Image from "next/image";

interface AdminSelectionProps {
    updateSelection: (button: string) => void;
}

export default function AdminSelection({ updateSelection }: AdminSelectionProps){

    const qrImage = "/icons/qrIcon.png";
    const searchImage = "/icons/searchIcon.png";

    const hoverColours = ['#FFD965', '#66DEED'];
    const colours = ['#FFECB3', '#B0E0E6'];

    const [isFocused, setFocus] = useState(false);
    const [isFocused2, setFocus2] = useState(false);

    const [modulePressed, setModulePressed] = useState('none');

    return (
        <main>

            <div className={page.mainContainer}>


                <div className={page.button}
                    onMouseEnter={() => setFocus(true)}
                    onMouseLeave={() => setFocus(false)}
                    style={{ backgroundColor: isFocused ? hoverColours[0] : colours[0] }}
                    onClick={() => (updateSelection('qr'))}
                >
                    <Image src={qrImage} width={70} height={70} alt={"QR"} />
                    <span style={{ marginTop: '2em' }}> Generar códigos QR </span>
                </div>

                <div className={page.button}
                    onMouseEnter={() => setFocus2(true)}
                    onMouseLeave={() => setFocus2(false)}
                    style={{ backgroundColor: isFocused2 ? hoverColours[1] : colours[1] }}
                    onClick={() => (updateSelection('search'))}
                >
                    <Image src={searchImage} width={70} height={70} alt={"Search"} />
                    <span style={{ marginTop: '2em' }}> Buscar clientes </span>
                </div>

            </div>


        </main>

    )
}