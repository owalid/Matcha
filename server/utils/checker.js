export const validEmail = (email) => {
    const rgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return rgx.test(email);
}

export const validPasswd = (passwd) => {
    const rgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return rgx.test(passwd);
}

export const validPhone = (phone) => {
    const rgx = /^[\+]?[(]?[3]{2}[)]?[1-7,9]{1}[)]?[-\s\.]?[0-9]{7}$/;
    return rgx.text(phone);
}