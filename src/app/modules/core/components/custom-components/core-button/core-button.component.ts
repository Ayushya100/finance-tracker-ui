import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'core-button',
  templateUrl: './core-button.component.html',
  styleUrls: ['./core-button.component.scss']
})
export class CoreButtonComponent {

  @Input() btnHeader: string = '';
  @Input() btnType: string = '';

  @Output() submit = new EventEmitter<any>();

  constructor() { }

  onSubmit() {
    this.submit.emit();
  }

}
