import { Observable } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface Video {
  id: string;
  platform: string;
  title: string;
  thumb_url: string;
  url: string;
  duration: string;
  published: string;
  video_url: string | Observable<string>;
  embed_code: any;
}
