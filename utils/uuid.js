/**
 * Generate local UUID
 * @param {number} size size of local UUID 
 * @returns {string} local UUID
 */
function generateUUID(size) {
    let ln = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i <= 12; i++) {
        result += Math.floor(Math.random() * 62);
    }
    result += ':';
    for (let i = 0; i <= size; i++) {
        for (let x = 0; x <= 7; x++) {
            result += Math.floor(Math.random() * 62);
        }
        result += '-';
    }
    return result;
}

export {
    generateUUID
};