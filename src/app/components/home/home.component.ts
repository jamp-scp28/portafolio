import { stagger } from '@angular/animations';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { routingServices } from '@app/services/routingServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as AOS from 'aos';
import gsap from 'gsap/all';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoading = false;
  menuHidden = true;
  closeResult = '';

  /** Items for the Navigation */
  @ViewChild('home') home: ElementRef | undefined;
  @ViewChild('about') about!: ElementRef;
  @ViewChild('portafolio') portafolio!: ElementRef;

  /** Parallax */
  @ViewChild('birds') birds!: ElementRef;
  @ViewChild('forest') forest!: ElementRef;
  @ViewChild('title') title!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  parallax(event: Event) {
    var px = window.pageYOffset;
    this.moveBirds(px);
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    //console.log('somenting...');
    const x = event.clientX;
    const y = event.clientY;

    gsap.set('.cursor', {
      x: x,
      y: y,
    });

    gsap.to('.shape', { x: x, y: y, stagger: -0.1 });
  }

  constructor(
    private router: Router,
    private _routingServices: routingServices,
    private rendered: Renderer2,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    AOS.init();
    this.isLoading = true;
    this._routingServices.changedEmitted$.subscribe((route) => {
      //console.log(route?.id);
      switch (route?.id) {
        case 'home':
          this.scrolltoContent(this.home?.nativeElement);
          break;
        case 'about':
          this.scrolltoContent(this.about?.nativeElement);
          break;
        case 'portafolio':
          this.scrolltoContent(this.portafolio?.nativeElement);
          break;
        default:
          //console.log(route);
          break;
      }
    });
  }

  ngAfterViewInit(): void {
    this.animateItems();
  }

  animateItems() {
    let forest = this.forest?.nativeElement;
    let birds = this.birds?.nativeElement;
    let title = this.title?.nativeElement;

    let tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    tl.to(forest, { scaleX: 1.009, duration: 0.6 });
    tl.to(forest, { scaleX: 1, duration: 0.6 });

    tl.to(birds, { scaleY: 1.04, duration: 0.7, ease: 'power2.inOut' });
    tl.to(birds, { scaleY: 1, duration: 0.7, ease: 'power2.inOut' });

    const professions = ['Developer.', 'Business Administrator.'];

    gsap.to('.cursor2', { opacity: 0, ease: 'power2.inOut', repeat: -1, duration: 0.9 });

    let masterTl = gsap.timeline({ repeat: -1 });
    let boxTl = gsap.timeline();

    boxTl.to('.box', { duration: 1, width: '6vw', delay: 0.5 });

    boxTl.from('.hi', { y: '7vw', duration: 1, ease: 'power3.out' });
    boxTl.to('.box', { duration: 1, height: '6vw', ease: 'elastic.out' });
    boxTl.from('.proText', { duration: 1, y: '7vw', ease: 'elastic.out' });
  }

  moveBirds(len: number) {
    let birds = this.birds?.nativeElement;
    //console.log(len);
    //console.log(birds);
    gsap.to(birds, { scale: 1.1, scaleX: 20, duration: 1 });

    if (len < 10) {
      gsap.to(birds, { scale: 1, duration: 1 });
    }
  }

  scrolltoContent(route: any) {
    route?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
}
