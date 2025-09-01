# TuiChat

前端在处理大模型返回的多样化内容 —— `表格、图表、参考文档、工具调用、情报数据源等`时，为了各问答组件 —— `天问对话、小天对话、智能体对话、智算中的小天对话`统一代码逻辑与展现形式，同时为了方便后续扩展，对以上多样化内容进行了原子渲染器的封装设计，避免了像之前提供的 Copilot 组件 问答是一个整体 不方便定制业务功能的问题。

## 整体设计
- 新增渲染类型无需修改 SDK 核心代码，只需扩展新渲染器组件；
- 每种渲染器只负责对应类型的内容渲染，职责清晰；渲染器只负责渲染`{ flag: 'xxx', content: [...] }`对应的视图，不与大模型交互，不解析大模型返回的整体数据；
- 默认渲染器与自定义渲染器无缝协作，支持优先级覆盖（可选）；

## 目录结构
```
.
├── lib
│   ├── components
│   │   └── renderer-container        // 核心渲染容器
│   ├── decorators
│   │   └── renderer-decorator.ts     // 装饰器，绑定渲染器与flag
│   ├── interfaces
│   │   └── on-render.ts              // 渲染器组件接口，所有渲染器组件必须实现此接口，确保都接收 data 输入
│   ├── models
│   │   └── renderer-model.ts         // 渲染器模型，通义数据结构为 { "flag": "xxx", "content": [...] }
│   ├── renderer.module.ts
│   ├── renderers                     // 默认渲染器，可覆盖
│   │   ├── chart-renderer
│   │   └── table-renderer
│   ├── services                      // 渲染器注册中心，负责注册、查找渲染器
│   │   └── renderer-registry.service.ts
│   └── tokens
│       └── renderer-config.ts
├── public-api.ts
└── test.ts
```

## 使用方式
1. 安装依赖
```bash
npm install @tui/chat
```

2. 引入模块
```typescript
import { RendererModule } from '@tui/chat';

@NgModule({
  // 无自定义渲染器时
  imports: [
    RendererModule
  ],

  // 有自定义渲染器时
  imports: [
    RendererModule.forRoot({
      renderers: [MediaRendererComponent]
    })
  ],
})
export class AppModule {}
```

3. 使用组件
```typescript
import { RendererModel } from '@tui/chat';

// 示例内容数据
contents: RendererModel[] = [
  {
    "flag": "table",
    "content": [
      {
        "columns": [
          { "key": "time", "title": "时间" },
          { "key": "name", "title": "告警名称", "color": "#43bff4" },
          { "key": "ip", "title": "IP" },
          { "key": "severity", "title": "严重级别", "colorMapping": { "高": "#ff4a4a", "中": "#eab045", "低": "#43bff4" } }
        ],
        "data": [
          { "time": "", "name": "", "ip": "", "severity": "" },
          { "time": "", "name": "", "ip": "", "severity": "" }
        ]
      }
    ]
  },
  {
    "flag": "chart",
    "content": [
      {
        "title": "",
        "chartName": "",
        "dataConfig": {}
      }
    ]
  },
  {
    "flag": "video",
    "content": [
      {
        "src": "https://www.youtube.com/watch?v=123456",
        "title": "视频标题"
      }
    ]
  }
];
```

```html
<t-renderer 
  *ngFor="let item of contents" 
  [data]="item"
></t-renderer>
```

4. 自定义渲染器
```typescript
import { Component, OnInit } from '@angular/core';
import { OnRender, Renderer, RendererModel } from '@tui/chat';

@Renderer(['video', 'audio'])
@Component({
  selector: 'media-renderer',
  template: `
    <div class="media-container">
      <video *ngIf="data.flag === 'video'" [src]="data.content[0].src" controls></video>
      <audio *ngIf="data.flag === 'audio'" [src]="data.content[0].src" controls></audio>
      <p>{{ data.content[0].title }}</p>
    </div>
  `
})
export class MediaRendererComponent implements OnInit, OnRender {
  data: RendererModel;

  ngOnInit(): void {
  }
}
```