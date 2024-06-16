import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-under-development',
  templateUrl: './under-development.component.html',
  styleUrls: ['./under-development.component.scss']
})
export class UnderDevelopmentComponent implements OnInit {

  commonPrefix: string = 'shared.';
  message: string = '';

  constructor(private i18n: I18nService) {}

  async ngOnInit(): Promise<void> {
    this.message = await this.i18n.translate(`${this.commonPrefix}This page is currently under development`);
  }

}
