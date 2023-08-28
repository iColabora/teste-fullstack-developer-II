import TemplatePage from "../TemplatePage";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {apiGET, apiPOST, apiPUT, apiDELETE} from '../../services/api';
import { toast } from "react-toastify";
import alert from "../../services/alerts";
import Modal from "../../components/Modal/Modal";
import FieldList from "./FieldList";
import FormFormField from "./FormFormField";
import Pagination from "../../components/Pagination/Pagination";
import FormConfirmDelete from "./FormConfirmDelete";

export default function Form(props){
    const [form, setForm] = useState([]);
    const [field, setField] = useState(null);
    const [formFields, setFormFields] = useState([]);
    const [params, setParams] = useState([]);
    const [records, setRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [modalFormIsOpen, setModalFormIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [toDelete, setToDelete] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        toast.promise(getForm(id), {
            pending: "Carregando dados do formulário..."
        });
        toast.promise(getFormFields(id), {
            pending: "Carregando campos do formulário..."
        });
    }, [id]);

    async function getForm(id){
        let res = await apiGET(`/form/${id}`);

        if(res.messages){
            res.messages.forEach(msg => {
                alert(msg);
            });
        }

        if(res.success){
            setForm(res.form);
            return true;
        } else {
            setForm([])
            return false;
        }
    }

    async function getFormFields(id){
        let res = await apiGET(`/form_field`, [`id_form=${id}`]);

        if(res.messages){
            res.messages.forEach(msg => {
                alert(msg);
            });
        }

        setFormFields([])
        if(res.success){
            setFormFields(res.form_fields);
            setParams(res.params);
            setRecords(res.records);
            return true;
        } else {
            return false;
        }
    }

    async function saveData(data, action){
        let res = null;

        if(action == "save"){
            data.options = [];
            let i = 0;
            let keep = true;
            do {
                console.log(i);
                if(data[`option_value_${i}`]){
                    data.options.push({
                        id: data[`option_id_${i}`],
                        label: data[`option_label_${i}`],
                        value: data[`option_value_${i}`],
                    });
                    i++;
                } else {
                    keep = false;
                }
            } while (keep);
        }

        switch(action){
            case "save":
                if(!data.id || data.id == ""){
                    data.id = null;
                    res = await apiPOST("/form_field", JSON.stringify(data));
                } else {
                    res = await apiPUT("/form_field", JSON.stringify(data));
                }
            break;

            case "delete":
                res = await apiDELETE(`/form_field/${data}`);
            break;
        }


        if(res.messages){
            res.messages.forEach(msg => {
                alert(msg);
            });
        }

        if(res.success){
            setModalFormIsOpen(false);
            setModalDeleteIsOpen(false);
            getFormFields(id);

            return true;
        } else {
            console.log(res.status);
            return false;
        }
    }
    
    function handleSubmit(event){
        event.preventDefault();
        let error = false;
        
        var data = {};
        (new FormData(event.target)).forEach((value, index) => {
            data[`${index}`] = value;
        });
        
        // Campos obrigatórios
        [
            "id_form",
            "type",
            "name",
        ].forEach(key => {
            if(data[key] == ""){
                toast.error(`O campo \"${key}\" deve ser preenchido.`);
                error = true;
            }
        });
        
        if(!error){
            toast.promise(saveData(data, "save"), {
                pending: "Salvando dados...",
                error: null,
                success: "O registro foi salvo com sucesso.",
            });
        }
    }

    async function handleEdit(id){
        let res = await apiGET(`/form_field/${id}`);
        if(res.success){
            setModalFormIsOpen(true);
            setField(res.form_field);
        }
    }

    function handleDelete(id, confirmed = false){
        if(confirmed){
            toast.promise(saveData(id, "delete"), {
                pending: "Excluindo registro...",
                error: "Oops...",
                success: "Registro excluído com sucesso.",
            });
        } else {
            setToDelete(id);
            setModalDeleteIsOpen(true);
        }
    }

    return (
        <TemplatePage
            title={`${form.name}`}
            tracking={[
                {to:"/formularios", label:"Formulários"},
                {to:`/formularios/${id}`, label:`Formulário \"${form.name}\"`},
            ]}
        >
            <div className="container">
                <button className="btn btn-primary" onClick={() => {setModalFormIsOpen(true), setField(null)}}>
                    Incluir campo
                </button>

                <noscript>
                    <button className="btn btn-secondary" onClick={() => {navigate(`responder`)}}>
                        Responder ao formulário
                    </button>

                    <button className="btn btn-secondary" onClick={() => {navigate(`respostas`)}}>
                        Ver respostas
                    </button>
                </noscript>
            </div>

            <Modal isOpen={modalFormIsOpen}>
                <FormFormField modalIsOpen={setModalFormIsOpen} handleSubmit={handleSubmit} form={id} field={field}/>
            </Modal>

            <Modal isOpen={modalDeleteIsOpen}>
                <FormConfirmDelete id={toDelete} setModalDeleteIsOpen={setModalDeleteIsOpen} handleDelete={handleDelete}/>
            </Modal>

            <div className="container page">
                <FieldList fields={formFields} handleEdit={handleEdit} handleDelete={handleDelete}  />
                <Pagination
                    records={records}
                    limit={params.limit}
                    offset={params.offset}
                    action={setPage}
                />
            </div>
        </TemplatePage>
    );
}