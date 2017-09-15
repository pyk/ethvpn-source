'use strict';

import * as Web3 from 'web3';

const CONTRACT_ADDRESS = '0x61ab321758fe7a302026b8831d1532c7c9cebe21';
const CONTRACT_INTERFACE = JSON.parse(`[{"constant":false,"inputs":[{"name":"weiValue","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newMinBlockPurchase","type":"uint256"}],"name":"setMinBlockPurchase","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"expirations","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"weiPerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newWeiPerBlock","type":"uint256"}],"name":"setWeiPerBlock","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minBlockPurchase","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"weiValue","type":"uint256"}],"name":"blocksForWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"}]`);

export class Registry {

  public contract: any;

  constructor(public web3: Web3) {
    const eth: any = web3.eth;
    this.contract = new eth.Contract(CONTRACT_INTERFACE, CONTRACT_ADDRESS);
  }

  public weiPerBlock(): Promise<string> {
    return this.contract.methods.weiPerBlock().call();
  }

  public minBlockPurchase(): Promise<number> {
    return this.contract.methods.minBlockPurchase().call();
  }

  public blocksForAddress(address: string): Promise<number> {
    return Promise.all([
      this.contract.methods.expirations(address).call(),
      this.web3.eth.getBlock('latest')
    ])
      .then((results: any[]) => {
        const blockExpiration: number = results[0];
        const block: any = results[1];
        let blocks: number = blockExpiration - block.number;
        if (blocks < 0) blocks = 0;
        return blocks;
      })
      .catch(err => 0);
  }

  public static address(): string {
    return CONTRACT_ADDRESS;
  }

}
