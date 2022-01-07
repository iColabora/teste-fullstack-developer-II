<template>
    <div id="Container">
        <form>
            <div class="inputContainer">
                <label> Título do Campo </label>
                <input type="text" placeholder="Digite o título do campo" maxlength="20" />
            </div>
            <div class="inputContainer">
                <label> Id do Campo </label>
                <input type="text" placeholder="Digite o título do campo" maxlength="20" />
            </div>
            <div class="inputContainer">
                <label> Tipo de campo </label>
                <select name="" id="">
                    <option value="simples">Texto simples</option>
                    <option value="grande">Texto grande</option>
                    <option value="combo">Combo</option>
                </select>
            </div>
            <Button />
        </form>
    </div>
</template>

<script>
import Button from './Button.vue'
export default {
    name: 'GenerateInput',
    components: {
        Button
    }
}

</script>

<style scoped>
    #Container {
        display: flex;
        width: 95%;
        height: 80%;
        margin-top: var(--spacing-xxs);
        align-self: center;
        justify-self: center;
        background: var(--color-primary);

        justify-content: center;
        border-radius: 15px;
        box-shadow: 0 0 1rem var(--gray);
    }

    form {
        padding: var(--spacing-xxs) 0;
        width: 40%;
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: var(--font-size-lg);
    }
    .inputContainer {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-nano);
        margin-bottom: var(--spacing-xs);
    }

    input, select {
        height: 40px;
        padding: 0 var(--spacing-nano) 0 var(--spacing-nano);
        border-radius: 15px;
        border: 0;
        box-shadow: 0 0 1rem var(--gray);

        color: var(--gray);
    }

</style>
