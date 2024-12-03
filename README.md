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

# CIPluginFn

官方插件配置 [@tarojs/plugin-mini-ci](https://docs.taro.zone/docs/plugin-mini-ci#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F-ci-%E9%85%8D%E7%BD%AE)

配置示例：

由于插件会修改 json 配置中的 appid，以达到构建的目的
需要加入 appid 参数

appid: 必填
appName: 非必填(打包显示)

```javascript
const CIPluginOpt = {
  weapp: [
    {
      // 必填
      appid: "微信小程序appid1",
      privateKeyPath:
        "密钥文件相对项目根目录的相对路径，例如 key/private.appid.key",
    },
    {
      // 必填
      appid: "微信小程序appid2",
      privateKeyPath:
        "密钥文件相对项目根目录的相对路径，例如 key/private.appid.key",
    },
  ],
  // 同weapp,如需多个构建，改为数组
  tt: {
    appid: "",
    email: "字节小程序邮箱",
    password: "字节小程序密码",
  },
  // 同weapp,如需多个构建，改为数组
  alipay: {
    appid: "支付宝小程序appid",
    toolId: "工具id",
    privateKeyPath:
      "密钥文件相对项目根目录的相对路径，例如 key/pkcs8-private-pem",
  },
  // 同weapp,如需多个构建，改为数组
  dd: {
    appid: "钉钉小程序appid,即钉钉开放平台后台应用管理的 MiniAppId 选项",
    token: "令牌，从钉钉后台获取",
  },
  // 同weapp,如需多个构建，改为数组
  swan: {
    appid: "",
    token: "鉴权需要的token令牌",
  },
  // 版本号
  version: "1.0.0",
  // 版本发布描述
  desc: "版本描述",
};
```

# 如需打包多个，将 weapp 改为数组配置多个即可！！！

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

# 最后

因没有其他小程序需求，仅测试微信小程序批量打包！！！
