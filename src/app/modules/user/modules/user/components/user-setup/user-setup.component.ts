import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';

// Utils
import { UserStore } from 'src/app/modules/user/stores/user.store';
import { UserSetupUtils } from '../../utils/user-setup.utils';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})
export class UserSetupComponent implements OnInit {

  userPrefix: string = 'userSection.userSetup.component.';

  generalHeader: string = '';
  dashboardHeader: string = '';
  reportHeader: string = '';

  setupActions: any;
  userSetup: any;

  generalSetups: Array<any> = [];
  generalForm: FormGroup;
  initialGeneralValues: any[] = [];

  dashboardSetup: any;
  dashboardForm: FormGroup;
  initialDashboardValues: any[] = [];

  reportSetup: any;
  reportForm: FormGroup;
  initialReportValues: any[] = [];

  ExpenseDailyCharts: Array<any> = [];
  ExpenseMonthlyCharts: Array<any> = [];
  ExpenseYearlyCharts: Array<any> = [];
  ExpenseCustomCharts: Array<any> = [];
  InvestmentDailyCharts: Array<any> = [];
  InvestmentMonthlyCharts: Array<any> = [];
  InvestmentYearlyCharts: Array<any> = [];
  InvestmentCustomCharts: Array<any> = [];
  IncomeDailyCharts: Array<any> = [];
  IncomeMonthlyCharts: Array<any> = [];
  IncomeYearlyCharts: Array<any> = [];
  IncomeCustomCharts: Array<any> = [];

  ExpenseReports: Array<any> = [];
  InvestmentReports: Array<any> = [];
  IncomeReports: Array<any> = [];

  viewPermission: boolean = false;
  editPermission: boolean = false;
  deletePermission: boolean = false;

  generalSetupOptions = [
    {
      field: 'user-theme',
      options:  [
        { value: 'light-blue', viewValue: 'Light Blue' },
        { value: 'light-gray', viewValue: 'Light Gray' },
        { value: 'dark-teal', viewValue: 'Dark Teal' },
        { value: 'dark-red', viewValue: 'Dark Red' },
        { value: 'dark-blue', viewValue: 'Dark Blue' }
      ]
    },
    {
      field: 'user-language',
      options: [
        { value: 'eng', viewValue: 'English' },
        { value: 'hin', viewValue: 'Hindi' }
      ]
    }
  ];

  constructor(
    private userSetupUtils: UserSetupUtils,
    private i18n: I18nService,
    private store: UserStore,
    private fb: FormBuilder
  ) {
    this.generalForm = this.fb.group({
      settings: this.fb.array([])
    });
    this.dashboardForm = this.fb.group({
      settings: this.fb.array([])
    });
    this.reportForm = this.fb.group({
      settings: this.fb.array([])
    });
  }

  async ngOnInit(): Promise<void> {
    this.generalHeader = await this.i18n.translate(`${this.userPrefix}General Settings`);
    this.dashboardHeader = await this.i18n.translate(`${this.userPrefix}Dashboard Settings`);
    this.reportHeader = await this.i18n.translate(`${this.userPrefix}Report Settings`);

    this.setupActions = (await this.userSetupUtils.getUserSetupActions()).actions;
    this.dashboardSetup = (await this.userSetupUtils.getUserDashboardMetadata()).fields;
    this.reportSetup = (await this.userSetupUtils.getUserReportMetadata()).fields;

    this.store.getStateSubject().subscribe((data) => {
      this.userSetup = data.userSetup;
      this.checkPermissions(data.userPermissions);
      this.initialiseSetup();
    });
  }

  checkPermissions(permissions: any) {
    this.viewPermission = permissions.setupViewPermission;
    this.editPermission = permissions.setupEditPermission;
    this.deletePermission = permissions.setupDeletePermission;
  }

