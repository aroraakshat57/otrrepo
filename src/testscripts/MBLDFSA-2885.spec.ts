//FSaaS Regression Test cases
import { BrowserContext, expect, test } from "@playwright/test";
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
  placeOfIssue, dateOfIssue, validUntil, professionalStatus, netIncome, occupiedSince, maritalStatus, numOfChildren, iban: string, environmentalbonus: string, transferCost: string;
var expectedresult: any;
var actualresult: any;
var context: BrowserContext;

declare global {
  var dataDictionary: Map<string, any>;

}

global.dataDictionary = new Map();

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ browser }) => {
  console.log("Setting up the alfa environment");
  globalThis.dataDictionary.set(
    "alfaenv",
    Testdata.common.Project.runProperties.testEnvironment
  );
  context = await browser.newContext({ acceptDownloads: true });// screen:{width:1366,height:768} }
  console.log("inside beforeall " + browser.contexts().length);
});

for (const record of records) {
  test.only(`FSaaS Journey from Otr till PcNeo using Baumster: ${record.Baumster}`, async ({ browser }, testInfo) => {
    //From Login till PC neo direct stepss
    const context = await browser.newContext();
    const page = await context.newPage();

    //const alfapage = await context.newPage();
    const otrApp = new otrSteps(page, testInfo);
    // const alfaApp = new alfaSteps(alfapage, testInfo);

    await otrApp.otrLogin();
    await page.pause();
    anrede = record.Anrede;
    firstname = "Aron" + cryptoRandomString({ length: 4, characters: 'abcdefghij' });
    lastname = "Mark" + cryptoRandomString({ length: 2, characters: 'abcdefghij' });
    dateOfBirth = record.Geburtsdatum;
    // const date = cryptoRandomString({ length: 2, characters: '012'});
    // const month = "0"+cryptoRandomString({ length: 1, characters: '123456789'});
    // const year = "19"+cryptoRandomString({ length: 2, characters: '98765'});
    // dateOfBirth = date+"-"+month+"-"+year;
    // console.log("Date Of Birth : "+dateOfBirth);
    mobileNum = record.Mobilnummer;
    // mobileNum = "496"+cryptoRandomString({ length: 5, type: 'numeric' });
    // console.log("Mobilenumber : "+mobileNum);
    email = firstname + "@" + lastname + ".com";
    street = record.StraBe;
    housenum = record.Hausnummer;
    postalcode = record.PLZ;
    location = record.Ort;
    await otrApp.createNewCustomer(anrede, firstname, lastname, dateOfBirth, mobileNum, email, street, housenum, postalcode, location);
    await otrApp.NavigateToHomePage();
    await otrApp.SearchCustomer(firstname, lastname);
    await otrApp.ChooseCustomer();

    baumster = record.Baumster;
    environmentalbonus = record.Umweltbonus;
    await otrApp.createNewDealConfigurator(baumster, environmentalbonus);

    disposalDiscount = record.MengenVerwerterrabatt;
    additionalCondRelative = record.Zusatzkonditionenrelativ;
    additionCondAbsolute = record.Zusatzkonditionenabsolut;
    transferCost = record.Uberfuhrungskosten;//Überführungskosten
    await otrApp.addPricingInformation(disposalDiscount, additionalCondRelative, additionCondAbsolute, transferCost);
    await otrApp.addFinancialServices();

    //Temp Steps of Mock OTR , comment it when OTR is Up
    // const mockapp = new mockSteps(page, testInfo);
    // mockapp.mockLogin();
    // const mockDataSelect = "100000045829 EQB 300 4MATIC";
    // const replaceUsername = "JKALLUM";
    // const relpaceNDLVP = "20191";
    // await otrApp.pingIDAuthentication();
    // mockapp.mockotrfields(mockDataSelect, replaceUsername, relpaceNDLVP);
    await page.waitForTimeout(5000);
    await otrApp.pingIDAuthentication();

    leasingSpecialPayment = record.Leasing_Sonderzahlung;
    duration = record.Laufzeit;
    totalMilege = record.Gesamtlaufleistung;
    leaseDirectCreditDetail = record.Leasing_Direktgutschrift;
    await otrApp.navigateToPOS(leasingSpecialPayment, duration, totalMilege, leaseDirectCreditDetail);
    await otrApp.enterCustomerdata(dateOfBirth, mobileNum);
    // const title = "Dr.";
    // const country = "Deutschland";
    // await mockapp.customerDetails(anrede, title, firstname, lastname, dateOfBirth, mobileNum, email, street, housenum, postalcode, location, country);

    placeOfBirth = record.Geburtsort;
    nationality = record.Staatsangehorigkeit;
    documentType = record.Dokumententyp;
    identificationNumber = record.Ausweisnummer;
    placeOfIssue = record.Ausstellungsort;
    dateOfIssue = record.Ausstellungsdatum;
    validUntil = record.Gultigbis;
    await otrApp.enterIdentifikationdetails(placeOfBirth, nationality, documentType, identificationNumber, placeOfIssue, dateOfIssue, validUntil);

    professionalStatus = record.Berufsstatus;
    netIncome = record.Nettoeinkommen;
    occupiedSince = record.aktuelleFirmaseit;
    maritalStatus = record.Familienstand;
    numOfChildren = record.Kinder18;
    await otrApp.enterBonitatsdaten(professionalStatus, netIncome, occupiedSince, maritalStatus, numOfChildren);

    iban = record.IBAN;
    await otrApp.enterAccountInformation(iban);
    await otrApp.posCreditCheck();
    await otrApp.posSummary();
    await otrApp.getAlfaID();
    //await otrApp.saveAlfaID();
    await otrApp.navigatetopartnerconnect();
    //await otrApp.changeurltointp();
    await otrApp.uploadDocuments();
    await otrApp.EnterMBNumber();
    //await otrApp.SaveMBNumber();
    await context.close();
    //await browser.close();
  });
}


test.afterEach(async () => {
  if (test.info().status! == 'passed') {
    e2eTestCaseStatus = 'PASS';
  } else {
    e2eTestCaseStatus = 'FAIL';
  }
});

// test.afterAll(async () => {
//   console.log(e2eTestCaseStatus);
//   await commonMethods.saveE2ETestStatus(e2eTestCaseName, e2eTestCaseStatus);
//   //console.log("inside afterall "+ browser.contexts().length);

// });