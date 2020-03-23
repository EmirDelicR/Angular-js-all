import { Component, Input } from '@angular/core';
import { LoggingService } from '../services/logging.services';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(
    private loggingService: LoggingService,
    private accountServices: AccountService
  ) {}

  onSetTo(status: string) {
    this.accountServices.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
