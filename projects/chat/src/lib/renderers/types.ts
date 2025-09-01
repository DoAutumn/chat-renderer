import { RendererModel } from '../models/renderer-model';

/**
 * 交互操作
 * - operation 交互形式，navigate(点击打开新页面)、refresh(点击刷新左侧页面)、dialog(点击弹窗)、 portrait(浮窗)
 * - url 目标页面地址
 * - params 参数
 * - icon 是否显示图标，图标需是Tui图标库中的特定图标名称
 * - title 该交互对应的显示名称(当交互操作多于1种时，交互操作会以菜单列表的形式展示)
 */
export type Operation = {
  operation: string;
  url: string;
  params: any;
  icon?: string;
  title?: string;
};

/**
 * 表格列
 * - key 该列对应数据中的哪个key
 * - title 该列的标题
 * - color 该列的颜色，设置了该属性之后，整列均为该颜色
 * - colorMapping 给该列中的某些特殊值设置单独的颜色
 */
export type Column = {
  key: string;
  title?: string;
  color?: string;
  colorMapping?: Record<string, string>;
  operations?: Operation[];
};

export type DataItem = Record<string, any>;

/**
 * 表格渲染器数据格式
 * { "flag": "table", "content": { "columns": [], "data": [] } }
 */
export type TableRendererModel = {
  content: {
    columns: Column[];
    data: DataItem[];
  }[]
} & RendererModel;

/**
 * 图表渲染器数据格式
 * { "flag": "chart", "content": { "title": "", "chartName": "", "dataConfig": {} } }
 */
export type ChartRendererModel = {
  content: {
    title: string;
    chartName: string;
    dataConfig: any;
  }[]
} & RendererModel;