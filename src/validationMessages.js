module.exports = {
    mandatoryField(field = "Campo") {
        return field = "Campo" ? `${field} obrigatório` : `${field} é obrigatório.`;
    },
    minLength(field, charAmount) {
        return `${field} deve conter no mínimo ${charAmount} caracteres.`;
    },
    maxLength(field, charAmount) {
        return `${field} deve conter no máximo ${charAmount} caracteres.`;
    },
}