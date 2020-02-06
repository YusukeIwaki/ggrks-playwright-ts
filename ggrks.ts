import { Page, Browser, firefox } from "playwright-core";

const launchChrome = firefox.launch({
    // ブラウザ画面を表示しながら（ヘッドレスモードを無効にする）。
    headless: false,

    // 人間味のある速度で入力/操作する。
    slowMo: 50,
});

launchChrome.then(async (browser: Browser) => {
    // 大抵のサンプルコードはここで単純に browser.newBrowserContext(), browserContext.newPage() しているだけのものが多いが、
    // ブラウザを開いたときにすでに１つタブが開いている場合には、２つ目のタブが開いてしまう。
    // それを防ぐため、すでにタブが開いている場合にはそれを使うようにする。
    let browserContext = await browser.defaultContext();
    let browserPages = await browserContext.pages();
    let page: Page = browserPages.length > 0 ? browserPages[0] : (await browserContext.newPage());


    // 自動操作するコードをここに書く
    await page.goto("https://google.com/");
    await page.type("input[name='q']", "puppeteer");
    await page.keyboard.press("Enter");
});
