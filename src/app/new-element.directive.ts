import { Directive, ElementRef, Input, Renderer2, AfterContentInit } from '@angular/core';

@Directive({ selector: '[flash-new]' })
export class NewElementDirective implements AfterContentInit {
  @Input() skipFlash?: boolean;

  constructor(public el: ElementRef, public renderer: Renderer2){}

  ngAfterContentInit(): void {
    if(this.skipFlash) return;
    this.renderer.addClass(this.el.nativeElement, 'new');
    setTimeout(() => this.renderer.removeClass(this.el.nativeElement, 'new'), 10000);
  }
}
