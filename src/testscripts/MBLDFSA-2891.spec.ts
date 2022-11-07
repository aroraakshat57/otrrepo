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
const records = parse(fs.readFileSync(path.join(directoryname, Testdata.common.application.OTRtestdata.testdata_2891)), {
  columns: true,
  skip_empty_lines: true
});

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'TestRunResult.csv',
  append: true,
  header: [
    {id: 'baumsterout', title: 'Baumster'},
    {id: 'vehiclenameout', title: 'VehicleName'},
    {id: 'status', title: 'Status'}
  ]
});

var commonMethods = new CommonMethods();
var e2eTestCaseStatus: string;
var e2eTestCaseName = path.basename(__filename).split(".spec.ts")[0];
var anrede, firstname, lastname, dateOfBirth, mobileNum, email, street, housenum, postalcode, location, baumster, disposalDiscount, additionalCondRelative,
  additionCondAbsolute, leasingSpecialPayment, duration, totalMilege, leaseDirectCreditDetail, placeOfBirth, nationality, documentType, identificationNumber,
  placeOfIssue, dateOfIssue, validUntil, professionalStatus, netIncome, occupiedSince, maritalStatus, numOfChildren, iban: string, environmentalbonus: string, transferCost:string, vehiclename:string;
var expectedresult: any;
var actualresult: any;
var context: BrowserContext;

declare global {
  var dataDictionary: Map<string, any>;

}

global.dataDictionary = new Map();

test.describe.configure({ mode: "parallel" });

test.beforeAll(async () => {
  console.log("Setting up the alfa environment");
  globalThis.dataDictionary.set(
    "alfaenv",
    Testdata.common.Project.runProperties.testEnvironment
  );
  // context = await browser.newContext({ acceptDownloads: true});// screen:{width:1366,height:768} }
  // console.log("inside beforeall "+browser.contexts().length);
});


for (const record of records) {
    test.only(`Verify whether the Baumsters are available in POS using Baumster ${record.Baumster}`, async ({ browser },testInfo) => {
      //From Login till PC neo direct stepss
       const context = await browser.newContext({
        storageState: "./auth.json"
       });
       const page = await context.newPage();
      
      const otrApp = new otrSteps(page,testInfo);
       
      await otrApp.otrLogin();
         
      firstname = record.Vorname;
      lastname = record.Nachname;
      baumster = record.Baumster;
      environmentalbonus = record.Umweltbonus;
  
      await otrApp.SearchCustomer(firstname, lastname);
      await otrApp.ChooseCustomer();
      await otrApp.createNewDealConfigurator(baumster,environmentalbonus);
      await otrApp.addFinancialServices();
      vehiclename = otrSteps.vehiclename;
     // await page.pause();
      await expect(page).toHaveTitle(/.*PingID/); 
      
    
      
      //await context.close();    
    });
  }
  
      test.afterEach(async () => {
        if (test.info().status! == 'passed') {
          e2eTestCaseStatus = 'PASS';
          //await commonMethods.savingteststatus("pass");
        } else {
          e2eTestCaseStatus = 'FAIL';
        }
                         
        const output =[{baumsterout: baumster,vehiclenameout: vehiclename,status: e2eTestCaseStatus}];
        csvWriter.writeRecords(output).then(()=> console.log('The CSV file was written successfully'));
      
      });
      
