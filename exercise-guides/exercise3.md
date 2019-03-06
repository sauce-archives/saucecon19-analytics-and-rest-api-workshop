#Exercise 1: Team Visibility
In this exercise we use the `update` job API in order to change a test visiblity to `public` so that our team members (sub-accounts) can gain visibility.
##### Example Manual Request:
```
curl -X PUT -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
-H "Content-Type: application/json" \
-d '{
"public": "shared"
}' \ 
https://saucelabs.com/rest/v1/$SAUCE_USERNAME/jobs/JOB_ID
```
##### Example Programmatic Request:
For this example, we're going to write a script that:
* places the last `10` job IDs in an `array`
* changes visibility to `"public": "shared"`

1. Checkout branch `03_team_visibility`
2. Open `update-jobs.js`
3. Add the following code:
