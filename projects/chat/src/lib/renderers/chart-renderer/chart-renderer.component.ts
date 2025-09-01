import { Component, OnInit } from '@angular/core';
import { Renderer } from '../../decorators/renderer-decorator';
import { RendererModel } from '../../models/renderer-model';
import { OnRender } from '../../interfaces/on-render';

@Renderer(['chart'])
@Component({
  selector: 'chart-renderer',
  templateUrl: './chart-renderer.component.html',
  styleUrls: ['./chart-renderer.component.less']
})
export class ChartRendererComponent implements OnInit, OnRender {

  data!: RendererModel;

  chartStyleCfg = { grid: { left: 10, right: 10, top: 20, bottom: 0, containLabel: true }, xAxis: { axisLabel: { rotate: 30, interval: 0, width: 100, overflow: 'truncate' } }, tooltip: { appendToBody: true } };

  constructor() { }

  ngOnInit(): void {
  }

}
