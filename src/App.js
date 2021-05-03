import React, { useRef, useEffect,useState } from 'react';
import { useLocation, Switch,Redirect, withRouter } from 'react-router-dom';
import {connect} from'react-redux'
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import About from './my_components/About/About'
import Header from './components/layout/Header'
import Contact from './my_components/Contact/Contact'
import {setCurrentUser,createDB} from './my_components/redux/user/user-actions'
import {setVerify,setID,setTimeOut,Email} from './my_components/redux/userError/userError-actions'
import Payment from './my_components/PaymentGateway/Payment'
import Profile from './my_components/Profile/Profile'
import InfoBulletin from './my_components/InfoBulletin/InfoBulletin'
// Layouts
import LayoutDefault from './layouts/LayoutDefault'
import swal from 'sweetalert'

// Views 
import Home from './views/Home';
import Signin from './my_components/Signin/Signin';
import { auth, firestore } from './my_components/Firebase/FirebaseSTUD';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = ({dispatch,currentUser,timeout,userAs,ID,history}) => {
  const childRef = useRef();
  let location = useLocation();
  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(()=>{
    var username=userAs
    auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        if(auth.currentUser.emailVerified){
            firestore.doc(`${username}/${ID}`).onSnapshot(snapshot=>{
              dispatch(setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
              }))
            })
            dispatch(setVerify(false))
            dispatch(Email(auth.currentUser.email))
        }
        else{
          auth.currentUser.sendEmailVerification()
          auth.signOut()
          dispatch(setID("abcd"))
          dispatch(setVerify(true))
          dispatch(Email('abcd'))
        }
      }
      else dispatch(setCurrentUser(userAuth))
  })
  },[])
 /* useEffect(()=>{
      auth.onAuthStateChanged(async userAuth=>{
        if(userAuth){
          if(auth.currentUser.emailVerified){
            var today=new Date()
            var hour=parseInt(today.getHours())
            var newHour=0
            if(timeout==-1) newHour=hour+2
            else newHour=timeout+2
            if(newHour>=24) newHour-=24
            if(newHour>=12) newHour-=12
            if(hour>=12) hour-=12
            if(newHour<=hour){
              swal("TimeOut Error!", " Please Login Again", "warning").then(res=>{
                window.location.reload()
              })
              auth.signOut()
              dispatch(setID("abcd"))
              dispatch(Email('abcd'))
              dispatch(setTimeOut(-1))
              history.push('/signup')
            }
            else{
              console.log("yesssssssssssssssssssssss",hour," ",newHour)
              dispatch(setTimeOut(hour))
            }
          }
        }
      })
  },[])*/
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <>
        <Header navPosition="right" className="reveal-from-bottom" />
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/about" component={About} layout={LayoutDefault} />
          <AppRoute exact path="/contact" component={Contact} layout={LayoutDefault} />
          <AppRoute exact path="/signup" component={Signin} layout={LayoutDefault} />
          <AppRoute exact path="/profile" component={Profile} layout={LayoutDefault} />
          <AppRoute exact path="/checkout" component={Payment} layout={LayoutDefault} />
          <AppRoute exact path="/bulletin" component={InfoBulletin} layout={LayoutDefault} />
        </Switch>
        </>
      )} />
  );
}


const mapStateToProps=(state)=>({
  currentUser: state.user.currentUser,
  createData: state.user.createData,
  userAs: state.userError.userAs,
  ID: state.userError.userID,
  timeout: state.userError.timeout
})


export default withRouter(connect(mapStateToProps,null)(App))

/*
const userRef=await createUserProfileDocument(userAuth)

          userRef.onSnapshot(snapshot=>{
            setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
          })
        })
        */
