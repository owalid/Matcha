export const dateToAge = (date) => {
    let year = new Date(date).getFullYear();
    let yearNow = new Date().getFullYear();
    return yearNow - year;
}