---
sidebar_position: 2
---

# Roadmap

## 📝markdown editor

Test case details and steps can be edited with markdown

## 📊JUnit xml integration

### JUnit xml report output

Since JUnit's xml format is the de facto standard, we would like to output reports in that format.

```xml title="Junit xml"
<?xml version="1.0" encoding="UTF-8"?>
<testsuites time="15.682687">
    <testsuite name="Tests.Registration" time="6.605871">
        <testcase name="testCase1" classname="Tests.Registration" time="2.113871" />
        <testcase name="testCase2" classname="Tests.Registration" time="1.051" />
        <testcase name="testCase3" classname="Tests.Registration" time="3.441" />
    </testsuite>
    <testsuite name="Tests.Authentication" time="9.076816">
        <testsuite name="Tests.Authentication.Login" time="4.356">
            <testcase name="testCase4" classname="Tests.Authentication.Login" time="2.244" />
            <testcase name="testCase5" classname="Tests.Authentication.Login" time="0.781" />
            <testcase name="testCase6" classname="Tests.Authentication.Login" time="1.331" />
        </testsuite>
        <testcase name="testCase7" classname="Tests.Authentication" time="2.508" />
        <testcase name="testCase8" classname="Tests.Authentication" time="1.230816" />
        <testcase name="testCase9" classname="Tests.Authentication" time="0.982">
            <failure message="Assertion error message" type="AssertionError">
                <!-- Call stack printed here -->
            </failure>
        </testcase>
    </testsuite>
</testsuites>
```

### Importing and displaying Junit xml

We would like to be able to display not only manual test results, but also automated test results such as JUnit, Vitest, Selenium, etc.
Import the results of automated testing tools and integrate them with manual test results.

![integration](./img/integration.svg)