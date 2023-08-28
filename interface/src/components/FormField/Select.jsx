import { useState } from "react";

export default function Select(props = null) {
    const [value, setValue] = useState(props.value);

    function handlerChange(event){
        props.handler(event);
        setValue(event.target.value);
    }

    return (
        <div className="formfield-container">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <select
                id={props.id}
                name={props.name}
                value={value}
                onChange={handlerChange}
            >
                {
                    props.options.map((option, index) => (
                        <option
                            key={index}
                            id={option.id}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))
                }
            </select>
            <div className="formfiels-details">
                <div className="formfield-tip">{props.tip}</div>
            </div>
        </div>
    );
}