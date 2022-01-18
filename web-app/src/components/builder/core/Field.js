import React from 'react';
import { FaSave, FaTextHeight, FaTextWidth, FaEquals, FaTrash } from 'react-icons/fa';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', MySwal.stopTimer)
      toast.addEventListener('mouseleave', MySwal.resumeTimer)
    }
})

const API_URL =  process.env.API_URL || 'http://localhost:3000/api/v1';

export default function Field({ fields, setFields }) {

    function handleSaveField(fieldToSave, index) {
        const validate = fieldToSave.type === 'combo' ? handleValidateSelectLength(fieldToSave.combo_options) : true;
        if(fieldToSave.label === "" || fieldToSave.id === "") {
            return Toast.fire({
                icon: 'error',
                title: `Os campos label e id não podem estar vazios!`
            })
        }
        if(!validate) return;


        if(fieldToSave._id) return handleUpdateField(fieldToSave);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...fieldToSave, id: fieldToSave.id.replaceAll(' ', '')})
        };

        fetch(`${API_URL}/field`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    Toast.fire({
                        icon: 'success',
                        title: 'Campo salvo com sucesso!'
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Ocorreu um erro ao salvar o campo!'
                    })
                }
            }).catch(error => {
                Toast.fire({
                    icon: 'error',
                    title: 'Ocorreu um erro ao salvar o campo!'
                })
            });
    }

    function handleUpdateField(fieldToUpdate) {        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...fieldToUpdate, id: fieldToUpdate.id.replaceAll(' ', '')})
        };

        fetch(`http://localhost:3000/api/v1/field/${fieldToUpdate._id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                Toast.fire({
                    icon: 'success',
                    title: 'Campo alterado com sucesso!'
                })
            });
    }

    function handleUpdateFieldData(value, index, target) {
        const newFields = fields.map((field, i) => {
            if(i === index) {
                field[target] = value;
                field["unsaved"] = true;
            }
            return field;
        });

        setFields(newFields);
    }

    function handleRemoveField(id, index) {
        if(!id) {
            const newFields = fields.filter((field, i) => i !== index);
            setFields(newFields);
            return;
        }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://localhost:3000/api/v1/field/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    const newFields = fields.filter(field => field._id !== id);
                    setFields(newFields);

                    Toast.fire({
                      icon: 'success',
                      title: 'Campo removido com sucesso!'
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Ops! Algo deu errado!'
                    })
                }
            });
    }

    function handleValidateSelectLength(value) {
        value = value.replaceAll(' ', '');
        if(value.split(',').length > 3) {
            Toast.fire({
                icon: 'error',
                title: `O campo do tipo combo deve conter no máximo 3 opções!`
            })
            return false;
        }
        return true;
    }

    return(
        <>
            {
                fields.map((field, index) =>
                    <div className="field-builder" key={index}>
                        {
                            field.unsaved === true && (
                            <button onClick={() => handleSaveField(field, index)} className="field-builder-save">
                                <FaSave />
                            </button>)
                        }
                        <div className="field-builder-header">
                            <input type="text" maxLength="50" defaultValue={field.label} placeholder="Enter your field label here" onChange={(e) => handleUpdateFieldData(e.target.value, index, "label")} />
                            <input type="text" maxLength="100" defaultValue={field.id} placeholder="Enter your field id here ex: MyFirstId" onChange={(e) => handleUpdateFieldData(e.target.value, index, "id")} />
                        </div>
                        { field.type === "combo" && (
                            <div className="field-builder-body body-combo">
                                <input type="text" placeholder="Enter your combo options here ex: option1,option2,option3" defaultValue={field.combo_options} onChange={(e) => handleUpdateFieldData(e.target.value, index, "combo_options")} />
                            </div>
                        )}
                        <div className="field-builder-body">
                            { field.type === "combo" && (<div className="field-builder-type"><FaEquals /> Combo box</div>)}
                            { field.type === "text" && (<div className="field-builder-type"><FaTextWidth /> Texto simples</div>)}
                            { field.type === "textarea" && (<div className="field-builder-type"><FaTextHeight /> Texto grande</div>)}
                            <div className="field-builder-controls">
                                <button onClick={() => handleRemoveField(field._id, index)} ><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}