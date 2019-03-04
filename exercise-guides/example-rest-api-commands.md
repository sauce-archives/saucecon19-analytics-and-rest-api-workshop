#REST API Commands:

## Overview
The following examples illustrate how to consume the Sauce Labs REST API endpoint for testing. The following request/response output should inform how you programmatically invoke your API calls.

To get started execute the following commands in the Terminal application (OSX) or the Command Prompt (Windows):
```
export SAUCE_USERNAME = "your saucelabs.com user"
export SAUCE_ACCESS_KEY = "your saucelabs.com api key"
```
> To find this information login to [saucelabs.com](www.saucelabs.com), go to your **Account** panel, and select **User Settings**. 

> Now you can copy and paste your username and access key to the clipboard

## Prerequisites
* [`curl`](https://curl.haxx.se/download.html)
* [`jq`](https://stedolan.github.io/jq/download/)

## Examples
Gather your User data and write to a file

##### Request:
```
  curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
  "https://saucelabs.com/rest/v1/users/$SAUCE_USERNAME" \
  | jq '.' > user.json
```

##### Response:
```
{
  "username": $SAUCE_USERNAME,
  "vm_lockdown": false,
  "new_email": null,
  "last_name": "XXXX",
  "tunnels_lockdown": false,
  "parent": null,
  "subaccount_limit": 3,
  "team_management": false,
  "creation_time": 1543341104,
  "user_type": "invoiced",
  "monthly_minutes": {
    "manual": "infinite",
    "automated": "infinite"
  },
  "prevent_emails": [
    "marketing",
    "billing"
  ],
 ...

```
Query tests using the Windows 10 platform, in 1 hour intervals, within a specific time range:

##### Request:
```
  curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
  "https://saucelabs.com/rest/v1/analytics/trends/tests\
  ?interval=1h&start=2019-02-06T13:42:31Z&end=2019-02-06T17:42:31Z&os=WIN10" \
  | jq '.' > 1hour.json
```

Query general test trends, in 1 hour intervals for the past 24 hours, and write to a file.

##### Request:
```
  curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
  "https://saucelabs.com/rest/v1/analytics/trends/tests?interval=1h&time_range=1d" \
  | jq '.' > trends.json
```

##### Response(s):

```
{
  "meta": {
    "status": 200
  },
  "buckets": [],
  "metrics": {
    "browser": {},
    "error": {},
    "fail": {},
    "os": {},
    "owner": {},
    "status": {
      "complete": 0,
      "errored": 0,
      "failed": 0,
      "passed": 0
    }
  }
}
```

Query test insights in 2 hr intervals, for the last 5 days, and also filter specific test names and OS combos. Then write the results to a file:
```
  curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
  "https://saucelabs.com/rest/v1/analytics/insights/test-metrics\
  ?interval=2h&time_range=5d&query=verifyCommentInputTest%20onWindows%20X%2008" \
  | jq '.' > insights.json
```


  