import { InjectionToken } from '@angular/core';
import { Type } from '@angular/core';
import { OnRender } from '../interfaces/on-render';

export interface RendererConfig {
  // 初始渲染器组件
  renderers?: Type<OnRender>[];
}

export const RENDERER_CONFIG = new InjectionToken<RendererConfig>('RENDERER_CONFIG');
