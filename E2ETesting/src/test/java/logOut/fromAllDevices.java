package logOut;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import variabales.selectors;

import java.net.MalformedURLException;
import java.net.URL;

import static variabales.selectors.*;

public class fromAllDevices {
    AppiumDriver driver;

    @BeforeTest
    public void setup() throws MalformedURLException, InterruptedException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("automation", "UiAutomator2");
        caps.setCapability("platformVersion", "9.0");
        caps.setCapability("deviceName", "emulator-5554");
        caps.setCapability("appPackage", "com.example.project_sw");
        caps.setCapability("appActivity", ".MainActivity");
        driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), caps);
        /////////////////////////////////////////////////////////////////////////////////////////
        Thread.sleep(4000);
        WebElement loinButton = driver.findElement(new By.ByXPath(LoginButton));
        loinButton.click();
        Thread.sleep(2000);
        WebElement usernameField = driver.findElement(new By.ByXPath(usernameLoginField));
        usernameField.click();
        Thread.sleep(2000);
        usernameField.sendKeys(userSignup);
        WebElement passField = driver.findElement(new By.ByXPath(passwordLoginField));
        passField.click();
        Thread.sleep(2000);
        passField.sendKeys(passwordSignup);
        WebElement loin = driver.findElement(new By.ByXPath(LoginButton));
        loin.click();
        Thread.sleep(6000);
    }

    @Test
    public void uploadImage() throws InterruptedException {

        Thread.sleep(2000);
        WebElement menu = driver.findElement(new By.ByXPath(navigationMenu));
        menu.click();
        Thread.sleep(2000);
        WebElement setting = driver.findElement(new By.ByXPath(settings));
        setting.click();
        Thread.sleep(2000);

        WebElement logout = driver.findElement(new By.ByXPath(logoutAll));
        logout.click();
        Thread.sleep(4000);
//        if (driver.findElement(By.xpath(lary)).isDisplayed()){
//            System.out.println(pass);
//        }
//        else{
//            System.out.println(fail);
//        }
    }

    @AfterTest
    public void tearDown() {
        if (null != driver) {
            driver.quit();
        }
    }
}