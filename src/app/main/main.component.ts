import { Component, OnInit, ViewChildren } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Observable } from 'rxjs';
import { Video } from '../interfaces/video.model';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  videos$: Observable<Video[]>;

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.videos$ = this.videoService.getAll().pipe(
      map(videos => {
        return videos.map(video => {
          if (video.embed_code) {
            video.embed_code = this.sanitizer.bypassSecurityTrustResourceUrl(
              video.embed_code
            );
          }
          if (video.duration) {
            const h = Math.trunc(+video.duration / 360);
            const m = Math.trunc((+video.duration - h * 360) / 60);
            const s = +video.duration - h * 360 - m * 60;
            video.duration = `${h}:${m > 9 ? m : '0' + m}:${
              s > 9 ? s : '0' + s
            }`;
          }

          if (video.published) {
            video.published = new Intl.DateTimeFormat(
              navigator.language
            ).format(new Date(video.published));
          }

          return video;
        });
      })
    );
  }
}
