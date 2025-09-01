import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TChartsDirectiveModule } from '@tui/charts-library';
import { RendererContainerComponent } from './components/renderer-container/renderer-container.component';
import { RendererRegistryService } from './services/renderer-registry.service';
import { RENDERER_CONFIG, RendererConfig } from './tokens/renderer-config';
import { TableRendererComponent } from './renderers/table-renderer/table-renderer.component';
import { ChartRendererComponent } from './renderers/chart-renderer/chart-renderer.component';

/**
 * 默认渲染器
 */
const RENDERERS = [
  TableRendererComponent,
  ChartRendererComponent
]


@NgModule({
  declarations: [
    RendererContainerComponent,
    TableRendererComponent,
    ChartRendererComponent
  ],
  imports: [
    CommonModule,
    TChartsDirectiveModule
  ],
  exports: [
    RendererContainerComponent
  ],
  providers: [
    RendererRegistryService,
    { provide: RENDERER_CONFIG, useValue: { renderers: RENDERERS } }
  ]
})
export class RendererModule {
  // 防止模块被多次导入
  constructor(@Optional() @SkipSelf() parentModule: RendererModule) {
    if (parentModule) {
      throw new Error('RendererModule is already loaded. Import it in the AppModule only.');
    }
  }

  // 提供配置的静态方法
  static forRoot(config?: RendererConfig): ModuleWithProviders<RendererModule> {
    config = config || {};
    config.renderers = config.renderers || [];
    // 如果默认渲染器不满足需求，可以自定义同名 flag 覆盖默认渲染器
    config.renderers = [...RENDERERS, ...config.renderers];
    return {
      ngModule: RendererModule,
      providers: [
        { provide: RENDERER_CONFIG, useValue: config }
      ]
    };
  }
}
