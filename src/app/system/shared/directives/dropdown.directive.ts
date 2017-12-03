import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[hmDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')   private isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
