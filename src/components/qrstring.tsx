"use client";
import page from './qrstring.module.css';
import { useEffect, useState } from "react";
import Switch from "react-switch";

interface qrstringProps {
    idQr : number,
    qrText : string, 
    isActive : boolean,
    planType : string
}


export default function qrstring({idQr, qrText, isActive, planType} : qrstringProps){

    const [isToggled, setIsToggled] = useState<boolean>(false);

    useEffect(()=>{
        setIsToggled(isActive);

    },[isActive])


    const activate = async (nowActiveStatus : boolean) => {

        const qr = {
            isActive: nowActiveStatus,
            idQr: idQr
        };

        console.log(qr);

        try {

            const response = await fetch(`/api/qr`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(qr),
            });


            if (!response.ok) {
                throw new Error(`Error (status: ${response.status}, statusText: ${response.statusText})`)
            }

            else {
                const json = await response.json();
                const status = json;

                console.log(status);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }


    }

    const handleSwitch = () => {
        const newToggleState = !isToggled;
        setIsToggled(newToggleState);
        activate(newToggleState);
    }


    console.log(idQr, qrText, isActive, planType);

    return (
        <main className={page.mainContainer}>

            <div>
                {qrText}
            </div>

            <div>
                {<Switch onChange={handleSwitch} checked={isToggled} checkedIcon={false} uncheckedIcon={false} height={20} width={40}/>}
            </div>

        </main>

    )
}