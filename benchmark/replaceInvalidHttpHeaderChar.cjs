/* eslint-disable @typescript-eslint/no-var-requires */
const utility = require('../');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
let str1_10 = [];
let str2_10 = [];
let str3_10 = [];

for (let i = 0; i < 10; i++) {
  str1_10.push(String.fromCharCode(i + 32));
  str2_10.push(String.fromCharCode(i + 32));
  str3_10.push(String.fromCharCode(i + 32));
}

str1_10.splice(1, 1, '中文');
str2_10.splice(3, 1, '中文');
str3_10.splice(5, 1, '中文');

str1_10 = str1_10.join('');
str2_10 = str2_10.join('');
str3_10 = str3_10.join('');

let str1_1000 = [];
let str2_1000 = [];
let str3_1000 = [];
for (let i = 0; i < 1000; i++) {
  str1_1000.push(String.fromCharCode(i % 80 + 32));
  str2_1000.push(String.fromCharCode(i % 80 + 32));
  str3_1000.push(String.fromCharCode(i % 80 + 32));
}

str1_1000.splice(10, 1, '中文');
str2_1000.splice(100, 1, '中文');
str3_1000.splice(800, 1, '中文');

str1_1000 = str1_1000.join('');
str2_1000 = str2_1000.join('');
str3_1000 = str3_1000.join('');

// console.info('===>', utility.replaceInvalidHttpHeaderChar(str1_10));
// console.info('===>', utility.replaceInvalidHttpHeaderChar(str1_1000));

const headers = {};
const headers_invalid = {};

headers.Host = 'my.foo.com';
headers.Connection = 'keep-alive';
headers.Accept = 'text/html, */*; q=0.01';
headers['X-Requested-With'] = 'XMLHttpRequest';
headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36';
headers.Referer = 'https://my.alipay.com/portal/i.htm';
headers['Accept-Encoding'] = 'gzip, deflate, sdch, br';
headers['Accept-Language'] = 'zh-CN,zh;q=0.8,en;q=0.6';
headers.Cookie = 'cna=Aq7qEKDcuSsCASp4SdAqdtIE; LOCALE=zh_CN; ZAUTH_REST_LOGIN_INFO=1111111111111111111111111122222222222222222222222222223333333333333aaaaaaaaaaaaaaaaaaaaaddddddddddddddddddbbbbbbbbbbbbbbbbb333333333333bbbbbbbbbbbbbbbbbbbbbbbbbddddddddddddddddddddbbbbbbbbbbbbbbbbbbbb333333333333333333333333333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333kkkkkkkkkkkkkzzzzzzzzzzzzzdddddddddddddddddddddddddkkkkkkkkkkkkkkkkkkkk3333333333333333333kkkkkkkkkkkkkkkkkkkkkkk; ABCDEFGAAAUTHJSESSIONID=DDFSFSFSFSFEESFSDFSDFSFyD1zyhINADBCDDDDBB; mobileSendTime=-1; credibleMobileSendTime=-1; ctuMobileSendTime=-1; riskMobileBankSendTime=-1; riskMobileAccoutSendTime=-1; riskMobileCreditSendTime=-1; riskCredibleMobileSendTime=-1; riskOriginalAccountMobileSendTime=-1; aeofen=kA6t-uV3HlfVbpLt; LoginForm=testabc_login_auth; bjklmnd="K1iSL1mlXoWjQ8nVYGjtRnfEXYkS/VRtvnHvn5jXMRU1IkwUm44hgEQa"; CLUB_ALIPAY_COM=11238849458323234950303; iw.userid="K23iML1mlBoDjE8nVEGEtBg=="; tt_apache_tracktmp="uid=11238849458323234950303"; session.cookieNameId=ABCDEFGAAAUTHJSESSIONID; CHAIR_SESS=K12iO619fABDFHGGKHKDIDO_wEsrVBE-ddeftrE3hh_R1mMywjYorRhLQ823aOAvkxKVL_vlB56DDPElcBYwsduFu2sDEFLX9zyHyeIzsBidDcBSLB_Cdj62Yyh5passfedpzI2hUSTRsylVTCc5n2deddf==; ABCDEFGAAAUTHJSESSIONID.sig=3Gr3S-Hwd6-YWX56jsdfswDEGEEGzBHlNHnlsUlaC_CaNU; ABCDEFGAAAUTHJSESSIONID=RZ04Xc6XMGCQHGA5stpwlJougOFFeAauthBD00AD22; bone=VZ11A; spanner=49GKop+ywXeMAfFDEeVDDshSF/xD/mjdv';

Object.keys(headers).forEach(key => {
  headers_invalid[key] = headers[key] + '中文';
});

Object.keys(headers_invalid).forEach(key => {
  console.info(utility.replaceInvalidHttpHeaderChar(headers_invalid[key]));
});

suite
  .add('utility.replaceInvalidHttpHeaderChar(str1_10)', () => {
    utility.replaceInvalidHttpHeaderChar(str1_10);
  })
  .add('utility.replaceInvalidHttpHeaderChar(str2_10)', () => {
    utility.replaceInvalidHttpHeaderChar(str2_10);
  })
  .add('utility.replaceInvalidHttpHeaderChar(str3_10)', () => {
    utility.replaceInvalidHttpHeaderChar(str3_10);
  })
  .add('utility.replaceInvalidHttpHeaderChar(str1_1000)', () => {
    utility.replaceInvalidHttpHeaderChar(str1_1000);
  })
  .add('utility.replaceInvalidHttpHeaderChar(str2_1000)', () => {
    utility.replaceInvalidHttpHeaderChar(str2_1000);
  })
  .add('utility.replaceInvalidHttpHeaderChar(str3_1000)', () => {
    utility.replaceInvalidHttpHeaderChar(str3_1000);
  }).
  add('utility.relaceInvalidHttpHeaderChar(real_headers)', () => {
    Object.keys(headers).forEach(key => {
      utility.replaceInvalidHttpHeaderChar(headers[key]);
    });
  }).
  add('utility.relaceInvalidHttpHeaderChar(real_headers_invalid)', () => {
    Object.keys(headers_invalid).forEach(key => {
      utility.replaceInvalidHttpHeaderChar(headers_invalid[key]);
    });
  })
// add listeners
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log('done');
  })
  .run({ async: false });
// $ node benchmark/string.js
// utility.replaceInvalidHttpHeaderChar(str1_10) x 1,310,312 ops/sec ±1.03% (87 runs sampled)
// utility.replaceInvalidHttpHeaderChar(str2_10) x 1,309,274 ops/sec ±1.35% (86 runs sampled)
// utility.replaceInvalidHttpHeaderChar(str3_10) x 1,332,818 ops/sec ±1.22% (88 runs sampled)
// utility.replaceInvalidHttpHeaderChar(str1_1000) x 29,391 ops/sec ±1.41% (90 runs sampled)
// utility.replaceInvalidHttpHeaderChar(str2_1000) x 27,842 ops/sec ±1.29% (83 runs sampled)
// utility.replaceInvalidHttpHeaderChar(str3_1000) x 26,905 ops/sec ±1.63% (85 runs sampled)
// utility.relaceInvalidHttpHeaderChar(real_headers) x 85,277 ops/sec ±1.34% (83 runs sampled)
// utility.relaceInvalidHttpHeaderChar(real_headers_invalid) x 16,691 ops/sec ±1.14% (88 runs sampled)
