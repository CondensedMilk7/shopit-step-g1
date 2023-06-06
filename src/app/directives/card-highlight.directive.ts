import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCardHighlight]',
})
export class CardHighlightDirective {
  @Input() appCardHighlight = 'border-info';

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseover') highlightElement() {
    this.elementRef.nativeElement.classList.add(this.appCardHighlight);
  }

  @HostListener('mouseleave') removeHighlight() {
    this.elementRef.nativeElement.classList.remove(this.appCardHighlight);
  }
}
