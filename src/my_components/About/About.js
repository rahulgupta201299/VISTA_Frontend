import React, { Component } from 'react'
import './About.scss'
import {data} from './About_Data'
import {Button} from '../new_Button/new_Button'
import { reverse } from 'lodash'
import swal from 'sweetalert'
export class About extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             windowSize: 0,
        }
    }
    handleChange=(e)=>{
        this.setState({windowSize:window.innerWidth})
    }
    componentDidMount(){
        window.addEventListener('resize',this.handleChange)
    }
    componentWillUnmount(){
        window.addEventListener('resize',this.handleChange)
    }
    render() {
        const {windowSize}=this.state
        return (
            <div className="initial">
                {
                    data.map((item)=>{
                        var bgcolor=item.lightBg?"white":"black"
                        var textColor=item.lightText?"white":"black"
                        var rowReverse=item.reverse?"row1": "options"
                        return(
                            <div key={item.id} className={`${rowReverse}`} style={{backgroundColor: `${bgcolor}`}}>
                                <img src={item.img} className="image" />
                                <div className="option">
                                    <h5 className="tag">{item.tag}</h5>
                                    <h3 className="head" style={{color:`${textColor}`}}>{item.head}</h3>
                                    <p className="content" style={{color:`${textColor}`}}>{item.content}</p>
                                    <span style={{marginLeft: "25%"}}><Button buttonColor={item.reverse?"primary":"blue"} buttonStyle="btn--outline" buttonSize={bgcolor==="black"? "btn--large":"btn--wide"}>{item.button}</Button></span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default About
