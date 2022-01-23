<script>
    import Form from "../Form/index.svelte";
    import ButtonRoute from "../ButtonRoute/index.svelte";
</script>

<ButtonRoute text={"Voltar para tela principal"} routePage={"Home"} />

<div class="new_field">
    <div class="new_field__title">
        <h1>Adicionar novo campo</h1>
    </div>
    <Form />
    <div class="new_field__fields" />
</div>

<style lang="scss">
    @import "./_new-field.scss";
</style>
