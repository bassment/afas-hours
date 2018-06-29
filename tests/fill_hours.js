const config = require('../config.js');

const waitTime = 4000;

const usernameInput = 'input[type=text]';
const passwordInput = 'input[type=password]';
const searchProjectInput = (windowCounter) => `#Window_${windowCounter}_View_filter_U001`;
const startTimeInput = '#Window_0_Entry_Detail_Detail_StTi';
const endTimeInput = '#Window_0_Entry_Detail_Detail_EnTi';
const dateInput = '#Window_0_Entry_Detail_Detail_DaTi';
const commentInput = '#Window_0_Entry_Detail_Detail_UE84491FC4535B5A0E9B9DAA7E17ACA02';

const loginButton = 'button[data-webbutton-id=login]';
const searchButton = '#Window_0_Entry_Selection_Selection_PeId_search';
const selectButton = '#P_C_W_Entry_Selection_E7_ButtonEntryWebPart_Select_E7';
const searchProjectButton = '#Window_0_Entry_Detail_Detail_PrId_search';
const newRecordButton = '#P_C_W_Entry_Detail_E3_ButtonEntryWebPart_AddRow_E3';
const finishButton = '#P_C_W_Entry_Actions_E0_ButtonEntryWebPart_OK_E0';

const welcomeText = 'div.welcome';

const hoursTab = '#P_H_W_Menu_T_2_ctl01';

const userType = config.userType === 'developer' ? '#Window_0_View_row_0' : '#Window_0_View_row_1';
const monthRow = '#Window_1_View_row_' + (parseInt(config.month) - 1);
const projectRow = (windowCounter) => `#Window_${windowCounter}_View_row_0`;

const float = '.float';

const fillInOneDay = (client, { currentDay, windowCounter }) => {
  const day = parseInt(currentDay) < 10 ? `0${currentDay}` : currentDay;
  const month = parseInt(config.month) < 10 ? `0${config.month}` : config.month;
  const year = (new Date()).getFullYear();

  client
    .waitForElementVisible(selectButton, waitTime)
    .click(selectButton)
    .waitForElementVisible(searchProjectButton, waitTime)
    .click(searchProjectButton)
    .pause(waitTime)
    .waitForElementVisible(searchProjectInput(windowCounter), waitTime)
    .setValue(searchProjectInput(windowCounter), [config.project, client.Keys.ENTER])
    .pause(waitTime)
    .waitForElementVisible(projectRow(windowCounter), waitTime)
    .click(projectRow(windowCounter))
    .pause(waitTime)
    .waitForElementVisible(startTimeInput, waitTime)
    .setValue(startTimeInput, config.time.from)
    .waitForElementVisible(endTimeInput, waitTime)
    .setValue(endTimeInput, config.time.to)
    .pause(waitTime)
    .waitForElementVisible(dateInput, waitTime)
    .clearValue(dateInput)
    .setValue(dateInput, day)
    .setValue(dateInput, month)
    .setValue(dateInput, year)
}

module.exports = {
  'Login to AFAS' : function (client) {
    client
      .url('https://81217.afasinsite.nl')
      .waitForElementVisible(usernameInput, waitTime)
      .waitForElementVisible(passwordInput, waitTime)
      .waitForElementVisible(loginButton, waitTime)
      .setValue(usernameInput, config.username)
      .setValue(passwordInput, config.password)
      .click(loginButton)
      .waitForElementVisible(welcomeText, waitTime)
      .assert.containsText(welcomeText, 'Welcome')
  },
  'Go to Hour Registration' : function (client) {
    client
      .waitForElementVisible(hoursTab, waitTime)
      .click(hoursTab)
      .waitForElementVisible(userType, waitTime)
      .click(userType)
      .waitForElementVisible(searchButton, waitTime)
      .click(searchButton)
      .waitForElementVisible(monthRow, waitTime)
      .click(monthRow)
      .pause(waitTime)
  },
  'Start filling in hours' : function (client) {
    const daysArray = config.days.split('-');
    let counter = 2;
    for (let i = daysArray[0]; i <= daysArray[1]; i++) {
      fillInOneDay(client, { currentDay: i, windowCounter: counter });
      counter++;

      if (i !== parseInt(daysArray[1])) {
        client
          .waitForElementVisible(newRecordButton, waitTime)
          .click(newRecordButton)
          .pause(waitTime)
      }
    }
  },
  'Finish' : function (client) {
    client
      .waitForElementVisible(finishButton, waitTime)
      .click(finishButton)
      .pause(waitTime)
      .end()
  }
};