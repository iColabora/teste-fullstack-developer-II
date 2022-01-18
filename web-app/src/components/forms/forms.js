import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaPlus, FaListOl } from 'react-icons/fa';
import '../../scss/forms.scss';

function App() {
    const [form, setForm] = useState([]);
    const [search, setSearch] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getForms() {
            const response = await fetch('http://localhost:3000/api/v1/form');
            const forms = await response.json();
            setForm(forms.data);
        }
        getForms();
    }, []);

    useEffect(() => {
        const callSearchService = () => {
            fetch(`http://localhost:3000/api/v1/form?q=${search}`)
            .then(response => response.json())
            .then(data => setForm(data.data))
          }

          let debouncer = setTimeout(() => {
            callSearchService();
          }, 1000);

          return () => {
            clearTimeout(debouncer);
          }
    }, [search]);

    function handleSearch(term) {
        setSearch(term);
    }

    function handleNewForm() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: `My custom form ${form.length + 1}`,
                description: 'New Form Description',
                created_by: '127.0.0.1',
             })
        };

        fetch('http://localhost:3000/api/v1/form', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    navigate(`/new/${data.data._id}`);
                }
            })
    }

    function handleViewAswerns() {

    }

    return (
        <div className="container">
            <div className="row" id="search-container">
                <div className="col">
                    <div id="search-input">
                        <input type="text" placeholder="Buscar formulários" onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="header-col">
                        <h1>My Workspace</h1>
                        <button onClick={() => handleNewForm()} ><FaPlus /> Novo formulário</button>
                    </div>
                    <div id="forms-wrapper">
                        <div id="forms">
                            {
                                form.map(form => 
                                    <div className="form" key={form._id}>
                                        <div className="form-body">
                                            <Link to={`/new/${form._id}`}>
                                                <h2>{form.name}</h2>
                                            </Link>
                                        </div>
                                        <div className="form-footer flex center">
                                            <Link to={`/reply/${form._id}`}>Responder</Link>
                                            <button onClick={() => handleViewAswerns(form._id)}>
                                                <FaListOl />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
