const {Builder, By, Key, until} = require('selenium-webdriver');

async function testManageTasks(){
    let driver = await new Builder().forBrowser("chrome").build();
    try{
        await driver.get('http://localhost:4200/taskmanager');
        let lowprioritytasks = await driver.wait(until.elementLocated(By.id('lowpriority')),5000);
        let mediumprioritytasks = await driver.wait(until.elementLocated(By.id('mediumpriority')),5000);
        let highprioritytasks = await driver.wait(until.elementLocated(By.id('highpriority')),5000);
        console.log(await lowprioritytasks.getText());
        console.log(await mediumprioritytasks.getText());
        console.log(await highprioritytasks.getText());
    }
    finally{
        await driver.quit();
    }
}

testManageTasks();