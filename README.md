# mast-and-don
You can know Mastodon notifications without opening many tabs.

## Desciption
You can know Mastodon notifications without opening many tabs. Look at the screenshot images to know the usage.

タブを開かずにマストドンの通知を知ることができるアドオンです. 使い方は Screenshot をご覧ください.

## Required
Latest Google chrome or Firefox browser.

## How to use
First you can see the 1st tab page from the browser icon. Select the mastodon server you want to know the notifications.

ブラウザボタン（右上に表示されるアイコン）をクリックすると１つ目の画面になります. 通知を知りたいホスト名を探してください.

If you click the '+' button then this add-on indicates the auth page of mastodon server. Please authorized button. Then you can see this page.

'+' ボタンを押すと認証画面へ進みます. 'Authorize' をクリックすると２つ目の画面になるので，code（意味のない文字の羅列）部分をクリックしてください.

If the authorization task succeeded, the add-on provides notification 'Add a new host'. Wait about 20 seconds to next notification.

mastodon の認証終了後, アドオンから通知が表示されます. その後, 約 20 秒ごとに通知を表示するようになります.

### How to invalidate your token

To invalidate your access token for mastodon server, at 1st, click the '-' button for your host.

アドオン用に発行したアクセストークンを無効にするためには，まずホスト名 (mastodon.cloud など) の右側に書いてある '-' ボタンをクリックしてください.

![instruction_1](./addon/docs/revoke_a_1280x800.png)

2nd, open your mastodon with your browser, and `revoke` the add-on in the following configuration page.

次にブラウザからマストドンへアクセスし，下記設定画面から `取り消し` をクリックしてください.

![instruction_2](./addon/docs/revoke_b_1280x800.png)
![instruction_3](./addon/docs/revoke_c_1280x800.png)

For more information, see following documents.

- https://github.com/tootsuite/documentation/blob/master/Using-the-API/OAuth-details.md
- https://github.com/doorkeeper-gem/doorkeeper/wiki/API-endpoint-descriptions-and-examples

## Build instruction

- Install npm.
- Install webpack and web-ext; `npm install -g webpack web-ext`
- `npm install`
- `npm run build`
- Change your directory to `addon`
- `web-ext build`.

### firefox extension
Before do `web-ext build`, comment out `var browser = chrome;` in

- background-script.js
- popup-script.js
- content-script.js

### google chrome extension
Before do `web-ext build`, uncomment `var browser = chrome;` in

- background-script.js
- popup-script.js
- content-script.js

## License
The files in the repository are provided in MIT License except following files:

- [src/mastodon.js](https://github.com/Kirschn/mastodon.js)
- [src/mastodon.js/jquery.min.js](https://jquery.com)
- [src/uuid](https://github.com/kelektiv/node-uuid)
