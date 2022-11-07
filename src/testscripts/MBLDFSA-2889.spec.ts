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
  placeOfIssue, dateOfIssue, validUntil, professionalStatus, netIncome, occupiedSince, maritalStatus, numOfChildren, iban: string, environmentalbonus: string, transferCost:string;
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
    test.only(`Verify whether the vehicle search in Konfigurator is working using Baumster ${record.Baumster}`, async ({ browser },testInfo) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const otrApp = new otrSteps(page,testInfo);
        await otrApp.otrLogin();
    
        firstname = record.Vorname;
        lastname = record.Nachname;
        baumster = record.Baumster;
    
        await otrApp.SearchCustomer(firstname, lastname);
        await otrApp.ChooseCustomer();
        await otrApp.SearchVehicleBaumster(baumster);
        expectedresult = baumster;
        actualresult = otrSteps.baumsternum;
      console.log("expected result: "+baumster);
      console.log("actual result: "+ actualresult);
      expect(actualresult).toEqual(expectedresult)
    });
}