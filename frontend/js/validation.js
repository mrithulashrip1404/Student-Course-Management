export function validateRequiredFields(fields) {
    return fields.every(field => field.trim() !== "");
}

export function validateEmail(email) {
    return email.includes("@");
}

export function validatePassword(password) {
    return password.length >= 6;
}