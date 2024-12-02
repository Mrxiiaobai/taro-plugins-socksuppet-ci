# 使用须知

# 作用

【小程序马甲包】

原@tarojs/plugin-mini-ci 插件 只支持单个微信小程序的打包
部分需求存在马甲包的需求，需要同时发布多个小程序
为解决该问题

该插件支持马甲包功能，根据配置批量打包多个小程序，并且发布到体验版

# 前提

taro 3.x 版本可用

# 安装

```bash
yarn add @maloulab/taro-plugins-socksuppet-ci
```

或

```bash
npm i @maloulab/taro-plugins-socksuppet-ci
```

# 使用

```javascript
plugins: [ ["@tarojs/plugin-mini-ci", CIPluginFn]],
```

修改为

```javascript
plugins: [ ["@maloulab/taro-plugins-socksuppet-ci", {
  CIPluginFn,
  // 非必传
  configMap: {

  },
  // 非必传
  // 自定义打包命令 默认自动获取（taro + 命令 + 参数）例：taro upload --type weapp
  command: ''
}]],
```

```javascript
// 默认configMap
const configMap = {
  weapp: "project.config.json",
  tt: "project.tt.json",
  alipay: "mini.project.json",
  qq: "project.config.json",
  dd: "project.dd.json",
  swan: "project.swan.json",
  lark: "project.lark.json",
};
```

由于插件会自动修改 project.config.json 中的 appid,
实现自动化构建多个小程序，每个小程序文件名不一致
可自定义

# 注意

因为会修改 project.config.json 或其他 json 中的 appid
appid 会替换为配置中的最后一个
