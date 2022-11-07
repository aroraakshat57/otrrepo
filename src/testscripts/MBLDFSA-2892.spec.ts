//FSaaS Regression Test cases
import {BrowserContext, expect, test } from "@playwright/test";
import { otrSteps } from "../steps/otr/otrSteps";
import { mockSteps } from "../steps/mockOTR/mockSteps";
import path from "path";
import * as Testdata from "../testData/testdata.json";
import { CommonMethods } from "../utilities/commonMethods";
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import cryptoRandomString from "crypto-random-string";
import exp from "constants";

const directoryname = path.parse(__dirname).dir;
const records = parse(fs.readFileSync(path.join(directoryname, Testdata.common.application.OTRtestdata.testdata_FSaaS)), {
  columns: true,
  skip_empty_lines: true
});

var commonMethods = new CommonMethods();
var e2eTestCaseStatus: string;
var e2eTestCaseName = path.basename(__filename).split(".spec.ts")[0];
var anrede, firstname, lastname, dateOfBirth, mobileNum, email, street, housenum, postalcode, location, baumster, disposalDiscount, additionalCondRelative,
  additionCondAbsolute, leasingSpecialPayment, duration, totalMilege, leaseDirectCreditDetail, placeOfBirth, nationality, documentType, identificationNumber,
  placeOfIssue, dateOfIssue, validUntil, professionalStatus, netIncome, occupiedSince, maritalStatus, numOfChildren, iban: string, environmentalbonus: string, transferCost:string, vehiclename:string, country: string;
var expectedresult: any;
var actualresult: any;
var context: BrowserContext;

declare global {
  var dataDictionary: Map<string, any>;

}

global.dataDictionary = new Map();

test.describe.configure({ mode: "serial" });

test.beforeAll(async ( {browser }) => {
  console.log("Setting up the alfa environment");
  globalThis.dataDictionary.set(
    "alfaenv",
    Testdata.common.Project.runProperties.testEnvironment
  );
  context = await browser.newContext({ acceptDownloads: true});// screen:{width:1366,height:768} }
  console.log("inside beforeall "+browser.contexts().length);
});


for (const record of records) {
    test.only(`Verify whether the customer details are autopopulated correctly in Finanzdienstleistungen ${record.Vorname} ${record.Nachname}`, async ({ browser },testInfo) => {
      //From Login till PC neo direct stepss
      const context = await browser.newContext();
      const page = await context.newPage();
           
      page.setViewportSize({width: 1500, height: 690});
      
      const otrApp = new otrSteps(page,testInfo);
       
      await otrApp.otrLogin();
         
      firstname = record.Vorname;
      lastname = record.Nachname;
      baumster = record.Baumster;
      environmentalbonus = record.Umweltbonus;
      dateOfBirth = record.Geburtsdatum;
      email = record.Email;
      street = record.StraBe;
      housenum = record.Hausnummer;
      postalcode = record.PLZ;
      location = record.Ort;
      country = record.Land;
  
      await otrApp.SearchCustomer(firstname, lastname);
      await otrApp.ChooseCustomer();
      await otrApp.createNewDealConfigurator(baumster,environmentalbonus);
      expectedresult = [firstname,lastname,email,street,housenum,postalcode,location,country];
        const actualresult = await otrApp.getcustomerDataFinancialServices();
     console.log("Expected Results : "+ expectedresult);
     console.log("Actual results: "+actualresult);
     await expect(actualresult).toEqual(expectedresult);
     
          
    });
  }