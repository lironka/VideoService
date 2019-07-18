import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { VideoItemComponent } from '../video-item/video-item.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let testData: {};
  let getVideosSpy: any;
  let quoteEl: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, HeaderComponent, VideoItemComponent],
      providers: [HttpClient],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Loading...', () => {
    fixture.detectChanges(); // onInit()
    quoteEl = fixture.nativeElement.querySelector('.col');

    expect(quoteEl.textContent).toBe(' Loading... ');
  });
});
