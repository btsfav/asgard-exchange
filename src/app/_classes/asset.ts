import { CoinIconsFromTrustWallet } from 'src/app/_const/icon-list';

// export interface Asset {
//   chain: string;
//   symbol: string;
//   ticker: string;
// }

export class Asset {

  chain: string;
  symbol: string;
  ticker: string;
  iconPath: string;

  constructor(poolName: string) {
    const {chain, symbol, ticker } = this.getAssetFromString(poolName);
    this.chain = chain;
    this.symbol = symbol;
    this.ticker = ticker;

    const trustWalletMatch = CoinIconsFromTrustWallet[this.ticker];

    if (trustWalletMatch) {
      this.iconPath = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/${trustWalletMatch}/logo.png`;
    }

  }

  getAssetFromString(poolName: string): {
    chain: string;
    symbol: string;
    ticker: string;
  } {
    let chain: string;
    let symbol: string;
    let ticker: string;

    const data = poolName.split('.');
    if (poolName.includes('.')) {
      chain = data[0];
      symbol = data[1];
    } else {
      symbol = data[0];
    }
    if (symbol) {
      ticker = symbol.split('-')[0];
    }

    return { chain, symbol, ticker };
  }

}