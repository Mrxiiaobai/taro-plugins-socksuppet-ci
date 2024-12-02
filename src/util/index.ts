export const toArray = (obj: object) => {
  if (!obj) return [];
  return Array.isArray(obj) ? obj : [obj];
};

export const stringifyParams = (obj: object) => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== true && value !== false) // 过滤掉值为 true 和 false 的键
    .map(([key, value]) => `--${key} ${value} `) // 处理剩下的键值对
    .join(" ");
};

export const configMap: { [key: string]: string } = {
  weapp: "project.config.json",
  tt: "project.tt.json",
  alipay: "mini.project.json",
  qq: "project.config.json",
  dd: "project.dd.json",
  swan: "project.swan.json",
  lark: "project.lark.json",
};
