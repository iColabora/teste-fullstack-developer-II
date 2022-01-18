import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import '../../scss/reply.scss';
import BackgroundForm from '../../assets/images/undraw_group_chat_re_frmo.svg';

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

function App() {
    const [field, setField] = useState([]);
    const [answers, setAnswers] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function getFields() {
            const response = await fetch(`${API_URL}/field/${params.id}`);
            const fields = await response.json();
            setField(fields.data);
        }
        getFields();
    }, [params.id]);

    function handleNextField() {
        const active = document.querySelector('.active');
        const next = active.nextElementSibling;

        if(!next || !next.matches('.full-form-section')) return;

        active.classList.remove('active');
        active.classList.add('prev');

        next.classList.add('active');
        next.classList.remove('next');
    }

    function handlePrevField() {
        const active = document.querySelector('.active');
        const prev = active.previousElementSibling;
        if(!prev || !prev.matches('.full-form-section')) return;

        active.classList.remove('active');
        active.classList.add('next');

        prev.classList.add('active');
        prev.classList.remove('prev');
    }

    function handleUpdateAnswer(value, field_id, index) {
        console.log(value);
        const currentAnswers = [...answers];
        currentAnswers[index] = {
            field_id: field_id,
            answer: value.value,
            custom_id: value.id === "" ? "null" : value.id,
            form_id: params.id
        };

        console.log(currentAnswers);
        setAnswers(currentAnswers);
    }

    function handleSaveAnswers() {
        try {
            const sendAnswers = answers.filter(answer => answer.answer !== "");
            fetch(`${API_URL}/answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sendAnswers)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Respostas salvas com sucesso!'
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Erro ao salvar respostas',
                    })
                }
            })

        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Erro ao salvar respostas',
            })
        }
    }

    return (
        <div className="full-container">
            <div className="fixed-aside flex center" id="aside-welcome">
                <h1>iColabora</h1>
                <h2>Empowering Business People</h2>
                <div id="share-message-wrapper">
                    <img src={BackgroundForm} alt="share" />
                </div>
            </div>
            <div className="fixed-aside" id="aside-form">
                <div id="form-paginate">
                    <button onClick={() => handlePrevField()} ><FaAngleUp></FaAngleUp></button>
                    <button onClick={() => handleNextField()} ><FaAngleDown></FaAngleDown></button>
                </div>
                <div className="full-form-section active">
                    <div>
                        <h1>Bem vindo(a)</h1>
                        <h3>Comece agora mesmo a responder o questionário.</h3>
                        <button onClick={() => handleNextField()}>Iniciar</button>
                    </div>
                </div>
                {(
                    field.map((field, index) => (
                        <div key={index} className="full-form-section next">
                            <div>
                                <label htmlFor={field.id}>{field.label}</label>
                                { field.type === 'text' && <input maxLength="30" id={field.id} type="text" className="form-textbox" placeholder="Escreva sua resposta aqui" onChange={(e) => handleUpdateAnswer(e.target, field._id, index)} /> }
                                { field.type === 'textarea' && <textarea maxLength="100" id={field.id} type="text" placeholder="Escreva sua resposta aqui" onChange={(e) => handleUpdateAnswer(e.target, field._id, index)}></textarea> }
                                { field.type === 'combo' && (
                                    <select id={field.id} className="form-select" onChange={(e) => handleUpdateAnswer(e.target, field._id, index)}>
                                        <option disabled selected="selected">Selecione uma opção</option>
                                        {
                                            field.combo_options.split(',').map((option, index) => (
                                                <option key={index} defaultValue={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                ) }
                            </div>
                        </div>
                    ))
                )}
                <div className="full-form-section next">
                    <div>
                        <h1>Uhull</h1>
                        <h3>Tudo certo, agora é só finalizar o questionário.</h3>
                        <button onClick={() => handleSaveAnswers()}>Finalizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
