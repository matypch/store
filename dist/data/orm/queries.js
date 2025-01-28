"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQueries = void 0;
const models_1 = require("./models");
function AddQueries(Base) {
    return class extends Base {
        async getProducts(params) {
            const opts = {};
            if (params?.page && params.pageSize) {
                opts.limit = params?.pageSize,
                    opts.offset = (params.page - 1) * params.pageSize;
            }
            const result = await models_1.ProductModel.findAndCountAll({
                include: [
                    { model: models_1.SupplierModel, as: "supplier" },
                    { model: models_1.CategoryModel, as: "category" }
                ],
                raw: true, nest: true,
                ...opts
            });
            return { products: result.rows, totalCount: result.count };
        }
        getCategories() {
            return models_1.CategoryModel.findAll({ raw: true, nest: true });
        }
        getSuppliers() {
            return models_1.SupplierModel.findAll({ raw: true, nest: true });
        }
    };
}
exports.AddQueries = AddQueries;
