'use strict';

import * as m from 'mithril';
import { Registry } from './registry';

export class Header {
  public view() {
    return m('div.eth-light-gray.tc.pa3.roboto.eth-dark-gray-text', [
      m('span.f-subheadline', 'ethvpn'),
      m('div.f4', 'Contract address: ', [
        m('a', {
          'href': `https://etherscan.io/address/${Registry.address()}#code`,
          'target': '_blank'
        }, Registry.address())
      ])
    ]);
  }
}
