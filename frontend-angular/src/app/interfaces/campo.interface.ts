export interface CampoInterface {
    nomeFormulario: String,
    label: String,
    idCampo: String,
    // 0 - Texto Simples
    // 1 - Texto Grande
    // 2 - Combo Box
    tipo: Number,
    boxFields: Array<String>
}