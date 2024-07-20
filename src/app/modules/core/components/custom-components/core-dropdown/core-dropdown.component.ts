import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'core-dropdown',
  templateUrl: './core-dropdown.component.html',
  styleUrls: ['./core-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CoreDropdownComponent),
    multi: true
  }]
})
export class CoreDropdownComponent implements ControlValueAccessor {

  @Input() header: string = '';
  @Input() dropdownOptions: any;
  @Input() clearDropdownEnabled: boolean = false;

  @Output() onFieldValueChange = new EventEmitter<any>();

  selectedOption: string = '';
  isOpen: boolean = false;
  showClearIcon: boolean = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
     this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.selectedOption = this.dropdownOptions.options.find((option: any) => option.value === obj).viewValue || null;
  }

  toggleDropdown(isOpenState: boolean) {
    this.isOpen = isOpenState;
  }

  clearSelection() {
    this.selectedOption = '';
    this.showClearIcon = false;
    this.toggleDropdown(false);
    this.onChange(this.selectedOption);
  }

  onValueChange(event: any) {
    this.selectedOption = this.dropdownOptions.options.find((option: any) => option.value === event).viewValue;
    this.toggleDropdown(false);
    this.onChange(this.selectedOption);
  }

}
