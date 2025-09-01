import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RendererModel } from '../../models/renderer-model';
import { RendererRegistryService } from '../../services/renderer-registry.service';

@Component({
  selector: 't-renderer',
  templateUrl: './renderer-container.component.html',
})
export class RendererContainerComponent implements OnInit {

  @Input() data!: RendererModel;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private registry: RendererRegistryService
  ) { }

  ngOnInit(): void {
    this.renderComponent();
  }

  private renderComponent(): void {
    if (!this.data) return;

    // 清空容器
    this.container.clear();

    // 获取对应的渲染器
    const Renderer = this.registry.getRenderer(this.data.flag);

    if (Renderer) {
      // 动态创建渲染器组件
      const factory = this.resolver.resolveComponentFactory(Renderer);
      const componentRef = this.container.createComponent(factory);
      componentRef.instance.data = this.data;
    } else {
      // 处理未知类型
      this.renderUnknown();
    }
  }

  private renderUnknown(): void {
    this.container.element.nativeElement.innerHTML = `
      <div class="unknown-content alert alert-warning">
        <p>不支持的内容类型: ${this.data.flag}</p>
        <pre>${JSON.stringify(this.data.content, null, 2)}</pre>
      </div>
    `;
  }

}
