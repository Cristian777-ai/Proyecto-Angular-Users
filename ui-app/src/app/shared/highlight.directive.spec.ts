// highlight.directive.spec.ts
import { HighlightDirective }    from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let elRef: ElementRef;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    elRef = new ElementRef(document.createElement('p'));
    rendererSpy = jasmine.createSpyObj('Renderer2', ['setStyle']);
    directive = new HighlightDirective(elRef, rendererSpy);
  });

  it('usa color por defecto', () => {
    directive.ngOnInit();
    expect(rendererSpy.setStyle)
      .toHaveBeenCalledWith(
        elRef.nativeElement,
        'background-color',
        'yellow'
      );
  });

  it('cambia color si se pasa otro valor', () => {
    directive.highlightColor = 'cyan';
    directive.ngOnInit();
    expect(rendererSpy.setStyle)
      .toHaveBeenCalledWith(
        elRef.nativeElement,
        'background-color',
        'cyan'
      );
  });
});