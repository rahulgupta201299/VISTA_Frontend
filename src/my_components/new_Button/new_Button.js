import React from 'react'
import './new_Button.scss'

const STYLES=['btn--primary','btn--outline']

const SIZES=['btn--medium','btn--large','btn--mobile','btn--wide']

const COLOR=['primary','blue','red','green']
export const Button= ({children,type,id,onClick,buttonStyle,point,buttonSize,buttonColor})=>{
    const checkButtonStyle=STYLES.includes(buttonStyle)? buttonStyle: STYLES[0]
    const checkButtonSize=SIZES.includes(buttonSize)? buttonSize: SIZES[0]
    const checkButtonColor=COLOR.includes(buttonColor)? buttonColor: COLOR[0]
    var z=point?"none":"auto"
    var x=point?"rgb(147,112,219)":""
    return(
        <button style={{pointerEvents:`${z}`,backgroundColor:`${x}`}} className={`btn1 ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`} id={id} onClick={onClick} type={type}>{children}</button>
    )
}