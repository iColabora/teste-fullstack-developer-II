import { useEffect, useState } from "react";
import Number from "./Number";
import Select from "./Select";
import Text from "./Text";
import Textarea from "./Textarea";

export default function FormField(props = null) {
    const [label, setLabel] = useState(props.label || "");
    const [tip, setTip] = useState(props.tip || "");
    const [type, setType] = useState(props.type || "text");
    const [id, setId] = useState(props.id || null);
    const [name, setName] = useState(props.name || "");
    const [value, setValue] = useState(props.value || "");
    const [maxlength, setMaxlength] = useState(props.maxlength || null);
    const [placeholder, setPlaceholder] = useState(props.placeholder || "");
    const [required, setRequired] = useState(props.required || "");
    const [options, setOptions] = useState(props.options || []);
    const [handler, setHandler] = useState(props.handler);
    
    switch(type){
        case "text-30":
            return (
                <Text
                    label={label}
                    tip={tip}
                    type="text"
                    id={id}
                    name={name}
                    value={value}
                    maxlength="30"
                    placeholder={placeholder}
                    required={required}
                    handler={handler}
                />
            )
        break;

        case "text-100":
            return (
                <Text
                    label={label}
                    tip={tip}
                    type="text"
                    id={id}
                    name={name}
                    value={value}
                    maxlength="100"
                    placeholder={placeholder}
                    required={required}
                    handler={handler}
                />
            )
        break;

        case "select":
            return (
                <Select
                    label={label}
                    tip={tip}
                    type="select"
                    id={id}
                    name={name}
                    value={value}
                    maxlength="100"
                    placeholder={placeholder}
                    required={required}
                    options={options}
                    handler={props.handler}
                />
            )
        break;

        case "textarea":
            return (
                <Textarea
                    label={label}
                    tip={tip}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    maxlength={maxlength}
                    placeholder={placeholder}
                    required={required}
                    handler={handler}
                />
            )
        break;

        case "number":
            return (
                <Number
                    label={label}
                    tip={tip}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    handler={handler}
                />
            )
        break;

        default:
            return (
                <Text
                    label={label}
                    tip={tip}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    maxlength={maxlength}
                    placeholder={placeholder}
                    required={required}
                    handler={handler}
                />
            )
        break;
    }
}