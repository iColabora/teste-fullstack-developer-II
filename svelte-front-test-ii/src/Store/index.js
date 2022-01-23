import { writable } from 'svelte/store'

// main use App.svelte
const fields = writable()
const fieldType = writable()
const fillInputCombo = writable([])
const route = writable('Home')

export {
    fields,
    fieldType,
    fillInputCombo,
    route
}
