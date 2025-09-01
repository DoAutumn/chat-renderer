import { Injectable, Type, Inject } from '@angular/core';
import { OnRender } from '../interfaces/on-render';
import { RENDERER_CONFIG, RendererConfig } from '../tokens/renderer-config';
import { getRendererFlags } from '../decorators/renderer-decorator';

@Injectable()
export class RendererRegistryService {

  // 存储flag到渲染器的映射
  private flagMap = new Map<string, Type<OnRender>>();

  constructor(@Inject(RENDERER_CONFIG) config: RendererConfig) {
    // 注册配置中的初始渲染器
    if (config.renderers) {
      config.renderers.forEach(renderer => this.registerRenderer(renderer));
    }
  }

  /**
   * 注册渲染器组件
   * @param renderer 实现了OnRender的组件类
   */
  registerRenderer(renderer: Type<OnRender>): void {
    const flags = getRendererFlags(renderer);
    if (!flags || flags.length === 0) {
      throw new Error(`Renderer ${renderer.name} must have @Renderer decorator`);
    }

    flags.forEach(flag => {
      if (this.flagMap.has(flag)) {
        console.warn(`Renderer for flag '${flag}' is already registered, it will be overwritten`);
      }
      this.flagMap.set(flag, renderer);
    });
  }

  /**
   * 根据flag获取对应的渲染器
   * @param flag 内容类型flag
   * @returns 渲染器组件类或null
   */
  getRenderer(flag: string): Type<OnRender> | null {
    return this.flagMap.get(flag) || null;
  }

  /**
   * 获取所有已注册的flag
   */
  getRegisteredFlags(): string[] {
    return Array.from(this.flagMap.keys());
  }
}
