import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import INotifier from 'src/app/interfaces/INotifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private notifier: NotifierService) { }

  notify(config: INotifier) {
    this.notifier.notify(config.type, config.message);
  }
}
