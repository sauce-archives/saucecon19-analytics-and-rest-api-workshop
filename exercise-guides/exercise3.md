# Exercise 3: Updating Sauce Labs Jobs
In this exercise we use the `update` job API in order to change a test visibility to `public` so that our team members (sub-accounts) can gain visibility.
##### Example Manual Requests:

###### Grab the Last 4 Jobs:
```
curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
https://saucelabs.com/rest/v1/$SAUCE_USERNAME/jobs?limit=4
```
###### Response:
```
[  
   {  
      "id":"f54e7fc1580748bcbd56d0aa8b918f9d"
   },
   {  
      "id":"963b6ecf3a5a4175842f94f7da3f6a0b"
   },
   {  
      "id":"bffb7571cea34bbfb883786b46ad01ee"
   },
   {  
      "id":"5f8e2ea80b52422f9c185263948a0313"
   }
]
```
###### Change a Job Visibility to `"shared"`:
```
curl -X PUT -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
-H "Content-Type: application/json" \
-d '{
"public": "shared"
}' \ 
https://saucelabs.com/rest/v1/$SAUCE_USERNAME/jobs/f54e7fc1580748bcbd56d0aa8b918f9d
```
###### Response:
```
{  
   "browser_short_version":"11",
   "video_url":"https://assets.saucelabs.com/jobs/f54e7fc1580748bcbd56d0aa8b918f9d/video.mp4",
   ...
   "public":"team",
   ...
}
```
##### Example Programmatic Request:
For this example we're going to:
* get the last `10` jobs and store them in an `array`
* change each job visibility to `"public": "shared"`

## Part One: **`getJobs`**
1. Checkout branch `03_update_sauce_jobs`
2. Open `js-examples/update-jobs.js`
3. Add the following code:
    ```
   const username = process.env.SAUCE_USERNAME;
   const accessKey = process.env.SAUCE_ACCESS_KEY;
   const baseURL = 'https://' + username + ':' + accessKey + '@';
   const jobAPI = 'saucelabs.com/rest/v1/' + username + '/jobs?limit=10';
   const axios = require("axios");
   const getJobs = async () => {
        try {
            response = await axios.get(baseURL + jobAPI);
            console.log(response.data);
            return response;
        }
        catch (error)
        {
            console.log(error);
        }
    };
    getJobs();
    ```
4. Test the script using `node js-examples/update-job.js`. The script should print out the last 10 jobs—for example:
    ```
    [ { id: '99b33104d2524e5d9002e4294e7e4df7' },
      { id: '1e588e53a4d54a2e9b38250289b65c3e' },
      { id: 'a6301b04dd57480486c21522572012f7' },
      { id: '0b0b0d7447274be4b9897bda0171d3ae' },
      { id: '3c578450850e486994e6c7addd85c80b' },
      { id: '0ca327d31e8d4abb9c807ca9d1d5842c' },
      { id: 'a12d56496b53454cb872ebc68e2a5b25' },
      { id: '918aaf50ea1e477da83a8fbc7514ceb9' },
      { id: 'e02b75aedf96418f88cce878cb34a0a8' },
      { id: '3f5aaf89324d49cf8a57c061ef55f88d' } ]
    ```

## Part Two: **`updateJobVisibility`**

In order to update the last 10 jobs, we have to create a function expression that:
   
* grabs the JSON response from **`getJobs()`**
* iterate through each JSON object in the array
* send a **`PUT`** REST call to the update job API with `{"put": true}` in the request body:

1. Create the `updateJobVisibility` function expression:
    ```
    const updateJobVisibility = async() => {
        const json_array = await getJobs()
    }
    ```
6. Create the following `for` loop that iterates through the array:
    ```
    for (var i = 0; i < json_array.data.length; i++){
        let jobID = json_array.data[i].id;
        const url = 'https://saucelabs.com/rest/v1/' + username + '/jobs/' + jobID
    }
    ```
7. Create an **`axios`** `PUT` request, and pass the `username`, `accessKey`, and set `public` to `true`:
    ```
    const updateJobVisibility = async() => {
        const json_array = await getJobs()
        for (var i = 0; i < json_array.data.length; i++) {
            /* Grab the Job IDs based on the position in the Array */
            var jobID = json_array.data[i].id;
            //console.log(JSON.stringify(jobID))
            /* construct the url */
            const url = 'https://saucelabs.com/rest/v1/' + username +  '/jobs/' + jobID;
            //console.log(url)
            /* construct the request using axios */
            axios({
                method: 'put',
                url: url,
                auth: {
                    username: username,
                    password: accessKey
                },
                config: {
                    headers: {
                        'Content-Type': 'application-json'
                    }
                },
                data: {
                    'public': true
                },
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    updateJobVisibility()
    ```
8. Modify the `getJobs` function as follows:
    ```
    const getJobs = async () => {
        try {
            response = await axios.get(baseURL + jobAPI)
            return response
        } catch (error) {
            console.error(error)
        }
    }
    ```
    Test using `node`:
    ```
    node js-examples/update-jobs.js
    ```
    Check the job visibility, for the jobs in question, in the saucelabs.com dashboard
    
9. Use `git stash` or `git commit` to save or delete your changes and checkout the next branch to proceed to the next exercise:
    ```
    git checkout 04_get_concurrency
    ```