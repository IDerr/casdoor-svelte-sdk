<script lang="ts">
  import { onMount } from 'svelte';
  import type { Message } from './message.js';
  import type Sdk from 'casdoor-js-sdk';  // Import the type for the class

  export let sdk: Sdk.default;  // Type the sdk prop as an instance of the Sdk class
  export let serverUrl: string; // your application server URL
  export let saveTokenFromResponse: (res: Response) => void; // callback after successful signin
  export let isGetTokenSuccessful: (res: Response) => boolean; // determines if token was obtained

  onMount(() => {
    signin();
  });

  const signin = async () => {
    const res = await sdk.signin(serverUrl);
    if (isGetTokenSuccessful(res)) {
      if (window !== window.parent) {
        sendSuccessfulLoginMessage();
      }
      if (saveTokenFromResponse) {
        saveTokenFromResponse(res);
      }
    } else {
      if (window !== window.parent) {
        sendLoginFailureMessage();
      }
    }
  };

  const sendSuccessfulLoginMessage = () => {
    const message: Message = {
      tag: "Casdoor",
      type: "SilentSignin",
      data: "success",
    };
    window.parent.postMessage(message, "*");
  };

  const sendLoginFailureMessage = () => {
    const message: Message = {
      tag: "Casdoor",
      type: "SilentSignin",
      data: "login-failure",
    };
    window.parent.postMessage(message, "*");
  };
</script>
