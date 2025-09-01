/**
 * 回答内容数据结构
 */
export interface RendererModel {
  /**
   * 内容类型标记
   */
  flag: string;

  /**
   * 内容数据，具体结构取决于flag类型
   */
  content: any[];

  /**
   * 内容描述
   */
  description?: string;
}
