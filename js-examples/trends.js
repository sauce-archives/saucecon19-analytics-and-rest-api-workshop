// Set Sauce Labs Credentials
const username = process.env.SAUCE_USERNAME;
const accessKey = process.env.SAUCE_ACCESS_KEY;
const trendsAPI = "saucelabs.com/rest/v1/analytics/trends/tests?interval=2h&time_range=1d";
const sauceURL = 'https://' + username + ':' + accessKey + '@' + trendsAPI;
const axios = require("axios");
const getTrends = async () => {
    try {
        response = await axios.get(sauceURL)
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
    }
}

const countBrowsers = async () => {
    const browsers = await getTrends()
        .then(response => {
            if (response.data.metrics.browser) {
                myBrowsers = response.data.metrics.browser
                console.log(`Got ${Object.entries(myBrowsers).length} browser types`)
                console.log(myBrowsers)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

const countBrowserFailures = async () => {
    const browserFailures = await getTrends()
        .then(response => {
            if (response.data.metrics.browserFail) {
                myFailures = response.data.metrics.browserFail
                console.log(`${Object.entries(myFailures).length} of those browsers failed`)
                console.log(myFailures)
            }
        })
        .catch(error => {
            console.log(error)
        })
}
countBrowsers();
countBrowserFailures();