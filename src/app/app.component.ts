import { Component } from '@angular/core';
import { RendererModel } from 'projects/chat/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'tui-chat';

  // 示例内容数据
  contents: RendererModel[] = [
    {
      flag: "table",
      content: [
        {
          columns: [
            { key: "time", title: "时间" },
            { key: "name", title: "告警名称", color: "#43bff4" },
            { key: "ip", title: "IP" },
            { key: "severity", title: "严重级别", colorMapping: { "高": "#ff4a4a", "中": "#eab045", "低": "#43bff4" } },
          ],
          data: [
            { time: "2025-09-01 10:00:00", name: "SQL注入", ip: "10.1.10.1", severity: "高" },
            { time: "2025-09-01 10:00:01", name: "SQL注入", ip: "10.1.10.1", severity: "中" }
          ]
        }
      ],
      description: '这是内置的表格渲染器'
    },
    {
      flag: 'chart',
      content: [
        {
          title: '图表标题',
          chartName: 'TrxLineChart',
          dataConfig: {
            x: ['time'],
            y: ['value'],
            data: [
              { time: '2025-09-01', value: 100 },
              { time: '09-02', value: 200 },
              { time: '09-03', value: 150 },
              { time: '09-04', value: 400 },
              { time: '09-05', value: 100 },
              { time: '09-06', value: 250 },
              { time: '09-07', value: 700 },
            ]
          }
        }
      ],
      description: '这是内置的图表渲染器'
    },
    {
      flag: 'video',
      content: [
        {
          src: 'https://www.w3school.com.cn/i/movie.mp4',
          title: '视频标题'
        }
      ],
      description: '这是自定义的视频渲染器'
    }
  ];
}
