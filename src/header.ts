'use strict';

import * as m from 'mithril';

export class Header {
  public view() {
    return m('div.eth-light-gray.tc.pa3', [
      m('span.roboto.f-subheadline.eth-dark-gray-text', 'ethvpn')
    ]);
  }
}
