# casdoor-svelte-sdk

[![NPM version](https://img.shields.io/npm/v/casdoor-svelte-sdk)](https://npmjs.com/package/casdoor-svelte-sdk)
[![NPM download](https://img.shields.io/npm/dm/casdoor-svelte-sdk)](https://npmjs.com/package/casdoor-svelte-sdk)
[![GitHub Actions](https://github.com/casdoor/casdoor-svelte-sdk/actions/workflows/release.yaml/badge.svg)](https://github.com/casdoor/casdoor-svelte-sdk/actions/workflows/release.yaml)
[![Coverage Status](https://codecov.io/gh/casdoor/casdoor-svelte-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/casdoor/casdoor-svelte-sdk)
[![Release](https://img.shields.io/github/v/release/casdoor/casdoor-svelte-sdk)](https://github.com/casdoor/casdoor-svelte-sdk/releases/latest)
[![Discord](https://img.shields.io/discord/1022748306096537660?logo=discord&label=discord&color=5865F2)](https://discord.gg/5rPsrAzK7S)

It can help you quickly build a silent sign-in application based on Casdoor.

We have an implemented example: [casdoor-spring-security-svelte-example](https://github.com/casdoor/casdoor-spring-security-svelte-example).

To use this sdk just follow the steps below.

### Installation

```shell
#NPM
npm i casdoor-svelte-sdk

#YARN
yarn add casdoor-svelte-sdk
```

### Use in Svelte

Let's take a look at the following example of a silent sign-in.

First, you need to initialize the Casdoor SDK.

```ts
import Sdk from "casdoor-js-sdk";

export const ServerUrl = "http://localhost:8000";

const sdkConfig = {
  serverUrl: "http://localhost:8000",
  clientId: "d79fd3c4e09a309fb3f5123",
  appName: "application_hnpzib",
  organizationName: "organization_4emn5k",
  redirectPath: "/callback",
  signinPath: "/api/signin",
};

export const CasdoorSDK = new Sdk(sdkConfig);
```

Then, intercept the `/callback` path in your application. The `AuthCallback.svelte` component will help you automatically handle the logic of interacting with the server. You just need to make sure that your server `ServerUrl` implements the `${ServerUrl}/api/signin` api, and takes two parameters `code` and `state`, and returns `token`.

> Note: Here you need to implement the `saveTokenFromResponse` and `isGetTokenSuccessful` functions.
>
> - `isGetTokenSuccessful` you need to judge from the response data whether the request is processed successfully by the server.
> - `saveTokenFromResponse` when your `${ServerUrl}/api/signin` api successfully returns the token, you need to save the token.

```svelte
<script lang="ts">
  import { AuthCallback } from "casdoor-svelte-sdk";
  import { CasdoorSDK, ServerUrl } from "./Setting";

  function saveTokenFromResponse(res: any) {
    // save token
    localStorage.setItem("token", res.data.accessToken);
  }

  function isGetTokenSuccessful(res: any) {
    // according to the data returned by the server,
    // determine whether the `token` is successfully obtained through `code` and `state`.
    return res.success === true;
  }
</script>

<AuthCallback 
  sdk={CasdoorSDK}
  serverUrl={ServerUrl}
  {saveTokenFromResponse}
  {isGetTokenSuccessful}
/>
```

In your application to determine whether you need to log in silently, if you need to log in silently, use the `SilentSignin.svelte` component. It will help you initiate a login request, and after the login is successful, it will call the `handleReceivedSilentSigninSuccessEvent` function, and when the login fails, it will also call the `handleReceivedSilentSigninFailureEvent` function.

```svelte
<script lang="ts">
  import { SilentSignin, isSilentSigninRequired } from "casdoor-svelte-sdk";
  import { CasdoorSDK } from "./Setting";

  function isLoggedIn() {
    return localStorage.getItem("token") !== null;
  }

  function handleReceivedSilentSigninSuccessEvent() {
    // jump to the home page here and clear silentSignin parameter
    window.location.href = "/";
  }

  function handleReceivedSilentSigninFailureEvent() {
    // prompt the user to login failed here
    alert("login failed");
  }
</script>

{#if isSilentSigninRequired()}
  <SilentSignin
    sdk={CasdoorSDK}
    {isLoggedIn}
    on:success={handleReceivedSilentSigninSuccessEvent}
    on:failure={handleReceivedSilentSigninFailureEvent}
  />
{:else}
  {#if isLoggedIn()}
    <div>Hello!</div>
  {:else}
    <div>you are not logged in</div>
  {/if}
{/if}
