import { execSync } from 'child_process';
import fs from 'fs';
import * as Testdata from '../testData/testdata.json'
import dotenv from 'dotenv';
dotenv.config();

export class CommonMethods {

  async savingalfaIDNumIntoTestData(alfaID: string) {
    console.log('\nwriting Alfa ID number into testdata.json file');
    const fileName = 'src/testData/testdata.json';
    const file = require('../testData/testdata.json');
    var alfaID = alfaID
    file.common.application.alfaTestData['proposalNumber'] = alfaID;
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(error: any) {
      if (error) return console.log(error);
      console.log('\nwriting to ' + fileName);
    })
  };

  async runSAPTest(e2eTestCaseName: string) {
    let response = execSync(`cscript SAPLogon.vbs ${e2eTestCaseName}`).toString();
    console.log(response);
  }

  async launchAlfaApplication(alfaenv = Testdata.common.Project.runProperties.testEnvironment) {
    let alfaAppURL: string = eval("Testdata.common.application.alfa." + alfaenv);
    console.log(alfaAppURL)
    globalThis.dataDictionary.set('environment', alfaAppURL);
  }

  async getCurrentDate() {
    // return date in dd/mm/yyyy format
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    globalThis.dataDictionary.set('Today', today);
    return dd + '/' + mm + '/' + yyyy;
  }

  async addOrSubtractToAnyGivenDate(givenDate: string, days: number) {
    // givenDate should be in dd/mm/yyyy format and days can be any number (1, -1 etc )
    // return the new date in dd/mm/yyyy format
    var today = new Date();
    today.setUTCMonth(Number(givenDate.split('/')[1]) - 1);
    today.setDate(Number(givenDate.split('/')[0])); //Month starts from 0
    today.setFullYear(Number(givenDate.split('/')[2]));
    today.setDate(today.getDate() + (days));
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  async envReader(variable: string) {
    try {
      let value: string;
      if (eval(`process.env.` + variable) == undefined) { throw new Error(`env variable ${variable} is undefined`); }
      value = eval(`process.env.` + variable);
      return value;
    } catch (error: any) {
      console.log(error);
    }
  }

  async GetPingID() {
    var key = await this.envReader('KEY');
    var output
    const childPorcess = execSync('java -jar library.jar ' + "\"" + key + "\"").toString()
    output = childPorcess.split(":")
    globalThis.dataDictionary.set('OTP', output[1].trim());
    console.log(childPorcess)
    console.log(globalThis.dataDictionary.get('OTP'));
  }

  async savingMBNumIntoTestData(mbnum: string) {
    console.log('\nwriting MB number into testdata.json file');
    const fileName = 'src/testData/testdata.json';
    const file = require('../testData/testdata.json');
    var mbnum = mbnum
    file.common.application.alfaTestData['MBNumber'] = mbnum;
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(error: any) {
      if (error) return console.log(error);
      console.log('\nwriting to ' + fileName);
    })
  };

  async saveE2ETestStatus(e2eTestCaseName: string, e2eTestCaseStatus: string) {
    console.log('\nwriting e2e test status');
    const fileName = 'src/testData/testdata.json';
    const file = require('../testData/testdata.json');
    file.common.Project.runProperties.testResult[`${e2eTestCaseName}`] = e2eTestCaseStatus;
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(error: any) {
      if (error) return console.log(error);
      console.log('\nwriting to ' + fileName);
    })
  }

  async launchOtrApplication(otrenv = Testdata.common.Project.runProperties.testEnvironment) {
    let otrAppURL: string = eval("Testdata.common.application.otr." + otrenv);
    console.log(otrAppURL)
    globalThis.dataDictionary.set('environment', otrAppURL);
  }

  async launchMockApplication(otrenv = Testdata.common.Project.runProperties.testEnvironment) {
    let otrAppURL: string = eval("Testdata.common.application.mockIntp." + otrenv);
    console.log("Test URL ::",otrAppURL)
    globalThis.dataDictionary.set('environment', otrAppURL);
  }
  async savingteststatus(alfaID: string) {
    console.log('\nwriting test status to file');
    const fileName = 'src/testData/testdata1.json';
    const file = require('../testData/testdata1.json');
    var alfaID = alfaID
    file.common.application.alfaTestData['proposalNumber'] = alfaID;
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(error: any) {
      if (error) return console.log(error);
      console.log('\nwriting to ' + fileName);
    })
  };

}