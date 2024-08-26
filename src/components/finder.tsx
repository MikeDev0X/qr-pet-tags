"use client";
import page from './finder.module.css';
import { useEffect, useState } from "react";
import QrString from '@/components/qrstring';

export default function Finder() {
    const [numberQrs, setNumberQrs] = useState('');
    const [existingQr, setExistingQr] = useState('');
    const [allQrs, setAllQrs] = useState([]);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allQrs.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(allQrs.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const handleNumber = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setNumberQrs(e.target.value);
    }

    const handleExistingQr = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setExistingQr(e.target.value);
    }

    const getQrs = async () => {

        const response2 = await fetch(`/api/qr`);

        if (response2.ok) {

            const json = await response2.json();
            const status2 = json;
            setAllQrs(status2);


        } else { alert('Ocurrió un error') }

    }


    useEffect(() => {
        getQrs();
    }, [])

    console.log(currentItems);

    const createqrs = async (button: string) => {
        let body = {};

        if (button === '1')
            body = {
                quantity: numberQrs,
                endpointType: 'fromScratch',
                existingQR: 'dummie'
            }
        else {
            body = {
                quantity: '1',
                endpointType: 'addExisting',
                existingQR: existingQr
            }
        }

        try {

            const response = await fetch(`/api/qr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });


            if (!response.ok) {
                throw new Error(`Error (status: ${response.status}, statusText: ${response.statusText})`)
            }

            else {
                const json = await response.json();
                const status = json.message;

                //update list
                getQrs();

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }





    return (
        <main className={page.mainContainer}>

            <div className={page.rows}>
                <input type="number" className={page.input} onChange={handleNumber} />

                <button className={page.button} style={{ backgroundColor: '#FFECB3' }} onClick={() => createqrs('1')}>
                    <span> Generar QRs</span>
                </button>
            </div>

            <div className={page.rows}>
                <input type="text" className={page.input} onChange={handleExistingQr} />

                <button className={page.button} style={{ backgroundColor: '#B0E0E6' }} onClick={() => createqrs('2')}>
                    <span>Ingresar QR manualmente</span>
                </button>
            </div>

            {
                currentItems.map((e: any) => (
                    <QrString key={e.key} idQr={e.idQr} qrText={e.qrText} isActive={e.isActive} planType={e.planType} />
                ))
            }

            <div className={page.lowerContainer}>
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={page.pagination}>
                    ← Anterior
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={page.pagination}>
                    Siguiente →
                </button>
            </div>


        </main>

    )
}