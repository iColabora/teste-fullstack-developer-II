import {Link} from 'react-router-dom';
import {GoTrash, GoPencil} from "react-icons/go";

export default function FieldList (props){
    if(!props.fields || props.fields.length == 0){
        return (
            <p>Não há campos cadastrados</p>
        );

    } else {
        return (
            <table className="form-list">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Campo</th>
                        <th>Padrão</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {props.fields.map((field, index) => (
                        <tr key={field.id}>
                            <td><b>{field.id}</b></td>
                            <td>
                                <p>
                                    <b>{field.name}</b>
                                </p>
                                <p className="detail">{field.description }&nbsp;</p>
                            </td>
                            <td><b>{field.default_value}</b></td>
                            <td align="right">
                            
                                <button
                                    className="btn-sm btn-discret"
                                    aria-label="Editar"
                                    alt="Editar"
                                    onClick={() => {props.handleEdit(field.id)}}
                                >
                                    <GoPencil/>
                                </button>

                                <button
                                    className="btn-sm btn-discret"
                                    onClick={() => {props.handleDelete(field.id)}}
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