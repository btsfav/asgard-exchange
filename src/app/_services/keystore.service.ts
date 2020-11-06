import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { decryptFromKeystore } from '@xchainjs/xchain-crypto';
import { User } from '../_classes/user';
import { Client as binanceClient, } from '@xchainjs/xchain-binance';
import { Client as bitcoinClient, } from '@xchainjs/xchain-bitcoin';

@Injectable({
  providedIn: 'root'
})
export class KeystoreService {

  constructor() { }

  async unlockKeystore(keystore, password: string): Promise<User> {
    const phrase = await decryptFromKeystore(keystore, password);
    const network = environment.network === 'testnet' ? 'testnet' : 'mainnet';
    const blockchairUrl = (environment.network === 'testnet') ? 'https://api.blockchair.com/bitcoin/testnet' : 'https://api.blockchair.com/bitcoin';

    const userBinanceClient = new binanceClient({network, phrase});
    const userBtcClient = new bitcoinClient({network, phrase, nodeUrl: blockchairUrl, nodeApiKey: 'A___QJPUZs1cbpbK2wkKeiQoixbFnxwg'});

    return new User({
      type: 'keystore',
      wallet: keystore.address,
      keystore,
      clients: {
        binance: userBinanceClient,
        bitcoin: userBtcClient
      }
    });
  }

}
