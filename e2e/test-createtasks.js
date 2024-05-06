const {Builder, until, By} = require('selenium-webdriver');

async function testCreateTasks(){
    let driver = await new Builder().forBrowser("chrome").build();

    try{
        await driver.get('http://localhost:4200/createtask');
        await driver.findElement(By.id('tasktitle')).sendKeys('Maaz');
        await driver.findElement(By.id('taskdescription')).sendKeys('Maaz');
        await driver.findElement(By.id('taskpriority')).sendKeys('1');
        await driver.findElement(By.id('date')).sendKeys('10/05/2024');
        await driver.findElement(By.id('taskstatus')).sendKeys('1');
        await driver.findElement(By.css('button[type="submit"]')).click();
        browser.sleep(100);
        let alert = await driver.wait(until.alertIsPresent(),10000);
        console.log(await alert.getText());
        await alert.accept();
    } 
    
    finally{
        await driver.quit();
    }
}
testCreateTasks();