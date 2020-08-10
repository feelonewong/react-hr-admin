export const validate_password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
const validate_email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export  function validate_email(value) {
    return validate_email_reg.test(value);
} 
export  function validate_passwords(value) {
    return validate_password_reg.test(value);
} 