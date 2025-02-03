"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random = (len) => {
    const str = "shuvdbsahbib1r66278689721979";
    let num = "";
    for (let i = 0; i <= len; i++) {
        num = num + (str[Math.floor(Math.random() * len)]);
    }
    const hash = num.toString();
    return hash;
};
exports.default = random;
