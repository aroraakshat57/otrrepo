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

//test.describe.configure({ mode: "parallel" });

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
    test(`Verify whether the Search Customer functionality is working properly using test data : ${record.Vorname}${record.Nachname}`, async ({ browser },testInfo) => {
      //Search functionality of customer
     const context = await browser.newContext({ acceptDownloads: true });
      const page = await context.newPage();
      const otrApp = new otrSteps(page,testInfo);
      await otrApp.otrLogin();
      
  
      firstname = record.Vorname;
      lastname = record.Nachname;
  
      await otrApp.SearchCustomer(firstname, lastname);
      expectedresult = firstname+lastname;
      actualresult = otrSteps.custname;
      console.log("expected result: "+expectedresult);
      console.log("actual result: "+actualresult);
      expect(actualresult).toStrictEqual(expectedresult);
      
    });
  }

  test.afterEach(async () => {
    if (test.info().status! == 'passed') {
      e2eTestCaseStatus = 'PASS';
    } else {
      e2eTestCaseStatus = 'FAIL';
    }
  });
  
  test.afterAll(async () => {
    console.log(e2eTestCaseStatus);
    await commonMethods.saveE2ETestStatus(e2eTestCaseName, e2eTestCaseStatus);
  });