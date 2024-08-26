"use client";
import page from './qrstring.module.css';
import { useEffect, useState } from "react";
import Switch from "react-switch";

interface qrstringProps {
    idQr : string,
    isActive : boolean,
    planType : string
}


export default function qrstring({idQr, isActive, planType} : qrstringProps){

    const [isToggled, setIsToggled] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(isActive);


    const handleSwitch = () => {
        setIsToggled(!isToggled);
    }

    useEffect(()=>{
        setActive(isToggled);

    },[isToggled])

    return (
        <main className={page.mainContainer}>

            <div>
                {idQr}
            </div>

            <div>
                {<Switch onChange={handleSwitch} checked={active} checkedIcon={false} uncheckedIcon={false} height={20} width={40}/>}
            </div>

        </main>

    )
}