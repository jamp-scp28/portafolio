import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { portafolioData } from '@app/services/portafolioData';
import gsap from 'gsap/all';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss'],
})
export class PortafolioComponent implements OnInit {
  @ViewChild('itemModal') itemModal!: ElementRef;

  modalContents!: any;
  itemData: IModal = {};
  isOpen = true;
  
  constructor(private rendered: Renderer2, private projectData: portafolioData) {}

  ngOnInit(): void {
    this.projectData.getData().subscribe(data =>{
      this.modalContents = data;
      this.modalContents = Object.values(this.modalContents);
    });
  }

  imageHover(id: number) {
    let itemTl = gsap.timeline();
    itemTl.to(`.portafolioItem-${id}`, { background: '#000431', duration: 0.6, ease: 'circ.easeIn' });
    gsap.to(`.item-title${id}`, { color: '#fff', duration: 0.5, ease: 'circ.easeIn' });

    let imgTl = gsap.timeline({ repeat: 1 });
    imgTl.to(`.itemImg${id}`, { y: -10, duration: 1 });
    imgTl.to(`.itemImg${id}`, { y: 0, duration: 0.5, ease: 'power3.Out' });

    let btnTl = gsap.timeline({ repeat: 1 });
    btnTl.to(`.portafolioBtn${id}`, { scale: 1.1, duration: 0.5, ease: 'power3.Out' });
    btnTl.to(`.portafolioBtn${id}`, { scale: 1, duration: 0.5, ease: 'power3.Out' });
  }

  imageHoverOut(id: number) {
    let itemTl = gsap.timeline();
    itemTl.to(`.portafolioItem-${id}`, { background: '#fff', duration: 0.6, ease: 'circ.easeIn' });
    gsap.to(`.item-title${id}`, { color: 'black', duration: 0.5, ease: 'circ.easeIn' });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  openModal(id: any) {
    var modal = this.itemModal?.nativeElement;
    this.rendered.setStyle(modal, 'display', 'grid');
    this.changeContent(id);

    let modalTl = gsap.timeline();
    modalTl.from('.card', { alpha: 0.2, duration: 1, borderRadius: 100 });
    modalTl.to('.card', { scale: 0.95, duration: 0.5 });
  }

  closeModal() {
    var modal = this.itemModal?.nativeElement;
    this.rendered.setStyle(modal, 'display', 'none');

    gsap.to('.card', { scale: 1, duration: 0.5, ease: 'power2.inOut' });
  }

  changeContent(item: any) {
    this.itemData = this.modalContents[item - 1];
  }
}

export interface IModal {
  id?: number;
  title?: string;
  media1?: string;
  media2?: string;
  media3?: string;
  description?: string;
  tags?: string;
  link?: string;
}
