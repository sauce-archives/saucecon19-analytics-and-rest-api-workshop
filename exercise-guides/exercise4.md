# Exercise 4: Managing User Concurrency
In this exercise we use the account API combined with our activity API
in order to quickly grab the concurrency details for a given user. Once we have the data then we can perform various actions, for example:
* Breakdown VM concurrency in a chart
* Offload data to an external database
* Use `Math.` to calculate if distribution accurately reflects total user count

##### Example Manual Requests:

###### Grab the List of Sub-Accounts from an Ancestor Account:

```
curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
https://saucelabs.com/rest/v1/users/USERNAME/subaccounts
```

###### Grab Concurrency Details from a Given Sub-Account:

```
curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
https://saucelabs.com/rest/v1.1/users/$SUBACCOUNT/concurrency
# or
sl getUserConcurrency $SUBACCOUNT
```

##### Example `concurrency` Response:

```
{
  "timestamp": 1552669113.81286,
  "concurrency": {
    "self": {
      "username": "$SUBACCOUNT",
      "current": {
        "manual": 0,
        "mac": 0,
        "overall": 0
      },
      "allowed": {
        "manual": 50,
        "mac": 10,
        "overall": 50
      }
    },
    "ancestor": {
      "username": "$SAUCE_USERNAME",
      "current": {
        "manual": 0,
        "mac": 0,
        "overall": 0
      },
      "allowed": {
        "manual": 50,
        "mac": 10,
        "overall": 50
      }
    }
  }
}

```

##### Example Programmatic Request:
For this example we're going to:
* send a `GET` request and gather all `subaccounts` under the `ancestor` account.
* iterate through nested subaccount objects, grab the subaccount username
* send a second `GET` request for the specific subaccount concurrency details

## Part One: **`getSubaccounts`**
1. Checkout branch `04_get_concurrency`
2. Open `js-examples/test-activity.js` and declare the following constants:
    ```
    const SauceLabs = require("saucelabs");
    const api = new SauceLabs();
    ```
2. Create a function expression:
    ```
    const getSubAccounts = async() => {
    }
    ```
3. Add a `try` `catch` block that returns the JSON response from the `subaccounts` API
    ```
    try {
        response = await api.getSubAccounts();
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error);
    }
    ```
4. Test the script by calling the function and examining the output:
    ```
    getSubAccounts()
    ```
    ```
    node js-examples/test-activity.js
    ```
    ###### Example Response:
    ```
    [ { username: 'Marlee.Wuckert89',
        vm_lockdown: false,
        new_email: null,
        last_name: null,
        tunnels_lockdown: false,
        parent: 'jtack4970',
        subaccount_limit: null,
        team_management: false,
        creation_time: 1552599691,
        user_type: 'subaccount',
        monthly_minutes: { manual: 'infinite', automated: 'infinite' },
        prevent_emails: [],
        performance_enabled: false,
        is_admin: null,
        manual_minutes: 'infinite',
        can_run_manual: true,
        concurrency_limit: { mac: 10, scout: 50, overall: 50, real_device: 3 },
        is_public: false,
        level: 0,
        id: 'Marlee.Wuckert89',
        access_key: 'xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx',
        first_name: null,
        require_full_name: false,
        verified: false,
        name: 'Lavon McClure',
        subscribed: true,
        title: null,
        ancestor_user_type: 'invoiced',
        terminating_subscription: false,
        is_sso: false,
        entity_type: null,
        tunnel_concurrency_limit: 30,
        allow_integrations_page: true,
        child_num_total: 0,
        last_login: null,
        ancestor_concurrency_limit: { mac: 10, scout: 50, overall: 50, real_device: 3 },
        ancestor_allows_subaccounts: false,
        domain: null,
        child_num: 0,
        ancestor: 'jtack4970',
        minutes: -682,
        email: 'xxxxxxxxxx@hotmail.com' },
      { username: 'Mateo26',
        vm_lockdown: false,
        new_email: null,
      ...
      }]
    ```
## Part Two: **`getConcurrency`**
1. Create a new function expression called `getConcurrency` with the following for loop:
    ```
    const getConcurrency = async () => {
        const json_array = await getSubAccounts()
        for (var i = 0; i < json_array.data.length; i++) {
        }
    }
    ```
2. Store the sub-account name in a constant based on its position in the JSON array:
    ```
    const subAccount = json_array.data[i].id;
    ```
3. Construct the URL, and send a new `GET` request:
    ```
     const url = 'https://saucelabs.com/rest/v1.1/users/' + subAccount + '/concurrency';
        axios({
        method: 'get',
        url: url,
        auth: {
            username: username,
            password: accessKey
        },
        config: {
             headers: {
                 'Content-Type': 'application-json'
             }
        }
     })
    ```
4. Use the promise syntax to log/return the concurrency objects
     ```
     }).then(function (response) {
            console.log(response.data.concurrency.self);
            return response.data.concurrency
     }).catch(function (error) {
            console.log(error);
     });
    ```
4. Delete the `getSubAccounts()` function call, call the `getConcurrency` function: run the script to see the results:
    ```
    getConcurrency()
    ```
    Run the script to see the results:
    ```
    node js-examples/test-activity.js
    ```
    ###### Example Response:

    ```
    { username: 'Marlee.Wuckert89',
      current: { manual: 0, mac: 0, overall: 0 },
      allowed: { manual: 50, mac: 10, overall: 50 } }
    { username: 'Danyka.Ebert54',
      current: { manual: 0, mac: 0, overall: 0 },
      allowed: { manual: 50, mac: 10, overall: 50 } }
    { username: 'Estella_Gutkowski81',
      current: { manual: 0, mac: 0, overall: 0 },
      allowed: { manual: 50, mac: 10, overall: 50 } }
    ...
    ```
