import { useState } from "react";

export default function Textarea(props = null) {
    const [value, setValue] = useState(props.value);
    const [remanescentLength, setRemanescentLength] = useState(props.maxlength || "");

    function handleChange(event){
        if(props.maxlength){
            let chars = event.target.value.length;
            setRemanescentLength(props.maxlength - chars);
        }
        setValue(event.target.value);
    }
    return (
        <div className="formfield-container">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <textarea
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                onChange={handleChange}
                value={value}
            ></textarea>
            <div className="formfiels-details">
                <div className="formfield-tip">{props.tip}</div>
                <div className="formfield-count">{remanescentLength}</div>
            </div>
        </div>
    );
}