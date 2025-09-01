import { Component, OnInit } from '@angular/core';
import { Renderer } from '../../decorators/renderer-decorator';
import { OnRender } from '../../interfaces/on-render';
import { Column, DataItem, Operation, TableRendererModel } from '../types';

@Renderer(['table'])
@Component({
  selector: 'table-renderer',
  templateUrl: './table-renderer.component.html',
  styleUrls: ['./table-renderer.component.less']
})
export class TableRendererComponent implements OnInit, OnRender {

  data!: TableRendererModel;

  constructor() { }

  ngOnInit(): void { }

  style(col: Column, item: DataItem) {
    if (col.operations?.length) {
      return {};
    }
    if (col.colorMapping) {
      return { color: col.colorMapping[item[col.key]] || 'var(--text-color-secondary)' };
    }
    if (col.color) {
      return { color: col.color };
    }
    return {};
  }

  clzss(col: Column, item: DataItem) {
    if (!col.operations?.length) return '';
    if (col.operations.length >= 2) return 'ui-copilot-interactive menus';
    if (col.operations.length === 1) return 'ui-copilot-interactive ' + col.operations[0].operation;
    return '';
  }

  dataOper(col: Column, item: DataItem) {
    if (!col.operations?.length) return '';
    const operations: Operation[] = JSON.parse(JSON.stringify(col.operations));
    operations.map(x => {
      if (!x.params) {
        x.params = { value: item[col.key] };
      } else {
        Object.keys(x.params).map(k => {
          x.params[k] === '{{value}}' && (x.params[k] = item[col.key]);
        });
      }
    });
    return encodeURIComponent(JSON.stringify(operations));
  }

}
