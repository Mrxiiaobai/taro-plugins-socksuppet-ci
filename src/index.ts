import { execSync } from "child_process";
import { configMap, stringifyParams, toArray } from "./util";
import { TSockpuppetOptions, TSockpuppetPluginOptions } from "./plugin";
import CIPlugin from "@tarojs/plugin-mini-ci";
import * as path from "path";
import * as fs from "fs";

const pluginSockpuppetCi = async function (
  ctx: any,
  options: TSockpuppetOptions
) {
  const runOptions = ctx.runOpts?.options; // 命令的参数
  const type = runOptions.type as string;

  const _configMap = (options?.configMap || configMap) as {
    [key: string]: string;
  };
  let pluginOptions = options?.CIPluginFn as TSockpuppetPluginOptions;
  if (!pluginOptions) {
    throw new Error("请配置 CIPluginFn");
  }
  if (typeof options.CIPluginFn === "function") {
    pluginOptions = await options.CIPluginFn(); // 执行函数，获取返回值
  }

  const currentIndex = Number(process.env.CI_AGAIN_CURRENT || "0");

  const { version, desc } = (pluginOptions || {}) as TSockpuppetPluginOptions;

  const _options = toArray(pluginOptions[type])[currentIndex];

  if (_options) {
    const jsonPath = _configMap[type];
    const projectRoot = process.cwd();
    const projectPath = path.join(projectRoot, jsonPath);
    const projectConfig = JSON.parse(fs.readFileSync(projectPath, "utf-8"));

    projectConfig.appid = _options?.appid;

    fs.writeFileSync(
      projectPath,
      JSON.stringify(projectConfig, null, 2),
      "utf-8"
    );
  }

  const _pluginOptions = {
    [type]: _options || {},
    version: version,
    desc: desc,
  };

  if (_options?.appid) {
    console.log(`\x1b[32m提示  打包${type}：${_options?.appid}=====>>`);
  }
  if (_options?.appName) {
    console.log(`\x1b[32m提示  打包${type}：${_options?.appname}=====>>`);
  }

  // 使用基座插件功能
  CIPlugin(ctx, _pluginOptions);

  // 扩展功能
  ctx.register({
    name: "onUploadComplete",
    fn: () => {
      const options = ctx.runOpts?.options; // 命令的参数
      const command = options.command || ctx.runOpts["_"][0];

      const type = options.type;
      const len = pluginOptions[type].length - 1;

      if (currentIndex >= len) {
        console.log("\x1b[32m提示  打包完成=====>>");
        process.exit(0);
      } else {
        process.env.CI_AGAIN_CURRENT = String(currentIndex + 1);

        const totalCommand =
          options.command || `taro ${command} ${stringifyParams(options)}`;

        execSync(totalCommand, { stdio: "inherit" });
      }
    },
  });
};

export default pluginSockpuppetCi;
