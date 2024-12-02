"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configMap = exports.stringifyParams = exports.toArray = void 0;
const toArray = (obj) => {
    if (!obj)
        return [];
    return Array.isArray(obj) ? obj : [obj];
};
exports.toArray = toArray;
const stringifyParams = (obj) => {
    return Object.entries(obj)
        .filter(([_, value]) => value !== true && value !== false) // 过滤掉值为 true 和 false 的键
        .map(([key, value]) => `--${key} ${value} `) // 处理剩下的键值对
        .join(" ");
};
exports.stringifyParams = stringifyParams;
exports.configMap = {
    weapp: "project.config.json",
    tt: "project.tt.json",
    alipay: "mini.project.json",
    qq: "project.config.json",
    dd: "project.dd.json",
    swan: "project.swan.json",
    lark: "project.lark.json",
};
//# sourceMappingURL=index.js.map