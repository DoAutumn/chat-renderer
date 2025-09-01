import { Component, OnInit } from '@angular/core';
import { OnRender, Renderer, RendererModel } from 'projects/chat/src/public-api';

@Renderer(['video', 'audio'])
@Component({
  selector: 'app-media-renderer',
  templateUrl: './media-renderer.component.html',
  styleUrls: ['./media-renderer.component.less']
})
export class MediaRendererComponent implements OnInit, OnRender {

  data!: RendererModel;

  constructor() { }

  ngOnInit(): void {
  }

}
