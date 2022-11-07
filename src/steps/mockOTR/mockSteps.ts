import { Page, TestInfo } from '@playwright/test';
import { CommonMethods } from '../../utilities/commonMethods';
import cryptoRandomString from "crypto-random-string";
import { HelperMethods } from '../../utilities/helperMethods'
import * as otrselectors from '../../objectreporsitory/otr/otrSelectors.json';
import * as mockotrselectors from '../../objectreporsitory/mockotr/mockotrSelectors.json';


var commonMethods = new CommonMethods();

export class mockSteps extends HelperMethods {

    constructor(page: Page, testInfo: TestInfo) {
        super(page,testInfo)
    }


    async mockLogin() {
        // await this.page.setViewportSize({ width: 1550, height: 720 });
        console.log('Launching Mock application');
        await commonMethods.launchMockApplication();
        await this.page.goto(globalThis.dataDictionary.get('environment'));
        // Click input[name="userid"]
        await this.page.locator(otrselectors.otrloginpage.username).click();
        // Fill input[name="userid"]
        await this.page.locator(otrselectors.otrloginpage.username).fill((await commonMethods.envReader('OTR_USER_DETAILS'))!?.split(':')[0]);
        // Click button:has-text("Next")
        await this.page.locator(otrselectors.otrloginpage.NextBtn).click();
        // Fill input[name="password"]
        //await this.page.locator(otrselectors.otrloginpage.password).fill((await commonMethods.envReader('OTR_USER_DETAILS'))!?.split(':')[1]);
        await this.page.locator(otrselectors.otrloginpage.password).fill("Daimler092805#");
        await Promise.all(
            [
                this.page.waitForNavigation(),
                this.page.locator(otrselectors.otrloginpage.LogonBtn).click(),
            ]);
    }

    async pingIDAuthentication() {
        console.log('Launching ping Authenticator');
        //Navigating to POS
        //const alfaApp = new alfaSteps(this.page);
        await this.page.waitForTimeout(8000);
        await commonMethods.GetPingID();
        await this.iTypeWithDelay('input[id="otp"]', globalThis.dataDictionary.get('OTP'));
        await this.page.locator('input[id="otp"]').type(" ");
        await this.page.locator('input[value="Sign On"]').click();
        
       // await this.page.pause();

    }

    async mockotrfields(mockDataSelect:string, replaceUsername:string, relpaceNDLVP:string) {
        
        await this.page.waitForTimeout(4000);
        await this.page.locator(mockotrselectors.mockOtrPage.mockDataSelect).selectOption({label:mockDataSelect});
        await this.page.locator(mockotrselectors.mockOtrPage.replaceUsername).fill(replaceUsername);
        await this.page.locator(mockotrselectors.mockOtrPage.relpaceNDLVP).fill(relpaceNDLVP);
        await this.page.locator(mockotrselectors.mockOtrPage.sendButton).click();
        
    }

    async customerDetails(salutation: string, title: string, firstName: string, surname: string, dob: string, mobileNo: string, email: string, street: string, houseNo: string, postcode: string, city: string, country: string)
    {
       // await this.page.pause();
       console.log(salutation);
        await this.page.locator(mockotrselectors.customerDetails.salutation).selectOption({label:salutation});
        await this.page.locator(mockotrselectors.customerDetails.title).selectOption({label: title});
        await this.page.locator(mockotrselectors.customerDetails.firstName).fill(firstName);
        await this.page.locator(mockotrselectors.customerDetails.surname).fill(surname);
      //  await this.page.locator(mockotrselectors.customerDetails.dob).fill(dob);
        await this.page.locator(mockotrselectors.customerDetails.dob).click();
        // Fill dateOfBirth
        await this.page.locator(mockotrselectors.customerDetails.dob).type(dob);
        await this.page.locator(mockotrselectors.customerDetails.mobileNo).fill("+"+mobileNo);
        await this.page.locator(mockotrselectors.customerDetails.email).fill(email);
        await this.page.locator(mockotrselectors.customerDetails.street).fill(street);
        await this.page.locator(mockotrselectors.customerDetails.houseNo).fill(houseNo);
        await this.page.locator(mockotrselectors.customerDetails.postcode).fill(postcode);
        await this.page.locator(mockotrselectors.customerDetails.city).fill(city);
        await this.page.locator(mockotrselectors.customerDetails.country).selectOption({label: country});
        await this.page.locator(mockotrselectors.customerDetails.continueButton).click();

    }

}
