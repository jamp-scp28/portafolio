import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as AOS from 'aos';
import gsap from 'gsap/all';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutTitle') aboutTitle!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  splashAbout() {
    let splash = this.aboutTitle?.nativeElement;
    let tm = gsap.timeline();
    tm.from(splash, { color: '#face30', z: '1vw', scale: 1.1, duration: 1, ease: 'power3.inOut' });
    //tm.to(splash,{scale:1,duration:0.5,ease:"power4.out"})
  }
}
