#Exercise 2: Team Management
> **Disclaimer**:
 > You must have an enterprise account with admin privileges to conduct part one of this exercise. 
 
 > For the second part, you can try and reset your own API Key however you will need to reset your ENV variables to the new values
## Part One: Create Sub Accounts
In this exercise we use the account API to create sub-accounts within our organization.
##### Example Manual Request (one sub-account):
```
curl -X POST -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
-H 'Content-Type: application/json' \
-d '{
"username": "jtizzle",
"password": "password",
"name": "JT",
"email": "xxxx@saucelabs.com"
}' \
https://saucelabs.com/rest/v1/users/$SAUCE_USERNAME
```
Response Example:
```
{  
   "username":"jtizzle",
   "access_key":"xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   "first_name":null,
   "subscribed":true,
   "verified":false,
   "name":"JT",
   "parent":"jtack4970",
   "user_type":"subaccount",
   "email":"xxxx@saucelabs.com",
   "last_name":null,
   "ancestor_concurrency_limit":{  
      "mac":10,
      "scout":50,
      "overall":50,
      "real_device":3
   },
   "manual_minutes":"infinite",
   "can_run_manual":true,
   "concurrency_limit":{  
      "mac":10,
      "scout":50,
      "overall":50,
      "real_device":3
   },
   "minutes":-534,
   "id":"jtizzle"
}
```
##### Programmatic Example (multiple sub-accounts):
 
 > This exercise uses the [Faker library](https://github.com/marak/Faker.js/)
1. Checkout branch `02_team_management`
2. In `accounts.js` add the following to iterate through a `for` loop and generate 10 fake users:
    ```
    const createAccounts = () => {
        const accountNum = 10;
        for (i = 0; i <= accountNum; i++) {
            const data = {};
            data.username = faker.fake("{{internet.userName}}");
            data.password = faker.fake("{{internet.password}}");
            data.name = faker.fake("{{name.findName}}");
            data.email = faker.fake("{{internet.email}}");
            newFaker.push(data);
        }
        console.log(newFaker);
    };
    ```
3. Add the `createAccounts()` function at the bottom of the script, then run the script using `node accounts.js`. You should see output like the following:
    ```
    [  
        {  
            "username":"Toni13",
            "password":"UxEpElUzFKsowes",
            "name":"Rebeka Anderson V",
            "email":"Jack.Abshire@hotmail.com"
        },
        {  
            "username":"Estella.Blick29",
            "password":"Ae3nz2yPf_ZxpX9",
            "name":"Anissa Klocko",
            "email":"Fidel.Miller@gmail.com"
        },
        {  
            "username":"Gabe_Hegmann71",
            "password":"Ng8vdgCCMEnJve3",
            "name":"Danielle Schimmel",
            "email":"Vita22@yahoo.com"
        }
    ]
    ```
4. Unfortunately the Sauce Labs Account Endpoint cannot accept a JSON Array as the payload, so we must modify our code to send one JSON object per Web API call. 
Add a `POST` request using the `axios` library at the end of each iteration like so:
    ```
    for (i = 0; i <= 10; i++) {
            const data = {};
            data.username = faker.fake("{{internet.userName}}");
            data.password = faker.fake("{{internet.password}}");
            data.name = faker.fake("{{name.findName}}");
            data.email = faker.fake("{{internet.email}}");
            JSON.stringify(data);
            axios({
                method: 'post',
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
                data: data
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    createAccounts();
    ```
5. Run the script and you should see a similar output as before.
    > If you receive a `400` bad request response, it could be for a number of reasons:
    > * your account is not enabled for team management
    > * you have a hard cap on sub-account creation
    > * there are errors in the `POST` data (e.g. invalid fields, email already in use, required fields missing etc.)
    > * saucelabs.com authentication error
    > * typos
    
## Part Two: Resetting API Keys
In this exercise we target a specific sub-account and reset the API Key.
##### Example Manual Request:
```
curl -X POST -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
https://saucelabs.com/rest/v1/users/$USERNAME/accesskey/change
```
##### Programmatic Example:
1. Open `key-rotate.js` and add the following `axios` function:
    ```
    const axios = require('axios');
    const rotateAPIKey = () => {
        axios.post(url,{})
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    };
    ```
2. At the bottom of the script, call the function and run it using `node`
    ```
    rotateAPIKey();
    ```
    ```
    node key-rotate.js
    ```
    The following response should appear in the console:
    ```
    {  
       "accessKey":"xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
    ```
    > As a challenge, try to figure out how to programmatically reset all sub-account API Keys. 
    
    > This could be a nightly script that will aid you in rotating your user API Keys!
    
    >Also, it's recommended that you delete your sub-accounts after this exercise so that you don't run into concurrency problems later