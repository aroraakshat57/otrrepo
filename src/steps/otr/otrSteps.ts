import { expect, Page, TestInfo } from '@playwright/test';
import { CommonMethods } from '../../utilities/commonMethods';
import cryptoRandomString from 'crypto-random-string';
import { HelperMethods } from '../../utilities/helperMethods'
import * as otrselectors from '../../objectreporsitory/otr/otrSelectors.json';
import path from "path";
import { stringify } from 'querystring';

var commonMethods = new CommonMethods();
const directoryname = path.parse(__dirname).dir;

export class otrSteps extends HelperMethods {
    static currenturl: any;
    static alfaID: any;
    static MBNum: any;
    static firstname: any;
    static lastname: any;
    static custname: string;
    static vehiclename: string;
    static baumsternum: string;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo)
    }
    async bringOtrPageToFront() {
        await this.page.bringToFront();
    }
    async otrLogin() {
        // await this.page.setViewportSize({ width: 1550, height: 720 });
        console.log('Launching Otr application');
        await commonMethods.launchOtrApplication();
        await this.page.goto(globalThis.dataDictionary.get('environment'));
        // Click input[name="userid"]
       // await this.page.locator(otrselectors.otrloginpage.username).click();
        // Fill input[name="userid"]
       // await this.page.pause();
       // await this.page.locator(otrselectors.otrloginpage.username).fill((await commonMethods.envReader('OTR_USER_DETAILS'))!?.split(':')[0]);
        // Click button:has-text("Next")
      //  await this.page.locator(otrselectors.otrloginpage.NextBtn).click();
        // Fill input[name="password"]
       // await this.page.locator(otrselectors.otrloginpage.password).fill((await commonMethods.envReader('OTR_USER_DETAILS'))!?.split(':')[1]);
       
        // await Promise.all(
        //     [
        //         this.page.waitForNavigation(),
        //         this.page.locator(otrselectors.otrloginpage.LogonBtn).click(),
        //     ]);
    }

    async documentvalidation() {
        //await this.page.pause();
        await this.page.locator(otrselectors.pcNeo.documentsUploadaccordian).click();
        var documenttype: string[];
        documenttype = ["ORG005", "CRE005", "CRE005C"];
        const row = this.page.locator('.MuiTable-root:first-child tr').count;
        console.log(row);
        await expect(this.page.locator('.MuiTable-root:first-child tr').nth(0)).toContainText('ORG005');

    }
    async createNewCustomer(anrede: string, firstname: string, lastname: string, dateOfBirth: string, mobilenum: string, email: string, street: string, housenum: string, postalcode: string, location: string) {

        //-----------Create Customer-----------------------------------------
        // Click on Create Deal/Deal Anlegen in Home page
        try {
            await this.page.locator(otrselectors.otrHomePage.createDeal).click({ timeout: 60000 });
        } catch (error) {
            console.log(error);
            if (error = "TimeoutError") {
                console.log("Timeout Exception throwed: Refresh page")
                await this.page.reload({ waitUntil: "networkidle" });
                await this.page.waitForLoadState();
                await this.page.locator(otrselectors.otrHomePage.createDeal).waitFor({ state: "visible" });
                //await this.page.locator(otrselectors.otrHomePage.createDeal).click();
                await Promise.all(
                    [
                        this.page.waitForNavigation(),
                        await this.page.locator(otrselectors.otrHomePage.createDeal).click(),
                    ]);
            }
        }


        await this.page.locator(otrselectors.findCustomer.searchCustomer).type(firstname + " " + lastname, { delay: 100 });

        // Click Search button
        await this.page.locator(otrselectors.findCustomer.searchButton).click();
        await this.page.waitForSelector(otrselectors.findCustomer.createCustomerButton);
        // await this.page.waitForTimeout(5000);
        // Click on Create Customer/Kunde anlegen button
        await this.page.locator(otrselectors.findCustomer.createCustomerButton).click();

        if (anrede == "Herr") {
            // Choose Salutation Mister/Herr on radio button
            await this.page.locator(otrselectors.createCustomer.salutationRBtnHerr).click();
        } else {
            // Choose Salutation Woman/Frau on radio button
            await this.page.locator(otrselectors.createCustomer.salutationRBtnFrau).click();
        }

        // Click input[name="firstName"]
        //await this.page.locator('input[name="firstName"]').click();

        // Fill Firstname/Vorname
        await this.page.locator(otrselectors.createCustomer.firstName).fill(firstname);

        // Click input[name="lastName"]
        //await this.page.locator('input[name="lastName"]').click();

        // Fill Lastname/Nachname
        await this.page.locator(otrselectors.createCustomer.lastName).fill(lastname);

        // Click Create customer and enter further customer data/Kunde anlegen und weitere Kundendaten eingeben
        await this.page.locator(otrselectors.createCustomer.customerDetailsEntryLink).click();

        // Click [data-testid="DateInput"]
        await this.page.locator('[data-testid="DateInput"]').click();

        // Fill Geburtsdatum/Date Of Birth
        await this.page.locator(otrselectors.createCustomer.dateOfBirth).type(dateOfBirth);

        // Click input[name="alternatePhone"]
        //await this.page.locator('input[name="alternatePhone"]').click();

        // Fill Mobilenumber/Mobil
        await this.page.locator(otrselectors.createCustomer.MobileNumber).fill("+" + mobilenum);

        // Click input[name="email"]
        //await this.page.locator('input[name="email"]').click();

        // Fill Email
        await this.page.locator(otrselectors.createCustomer.Email).fill(email);

        // Click StraBe/street
        //await this.page.locator('input[name="street"]').click();

        // Fill StraBe/street
        await this.page.locator(otrselectors.createCustomer.Street).fill(street);

        // Click input[name="houseNumber"]
        //await this.page.locator('input[name="houseNumber"]').click();

        // Fill Hausnr/HouseNumber
        await this.page.locator(otrselectors.createCustomer.HouseNumber).fill(housenum);

        // Click input[name="postalCode"]
        //await this.page.locator('input[name="postalCode"]').click();

        // Fill PLZ/postalCode
        await this.page.locator(otrselectors.createCustomer.PostalCode).fill(postalcode);

        // Click ORT/location
        //await this.page.locator('input[name="city"]').click();

        // Fill ORT/location
        await this.page.locator(otrselectors.createCustomer.Location).fill(location);

        // Click SaveOnComputer/Speichern
        await this.page.locator(otrselectors.createCustomer.SaveOnComputer).click();
        return this.page.locator('p:has-Text("Update erfolgreich")');
    }
    async NavigateToHomePage() {
        await this.page.waitForTimeout(3000);
        // Click on the otr logo to land on the Home page after creating a new customer
        await this.page.locator(otrselectors.createCustomer.OtrLogo).click();
    }
    async SearchCustomer(firstname: string, lastname: string) {
        //------------------Create Deal--------------------------------------

        // Click on Create Deal/Deal Anlegen in Home page
        //await this.page.locator('div[role="button"]:has-text("Deal anlegen")').click();
        // await this.page.locator(otrselectors.otrHomePage.createDeal).click();
        try {
            await this.page.locator(otrselectors.otrHomePage.createDeal).waitFor({ state: "visible" });
            await this.page.locator(otrselectors.otrHomePage.createDeal).click({ timeout: 10000 });
        } catch (error) {
            console.log(error);
            if (error = "TimeoutError") {
                console.log("Timeout Exception throwed: Refresh page")
                await this.page.reload({ waitUntil: "networkidle" });
                await this.page.locator(otrselectors.otrHomePage.createDeal).waitFor({ state: "visible" });
                //await this.page.locator(otrselectors.otrHomePage.createDeal).click();
                await Promise.all(
                    [
                        this.page.waitForNavigation(),
                        await this.page.locator(otrselectors.otrHomePage.createDeal).click(),
                    ]);
            }
        }

        // Fill Customer first name and lastname on Find customer search box
        await this.page.locator(otrselectors.findCustomer.searchCustomer).type(firstname + " " + lastname, { delay: 100 });
        // Click on Search button
        //await this.page.locator(otrselectors.findCustomer.searchButton).click();
        await this.page.click(otrselectors.findCustomer.searchButton);
        await this.page.waitForTimeout(4000);
        await this.page.waitForSelector('div.searchResult--97NVBQN6VlKDYQY0SfTKG', { state: "visible" });
        // await this.page.waitForTimeout(7000);
        // Click the first View Deal button of search result of customer
        const customername = await this.page.locator('div.searchResult--97NVBQN6VlKDYQY0SfTKG').nth(0).allInnerTexts();
        otrSteps.custname = customername[0].split(/\r?\n/)[0];
        return otrSteps.custname;
    }

    async ChooseCustomer() {

        //await this.page.waitForTimeout(5000);
        // Click the first View Deal button of search result of customer
        await Promise.all(
            [
                this.page.waitForNavigation(),
                this.page.locator(otrselectors.findCustomer.viewDeal).nth(0).click(),
            ]
        );
    }
    async createNewDealConfigurator(baumster: string, environmentalbonus: string) {
        //await this.page.pause();
        // Click Create deal/Deal anlegen
        await this.page.locator(otrselectors.CustomerlandingPage.createDealLink).click();

        await this.page.waitForTimeout(4000);
        await this.page.waitForLoadState("networkidle");

        try {
            await this.page.locator(otrselectors.CustomerlandingPage.konfiguratorTile).waitFor({ state: "visible" });
            await this.page.waitForTimeout(4000);
            // Click Configurator/Konfigurator tile
            await this.page.locator(otrselectors.CustomerlandingPage.konfiguratorTile).nth(0).click({ delay: 200 });
        } catch (error) {
            console.log(error);
            if (error = "TimeoutError") {
                console.log("Timeout Exception throwed: Refresh page")
                await this.page.reload();
                await this.page.waitForLoadState('networkidle');
                await this.page.locator(otrselectors.CustomerlandingPage.konfiguratorTile).waitFor({ state: "visible" });
                await Promise.all(
                    [
                        //this.page.waitForSelector(otrselectors.CustomerlandingPage.konfiguratorTile),
                        this.page.waitForLoadState('networkidle'),
                        await this.page.waitForTimeout(4000),
                        // Click Configurator/Konfigurator tile
                        this.page.locator(otrselectors.CustomerlandingPage.konfiguratorTile).nth(0).click()
                    ]
                );

            }
        }

        // Click [placeholder="Fahrzeugsuche"]
        //await this.page.locator('[placeholder="Fahrzeugsuche"]').click();
        // await this.page.pause();
        //await this.page.waitForTimeout(3000);
        // Fill Vehicle Search/ Fahrzeugsuche
        //await this.page.locator(otrselectors.configuratorUi.vehicleSearch).fill(baumster);
        try {
            await Promise.all(
                [
                    this.page.waitForLoadState(),
                    await this.page.click(otrselectors.configuratorUi.vehicleSearch)
                ]
            );
        } catch (error) {
            if (error = "TimeoutError") {
                console.log("Timeout Exception throwed: Refresh page")
                await this.page.reload();
                await this.page.waitForLoadState('networkidle');
                await this.page.locator(otrselectors.configuratorUi.vehicleSearch).click();
            }
        }
        await this.page.locator(otrselectors.configuratorUi.vehicleSearch).type(baumster);
        await this.page.locator('i.icon-search').click();
        await this.page.waitForTimeout(5000);
        this.page.waitForSelector(otrselectors.configuratorUi.vehicleSearchResult);
        //Click on the result after search
        const vehiclenamearray = await this.page.locator(otrselectors.configuratorUi.vehicleSearchResult).allInnerTexts();
        await Promise.all(
            [
                this.page.waitForNavigation(),
                this.page.locator(otrselectors.configuratorUi.vehicleSearchResult).nth(0).click(),
            ]
        );
        //const vehiclenamearray = await this.page.locator(otrselectors.configuratorUi.vehicleSearchResult).allInnerTexts();
        console.log(vehiclenamearray);
        otrSteps.vehiclename = vehiclenamearray[0].split(/\r?\n/)[1];
        console.log(otrSteps.vehiclename);
        await this.page.waitForTimeout(6000);
        //Click on the result after search
        //await this.page.locator(otrselectors.configuratorUi.vehicleSearchResult).nth(0).click();
        await this.page.waitForSelector(otrselectors.configuratorUi.configurationOverviewBtn);
        // Click Configuration Overview/Konfigurationsübersicht
        await this.page.locator(otrselectors.configuratorUi.configurationOverviewBtn).click();

        if (environmentalbonus !== "Nein") {
            // Click text=Modifikation
            await this.page.locator('text=Modifikation').click();
            // Click text=Neue Zeile hinzufügen
            await this.page.locator('text=Neue Zeile hinzufügen').click();
            // Fill Code
            await this.page.locator('div.codeField--OVqxBbkT_Xep7xQkdVvE').last().click();
            await this.page.locator('div.codeField--OVqxBbkT_Xep7xQkdVvE').last().type('DMZ', { delay: 100 });
            // Fill Description/Beschreibung
            await this.page.locator('div.descriptionField--T_d5STuj54ZNjUg8vRSY').last().click();
            await this.page.locator('div.descriptionField--T_d5STuj54ZNjUg8vRSY').last().type('Vertriebssteuercode Elektrofahrzeug', { delay: 100 });
            // Fill NetPrice/Preis (Netto)
            await this.page.locator('div.priceField--z3PH_mJn6UwK1pgXZvBj').last().click();
            await this.page.locator('div.priceField--z3PH_mJn6UwK1pgXZvBj').last().type('0,00', { delay: 100 });
            // Click text=Zum Deal hinzufügen
            await this.page.locator('text=Zum Deal hinzufügen').click();

        } else {
            await this.page.waitForSelector(otrselectors.configuratorUi.addToDealBtn);
            // Click Add To Deal/Zum Deal hinzufügen
            await Promise.all(
                [
                    //await this.page.waitForNavigation(),
                    this.page.locator(otrselectors.configuratorUi.addToDealBtn).click(),
                ]
            );
            // await this.page.waitForTimeout(3000);
        }
    }

    async addPricingInformation(disposalDiscount: string, additionalCondRelative: string, additionCondAbsolute: string, transferCost: string) {
        //await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(5000);
        // Click Pricing Information/Preisangaben tile
        await this.page.locator(otrselectors.CustomerlandingPage.pricingInformation).click();
        await this.page.click(otrselectors.CustomerlandingPage.pricingInformation);

        // Click In percent in Quantity/disposal discount
        //await this.page.locator('text=In Prozent % >> [placeholder="\\30 \\,00"]').click();

        // Fill In percent in Quantity/disposal discount
        await this.page.locator(otrselectors.pricingInformation.disposalDiscount).fill(disposalDiscount);

        // Click text=Zusatzkonditionen relativ % >> [placeholder="\30 \,00"]
        //await this.page.locator('text=Zusatzkonditionen relativ % >> [placeholder="\\30 \\,00"]').click();

        // Fill Additional conditions relative/Zusatzkonditionen relativ
        await this.page.locator(otrselectors.pricingInformation.additionalCondRelative).fill(additionalCondRelative);

        // Click text=Fix % >> [placeholder="\30 \,00"]
        //await this.page.locator('text=Fix % >> [placeholder="\\30 \\,00"]').click();

        // Fill Additional conditions absolutely/Zusatzkonditionen absolut
        await this.page.locator(otrselectors.pricingInformation.additionCondAbsolute).fill(additionCondAbsolute);

        //Choose value in Transfer Cost
        await this.page.locator(otrselectors.pricingInformation.transfercost).selectOption({ value: "inHouse" });
        // Click Save and Close/Speichern und schließen
        await this.page.waitForTimeout(3000);
        await this.page.locator(otrselectors.pricingInformation.saveAndCloseBtn).click();
        await this.page.waitForTimeout(5000);
    }
    async addFinancialServices() {
        await this.page.waitForTimeout(5000);
        // Click Financial Services/Finanzdienstleistungen tile
        await this.page.locator(otrselectors.CustomerlandingPage.financialServices).waitFor({ state: "attached" });
        await this.page.waitForTimeout(4000);
        await this.page.locator(otrselectors.CustomerlandingPage.financialServices).click();

        await this.page.waitForTimeout(7000);
        await Promise.all(
            [
                this.page.waitForLoadState(),
                // Click save-and-go-to-unite
                await this.page.locator(otrselectors.financialServices.saveAndGoToUnite).click(),
                await this.page.waitForTimeout(3000),
                await this.iScreenshot("IsNavigatedToPOS")
            ]
        );
        await this.page.waitForTimeout(8000);

        //const elemetavailable = await this.page.locator('p:has-text("Die Kommunikation mit den Finanzdienstleistungen ist derzeit leider nicht möglich.")').isVisible();
        //console.log(elemetavailable);
        // return elemetavailable;
    }
    async pingIDAuthentication() {
        //Navigating to POS
        //const alfaApp = new alfaSteps(this.page);
        await this.page.waitForTimeout(8000);
        await commonMethods.GetPingID();
        await this.iTypeWithDelay('input[id="otp"]', globalThis.dataDictionary.get('OTP'));
        await this.page.locator('input[id="otp"]').type(" ");
        await this.page.locator('input[value="Sign On"]').click();

    }

    //This is for mock otr login used if otr is down
    //async loginMockOtr(){
    // Select 100000045829
    //await this.page.locator('select[name="mockId"]').selectOption('100000045829');
    // Click input[name="userName"]
    // await this.page.locator('input[name="userName"]').click();
    // Fill input[name="userName"]
    //  await this.page.locator('input[name="userName"]').fill('JKALLUM');
    // Click input[name="ndlvp"]
    // await this.page.locator('input[name="ndlvp"]').click();
    // Fill input[name="ndlvp"]
    //await this.page.locator('input[name="ndlvp"]').fill('20199');
    // Click button:has-text("Send Mock Data")
    // await this.page.locator('button:has-text("Send Mock Data")').click();
    //}

    async navigateToPOS(leasingSpecialPayment: string, duration: string, totalMilege: string, leaseDirectCreditDetail: string) {

        // Click [aria-label="Add"]
        await this.page.locator(otrselectors.financialServices.posAddBtn).click({
            modifiers: ['Control']
        });
        // Click Leasing (MBLD) hinzufügen option
        await this.page.locator(otrselectors.financialServices.leasingMBLDoption).click();
        // Click text=Leasing-Sonderzahlung Wenn zu Beginn eine optionale Leasing-Sonderzahlung geleis >> input[type="text"]
        //await this.page.locator('text=Leasing-Sonderzahlung Wenn zu Beginn eine optionale Leasing-Sonderzahlung geleis >> input[type="text"]').click();
        // Fill Leasing special payment
        await this.page.locator(otrselectors.kalkulationHinzifugen.leasingSpecialPayment).fill(leasingSpecialPayment);
        // Select Duration
        await this.page.locator(otrselectors.kalkulationHinzifugen.duration).selectOption(duration);
        // Select Total milege
        await this.page.locator(otrselectors.kalkulationHinzifugen.totalMilege).selectOption(totalMilege);
        // Click input[type="text"] >> nth=1
        //await this.page.locator('input[type="text"]').nth(1).click();
        // Fill Lease Direct Credit - Retail (net)
        await this.page.locator(otrselectors.kalkulationHinzifugen.leaseDirectCreditDetail).fill(leaseDirectCreditDetail);
        // Click button:has-text("Kalkulation hinzufügen")
        await this.page.waitForTimeout(3000);
        //await this.page.pause();
        //Click on Add Calculation
        //await this.page.locator('button > wb-icon[name="bds/chevron-right/24"]').click();
        await this.page.locator(otrselectors.kalkulationHinzifugen.addCalculation).click();
        await this.page.locator(otrselectors.kalkulationHinzifugen.addCalculation).click();
        // Click To the application/Zum Antrag button
        await this.page.waitForTimeout(3000);
        await this.page.locator(otrselectors.financialServices.toTheApplication).nth(2).click();
    }
    //Enter the CustomerData/Kundendaten details
    async enterCustomerdata(dateOfBirth: string, mobileNumber: string) {
        await this.page.waitForTimeout(8000);
        await this.page.locator(otrselectors.posCustomerData.dateOfBirth).click();
        // Fill dateOfBirth
        await this.page.locator(otrselectors.posCustomerData.dateOfBirth).type(dateOfBirth);
        // Click input[name="phoneNumber"]
        //await this.page.locator('input[name="phoneNumber"]').click();
        // Fill Mobil/phoneNumber
        await this.page.locator(otrselectors.posCustomerData.mobileNumber).fill("+" + mobileNumber);
        // Click text=Weiter
        await this.page.waitForTimeout(3000);
        await this.page.locator(otrselectors.posCustomerData.continueBtn).click();
        // Click button:has-text("Weiter")
        await this.page.waitForTimeout(3000);
    }
    //Identifikation details UI
    async enterIdentifikationdetails(placeOfBirth: string, nationality: string, documentType: string, identificationNumber: string, placeOfIssue: string, dateOfIssue: string, validUntil: string) {
        // Click input[name="placeOfBirth"]
        //await this.page.locator('input[name="placeOfBirth"]').click();

        // Fill Geburtsort/placeOfBirth
        await this.page.locator(otrselectors.posIdentificationDetails.placeOfBirth).fill(placeOfBirth);
        // Select Nationality/Staatsangehörigkeit
        await this.page.locator(otrselectors.posIdentificationDetails.nationality).selectOption({ label: nationality });
        //Select Dokumententyp/Document type
        await this.page.locator(otrselectors.posIdentificationDetails.documentType).selectOption({ label: documentType });
        // Click input[name="identificationNumber"]
        //await this.page.locator('input[name="identificationNumber"]').click();
        // Fill Ausweisnummer/identificationNumber
        await this.page.locator(otrselectors.posIdentificationDetails.identificationNumber).fill(identificationNumber);
        // Click input[name="placeOfIssue"]
        //await this.page.locator('input[name="placeOfIssue"]').click();
        // Fill Ausstellungsort/placeOfIssue
        await this.page.locator(otrselectors.posIdentificationDetails.placeOfIssue).fill(placeOfIssue);
        //Click on date field
        await this.page.locator(otrselectors.posIdentificationDetails.dateOfIssue).click();
        // Fill Ausstellungsdatum/dateOfIssue
        await this.page.locator(otrselectors.posIdentificationDetails.dateOfIssue).type(dateOfIssue);
        //Clikc on date field
        await this.page.locator(otrselectors.posIdentificationDetails.validUntil).click();
        // Fill Gültig bis/validUntil
        await this.page.locator(otrselectors.posIdentificationDetails.validUntil).type(validUntil);
        // Click on the check box
        // await this.page.locator('input[name="infoChecked"]').click();
        await this.page.locator(otrselectors.posIdentificationDetails.checkbox).click();
        // Click Continue button
        await this.page.locator(otrselectors.posIdentificationDetails.continueBtn).click();
    }

    //Enter details in Bonitätsdaten/Credit Data
    async enterBonitatsdaten(professionalStatus: string, netIncome: string, occupiedSince: string, maritalStatus: string, numOfChildren: string) {

        // Select Berufsstatus/Professional Status
        await this.page.locator(otrselectors.posCreditdata.professionalStatusDrp).selectOption({ label: professionalStatus });

        // Fill Mtl. Nettoeinkommen/NetIncome
        await this.page.locator(otrselectors.posCreditdata.netIncome).fill(netIncome);

        await this.page.locator(otrselectors.posCreditdata.occupiedSince).click();
        // Fill In der aktuellen Firma seit?/In der aktuellen Firma seit?
        await this.page.locator(otrselectors.posCreditdata.occupiedSince).type(occupiedSince);

        // Select Familienstand/Marital Status
        await this.page.locator(otrselectors.posCreditdata.maritalStatus).selectOption({ label: maritalStatus });

        // Select Number Of Children
        await this.page.locator(otrselectors.posCreditdata.numberOfChildredDrp).selectOption({ label: numOfChildren });
        await this.page.locator(otrselectors.posCreditdata.continueBtn).click();
    }

    //----------------------------------------Kontoinformation---------------------------------------
    //Enter the details in Kontoinformation
    async enterAccountInformation(iban: string) {

        // Fill iban number
        await this.page.locator(otrselectors.posAccountInformation.iban).fill(iban);

        // Check on the check box
        await this.page.locator(otrselectors.posAccountInformation.checkbox).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(otrselectors.posAccountInformation.startCreditCheckBtn).click();
    }

    //---------------------------------------Bonitatsprufung------------------------------------
    async posCreditCheck() {
        await this.page.bringToFront();
        await this.page.waitForTimeout(7000);
        // Click Continue/Weiter buttons
        await this.page.locator(otrselectors.posCreditCheck.continueBtn).click();


    }
    //---------------------------------------Zusammenfassung------------------------------------

    async posSummary() {
       // await this.page.pause();
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            await this.page.locator(otrselectors.posSummary.downloadAndSignApplnBtn).click()
        ]);
           const downpath = await download.path();
           console.log(downpath);
           console.log(directoryname);
           const downloadsfolder = directoryname.replace('steps','downloads');
           const suggestedFileName = download.suggestedFilename();
           const filePath =downloadsfolder+ '/' + suggestedFileName
           console.log("File Download Path : "+filePath);
           await download.saveAs(filePath);
           
           //download.saveAs(downloadsfolder+suggestedFileName);
           
           //console.log("File download path: "+downloadsfolder);
        // Click Download and Sign the Application/Antrag herunterladen & signieren
        //   await this.page.locator(otrselectors.posSummary.downloadAndSignApplnBtn).click();
        await this.page.waitForTimeout(3000);
    }
    async getAlfaID() {

        otrSteps.currenturl = this.page.url();
        console.log(otrSteps.currenturl);
        var temparray: string[];
        temparray = otrSteps.currenturl.split('/');
        otrSteps.alfaID = temparray[4];
        console.log(otrSteps.alfaID);
        // await this.page.pause();
        return otrSteps.currenturl;
        //return otrSteps.alfaID;
    }
    /* async changeurltointp(){
        
        const newurl = url.replace('intm-posv.mercedes-benz-bank.de/antrag', 'intp-partnerconnect.mercedes-benz-bank.de/app/contract');
        console.log(newurl);
    } */
    async navigatetopartnerconnect() {
        console.log("Switch tab to POS")
        //await this.page.bringToFront();
        await this.page.locator(otrselectors.posStarMomentsUi.navigateToPartnerConnectBtn).click();
        await this.page.waitForTimeout(5000);
    }
    async changeurltointp() {
        const newurl = otrSteps.currenturl.replace('intm-posv.mercedes-benz-bank.de/antrag', 'intp-partnerconnect.mercedes-benz-bank.de/app/contract');
        //await this.page.waitForTimeout(4000);
        //await this.page.pause();
        console.log(newurl);
        // Go to https://intp-partnerconnect.mercedes-benz-bank.de/app/contract/1100011724
        await this.page.goto(newurl);
        await this.page.waitForTimeout(8000);
    }
    async saveAlfaID() {

        //write AlfaID into JSON file
        commonMethods.savingalfaIDNumIntoTestData(otrSteps.alfaID);
    }
    async EnterMBNumber() {
        await this.page.bringToFront();
        //otrSteps.MBNum = otrSteps.alfaID.replace('000', '0');
        const MBfirst = "022297";
        otrSteps.MBNum = MBfirst + cryptoRandomString({ length: 4, type: 'numeric' });

        // Click ContractFunctions/DokumenteFunktionen zum Vertrag button
        await this.page.locator(otrselectors.pcNeo.contractFunctionsBtn).click();

        // Click text=Dokumente hochladen- frm us
        //await this.page.locator('text=Dokumente hochladen').click();

        // await this.page.locator('text=Dateien durchsuchen').click();

        // Click SumbitMBA/MBA übermitteln option
        await this.page.locator(otrselectors.pcNeo.submitMBA).click();

        // // Click MB Order Number textbox/ MB-Auftragsnummer
        await this.page.locator(otrselectors.pcNeo.mbOrderNumbertbx).click();

        // // Fill MB Order Number textbox/ MB-Auftragsnummer
        await this.page.locator(otrselectors.pcNeo.mbOrderNumbertbx).fill(otrSteps.MBNum);

        // Click OK Buttons
        await this.page.locator(otrselectors.pcNeo.OkBtn).click();
    }

    async uploadDocuments() {

        const filepath0 = './src/testData/testing_file.pdf';
        var doctype: string[];
        doctype = ["CONTRACT_COPY", "LEGITIMATION", "PROOF_OF_INCOME"];
        for (let i = 0; i < doctype.length; i++) {
            // Click text=DokumenteFunktionen zum Vertrag >> button
            await this.page.locator(otrselectors.pcNeo.contractFunctionsBtn).click();
            // Click To Upload Documents/Dokumente hochladen option
            await this.page.locator(otrselectors.pcNeo.toUploadDocuments).click();
            await this.page.setInputFiles(otrselectors.pcNeo.setInputFileslocator, [filepath0]);
            //await this.page.pause();
            await this.page.locator('select:near(wb-icon[name="bds/caret-down/24"])').selectOption(doctype[i]);
            //await this.page.locator(otrselectors.pcNeo.pleaseChoosedoctype).selectOption(doctype[i]);
            await this.page.waitForTimeout(2000);
            await this.page.locator(otrselectors.pcNeo.uploadDocumentsBtn).scrollIntoViewIfNeeded();
            await this.page.locator(otrselectors.pcNeo.uploadDocumentsBtn).click();
            await this.page.waitForTimeout(7000);
        }
    }

    async uploadSingleDocuments() {
        await this.page.bringToFront();
        const filepath0 = './src/testData/testing_file.pdf';
        var doctype: string[];
        doctype = ["PROOF_OF_INCOME"];
        for (let i = 0; i < doctype.length; i++) {
            // Click text=DokumenteFunktionen zum Vertrag >> button
            await this.page.locator(otrselectors.pcNeo.contractFunctionsBtn).click();
            // Click To Upload Documents/Dokumente hochladen option
            await this.page.locator(otrselectors.pcNeo.toUploadDocuments).click();
            await this.page.setInputFiles(otrselectors.pcNeo.setInputFileslocator, [filepath0]);
            await this.page.locator(otrselectors.pcNeo.pleaseChoosedoctype).selectOption(doctype[i]);
            await this.page.waitForTimeout(2000);
            await this.page.locator(otrselectors.pcNeo.uploadDocumentsBtn).click();
            await this.page.waitForTimeout(7000);
        }
    }

    async SaveMBNumber() {
        commonMethods.savingMBNumIntoTestData(otrSteps.MBNum);
    }

    async verifyTheDocumentsReceivedInPcNeo() {
        await this.page.locator(otrselectors.pcNeo.documentsUploadaccordian).click();
        this.page.locator('.MuiTable-root:first-child tr')
    }
    async SearchVehicleBaumster(baumster: string) {

        // Click Create deal/Deal anlegen
        await this.page.locator(otrselectors.CustomerlandingPage.createDealLink).click();

        await this.page.waitForTimeout(9000);
        // Click Configurator/Konfigurator tile
        await this.page.locator(otrselectors.CustomerlandingPage.konfiguratorTile).nth(0).click();
        this.page.waitForLoadState('load');
        // Click [placeholder="Fahrzeugsuche"]
        //await this.page.locator('[placeholder="Fahrzeugsuche"]').click();
        // await this.page.pause();
        await this.page.waitForTimeout(3000);
        // Fill Vehicle Search/ Fahrzeugsuche
        //await this.page.locator(otrselectors.configuratorUi.vehicleSearch).fill(baumster);
        await Promise.all(
            [
                this.page.waitForLoadState('load'),
                await this.page.locator(otrselectors.configuratorUi.vehicleSearch).click()
            ]
        );
        await this.page.locator(otrselectors.configuratorUi.vehicleSearch).type(baumster);
        await this.page.locator('i.icon-search').click();
        //await this.page.pause();
        const vehiclenamearray = await this.page.locator(otrselectors.configuratorUi.vehicleSearchResult).allInnerTexts();
        console.log(vehiclenamearray);
        otrSteps.baumsternum = vehiclenamearray[0].split(/\r?\n/)[0];
        console.log(otrSteps.baumsternum);
    }

    async getcustomerDataFinancialServices() {
        await this.page.waitForTimeout(5000);
        // Click Financial Services/Finanzdienstleistungen tile
        await this.page.locator(otrselectors.CustomerlandingPage.financialServices).waitFor({ state: "visible" });
        await Promise.all(
            [
                this.page.waitForNavigation(),
                await this.page.locator(otrselectors.CustomerlandingPage.financialServices).click()
            ]
        );
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('load',{timeout:120000});
        await this.page.waitForLoadState("networkidle",{timeout:120000});
        await this.page.locator(otrselectors.financialServices.custfirstname).waitFor({state:'visible',timeout:5000});
        await this.page.waitForSelector(otrselectors.financialServices.custfirstname);
        const custfirstname = await this.page.locator(otrselectors.financialServices.custfirstname).inputValue();
        const custlastname = await this.page.locator(otrselectors.financialServices.custlastname).inputValue();
        const custemail = await this.page.locator(otrselectors.financialServices.custemail).inputValue();
        const custStreet = await this.page.locator(otrselectors.financialServices.custStreet).inputValue();
        const custHouseNum = await this.page.locator(otrselectors.financialServices.custHouseNum).inputValue();
        const custpostalcode = await this.page.locator(otrselectors.financialServices.custpostalcode).inputValue();
        const custCity = await this.page.locator(otrselectors.financialServices.custCity).inputValue();
        const custCountrytemp = await this.page.locator(otrselectors.financialServices.custCountry).allInnerTexts();
        const custCountry = custCountrytemp[0];
        const customerdetails = [custfirstname, custlastname, custemail, custStreet, custHouseNum, custpostalcode, custCity, custCountry];
        console.log(customerdetails);
        return customerdetails;
    }
}
