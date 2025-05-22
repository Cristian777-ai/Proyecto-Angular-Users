import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective implements OnInit {
  @Input('appHighlight') highlightColor = 'yellow';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.highlightColor
    );
  }
}