export default function FormConfirmDelete (props){
    return (
        <>
            <h2>Você confirma a exclusão do formulário?</h2>
            <hr />
            <p>Essa operação excluirá o formulário e todo o seu conteúdo.</p>
            <button type="button" className="btn btn-danger" onClick={() => {props.handleDelete(props.id, true)}}>Excluir</button>
            <button type="button" className="btn btn-primary" onClick={() => {props.setModalDeleteIsOpen(false)}}>Cancelar</button>
        </>
    );
}