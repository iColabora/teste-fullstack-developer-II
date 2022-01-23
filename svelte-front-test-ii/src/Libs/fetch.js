import { fields } from '../Store/index.js'
import { addToast } from 'as-toast';

const host = BACK_HOST
const port = BACK_PORT
const endpoint = BACK_ENDPOINT
const backend = `http://0.0.0.0:${port}/${endpoint}/` || "http://localhost:5001/api/campo/"

export function FetchGet() {
    let url = backend
    fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
        .then(data => {
            fields.set(data)
            console.log(data)
        })
        .catch(error => {
            console.log(error)
            addToast("Erros aos buscar as informações", 'warn');
            return []
        })
}

export function FetchPost(body) {
    let url = `${backend}/add`
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    fetch(url, header)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            addToast("Novo campo adicionado", 'info');
            FetchGet()
            return data
        })
        .catch(error => {
            console.log(error)
            addToast("Não foi possível cadastrar um novo campo", 'warn');
            return []
        })
}
