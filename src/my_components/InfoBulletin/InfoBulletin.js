import React,{useState,useEffect} from 'react'
import Axios from 'axios'
//import file from '../../../../media/covers/JEE/Quiz_2__SAPM_20-21_IISEM.pdf'
function InfoBulletin() {
    const [blog,setBlog]=useState(null)
    useEffect(()=>{
        const getdata=async()=>{
            await Axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/blog/new/'
            }).then(res=>{
                console.log(res.data)
                setBlog(res.data)
            })
        }
        getdata()
    },[])
    return (
        <div className="initial">
            <h1>Blog updates</h1>
            {
                blog !==null &&
                blog?.map((item,i)=>(
                    <embed key={i} src={item.Attachment} width="400px" height="400px" />
                ))
            }
        </div>
    )
}

export default InfoBulletin
