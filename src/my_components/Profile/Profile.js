import React,{useState,useEffect} from 'react'
import './Profile.scss'
import Axios from 'axios'
import {Link, Redirect, withRouter} from 'react-router-dom'
import { data } from '../About/About_Data'
import { connect } from 'react-redux'
import {setEdit} from '../redux/user/user-actions'
import ShowProfile from '../ShowProfile/ShowProfile'
import swal from 'sweetalert'
import url from '../../base' 
function Profile({currentUser,edit,dispatch}) {
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [Address1,setAddress1]=useState('')
    const [Address2,setAddress2]=useState('')
    const [zip,setZip]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [DOB,setDOB]=useState('')
    const [gender,setGender]=useState('')
    const [school,setSchool]=useState('')
    const [grad,setGrad]=useState('')
    const [err,setErr]=useState('')

    var states=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar","Chandigarh","Daman and Diu","Dadar and Nagar Haveli","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"]
    var grade=["7","8","9","10","11","12"]
    states.sort()
    states=states.map(item => item.toUpperCase())
    console.log(url)
    const handleUpdate=async()=>{
        setErr('')
        /*if(gender.length===0||DOB.length===0||firstname.length===0||lastname.length===0||Address1.length===0||zip.length===0||state.length===0||city.length===0||grad.length===0||school.length===0){
            setErr(' The required fields must be filled!')
            return
        }*/
        if(firstname.length<3&&firstname.length>0){
            setErr(' Please enter your Full First Name')
            return
        }
        if(lastname.length<3&&lastname.length>0){
            setErr(' Please enter your Full Last Name')
            return
        }
        if(zip.length!==6 && zip.length>0){
            setErr(' Please enter a valid Zip Code')
            return
        }
        else if(zip.length===6){
            let isnum = /^\d+$/.test(zip);
            if(!isnum){
                setErr(' Please enter a valid Zip Code')
                return
            } 
        }
        if(Address1.length<=5 && Address1.length>0){
            setErr('Please enter a valid Address Line 1')
            return
        }
        if(Address2.length<=5 && Address2.length>0){
            setErr(' Please enter a valid Address Line 2')
            return
        }
        if(city.length<3 && city.length>0){
            setErr(' Please enter a valid city name')
            return
        }
        if(school.length<=3 && school.length>0){
            setErr(' Please enter a valide school/university name')
            return
        }
        
        const Alldata={
            email: currentUser.email,
            firstname:firstname,
            lastname:lastname,
            Address1:Address1,
            Address2:Address2,
            Zip:zip,
            state:state,
            city:city,
            DOB:DOB,
            gender:gender,
            school:school,
            grade:grad
        }

        await Axios.post(`${url}/profile/detail/`,Alldata).then(res=>{
            if(res.data.message){
                swal({
                    title: "Good job! You are Updated",
                    text: "Click Ok and see your updated profile",
                    icon: "success",
                  }).then(res1=>{
                      window.location.reload()
                  })
            }
            else if(res.data.error){
                swal({
                    title:"An error occured!",
                    text: "Try to Update Again!",
                    icon:"warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Retry",
                    closeOnCancel: false
                }).then(res1=>{
                    window.location.reload()
                })
            }
        }).catch(err=>{
            swal({
                title:"Network Error!",
                text: "You aren't Updated. Please connect to the Internet Connection",
                icon:"warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Retry",
                closeOnCancel: false
            }).then(res1=>{
                window.location.reload()
            })
        })
        
        //console.log(Alldata)
        //console.log(firstname,lastname,Address1,Address2,zip,state,city,DOB,gender,school,grad)
    }

    return (
        <>
        {
            edit?<ShowProfile />:(
                <div className="initiate">
            <nav>
            <p style={{"color":"red"}}> * Fill only those fields which you want to update!</p>
            <p style={{"color":"red"}}>{err}</p>
            <div className="row g-4">
                
                <div className="col-md-6">
                    <label for="firstname" className="form-label">First Name <span style={{"color":"red"}}>*</span></label>
                    <input type="text" onChange={(e)=>setFirstname(e.target.value)} className="form-control" id="firstname" placeholder="First Name" />
                </div>
                <div className="col-md-6">
                    <label for="lastname" className="form-label">Last Name <span style={{"color":"red"}}>*</span></label>
                    <input type="text" onChange={(e)=>setLastname(e.target.value)} className="form-control" id="lastname" placeholder="Last Name" />
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address <span style={{"color":"red"}}>*</span></label>
                    <input type="text"onChange={(e)=>setAddress1(e.target.value)} className="form-control" id="inputAddress" placeholder="Address line 1" />
                </div>
                <div className="col-12">
                    <label for="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" onChange={(e)=>setAddress2(e.target.value)} className="form-control" id="inputAddress2" placeholder="Address line 2" />
                </div>
                <div className="col-md-2">
                    <label for="inputZip" className="form-label">Zip <span style={{"color":"red"}}>*</span></label>
                    <input type="text" onChange={(e)=>setZip(e.target.value)} className="form-control" id="inputZip" />
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">State <span style={{"color":"red"}}>*</span></label>
                    <select id="inputState" onChange={(e)=>setState(e.target.value)} className="form-select">
                    <option selected>Choose...</option>
                    {
                        states.map((item,i)=>(
                            <option key={i}>{item}</option>
                        ))
                    }
                    </select>
                </div>
                <div className="col-md-6">
                    <label for="inputCity" className="form-label">City <span style={{"color":"red"}}>*</span></label>
                    <input type="text" onChange={(e)=>setCity(e.target.value)} className="form-control" id="inputCity" />
                </div>
                
                
                <div className="col-md-6">
                    <label for="birthday" className="form-label">Date Of Birth <span style={{"color":"red"}}>*</span></label>
                    <input type="date" onChange={(e)=>setDOB(e.target.value)} id="birthday" className="form-control" name="birthday" />
                </div>
                <div className="col-md-6">
                    <label for="gender" className="form-label">Gender <span style={{"color":"red"}}>*</span></label>
                    <br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={(e)=>setGender(e.target.value)} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" />
                            <label className="form-check-label" for="inlineRadio1">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={(e)=>setGender(e.target.value)} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" />
                            <label className="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                </div>
                <div className="col-md-6">
                    <label for="inputSchool" className="form-label">School/University <span style={{"color":"red"}}>*</span></label>
                    <input type="text" onChange={(e)=>setSchool(e.target.value)} className="form-control" id="inputSchool" />
                </div>
                <div className="col-md-1"></div>
            <div className="col-md-4">
                    <label for="inputGrade" className="form-label">Grade <span style={{"color":"red"}}>*</span></label>
                    <select id="inputGrade" onChange={(e)=>setGrad(e.target.value)} className="form-select">
                    <option selected>Choose...</option>
                    {
                        grade.map((item,i)=>(
                            <option key={i}>{item}</option>
                        ))
                    }
                    </select>
                </div>
            </div>
            <br />
            <div style={{marginRight: "10px",marginBottom:"14px"}} className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary me-md-2" onClick={handleUpdate} type="button">Update</button>
                <button className="btn btn-outline-secondary" onClick={()=>dispatch(setEdit(true))} style={{borderRadius:"5px"}} type="button">Cancel</button>
            </div>
        </nav>
        </div>
            )
        }
        </>
    )
}
const mapStateToProps=(state)=>({
    currentUser: state.user.currentUser,
    edit:state.user.edit
})
export default withRouter(connect(mapStateToProps,null)(Profile))
/*
<div className="col-12">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                    </div>
                </div>
                */
