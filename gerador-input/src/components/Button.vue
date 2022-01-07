<template>
    <div id="buttonContainer">
        <button>Enviar</button>
    </div>
</template>

<script>

export default {
    name: 'Button'
}
</script>

<style scoped>
#buttonContainer {
    align-self: flex-end;
}

button {
    width: 100px;
    padding: var(--spacing-nano) 0;
    border-radius: 10px;
    border: 0;
    background: var(--white);
    box-shadow: 0 0 1rem var(--gray);
}
</style>
