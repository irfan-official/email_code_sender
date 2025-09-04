## This project is for sending verification code to target email address

### developed by: Kazi Irfan

- you can POST form data as well as json data
- POST request to /send-mail with (target_email,verification_code)

```js
// example
import axios from "axios";

async function test() {
  try {
    const result = await axios.post(
      "https://email.code-sender.irfans.dev/send-mail",
      {
        email: "target_email", // String
        code: verification_code, // Number
      }
    );
    console.log(result);
  } catch (error) {
    console.log("error ==> ", error);
  }
}
test();
```
