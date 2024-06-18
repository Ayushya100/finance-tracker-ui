import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { I18nService } from 'src/app/modules/shared/services/i18n.service';

@Component({
  selector: 'app-user-setup-form',
  templateUrl: './user-setup-form.component.html',
  styleUrls: ['./user-setup-form.component.scss']
})
export class UserSetupFormComponent implements OnInit {

  msgPrefix: string = 'userSection.userSetup.message.';

  @Input() header: string = '';
  @Input() actions: any;
  @Input() editPermission: boolean = false;

  @Input() form: any;
  @Input() formData: any;
  @Input() formInitialData: any;

  @Output() formSubmitData = new EventEmitter<any>();

  barChartDiscalimer: string = '';
  pieChartDiscalimer: string = '';
  lineChartDiscalimer: string = '';

  constructor(private i18n: I18nService) {}
  
  async ngOnInit(): Promise<void> {
    this.barChartDiscalimer = await this.i18n.translate(`${this.msgPrefix}Bar Chart`);
    this.pieChartDiscalimer = await this.i18n.translate(`${this.msgPrefix}Pie Chart`);
    this.lineChartDiscalimer = await this.i18n.translate(`${this.msgPrefix}Line Chart`);
  }

  get toggles(): any {
    return this.form.get('settings') as FormArray;
  }

  findToggleIndex(dashboardIndex: number, categoryIndex: number, setupIndex: number): number {
    let index = 0;
    for (let i = 0; i < dashboardIndex; i++) {
      this.formData[i].categories.forEach((category: any) => {
        index += category.setup.length;
      });
    }

    for (let j = 0; j < categoryIndex; j++) {
      index += this.formData[dashboardIndex].categories[j].setup.length;
    }
    return index + setupIndex;
  }

  onSubmit() {
    this.formSubmitData.emit(this.form.value);
  }

  onCancel() {
    const togglesArray = this.form.get('settings') as FormArray;
    togglesArray.controls.forEach((control, index) => {
      const originalSetup = this.formInitialData[index];
      control.patchValue({
        _id: originalSetup._id,
        value: originalSetup.value,
        categoryName: originalSetup.categoryName,
        categoryType: originalSetup.categoryType,
        subCategory: originalSetup.subCategory,
        duration: originalSetup.duration
      });
    });
  }
}
