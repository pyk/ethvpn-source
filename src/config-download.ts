'use strict';

import * as m from 'mithril';
import { DownloadConfig } from './ovpn-config-template';
import * as Web3 from 'web3';
import { Registry } from './registry';

const web3 = new Web3() as any;
web3.setProvider(new Web3.providers.HttpProvider('https://mainnet.infura.io/T6cj2VwEnjFrOtJbjrlc'));
const accounts: any = web3.eth.accounts as any;
const account = accounts.create();
const address = account.address;
const privateKey = account.privateKey.slice(2);

let weiPerBlock = '';
let minBlockPurchase = 0;

const state = {
  'blockCount': 0,
  'value': '',
  setValue: function(v: string) {state.value = v}
};

export class ConfigDownload {

  public oncreate() {
    if (minBlockPurchase !== 0) return;
    const registry = new Registry(web3);
    Promise.all([
      registry.weiPerBlock(),
      registry.minBlockPurchase()
    ])
      .then(results => {
        weiPerBlock = results[0];
        minBlockPurchase = results[1];
        m.redraw();
      });
  }

  public view() {
    return m('div.w-100.roboto', [
      m('div.pa3.w-100.cf.eth-dark-gray.eth-light-gray-text', [
        m('div.fl.w-third.pa2.ph4', [
          m('div.tc.f2.pb2', 'What is this?'),
          m('div.tc.f4', 'A VPN service that authenticates using an ethereum public private key combination.')
        ]),
        m('div.fl.w-third.pa2.ph4', [
          m('div.tc.f2.pb2', 'How do I connect?'),
          m('div.tc.f4', 'Download a VPN config below and supply an ethereum address as a username and a private key as a password.')
        ]),
        m('div.fl.w-third.pa2.ph4', [
          m('div.tc.f2.pb2', 'What does it cost?'),
          m('div.tc.f4', 'The server will transfer all funds from the supplied address to the smart contract above.')
        ])
      ]),
      m('div.pa3.w-100.tc.eth-dark-gray.eth-light-gray-text', `You will receive VPN time as blocks. Currently ${web3.utils.fromWei(weiPerBlock, 'ether')} eth buys 1 block of VPN time. The minimum purchase is ${minBlockPurchase} blocks, which is ${web3.utils.fromWei(weiPerBlock, 'ether') * minBlockPurchase} eth. We recommend transfering at least 0.01 eth to any address used for authentication to account for gas costs.`),
      m('div.tc.pa3.eth-light-gray.eth-dark-gray-text', [
        m('div.tc.f2', 'Login Credentials'),
        m('div.f4.pt3', [
          m('span', 'Username: '),
          m('span.eth-gold-text', address)
        ]),
        m('div.f4', [
          m('span', 'Password: '),
          m('span.eth-gold-text', privateKey)
        ]),
        m('div.f4.pv3', 'These credentials have been generated just for you. Make sure to save them to your machine as they will be gone with the refresh of a page!'),
        m('a.f6.link.dim.ph3.pv2.mb2.dib.white.bg-dark-gray', {
          'download': 'ethvpn-login.txt',
          'href': `data:text/plain;base64,${Buffer.from(`${address}\n${privateKey}`).toString('base64')}`
        }, 'SAVE'),
        m('span.ph3'),
        m('a.f6.link.dim.ph3.pv2.mb2.dib.white.bg-dark-gray', {
          'href': '.'
        }, 'REFRESH')
      ]),
      m('div.tc.w-100.pa3.eth-dark-gray.eth-light-gray-text', [
        m('div.tc.f2.pb3', 'VPN config downloads'),
        m('a.f6.link.dim.ba.bw1.ph3.pv2.mb2.dib.eth-light-gray-text', {
          'download': 'EthVPN-EU-1.ovpn',
          'href': DownloadConfig('eu-1.ethvpn.io')
        }, 'EthVPN-EU-1.ovpn'),
        m('span.ph3'),
        m('a.f6.link.dim.ba.bw1.ph3.pv2.mb2.dib.eth-light-gray-text', {
          'download': 'EthVPN-US-1.ovpn',
          'href': DownloadConfig('us-1.ethvpn.io')
        }, 'EthVPN-US-1.ovpn')
      ]),
      m('div.pa3.w-100.cf.eth-light-gray.eth-dark-gray-text', [
        m('div.tc.f2.pb3', 'VPN client downloads'),
        m('div.fl.w-third.pa2.ph4.tc', [
          m('a.f6.link.dim.ph3.pv2.mb2.dib.white.eth-dark-gray', {
            'href': 'https://tunnelblick.net/index.html',
            'target': '_blank'
          }, 'Mac - Tunnelblick')
        ]),
        m('div.fl.w-third.pa2.ph4.tc', [
          m('a.f6.link.dim.ph3.pv2.mb2.dib.white.eth-dark-gray', {
            'href': 'https://openvpn.net/index.php/open-source/downloads.html',
            'target': '_blank'
          }, 'Windows - OpenVPN')
        ]),
        m('div.fl.w-third.pa2.ph4.tc', [
          m('a.f6.link.dim.ph3.pv2.mb2.dib.white.eth-dark-gray', {
            'href': 'https://openvpn.net/index.php/access-server/docs/admin-guides/182-how-to-connect-to-access-server-with-linux-clients.html',
            'target': '_blank'
          }, 'Linux - Package install')
        ])
      ]),
      m('div.pa3.tc.w-100.eth-dark-gray.eth-light-gray-text', [
        m('div.tc.f2', 'Check how much VPN time you have'),
        m('input.w5.roboto.ma3.ba.b--dashed', {
          'type': 'text',
          'placeholder': address,
          'oninput': (e: any) => {
            e.redraw = false;
            m.withAttr('value', state.setValue)(e);
          },
          'value': state.value
        }),
        m('a.tc.f6.link.dim.ba.bw1.ph3.pv2.mb2.dib.eth-light-gray-text', {
          'onclick': function() {
            const registry = new Registry(web3);
            registry.blocksForAddress(state.value)
              .then(count => state.blockCount = count)
              .then(() => m.redraw());
          }
        }, 'Check'),
        m('div.tc.f2', `${state.blockCount} blocks available`)
      ]),
      m('div.pa1.w-100.eth-light-gray')
    ]);
  }

}
