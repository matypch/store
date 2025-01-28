"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countCartItems = exports.getCartDetail = void 0;
const data_1 = require("../data");
const getCartDetail = async (cart) => {
    const ids = cart.lines.map(l => l.productId);
    const db_data = await data_1.catalog_repository.getProductDetails(ids);
    const products = Object.fromEntries(db_data.map(p => [p.id, p]));
    const lines = cart.lines.map(line => ({
        product: products[line.productId],
        quantity: line.quantity,
        subtotal: products[line.productId].price * line.quantity
    }));
    const total = lines.reduce((total, line) => total + line.subtotal, 0);
    return { lines, total };
};
exports.getCartDetail = getCartDetail;
const countCartItems = (cart) => cart.lines.reduce((total, line) => total + line.quantity, 0);
exports.countCartItems = countCartItems;
