import { stagger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { routingServices } from '@app/services/routingServices';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('homeTab') homeTab!: ElementRef;
  @ViewChild('aboutTab') aboutTab!: ElementRef;
  @ViewChild('portafolioTab') portafolioTab!: ElementRef;
  @ViewChild('portafolioTooltip') portafolioTooltip!: ElementRef;
  @ViewChild('aboutTooltip') aboutTooltip!: ElementRef;
  @ViewChild('homeTooltip') homeTooltip!: ElementRef;
  @ViewChild('tabs') tabs!: ElementRef;

  tabTimeLine: any = gsap.timeline();

  constructor(private render: Renderer2, private _routingService: routingServices) {}

  ngAfterViewInit(): void {
    //  let tl = gsap.timeline();
    //tl.from('.navIcon', {
    // duration: 0.3,
    //rotateX: 45,
    //stagger: 0.5,
    //});
  }

  setActiveTab(target: any) {
    let tabs = this.tabs.nativeElement.children;

    for (let i = 0; i < tabs.length; i++) {
      this.render.removeClass(tabs[i], 'navIcon-active');
      this.render.addClass(tabs[i], 'navIcon');
    }

    let tmLine = gsap.timeline();

    tmLine.to(target, { scaleY: 1.2, duration: 0.2 });
    tmLine.to(target, { scaleY: 0.5, duration: 0.2 });
    tmLine.to(target, { scale: 1.2, duration: 0.2 });
    tmLine.to(target, { scale: 1, duration: 0.2 });

    this.render.addClass(target, 'navIcon-active');
    this._routingService.emmitChange(target);
  }

  toolTipHide(event: any) {
    gsap.to(event, { rautoAlpha: 0, right: -110 });
  }

  toolTipShow(event: any) {
    gsap.to(event, { rautoAlpha: 1, right: 50 });
  }
}
