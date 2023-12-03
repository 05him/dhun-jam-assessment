import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import './AdminDashboard.css'
import Rupee from '../../assets/Rupee.svg';

import { useAdmin } from '../../context/AdminContext/AdminContext';
import { useLoader } from '../../context/LoaderContext/LoaderContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const barGraphOptions = {
    // responsive: true,
    categoryPercentage: 0.3,
    barPercentage: 0.85,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        display: false
        },  
    },
    scales: {
        y: {
            ticks: {
                color: '#FFFFFF',
                font: {
                    weight: 'bold'
                }
            },
            grid:{
                color: context => {
                    if(context.tick.value===0){
                        return 'white'
                    }
                }
            }
        },
        x: {
            ticks: {
                color: '#FFFFFF',
                font: {
                    weight: 'bold'
                }
            },
            grid:{
                color: context => {
                    if(context?.tick?.value===0){
                        return 'white';
                    }
                }
            }
        }
    }
};

export const AdminDashboard = () => {

    const [ chargeCustomers, setChargeCustomers ] = useState(false);
    const { setLoader } = useLoader();

    const [ category6, setCategory6 ] = useState(444);
    const [ category7, setCategory7 ] = useState(199);
    const [ category8, setCategory8 ] = useState(149);
    const [ category9, setCategory9 ] = useState(99);
    const [ category10, setCategory10 ] = useState(49);

    const [ disableBtn, setDisableBtn ] = useState(false);

    

    const { adminData: { location, name, charge_customers, amount: { category_6, category_7, category_8, category_9, category_10 }, id:adminId }, addInitialAdminData } = useAdmin();

    const barGraphData =  {
        labels: ['Custom', 'Category 1', 'Category 2', 'Category 3', 'Category 4'],
        datasets: [{
        data: [ category6, category7, category8, category9, category10 ],
        backgroundColor: '#F0C3F1',
        borderRadius: '4',
        }]
    };

    const compareAmounts = () => {
        let obj = {};

        if( category6!==category_6 ){
            obj = { ...obj, category_6: category6 }
        }
        if( category7!==category_7 ){
            obj = { ...obj, category_7: category7 }
        }
        if( category8!==category_8 ){
            obj = { ...obj, category_8: category8 }
        }
        if( category9!==category_9 ){
            obj = { ...obj, category_9: category9 }
        }
        if( category10!==category_10 ){
            obj = { ...obj, category_10: category10 }
        }
        
        return obj;
    }

    const handleSave = async() => {
        const amounts = compareAmounts();
        if(Object.keys(amounts).length!==0){
            setLoader(true);
            try{
                const putAmount = await axios.put(`https://stg.dhunjam.in/account/admin/${adminId}`, { amount: amounts });
                if(putAmount.status===200){
                    const freshFetch = await axios.get(`https://stg.dhunjam.in/account/admin/${adminId}`);
                    if(freshFetch.status===200){
                        alert('Details Saved Successfully');
                        addInitialAdminData(freshFetch.data.data);
                    }
                }
            }
            catch(eror){
                eror.response.data.ui_err_msg ? alert(eror.response.data.ui_err_msg) : alert(eror.response.data.server_err_msg);
            }
            finally{
                setLoader(false);
            }
        }
    }

    const handleInput = (event, setter, minValue) => {
        if(event.target.value<minValue){
            setDisableBtn(true);
        }
        else{
            setDisableBtn(false);
        }
        setter(event.target.value);
    }

    const handleChargeChange = () => {
        setChargeCustomers( value => !value );
        if(!chargeCustomers){
            setDisableBtn(false);
        }
        else{
            setDisableBtn(true);
        }
    }

    useEffect( () => {
        setLoader(true);
        setChargeCustomers(charge_customers);
        setCategory6(category_6);
        setCategory7(category_7);
        setCategory8(category_8);
        setCategory9(category_9);
        setCategory10(category_10);

        if( category_6<99 || category_7<79 || category_8<59 || category_9<39 || category10<19 ){
            setDisableBtn(true);
        }

        setLoader(false);
    }, [] )

    return <main className='dashboard-main' >
        <div className='dashboard-container' >
            <h1> {name}, {location} on Dhun Jam </h1>
            <section className='section-1' >
                <div>
                    <div> Do you want to charge your customers for requesting songs? </div>
                    <div className='radio-container' >
                        <label>  <input type='radio' name='charge' checked={ chargeCustomers } onChange={ handleChargeChange } /> Yes </label>
                        <label>  <input type='radio' name='charge' checked={ !chargeCustomers } onChange={ handleChargeChange } /> No </label>
                    </div>
                </div>
                <div className={ !chargeCustomers ? 'disable-font' : '' } >
                    <div> Custom song request amount- </div>
                    <div className='input-custom-container' > <input className='input-custom-song' type='number' disabled={ !chargeCustomers } step={10} min={0} value={category6} onChange={ e => handleInput(e,setCategory6, 99) } /> <span className='custom-error' > { category6<99 && 'Min value should be 99' } </span> </div>
                </div>
                <div className={ !chargeCustomers ? 'disable-font' : '' } >
                    <div> Regular song request amounts, from high to low- </div>
                    <div className='amounts-container' > 
                        <span className='amounts-span' > <input type='number' disabled={ !chargeCustomers } step={10} min={0} value={category7} onChange={ e => handleInput(e,setCategory7, 79) } /> <span className='amounts-error' > { category7<79 && 'Min 79' } </span> </span> 
                        <span className='amounts-span' > <input type='number' disabled={ !chargeCustomers } step={10} min={0} value={category8} onChange={ e => handleInput(e,setCategory8, 59) } /> <span className='amounts-error' > { category8<59 && 'Min 59' } </span> </span> 
                        <span className='amounts-span' > <input type='number' disabled={ !chargeCustomers } step={10} min={0} value={category9} onChange={ e => handleInput(e,setCategory9, 39) } /> <span className='amounts-error' > { category9<39 && 'Min 39' } </span> </span> 
                        <span className='amounts-span' > <input type='number' disabled={ !chargeCustomers } step={10} min={0} value={category10} onChange={ e => handleInput(e,setCategory10, 19) } /> <span className='amounts-error' > { category10<19 && 'Min 19' } </span> </span> 
                    </div>
                </div>
            </section>
            <section className='graph-section' style={{ visibility: chargeCustomers ? 'visible':'hidden' }} >
                <Bar data={barGraphData} options={barGraphOptions} />
                <img className='rupee-symbol' src={Rupee} alt='₹' />
            </section>
            <button className='save-btn' disabled={disableBtn || !chargeCustomers} onClick={handleSave} > Save </button>
        </div>
    </main>
}