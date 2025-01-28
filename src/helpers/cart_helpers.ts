import { totalmem } from "os";
import { catalog_repository } from "../data";
import { Cart } from "../data/cart_models";
import { Product } from "../data/catalog_models"
export interface CartDetail {
    lines: {
        product: Product,
        quantity: number,
        subtotal: number
    }[],
    total: number;
}
export const getCartDetail = async (cart: Cart) : Promise<CartDetail> => {
    const ids = cart.lines.map(l => l.productId);
    const db_data = await catalog_repository.getProductDetails(ids);
    const products = Object.fromEntries(db_data.map(p => [p.id, p]));
    const lines = cart.lines.map(line => ({
        product: products[line.productId],
        quantity: line.quantity,
        subtotal: products[line.productId].price * line.quantity
    }));
    const total = lines.reduce((total, line) => total + line.subtotal, 0);
    return { lines, total }
}
export const countCartItems = (cart: Cart): number =>
    cart.lines.reduce((total, line) => total + line.quantity, 0);