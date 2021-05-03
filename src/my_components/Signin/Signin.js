import React,{useState,useEffect} from 'react'
import './Signin.scss'
import {Button} from '../new_Button/new_Button'
import {withRouter} from 'react-router-dom'
import FormInput from '../FormInput/FormInput'
import {createDB,setCurrentUser} from '../redux/user/user-actions'
import {setVerify,setError,setUser,setID,setTimeOut} from '../redux/userError/userError-actions'
//import {signInWithGoogle} from '../Firebase/FirebaseSTUD'
import { auth, createUserProfileDocument,firestore } from '../Firebase/FirebaseSTUD'
import firebase from '../Firebase/FirebaseSTUD'
import { connect } from 'react-redux'
import swal from 'sweetalert'
//import OtpInput from 'react-otp-input';

function Signin({currentUser,currentVer,dispatch,history,currentErr}) {
    const [disable,setDisable]=useState(true)
    const [err,setErr]=useState('')
    const [verify,IsVerified]=useState(false)
    const [email,setEmail]=useState('')
    const [Fname,setFname]=useState('')
    const [Lname,setLname]=useState('')
    const [state,setState]=useState('')
    const [pin,Setpin]=useState('')
    const [teach,setTeach]=useState(false)
    const [btn,setButton]=useState(false)
    const [stud,setStud]=useState(true)
    const [password,setPassword]=useState('')
    const [login,setLogin]=useState(true)
    const [phone,setPhone]=useState('')
    const [signup,setSignup]=useState(false)
    const [grade,setGrade]=useState('')
    const color1=login?"green":"blue"
    const color2=signup?"green":"blue"
    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(true);
        } else {
          setButton(false);
        }
      };
      
    const handleToggle1=()=>{
        setTeach(true)
        setStud(false)
    }
    const handleToggle2=()=>{
        setStud(true)
        setTeach(false)
    }
    const handleToggle3=()=>{
        setLogin(true)
        setSignup(false)
    }
    const handleToggle4=()=>{
        setLogin(false)
        setSignup(true)
    }
    async function signInWithGoogle(){
        var username;
        if(stud) username="StudentUsers"
        if(teach) username="TeacherUsers"
        const provider=new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        dispatch(setUser(username))
        await auth.signInWithPopup(provider)
        var z=auth.currentUser
        var flag=0;
        firestore.collection(`${username}`).get().then(query=>{
            query.forEach((doc) => {
                if(z.email===doc.data().email){
                    flag=1;
                    dispatch(setID(doc.id))
                }
            });
            if(flag){
                history.push("/")
                window.location.reload()
            }
            else{
                setErr('You may be login with diff user (Student/Teacher) or maybe you are not registered')
                auth.signOut()
            }
        })
        
    }
    const handlePhone=(e)=>{
        var num=e.target.value;
        setPhone(num)
        if(num.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)&&num.length===10){
            setDisable(false)
            setErr('')
        }
        else{
            setDisable(true)
            setErr("Invalid Phone Number")
        }
    }
    const setUpRecaptcha=()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              handleOTP();
            },
            'expired-callback':()=>{
                setErr("Response expired. Please solve reCAPTCHA again.")
            }
          });
       }
    const handleOTP=(e)=>{
        e.preventDefault()
        if(!phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)){
            return;
        }
        setDisable(true)
        setUpRecaptcha()
        setErr("Please Enter OTP Coming As Prompt!")
        var phoneNumber = "+91"+phone
        var appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
                var code = window.prompt("Enter the OTP")
                confirmationResult.confirm(code).then(function (result) {
                // User signed in successfully.
                var user = result.user;
                if(user){
                    swal({
                        title: "OTP Verified!",
                        text: "You mobile no. is verified! Proceed further and fill all remaining details!",
                        icon:"success",
                    })
                    setErr("")
                    IsVerified(true)
                }
                }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
                swal({
                    title:"Not Verified",
                    text:"Incorrect or Bad Verification Code",
                    icon: "warning"
                }).then(res1=>{
                    window.location.reload()
                })
                setErr(error.message+" Reload and Try Again")
                });
                            }).catch(function (error) {
                            // Error; SMS not sent
                            // ...
                            swal({
                                title:"Some error Occured. Try Again Later!",
                                text:"SMS not sent. Retry!",
                                icon: "warning",
                                confirmButtonClass: "btn-danger",
                                confirmButtonText: "Retry",   
                            }).then(res1=>{
                                window.location.reload()
                            })
                            setErr(error.message+" Reload and Try Again")
                            });
    }
    async function handleResetPassword(e){
        e.preventDefault();
        var x=window.prompt("Enter your existing Email Id")
        if(x){
            try{
                var user=await auth.fetchSignInMethodsForEmail(x)
                if(user.length===0){
                    setErr('Please register! Your email is not registered or please enter the existing Email')
                }
                else{
                    auth.sendPasswordResetEmail(x)
                    setErr("Reset password link has been sent to your email!")
                }
            }catch(err){
                setErr(err.message)
            }
        }
    }
    async function handleLogin(e){
        e.preventDefault()
        try{
            var username;
            if(stud) username="StudentUsers"
            if(teach) username="TeacherUsers"
            dispatch(setUser(username))
            await auth.signInWithEmailAndPassword(email,password)
            var z=auth.currentUser
            const userRef=firestore.doc(`${username}/${z.uid}`)
            const snapShot=await userRef.get()
            if(!snapShot.exists){
                dispatch(setVerify(false))
                setErr('You are trying to get login as different user (Student/Teacher)')
                auth.signOut()
                //window.location.reload()
            }
            else{
                if(z.emailVerified){
                    dispatch(setID(z.uid))
                    history.push("/")
                    setErr("")
                    window.location.reload()
                }
                else{
                    dispatch(setVerify(true))
                    z.sendEmailVerification()
                    setErr('Please Verify the mail and Log In!')
                }
            }
        }catch(error){
            setErr(error.message)
            console.log(error.message)
        }
    }
    async function handleRegister(e){
        e.preventDefault()
        if(!verify){
            setErr("Please verify the PhoneNumber")
            return;
        }
        if(grade===''){
            setErr('Please provide your Grade and then Register!')
            return;
        }
        if(state===""){
            setErr("Please provide your State and then Register")
            return ;
        }
        try{
            var username;
            if(stud){
                username="StudentUsers";
            }
            if(teach){
                username="TeacherUsers";
            }
            const {user}=await auth.createUserWithEmailAndPassword(email,password)
            var displayName=Fname+" "+Lname
            displayName=displayName.toUpperCase()
            createUserProfileDocument(user,username,{displayName,grade,phone,state,pin})
            setLogin(true)
            setSignup(false)
            setErr('')
        }catch(error){
            setErr(error.message)
            console.log(error.message)
        }
    }
    
    var data=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar","Chandigarh","Daman and Diu","Dadar and Nagar Haveli","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"]
    data.sort()
    data=data.map(item => item.toUpperCase())
      useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
      }, []);
      var change=btn?"34%":"38%"
    return (
        <div className="initial">
            <div className="container">
                <section className="toggle-container">
                    <Button buttonStyle="btn--outline" buttonSize={btn?"btn-medium":"btn--wide"} buttonColor={teach?"green":"blue"} onClick={handleToggle1}>Teacher</Button>
                    <Button buttonStyle="btn--outline" buttonSize={btn?"btn-medium":"btn--wide"} buttonColor={stud?"green":"blue"} onClick={handleToggle2}>Student</Button>
                </section>
                <section className="form-container">
                    <div className="toggle">
                        <button className={`signin ${color1}`} onClick={handleToggle3}>Sign In</button>
                        <button className={`signin ${color2}`} onClick={handleToggle4}>Sign Up</button>
                    </div>
                    {
                        login?(
                            <>
                                <p style={{color:"green",marginLeft:"28%",marginTop:"5px"}}>Login As a {stud?"Student":"Teacher"}</p>
                            {
                                currentVer?<p style={{color:"green",margin:"7px"}}>Please Verify Your Email And Log In Again (Link Has Been Sent)!</p>:null
                            }
                            {
                                currentUser?<p style={{color:"green",marginLeft:"35%",marginTop:"5px"}}>You are Logged In!</p>:null
                            }
                            {
                                err? <p style={{color:"red",margin:"7px"}}>{err}</p>: ""
                            }
                            <form onSubmit={handleLogin}>
                                <FormInput type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
                                <FormInput type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
                               
                                <span style={{marginLeft:change}}><Button type="submit" buttonStyle="btn--primary" buttonColor="green" buttonSize={btn?"btn--mobile":"btn--medium"}>Login</Button></span>
                            </form>
                            <button className="reset" onClick={handleResetPassword}>Reset Password</button>
                                <span style={{marginLeft:"44%",fontWeight:"bold",color:"black"}}>Or</span>
                                <button className="signinwithGoogle" onClick={signInWithGoogle}>Sign In With Google</button>
                            </>
                        ):(
                            <>
                             <p style={{color:"green",marginLeft:"28%",marginTop:"5px"}}>Register As a {stud?"Student":"Teacher"}</p>
                            {
                                err? <p style={{color:"red",margin:"7px"}}>{err}</p>: ""
                            }
                            <form onSubmit={handleRegister}>
                                <FormInput type="text" value={Fname}  onChange={(e)=>setFname(e.target.value)} placeholder="First Name" required />
                                <FormInput type="text" value={Lname} onChange={(e)=>setLname(e.target.value)} placeholder="Last Name" required />
                                <select className="select" onChange={(e)=>setGrade(e.target.value)}>
                                    <option value="">Grade</option><option value="7">7</option><option value="8">8</option><option class="9">9</option><option value="10">10</option>
                                </select>
                                <FormInput type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />    
                                {
                                    verify?<FormInput type="phone" value={phone} onChange={handlePhone} placeholder="Phone No." disabled required />:<FormInput type="phone" value={phone} onChange={handlePhone} placeholder="Phone No." required />
                                }
                                {
                                    verify?<p style={{marginLeft:"18%",color:"green"}}>PhoneNumber is Verified</p>:<Button point={disable} id="recaptcha" buttonStyle="btn--primary" buttonColor="blue" buttonSize="btn--medium" onClick={handleOTP}>Get OTP</Button>
                                    
                                }
                                
                                
                                    <select className="select" style={{backgroundColor: "white"}} onChange={(e)=>setState(e.target.value)}>
                                        <option value="">State/Union Territory</option> 
                                    {
                                        data.map((item,i)=>{
                                            return(
                                                <option key={i} value={item}>{item}</option>
                                            )
                                        })
                                    }    
                                    </select>
                               
                                <FormInput type="number"  value={pin} onChange={(e)=>Setpin(e.target.value)} placeholder="PIN Code" required />
                                <FormInput type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
                                <span style={{marginLeft:change}}><Button type="submit" buttonStyle="btn--primary" buttonColor="green" buttonSize={btn?"btn--mobile":"btn--medium"}>Register</Button></span>
                            </form>
                            </>
                        )
                    }
                </section>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>({
    currentUser: state.user.currentUser,
    currentVer: state.userError.currentVer,
    currentErr: state.userError.error
})

export default withRouter(connect(mapStateToProps,null)(Signin))
/*


        var x= await fetch("http://127.0.0.1:8000/api/register/",{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res)=>{
            if(res.ok){
                console.log(res.json())
            }
            else{
                res.json().then(err=>console.log(err.Error))
            }
        })



        

*/
