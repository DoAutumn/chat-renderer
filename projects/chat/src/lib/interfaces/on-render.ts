import { RendererModel } from '../models/renderer-model';

/**
 * 所有渲染器组件必须实现的接口
 */
export interface OnRender {
  /**
   * 要渲染的内容数据
   */
  data: RendererModel;
}
