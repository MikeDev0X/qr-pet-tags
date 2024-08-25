"use client";
import UpperPage from "@/components/upperPage";
import page from './admin.module.css';
import { useState } from "react";
import AdminSelection from "@/components/adminSelection";


export default function Admin() {


    const [buttonPressed, setButtonPressed] = useState('none');

    const updateSelection = (button : string) => {
        setButtonPressed(button);
    }

    return (
        <main>

            <UpperPage/>
            
            <div className={page.mainContainer}>
                {
                    buttonPressed === 'none' && <AdminSelection updateSelection={updateSelection} />
                }
                
                {
                    buttonPressed === 'qr' && <div>a</div>
                }



            </div>


        </main>
        
    )
}