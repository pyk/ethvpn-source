'use strict';

import * as m from 'mithril';

export class Footer {

  public view() {
    return m('div.tc.pa2.w-100.eth-dark-gray.absolute.bottom-0.roboto', [
      m('a', {
        'href': 'https://github.com/ethvpn-io',
        'target': '_blank'
      }, [
        m('img', {
          'src': './assets/GitHub-Mark-Light-64px.png',
          'width': 32,
          'height': 32
        })
      ]),
      m('div.pa2.eth-light-gray-text.f5', 'Copyright 2017')
    ]);
  }

}
