import { useEffect, useState } from "react";
import {apiGET, apiPOST, apiPUT, apiDELETE} from '../../services/api';

import {toast} from 'react-toastify';
import alert from "../../services/alerts";
import 'react-toastify/dist/ReactToastify.css';

import Pagination from "../../components/Pagination/Pagination";

import FormList from './FormList';
import FormForm from './FormForm';
import Modal from "../../components/Modal/Modal";
import FormConfirmDelete from "./FormConfirmDelete";
import TemplatePage from "../TemplatePage";

function Forms () {
    const [forms, setForms] = useState([]);
    const [params, setParams] = useState([]);
    const [records, setRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [modalFormIsOpen, setModalFormIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [form, setForm] = useState(null);
    const [toDelete, setToDelete] = useState(false);
    
    useEffect(() => {
        params.offset = params.limit * (page-1);
        toast.promise(getForms([`limit=${params.limit}`, `offset=${params.offset}`]), {
            pending: "Carregando dados..."
        });
    }, [page]);

    async function getForms(reqParams = null){
        apiGET("/form", reqParams).then(res => {
            if(res.success){
                setForms(res.forms);
                setParams(res.params);
                setRecords(res.records);
            }
            
            res.messages.map((message, key) => {
                alert(message);
            });
            return true;
        });
    }

    async function saveData(data, action){
        let res = null;

        switch(action){
            case "save":
                if(data.id == ""){
                    data.id = null;
                    res = await apiPOST("/form", JSON.stringify(data));
                } else {
                    res = await apiPUT("/form", JSON.stringify(data));
                }
            break;

            case "delete":
                res = await apiDELETE(`/form/${data}`);
            break;

            case "sample":
                res = await apiGET('/install/db-populate');
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
            getForms([`limit=${params.limit}`, `offset=${params.offset}`]);
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
        ["name"].forEach(key => {
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
        let res = await apiGET(`/form/${id}`);
        if(res.success){
            setModalFormIsOpen(true);
            setForm(res.form);
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

    function setSampleData(){
        toast.promise(saveData(1, "sample"), {
            pending: "Aguarde...",
            error: "Oops...",
            success: "Operação concluída com sucesso.",
        });
    }

    return (
        <TemplatePage
            title="Formulários"
            tracking={[
                {to:"/formularios", label:"Formulários"},
            ]}
        >
            <div className="container">
                <button className="btn btn-primary" onClick={() => {setModalFormIsOpen(true), setForm(null)}}>
                    Novo formulário
                </button>

                
                <button className="btn btn-secondary" onClick={() => {setSampleData()}}>
                    Preencher com dados de exemplo
                </button>
            </div>

            <Modal isOpen={modalFormIsOpen}>
                <FormForm modalIsOpen={setModalFormIsOpen} handleSubmit={handleSubmit} form={form}/>
            </Modal>

            <Modal isOpen={modalDeleteIsOpen}>
                <FormConfirmDelete id={toDelete} setModalDeleteIsOpen={setModalDeleteIsOpen} handleDelete={handleDelete}/>
            </Modal>

            <div className="container page">
                <FormList forms={forms} handleEdit={handleEdit} handleDelete={handleDelete}  />
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

export default Forms;