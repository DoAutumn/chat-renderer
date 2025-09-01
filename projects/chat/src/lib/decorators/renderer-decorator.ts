/**
 * 标记组件为特定flag的渲染器
 * @param flags 支持的flag数组
 */
export function Renderer(flags: string[]) {
  return function (target: any) {
    // 在组件类上存储元数据
    target.supportedFlags = flags;
    return target;
  };
}

/**
 * 获取组件注册的flag
 * @param component 组件类
 * @returns flag数组
 */
export function getRendererFlags(component: any): string[] | null {
  return component.supportedFlags || null;
}
