import { Page, TestInfo } from '@playwright/test';

export class HelperMethods {
    protected page: Page;
    protected testInfo: TestInfo;
    constructor(page: Page, testInfo: TestInfo) {
      this.page = page;
      this.testInfo = testInfo;
    }

    protected async iScreenshotAndHighlight(screenshotName: string, selector: string){
      await this.iWaitForPageToLoad();
    await this.page.$eval<string, HTMLElement>(selector, element => element.setAttribute('style', 'border:2px solid red; background:yellow')!);
      await this.iWaitForPageToLoad();
    await this.testInfo.attach(screenshotName, { body: await this.page.screenshot(), contentType: 'image/png' });
    
  }

  protected async iScreenshot(screenshotName: string){
    await this.iWaitForPageToLoad();  
  await this.testInfo.attach(screenshotName, { body: await this.page.screenshot(), contentType: 'image/png' });
  
}

  public async iWaitForPageToLoad() {
    await this.page.waitForSelector("//*[@class='sonic-loading']", { state: 'hidden' });
  }
  protected async iTypeWithDelay(selector: string, value: string){
    return this.page.type(selector, value,{delay: 500}) 
      }

  protected async iScrollToElement(selector: string) {
        await this.iWaitForPageToLoad();
        await this.page.$eval(selector, (element) => {
            element.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        });
    }   
}