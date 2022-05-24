package CreateTweet;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;

import static variabales.selectors.*;

public class backUploadImageText {
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
        WebElement tweetButton = driver.findElement(new By.ByXPath(createTweetButton));
        tweetButton.click();
        Thread.sleep(2000);
        WebElement write = driver.findElement(By.xpath(writeTweet));
        write.click();
        Thread.sleep(2000);
        write.sendKeys(tweetBody);
        Thread.sleep(2000);
        WebElement upload = driver.findElement(new By.ByXPath(photoButton));
        upload.click();
        Thread.sleep(2000);
        WebElement choose = driver.findElement(By.xpath(image1));
        choose.click();
        Thread.sleep(2000);
        WebElement back = driver.findElement(new By.ByXPath(backButton));
        back.click();
        Thread.sleep(5000);
        if (driver.findElement(By.xpath(lary)).isDisplayed()){
            System.out.println(pass);
        }
        else{
            System.out.println(fail);
        }
        if (driver.findElement(By.xpath(hello)).isDisplayed()){
            System.out.println(pass);
        }
        else{
            System.out.println(fail);
        }
    }

    @AfterTest
    public void tearDown() {
        if (null != driver) {
            driver.quit();
        }
    }
}