'use strict';

import * as m from 'mithril';
import { Header } from './header';
import { Footer } from './footer';
import { ConfigDownload } from './config-download';

export class Home {

  public view() {
    return m('div', [
      m(new Header()),
      m(new ConfigDownload()),
      m(new Footer())
    ]);
  }

}
