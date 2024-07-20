import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent implements OnInit {

  commonPrefix: string = 'shared.';
  message: string = '';

  constructor(private i18n: I18nService) {}

  ngOnInit(): void {
    this.message = this.i18n.translate(`${this.commonPrefix}You don't have access to view this page`);
  }

}
