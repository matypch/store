"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageSizeOptions = exports.pageButtons = exports.escapeUrl = exports.navigationUrl = void 0;
const querystring_1 = require("querystring");
const querystring_2 = require("querystring");
const getData = (options) => {
    return { ...options.data.root, ...options.hash };
};
const navigationUrl = (options) => {
    const { page, pageSize } = getData(options);
    return "/?" + (0, querystring_1.stringify)({ page, pageSize });
};
exports.navigationUrl = navigationUrl;
const escapeUrl = (url) => (0, querystring_2.escape)(url);
exports.escapeUrl = escapeUrl;
const pageButtons = (options) => {
    const { page, pageCount } = getData(options);
    let output = "";
    for (let i = 1; i <= pageCount; i++) {
        output += options.fn({
            page, pageCount, index: i, selected: i === page
        });
    }
    return output;
};
exports.pageButtons = pageButtons;
const pageSizeOptions = (options) => {
    const { pageSize } = getData(options);
    let output = "";
    [3, 6, 9].forEach(size => {
        output += options.fn({ size,
            selected: pageSize === size ? "selected" : "" });
    });
    return output;
};
exports.pageSizeOptions = pageSizeOptions;
