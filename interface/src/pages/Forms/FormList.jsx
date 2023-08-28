import {Link} from 'react-router-dom';
import {GoTrash, GoPencil} from "react-icons/go";

export default function FormList (props){
    if(!props.forms || props.forms.length == 0){
        return (
            <p>Não há formulários cadastrados</p>
        );

    } else {
        return (
            <table className="form-list">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Formulário</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {props.forms.map((form, index) => (
                        <tr key={form.id}>
                            <td><b>{form.id}</b></td>
                            <td>
                                <p>
                                    <Link className="a-discret" to={"/formularios/" + form.id}>
                                        <b>{form.name}</b>
                                    </Link>
                                </p>
                                <p className="detail">{form.description }&nbsp;</p>
                            </td>
                            <td align="right">
                            
                                <button
                                    className="btn-sm btn-discret"
                                    aria-label="Editar"
                                    alt="Editar"
                                    onClick={() => {props.handleEdit(form.id)}}
                                >
                                    <GoPencil/>
                                </button>

                                <button
                                    className="btn-sm btn-discret"
                                    onClick={() => {props.handleDelete(form.id)}}
                                >
                                    <GoTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}