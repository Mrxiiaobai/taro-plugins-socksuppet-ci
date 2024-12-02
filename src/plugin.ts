export interface TSockpuppetPluginOptions {
  [x: string]: any;
  version?: any;
  desc?: any;
}
export interface TSockpuppetOptions {
  configMap: { key: string; value: string };
  CIPluginFn: TSockpuppetPluginOptions | (() => TSockpuppetPluginOptions);
  command: string;
}
