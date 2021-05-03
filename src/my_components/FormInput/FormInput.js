import React from 'react'
import './FormInput.scss'
function FormInput({inputSize,...otherProps}) {
    return (
        <div className="group">
            <input className={`form-input`} {...otherProps} />
        </div>
    )
}

export default FormInput
