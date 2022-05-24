package replies;

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
import static variabales.selectors.icon;

public class replyTwiceTag {
    AppiumDriver driver;

    @BeforeTest
    public void setup() throws MalformedURLException, InterruptedException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("automation", "UiAutomator2");
        caps.setCapability("platformVersion", "9.0");
        caps.setCapability("deviceName", "emulator-5554");
        caps.setCapability("appPackage", "com.example.cross_platform_software_project");
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
        Thread.sleep(8000);

    }

    @Test
    public void reply() throws InterruptedException {
        TouchAction touchAction=new TouchAction(driver);
        touchAction.tap(PointOption.point(259, 467)).perform();
        Thread.sleep(3000);
        touchAction.tap(PointOption.point(412, 898)).perform();
        WebElement reply = driver.findElement(new By.ByXPath(replyTwice));
        reply.click();
        Thread.sleep(2000);
        reply.sendKeys("@Farah");
        Thread.sleep(2000);
        WebElement post = driver.findElement(new By.ByXPath(larReply));
        post.click();
        Thread.sleep(4000);
        WebElement back = driver.findElement(new By.ByXPath(backReply));
        back.click();
        Thread.sleep(2000);
        WebElement icoon = driver.findElement(new By.ByXPath(icon));
        icoon.click();
        Thread.sleep(2000);
        WebElement home = driver.findElement(new By.ByXPath(selectors.home));
        home.click();
        Thread.sleep(2000);
        touchAction.tap(PointOption.point(259, 467)).perform();
        WebElement find = driver.findElement(new By.ByXPath("//android.view.View[@content-desc=\"2 0 Tue, May 24, 2022 06:06 PM EET\"]/android.widget.Button[2]"));
    }

    @AfterTest
    public void tearDown() {
        if (null != driver) {
            driver.quit();
        }
    }
}
