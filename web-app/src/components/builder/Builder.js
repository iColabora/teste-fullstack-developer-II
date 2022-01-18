import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../scss/builder.scss';

import Selector from './core/Selector';
import Field from './core/Field';


function Form() {
    const [fields, setFields] = React.useState([]);
    const params = useParams();

    useEffect( () => {
        async function getFields() {
            const response = await fetch(`http://localhost:3000/api/v1/field/${params.id}`);
            const fields = await response.json();
            setFields(fields.data);
        }
        getFields();
    }, [params.id]);

    function handleAddField(field) {
        const fieldData = {
            label: '',
            id: '',
            type: field,
            form_id: params.id,
            unsaved: true
        }
        if(field === 'combo') {
            fieldData['combo_options'] = "";
        }
        setFields([...fields, fieldData]);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Forms</h1>
                </div>
            </div>
            <div className="row">
                <div className="col flex column center">
                    <Selector handleAddField={ handleAddField } />
                    <div id="builder-wrapper" className="flex center">
                        <Field fields={fields} setFields={setFields} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;