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
console.log(directoryname);
const newpath = path.join(directoryname, Testdata.common.application.OTRtestdata.testdata_FSaaS);
console.log("New path: "+newpath);
const records = parse(fs.readFileSync(path.join(directoryname, Testdata.common.application.OTRtestdata.testdata_FSaaS)), {
  columns: true,
  skip_empty_lines: true
});

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//   path: newpath,
//   append: true,
//   header: [
//        {id: 'status', title: 'STATUS'}
//   ]
// });

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
    test(`Verify whether create new customer is working properly with : ${record.Vorname}${record.Nachname}`, async ({ browser },testInfo) => {
      //Create New Customer
      const context = await browser.newContext({ acceptDownloads: true });
      const page = await context.newPage();
      const otrApp = new otrSteps(page,testInfo);
      await otrApp.otrLogin();
      
      anrede = "Frau";
      firstname = record.Vorname;
      lastname = record.Nachname;
      dateOfBirth = record.Geburtsdatum;
      mobileNum = record.Mobilnummer;
      email = record.Email;
      street = record.StraBe;
      housenum = record.Hausnummer;
      postalcode = record.PLZ;
      location = record.Ort;
  
      await (await otrApp.createNewCustomer(anrede, firstname, lastname, dateOfBirth, mobileNum, email, street, housenum, postalcode, location)).isVisible();    
    });
  }
  test.afterEach(async () => {
    if (test.info().status! == 'passed') {
      e2eTestCaseStatus = 'PASS';
      //await commonMethods.savingteststatus("pass");
    } else {
      e2eTestCaseStatus = 'FAIL';
    }
                     
    // const output =[{status: e2eTestCaseStatus}];
    // csvWriter.writeRecords(output).then(()=> console.log('The CSV file was written successfully'));
  
  });