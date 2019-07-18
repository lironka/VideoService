import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../interfaces/video.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
  @Input() item: Video;
  constructor() {}

  ngOnInit() {}

  hanldeErrorVideo(item: Video) {
    item.video_url = null;
  }
}
