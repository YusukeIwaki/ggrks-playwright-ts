# playwrite-firefoxでggrksする

![ggrks](https://user-images.githubusercontent.com/11763113/73914107-e1c50c80-48fb-11ea-848c-538f547f76cd.gif)


* TypeScriptで書く
* 定形コードの検証

だけの目的。

```ts
import { Page, Browser, firefox } from "playwright-core";

const launchChrome = firefox.launch({
    // ブラウザ画面を表示しながら（ヘッドレスモードを無効にする）。
    headless: false,
});

launchChrome.then(async (browser: Browser) => {
    // 大抵のサンプルコードはここで単純に browser.newBrowserContext(), browserContext.newPage() しているだけのものが多いが、
    // ブラウザを開いたときにすでに１つタブが開いている場合には、２つ目のタブが開いてしまう。
    // それを防ぐため、すでにタブが開いている場合にはそれを使うようにする。
    let browserContext = await browser.defaultContext();
    let browserPages = await browserContext.pages();
    let page: Page = browserPages.length > 0 ? browserPages[0] : (await browserContext.newPage());


    // 自動操作するコードをここに書く
});
```

see: https://qiita.com/YusukeIwaki/items/127dba7bb7197ea8d91b