  initialiseSetup() {
    this.clearSetup();
    for (const setup of this.userSetup) {
      if (setup.categoryType === 'general') {
        this.generalSetups.push(setup);
      } else if (setup.categoryType === 'graph') {
        if (setup.duration === 'daily' && setup.subCategory === 'expense') {
          this.ExpenseDailyCharts.push(setup);
        } else if (setup.duration === 'daily' && setup.subCategory === 'investment') {
          this.InvestmentDailyCharts.push(setup);
        } else if (setup.duration === 'daily' && setup.subCategory === 'income') {
          this.IncomeDailyCharts.push(setup);
        } else if (setup.duration === 'monthly' && setup.subCategory === 'expense') {
          this.ExpenseMonthlyCharts.push(setup);
        } else if (setup.duration === 'monthly' && setup.subCategory === 'investment') {
          this.InvestmentMonthlyCharts.push(setup);
        } else if (setup.duration === 'monthly' && setup.subCategory === 'income') {
          this.IncomeMonthlyCharts.push(setup);
        } else if (setup.duration === 'yearly' && setup.subCategory === 'expense') {
          this.ExpenseYearlyCharts.push(setup);
        } else if (setup.duration === 'yearly' && setup.subCategory === 'investment') {
          this.InvestmentYearlyCharts.push(setup);
        } else if (setup.duration === 'yearly' && setup.subCategory === 'income') {
          this.IncomeYearlyCharts.push(setup);
        } else if (setup.duration === 'custom' && setup.subCategory === 'expense') {
          this.ExpenseCustomCharts.push(setup);
        } else if (setup.duration === 'custom' && setup.subCategory === 'investment') {
          this.InvestmentCustomCharts.push(setup);
        } else if (setup.duration === 'custom' && setup.subCategory === 'income') {
          this.IncomeCustomCharts.push(setup);
        }
      } else if (setup.categoryType === 'report') {
        if (setup.subCategory === 'expense') {
          this.ExpenseReports.push(setup);
        } else if (setup.subCategory === 'investment') {
          this.InvestmentReports.push(setup);
        } else if (setup.subCategory === 'income') {
          this.IncomeReports.push(setup);
        }
      }
    }

    for (const setup of this.dashboardSetup) {
      for (const category of setup.categories) {
        if (setup.type === 'Expense' && category.value === 'daily') {
          category.setup = this.ExpenseDailyCharts;
        } else if (setup.type === 'Expense' && category.value === 'monthly') {
          category.setup = this.ExpenseMonthlyCharts;
        } else if (setup.type === 'Expense' && category.value === 'yearly') {
          category.setup = this.ExpenseYearlyCharts;
        } else if (setup.type === 'Expense' && category.value === 'custom') {
          category.setup = this.ExpenseCustomCharts;
        } else if (setup.type === 'Investment' && category.value === 'daily') {
          category.setup = this.InvestmentDailyCharts;
        } else if (setup.type === 'Investment' && category.value === 'monthly') {
          category.setup = this.InvestmentMonthlyCharts;
        } else if (setup.type === 'Investment' && category.value === 'yearly') {
          category.setup = this.InvestmentYearlyCharts;
        } else if (setup.type === 'Investment' && category.value === 'custom') {
          category.setup = this.InvestmentCustomCharts;
        } else if (setup.type === 'Income' && category.value === 'daily') {
          category.setup = this.IncomeDailyCharts;
        } else if (setup.type === 'Income' && category.value === 'monthly') {
          category.setup = this.IncomeMonthlyCharts;
        } else if (setup.type === 'Income' && category.value === 'yearly') {
          category.setup = this.IncomeYearlyCharts;
        } else if (setup.type === 'Income' && category.value === 'custom') {
          category.setup = this.IncomeCustomCharts;
        }
      }
    }

    for (const setup of this.reportSetup) {
      for (const category of setup.categories) {
        if (setup.type === 'Expense' && category.value === 'custom') {
          category.setup = this.ExpenseReports;
        } else if (setup.type === 'Investment' && category.value === 'custom') {
          category.setup = this.InvestmentReports;
        } else if (setup.type === 'Income' && category.value === 'custom') {
          category.setup = this.IncomeReports;
        }
      }
    }

    this.addToggles();
    this.addOptions();
  }

