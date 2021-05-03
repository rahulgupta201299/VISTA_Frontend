import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { createDB } from '../redux/user/user-actions'

const config={
    apiKey: "AIzaSyBe-cuQxBL84yukNPdzMRj_MKnOct3rUA8",
    authDomain: "vistastudentdb.firebaseapp.com",
    projectId: "vistastudentdb",
    storageBucket: "vistastudentdb.appspot.com",
    messagingSenderId: "798980511106",
    appId: "1:798980511106:web:23e3efd7422b8d82866b9b",
    measurementId: "G-X7HG1EQV6J"
}

export const createUserProfileDocument=async (userAuth,username,additionalData)=>{
    if(!userAuth) return
    var z=auth.currentUser
    const userRef=firestore.doc(`${username}/${userAuth.uid}`)
    const snapShot=await userRef.get()
    if(!snapShot.exist){
        const {displayName,email}=userAuth
        const createdAt=new Date()
        z.sendEmailVerification()
        try{
            await userRef.set({
                createdAt,
                displayName,
                email,
                ...additionalData
            })
            window.location.reload()
        }
        catch(error){
            console.log('error creating user',error.message)
        }
    }
    return userRef
}

firebase.initializeApp(config)
export const auth=firebase.auth()
export const firestore=firebase.firestore()

export default firebase
