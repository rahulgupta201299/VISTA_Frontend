import React,{useEffect,useState} from 'react'
import './Payment.scss'
import Axios from 'axios'

function Payment() {
    useEffect(()=>{
        const Alldata={
            name: 'Rahul Gupta',
            email: 'rg810943@gmail.com',
            courseName: 'Maths',
            courseID: 'C7Maths',
            Amount: 600
        }
       const postdata=async()=>{
           await Axios.post('http://127.0.0.1:8000/checkout/pay/',Alldata).then(res=>{
               console.log(res.data)
           })
       }
       //postdata() 
    },[])
    const Pay=()=>{
        
    }
    return (
        <div className="init">
            <h1>Payment Gateway</h1>
            <button id="rzp-button1" onClick={Pay}>Pay</button>
        </div>
    )
}

export default Payment