  clearSetup() {
    this.generalSetups = [];
    this.ExpenseDailyCharts = [];
    this.ExpenseMonthlyCharts = [];
    this.ExpenseYearlyCharts = [];
    this.ExpenseCustomCharts = [];
    this.IncomeDailyCharts = [];
    this.IncomeMonthlyCharts = [];
    this.IncomeYearlyCharts = [];
    this.IncomeCustomCharts = [];
    this.InvestmentDailyCharts = [];
    this.InvestmentMonthlyCharts = [];
    this.InvestmentYearlyCharts = [];
    this.InvestmentCustomCharts = [];
    this.ExpenseReports = [];
    this.InvestmentReports = [];
    this.IncomeReports = [];
  }

  addToggles() {
    const dashboardTogglesArray = this.dashboardForm.get('settings') as FormArray;
    dashboardTogglesArray.clear();
    this.dashboardSetup.forEach((dashboard: any) => {
      dashboard.categories.forEach((category: any) => {
        category.setup.forEach((setup: any) => {
          dashboardTogglesArray.push(this.fb.group({
            _id: setup._id,
            value: new FormControl({value: setup.value, disabled: !this.editPermission}),
            categoryName: new FormControl(setup.categoryName),
            categoryType: new FormControl(setup.categoryType),
            subCategory: new FormControl(setup.subCategory),
            duration: new FormControl(setup.duration)
          }));

          this.initialDashboardValues.push({
            _id: setup._id,
            value: setup.value,
            categoryName: setup.categoryName,
            categoryType: setup.categoryType,
            subCategory: setup.subCategory,
            duration: setup.duration
          });
        });
      });
    });

    const reportTogglesArray = this.reportForm.get('settings') as FormArray;
    reportTogglesArray.clear();
    this.reportSetup.forEach((report: any) => {
      report.categories.forEach((category: any) => {
        category.setup.forEach((setup: any) => {
          reportTogglesArray.push(this.fb.group({
            _id: setup._id,
            value: new FormControl({value: setup.value, disabled: !this.editPermission}),
            categoryName: new FormControl(setup.categoryName),
            categoryType: new FormControl(setup.categoryType),
            subCategory: new FormControl(setup.subCategory),
            duration: new FormControl(setup.duration)
          }));

          this.initialReportValues.push({
            _id: setup._id,
            value: setup.value,
            categoryName: setup.categoryName,
            categoryType: setup.categoryType,
            subCategory: setup.subCategory,
            duration: setup.duration
          });
        });
      });
    })
  }

  addOptions() {
    this.generalSetups.forEach((setup: any) => {
      const options = this.generalSetupOptions.filter((option: any) => option.field === setup.categoryName);
      setup.options = options[0].options;
    });

    const optionsArray = this.generalForm.get('settings') as FormArray;
    optionsArray.clear();
    this.generalSetups.forEach((setup: any) => {
      optionsArray.push(this.fb.group({
        _id: setup._id,
        categoryName: new FormControl(setup.categoryName),
        categoryDescription: new FormControl(setup.categoryDescription),
        value: new FormControl({value: setup.value, disabled: !this.editPermission}),
        options: new FormControl(setup.options)
      }));

      this.initialGeneralValues.push({
        _id: setup._id,
        categoryName: setup.categoryName,
        categoryDescription: setup.categoryDescription,
        value: setup.value,
        options: setup.options
      });
    });
  }

  get options(): any {
    return this.generalForm.get('settings') as FormArray;
  }

  onGeneralSetupSubmit() {
    if (this.editPermission) {
      this.store.updateUserSetup(this.generalForm.value.settings, true);
    }
  }

  onGeneralCancelSubmit() {
    const optionsArray = this.generalForm.get('settings') as FormArray;
    optionsArray.clear();
    this.initialGeneralValues.forEach((setup: any) => {
      optionsArray.push(this.fb.group({
        _id: setup._id,
        categoryName: new FormControl(setup.categoryName),
        categoryDescription: new FormControl(setup.categoryDescription),
        value: new FormControl({value: setup.value, disabled: !this.editPermission}),
        options: new FormControl(setup.options)
      }));
    });
  }

  onSubmit($event: any) {
    if (this.editPermission) {
      this.store.updateUserSetup($event.settings, false);
    }
  }

}
