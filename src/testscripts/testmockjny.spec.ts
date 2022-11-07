import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {

  await page.goto('https://intp-posv.mercedes-benz-bank.de/vergleich/mock');

 await page.getByLabel('User ID').click();

  await page.getByLabel('User ID').fill('JKALLUM');

  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByLabel('Password').click();

  await page.getByLabel('Password').fill('Daimler092805#');

  await page.getByRole('button', { name: 'Log on' }).click();
  //await expect(page).toHaveURL('https://authenticator.pingone.eu/pingid/ppm/auth');

  await page.getByRole('combobox', { name: 'Mock-Daten auswahl' }).selectOption('100000045829');

  await page.getByLabel('UserName ersetzen').click();

  await page.getByLabel('UserName ersetzen').fill('JKALLUM');

  await page.getByLabel('UserName ersetzen').click();

  await page.getByLabel('NDLVP ersetzen').click();

  await page.getByLabel('NDLVP ersetzen').fill('20199');

  await page.getByRole('button', { name: 'Send Mock Data' }).click();
 // await expect(page).toHaveURL('https://intp-posv.mercedes-benz-bank.de/vergleich/999999155966');

  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('button', { name: 'Leasing (MBLD) hinzufügen' }).click();

  await page.getByRole('button', { name: 'Kalkulation hinzufügen' }).click();

  await page.getByRole('button', { name: 'Zum Antrag' }).nth(2).click();
  //await expect(page).toHaveURL('https://intp-posv.mercedes-benz-bank.de/antrag/110000016877');

 // await page.goto('https://intp-posv.mercedes-benz-bank.de/antrag/110000016877');

  await page.getByLabel('Sämtliche Vornamen').fill('Arvinm');

  await page.getByLabel('Geburtstagsdatum').fill('1989-12-12');

  await page.getByLabel('Mobil (bevorzugt) / Telefon').click();

  await page.getByLabel('Mobil (bevorzugt) / Telefon').fill('+49659321');

  await page.getByLabel('E-Mail Adresse').fill('qqq.feuerbach@stadtverwaltung.de');
  await page.pause();
  await page.getByRole('button', { name: 'Weiter' }).click();

  await page.getByLabel('Geburtsort').click();

  await page.getByLabel('Geburtsort').fill('Berlin');
  await page.pause();
  //await page.getByText('Geben Sie den Geburtsort analog des Ausweisdokumentes an (Bsp: Stadt Münster)').click();

  await page.getByRole('combobox', { name: 'Staatsangehörigkeit' }).selectOption('de');

  await page.getByRole('combobox', { name: 'Dokumententyp' }).selectOption('ID_CARD');

  await page.getByLabel('Ausweisnummer').click();

  await page.getByLabel('Ausweisnummer').fill('L1P0KLPFW8');

  await page.getByLabel('Ausstellungsort').click();

  await page.getByLabel('Ausstellungsort').fill('Frankfut');

  await page.getByLabel('Ausstellungsdatum').fill('2021-12-12');

  await page.getByLabel('Gültig bis').click();

  await page.getByLabel('Gültig bis').fill('2035-12-12');

  //await page.locator('label:has-text("Der Kunde wurde vom Händler mittels eines Ausweisdokuments legitimiert. Gegebene") wb-icon').click();

  await page.getByRole('button', { name: 'Weiter' }).click();

await page.pause();
  await page.getByRole('combobox', { name: 'Berufsstatus' }).selectOption('ARBEITER');

  await page.locator('input[type="text"]').click();

  await page.getByLabel('Mtl. Nettoeinkommen').fill('8000');

  await page.getByLabel('In der aktuellen Firma seit?').click();

  await page.getByLabel('In der aktuellen Firma seit?').fill('2018-12-12');

  await page.getByRole('combobox', { name: 'Familienstand' }).selectOption('SINGLE');

  await page.getByRole('combobox', { name: 'Kinder unter 18 im Haushalt?' }).selectOption('0');

  await page.getByRole('button', { name: 'Weiter' }).click();

  await page.locator('input[type="text"]').nth(2).click();

  await page.getByLabel('IBAN').fill('DE06200505501484526239');

  await page.locator('label:has-text("Der Händler hat den Kunden auf die Datenschutzhinweise hingewiesen") wb-icon').click();
await page.pause();
  await page.getByRole('button', { name: 'Kreditprüfung starten' }).click();

  await page.getByRole('button', { name: 'Weiter' }).click();

  await page.getByRole('button', { name: 'Antrag herunterladen & signieren' }).click();

  await page.getByRole('link', { name: 'Weiter in PartnerConnect!neo' }).click();
  //await expect(page).toHaveURL('https://intp-partnerconnect.mercedes-benz-bank.de/app/contract/110000016877');

});