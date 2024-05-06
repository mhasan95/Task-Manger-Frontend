const {Builder, until, By} = require('selenium-webdriver');

async function testTableLoad(){
    let driver = await new Builder().forBrowser("chrome").build();
    try{
        await driver.get('http://localhost:4200/#');
        let dynamicElement = await driver.wait(until.elementLocated(By.id('tableload')),10000);
        console.log(await dynamicElement.getText());
    } 
    finally{
        await driver.quit();
    }
}

testTableLoad();