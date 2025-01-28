"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatalogRoutes = void 0;
const data_1 = require("../data");
const createCatalogRoutes = (app) => {
    app.get("/", async (req, resp) => {
        const page = Number.parseInt(req.query.page?.toString() ?? "1");
        const pageSize = Number.parseInt(req.query.pageSize?.toString() ?? "3");
        const searchTerm = req.query.searchTerm?.toString();
        const category = Number.parseInt(req.query.category?.toString() ?? "");
        const res = await data_1.catalog_repository.getProducts({ page, pageSize, searchTerm, category });
        resp.render("index", { ...res, page, pageSize,
            pageCount: Math.ceil(res.totalCount / (pageSize ?? 1)),
            searchTerm, category
        });
        //const products = await catalog_repository.getProducts();
        //resp.render("index",{ products });
    });
    /***app.get("/err",(req,resp) => {
        throw new Error("Something went wrong");
    });
    app.get("/asyncerr",(req,resp) => {
        throw new Error("Something went wrong async");
    });*/
};
exports.createCatalogRoutes = createCatalogRoutes;
