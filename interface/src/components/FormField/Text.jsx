import { useState } from "react";

export default function Text(props = null) {
    const [value, setValue] = useState(props.value);
    const [remanescentLength, setRemanescentLength] = useState(props.maxlength || "");

    function handleChange(event){
        if(props.maxlength){
            let chars = event.target.value.length;
            setRemanescentLength(props.maxlength - chars);
            setValue(event.target.value);
        }
    }
    
    return (
        <div className="formfield-container">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={value}
                maxLength={props.maxlength}
                placeholder={props.placeholder}
                required={props.required}
                onChange={handleChange}
                autoComplete="off"
            />
            <div className="formfiels-details">
                <div className="formfield-tip">{props.tip}</div>
                <div className="formfield-count">{remanescentLength}</div>
            </div>
        </div>
    );
}