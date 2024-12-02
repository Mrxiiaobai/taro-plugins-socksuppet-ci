"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const util_1 = require("./util");
const plugin_mini_ci_1 = __importDefault(require("@tarojs/plugin-mini-ci"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const pluginSockpuppetCi = function (ctx, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const runOptions = (_a = ctx.runOpts) === null || _a === void 0 ? void 0 : _a.options; // 命令的参数
        const type = runOptions.type;
        const _configMap = ((options === null || options === void 0 ? void 0 : options.configMap) || util_1.configMap);
        let pluginOptions = options === null || options === void 0 ? void 0 : options.CIPluginFn;
        if (!pluginOptions) {
            throw new Error("请配置 CIPluginFn");
        }
        if (typeof options.CIPluginFn === "function") {
            pluginOptions = yield options.CIPluginFn(); // 执行函数，获取返回值
        }
        const currentIndex = Number(process.env.CI_AGAIN_CURRENT || "0");
        const { version, desc } = (pluginOptions || {});
        const _options = (0, util_1.toArray)(pluginOptions[type])[currentIndex];
        if (_options) {
            const jsonPath = _configMap[type];
            const projectRoot = process.cwd();
            const projectPath = path.join(projectRoot, jsonPath);
            const projectConfig = JSON.parse(fs.readFileSync(projectPath, "utf-8"));
            projectConfig.appid = _options === null || _options === void 0 ? void 0 : _options.appid;
            fs.writeFileSync(projectPath, JSON.stringify(projectConfig, null, 2), "utf-8");
        }
        const _pluginOptions = {
            [type]: _options || {},
            version: version,
            desc: desc,
        };
        console.log(`\x1b[32m提示  打包${type}：${_options.appid}=====>>`);
        if (_options.appName) {
            console.log(`\x1b[32m提示  打包${type}：${_options === null || _options === void 0 ? void 0 : _options.appname}=====>>`);
        }
        // 使用基座插件功能
        (0, plugin_mini_ci_1.default)(ctx, _pluginOptions);
        // 扩展功能
        ctx.register({
            name: "onUploadComplete",
            fn: () => {
                var _a;
                const options = (_a = ctx.runOpts) === null || _a === void 0 ? void 0 : _a.options; // 命令的参数
                const command = options.command || ctx.runOpts["_"][0];
                const type = options.type;
                const len = pluginOptions[type].length - 1;
                if (currentIndex >= len) {
                    console.log("\x1b[32m提示  打包完成=====>>");
                    process.exit(0);
                }
                else {
                    process.env.CI_AGAIN_CURRENT = String(currentIndex + 1);
                    const totalCommand = options.command || `taro ${command} ${(0, util_1.stringifyParams)(options)}`;
                    (0, child_process_1.execSync)(totalCommand, { stdio: "inherit" });
                }
            },
        });
    });
};
exports.default = pluginSockpuppetCi;
//# sourceMappingURL=index.js.map