import React,{useState,useEffect} from 'react'
import './ShowProfile.scss'
import {setEdit} from '../redux/user/user-actions'
import { connect } from 'react-redux'
import Axios from 'axios'
import swal from 'sweetalert'
import url from '../../base'
function ShowProfile({dispatch,Email}) {
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
    const [grade,setGrade]=useState('')
    const [File,setFile]=useState('')
    useEffect(()=>{
        const profiledata=async()=>{
            await Axios({
                method: 'get',
                url: `${url}/profile/detail/`
            }).then(res=>{
                //console.log(res.data)
                res.data.map((item)=>{
                    if(item.email===Email){
                        setFirstname(item.firstname)
                        setLastname(item.lastname)
                        setAddress1(item.Address1)
                        setAddress2(item.Address2)
                        setZip(item.Zip)
                        setState(item.state)
                        setCity(item.city)
                        setDOB(item.DOB)
                        setGender(item.gender)
                        setSchool(item.school)
                        setGrade(item.grade)
                    }
                })
            }).catch(error=>{
                swal({
                    title:"Network Error!",
                    text: "Can't get your personal data. Please connect to the Internet Connection",
                    icon:"warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Retry",
                    closeOnCancel: false
                }).then(res1=>{
                    window.location.reload()
                })
            })
        }
        profiledata()
    },[])
    const handleClick=()=>{
        dispatch(setEdit(false))
    }
    return (
        <div className="init">
        <div className="container emp-profile">
            <form method="post">
                <div className="row">
                <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div style={{marginRight:"30%"}}  className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" onChange={(e)=>setFile(e.target.files[0])} name="file"/>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {firstname? firstname:null}&nbsp;
                                        {lastname? lastname:null}
                                    </h5>
                                    <h6>
                                        Email Id :&nbsp;
                                        {Email?Email:<span style={{color:"#818182"}}>Not Available</span>}
                                    </h6>
                                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="button" onClick={handleClick}  className="btn btn-primary" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-4">
                        <div className="profile-work">
                            <p style={{color:"blue"}}><b>WORK LINK</b></p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p style={{color:"blue"}}><b>SKILLS</b></p>
                            <p>Web Designer</p>
                            <p>Web Developer</p>
                            <p>WordPress</p>
                            <p>WooCommerce</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>First Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{firstname ? firstname:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div>  
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Last Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{lastname ? lastname:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Date Of Birth</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{DOB ? DOB : <span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Gender</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{gender ? gender:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>School/University</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{school ?school:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Grade</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{grade ?grade:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Address Line 1</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{Address1 ?Address1:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Address Line 2</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{Address2 ?Address2:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>  
                                </div> 
                                <div className="row"> 
                                    <div className="col-md-6">
                                        <label>State</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{state ?state:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>City</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{city ?city:<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Zip Code</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{zip ? zip :<span style={{color:"#818182"}}>Not Available</span>}</p>
                                    </div> 
                                </div>       
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </form>           
        </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
    Email:state.userError.email
})
export default connect(mapStateToProps,null)(ShowProfile)

/*
<div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div>
                            </div>
                            */