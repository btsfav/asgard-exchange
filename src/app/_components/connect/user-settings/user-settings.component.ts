import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_classes/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  user: User;
  subs: Subscription[];
  binanceAddress: string;
  bitcoinAddress: string;
  thorAddress: string;
  loading: boolean;

  constructor(private userService: UserService) {
    const user$ = this.userService.user$.subscribe(
      async (user) => {

        if (user) {

          this.loading = true;

          this.user = user;
          this.thorAddress = user.wallet;

          if (this.user.clients && this.user.clients.binance) {
            this.binanceAddress = await this.user.clients.binance.getAddress();
          }

          if (this.user.clients && this.user.clients.bitcoin) {
            this.bitcoinAddress = await this.user.clients.bitcoin.getAddress();
          }

          this.loading = false;

        }

      }
    );
    this.subs = [user$];
  }

  ngOnInit(): void {
  }

  copyToClipboard(address: string) {
    const listener = (ev) => {
      ev.preventDefault();
      ev.clipboardData.setData('text/plain', address);
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}