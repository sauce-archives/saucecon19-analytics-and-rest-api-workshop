#Exercise 1: Accessing the REST API
## Part One: Gather Your SauceLabs.com Credentials

1. Checkout branch `01_access_api`
2. Open an internet browser and login to [www.saucelabs.com](https://www.saucelabs.com)
3. Open our **Account** tab and navigate to the **User Settings** section:
    
    ![User Settings](images/user-settings.png)
    
4. Copy and paste your **Username** and Sauce Labs **Access Key** to the local clipboard
5. In your IDE or a command terminal run the following commands and replace the values with the data copied to the clipboard:
    ###### Mac OSX:
    ```
    $ export SAUCE_USERNAME="your saucelabs username"
    $ export SAUCE_ACCESS_KEY="your saucelabs API access Key"
    ```
    ###### Windows:
    ```
    > set SAUCE_USERNAME="your saucelabs username"
    > set SAUCE_ACCESS_KEY="your saucelabs API access Key"
    ```
    > To set an environment variables permanently in Windows, you must append it to the `PATH` variable.
    > Go to "Control Panel > System > Windows version > Advanced System Settings > Environment Variables > System Variables > Edit > New. Then enter the "Name" and "Value"
6. Test the environment variables
    ###### Mac OSX:
    ```
    $ echo $SAUCE_USERNAME
    $ echo $SAUCE_ACCESS_KEY
    ```
    ###### Windows:
    ```
    echo %SAUCE_USERNAME%
    echo %SAUCE_ACCESS_KEY%
    ```
    
    > To refresh a bash shell if you don't see the values run any of the following commands: 
    >  * `$ source ~/.bashrc`
    >  * `$ source ~/.bash_profile`
    >  * `$ source /etc/profile`
        


## Part Two: Set Envrionment Variables
##### Manual Example:
```
curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
https://saucelabs.com/rest/v1/users/$SAUCE_USERNAME
```
##### Programmatic Example:

1. Open `users.js` in your IDE or editor
2. Set the following variables
    ```
    const username = process.env.SAUCE_USERNAME;
    const accessKey = process.env.SAUCE_ACCESS_KEY;
    ```
3. Set a variable for the baseURL, and the test endpoint of the Sauce Labs RESTAPI
    ```
    const baseURL = 'https://' + username + ':' + accessKey + '@';
    const userAPI =  'saucelabs.com/rest/v1/users/' + username;
    ```
4. Set a constructor function to test the REST API:

    ```
    const axios = require("axios");
    const testAPI = async () => {
        try {
            response = await axios.get(baseURL + userAPI);
            console.log(response.data);
        }
        catch (error)
        {
            console.log(error);
        }
    };
    testAPI();
    ```
    > `axios` is an external library used for constructing [Promise based](https://medium.com/dev-bits/writing-neat-asynchronous-node-js-code-with-promises-32ed3a4fd098) HTTP requests, specifically for consuming exteral REST API endpoints. Click the [following link](https://www.npmjs.com/package/axios) for more information on the `axios` library.
5. Run the function using the IDE commands or:
    ```
    node index.js
    ```
6. The console output should display a JSON response like the following:
    ```
    {  
       "username":"xxxxxx",
       "vm_lockdown":false,
       "new_email":null,
       "last_name":"xxxxxx",
       "tunnels_lockdown":false,
       "parent":null,
       "subaccount_limit":3,
       "team_management":false,
       "creation_time":1543341104,
       "user_type":"invoiced",
       "monthly_minutes":{  
          "manual":"infinite",
          "automated":"infinite"
       },
    ...  
    ```