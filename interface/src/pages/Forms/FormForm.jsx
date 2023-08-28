import FormField from '../../components/FormField/FormField';

export default function FormForm(props = null) {
    var form = {
        id: "",
        name: "",
        description: "",
    };
    if(props.form){
        form = {
            id: props.form.id,
            name: props.form.name,
            description: props.form.description,
        };
    }
    return (
        <>
            <h2>Formulário</h2>
            <hr />
            <form action="#" onSubmit={props.handleSubmit}>
                <input type="hidden" name="id" id="id" value={form.id} />
                <FormField
                    label="Nome do formulário"
                    tip="Este nome servirá como título e identificação do usuário"
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    maxlength="255"
                    placeholder="Ex.: ficha de cliente"
                    //required="required"
                />
                <FormField
                    label="Descrição"
                    tip="A descrição dá detalhes do objetivo da coleta de informação."
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder="Descrição do formulário"
                    value={form.description}
                />
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="reset" className="btn btn-secondary" onClick={() => {props.modalIsOpen(false)}}>Fechar</button>
            </form>
        </>
    );
}