//Convert English numbers to Persian numbers
export const convertToPersianNumber = (input) => {
    let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    let persianMap = persianDigits.split("");
    return input.replace(/\d/g, (m) => {
        return persianMap[parseInt(m)];
    });
}
