import { useEffect, useState } from "react";
import FormField from "../../components/FormField/FormField";
import Option from "./Option";

export default function FormFormField(props){
    const [maxlength, setMaxlength] = useState(255);
    const [options, setOptions] = useState([]);
    //const [maxlengthField, setMaxlengthField] = useState("");

    useEffect(()=>{
        if(props.field && props.field.options){
            setOptions(props.field.options);
        }
    }, [props]);

    var data = {
        id: "",
        id_form: props.form,
        type: "",
        name: "",
        personal_id: "",
        description: "",
        default_value: "",
        maxlength: maxlength,
        required: "",
        options: null,
    }

    if(props.field){
        if(props.field.options){
            data.options = true;
        }
        data.id = props.field.id;
        data.id_form = props.field.id_form;
        data.type = props.field.type;
        data.name = props.field.name;
        data.personal_id = props.field.personal_id;
        data.description = props.field.description;
        data.default_value = props.field.default_value;
        data.required = props.field.required;
    }

    function handleTypeChange(event){
        if(event){
            let type = event.target.value;
            switch(type){
                case "text-30":
                    setMaxlength(30);
                    setOptions([]);
                break;
    
                case "text-100":
                    setMaxlength(100);
                    setOptions([]);
                break;
    
                case "select":
                    setMaxlength(255);
                    if(!data.options){
                        setOptions([
                            {id: null, id_form_field: null, value: "", label: null},
                            {id: null, id_form_field: null, value: "", label: null},
                            {id: null, id_form_field: null, value: "", label: null},
                        ]);
                    } else {
                        setOptions(props.field.options);
                    }
                break;
    
                default:
                    setMaxlength(255);
                    setOptions([]);
                break;
            }
        }

        /*setMaxlengthField(
            <FormField
                label="Número máximo de caracteres na resposta"
                tip=""
                type="number"
                id="maxlength"
                name="maxlength"
                value={maxlength}
                maxlength="255"
                placeholder=""
                //required="required"
            />
        );*/
    }

    return (
        <>
            <h2>Campo do formulário</h2>
            <hr />
            <form  action="#" onSubmit={props.handleSubmit}>
                <input  type="hidden" name="id" id="id" value={data.id} />
                <input  type="hidden" name="id_form" id="id_form" value={data.id_form} />
                
                <FormField
                    label="Tipo de campo"
                    tip=""
                    type="select"
                    id="type"
                    name="type"
                    value={data.type}
                    maxlength="255"
                    placeholder=""
                    //required="required"
                    options={[
                        {id: "0", label:"Texto", value:"text-30"},
                        {id: "1", label:"Texto grande", value:"text-100"},
                        {id: "2", label:"Combo", value:"select"},
                    ]}
                    handler={handleTypeChange}
                />

                <FormField
                    label="Nome do campo (label)"
                    tip="Este nome será visto pelo usuário durante o preenchimento."
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    maxlength="255"
                    placeholder=""
                    //required="required"
                />

                <FormField
                    label="ID"
                    tip= ""
                    type="text"
                    id="personal_id"
                    name="personal_id"
                    value={data.personal_id}
                    maxlength="50"
                    placeholder=""
                    //required="required"
                />

                <FormField
                    label="Descrição"
                    tip="Detalhes / dicas do que se espera que o usuário preencha."
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder=""
                    value={data.description}
                />

                <FormField
                    label="Valor padrão"
                    tip="Valor pré-preenchido."
                    type="text"
                    id="default_value"
                    name="default_value"
                    value={data.default_value}
                    maxlength="255"
                    placeholder=""
                    //required="required"
                />


                {options.map((option, index) => (
                    <>
                        <Option key={index} option={option} sequential={index}/>
                    </>
                ))}

                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="reset" className="btn btn-secondary" onClick={() => {props.modalIsOpen(false)}}>Fechar</button>
            </form>
        </>
    );
}