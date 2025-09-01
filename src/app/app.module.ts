import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RendererModule } from 'projects/chat/src/public-api';
import { MediaRendererComponent } from './media-renderer/media-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaRendererComponent
  ],
  imports: [
    BrowserModule,
    RendererModule.forRoot({
      renderers: [MediaRendererComponent]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
