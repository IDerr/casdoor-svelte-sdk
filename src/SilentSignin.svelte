<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Message } from './message.js';
  import Sdk from 'casdoor-js-sdk';

  export let sdk: Sdk.default; // Casdoor Sdk
  export let isLoggedIn: () => boolean; // determine if user is logged in
  export let handleReceivedSilentSigninSuccessEvent: (message: Message) => void;
  export let handleReceivedSilentSigninFailureEvent: (message: Message) => void;

  const handleMessage = (event: MessageEvent<Readonly<Message>>) => {
    const message = event.data;

    if (message.tag !== "Casdoor" || message.type !== "SilentSignin") {
      return;
    }

    if (message.data === "success") {
      if (handleReceivedSilentSigninSuccessEvent) {
        handleReceivedSilentSigninSuccessEvent(message);
      }
    } else {
      if (handleReceivedSilentSigninFailureEvent) {
        handleReceivedSilentSigninFailureEvent(message);
      }
    }
  };

  onMount(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });

  export function isSilentSigninRequired(): boolean {
    const params = new URLSearchParams(window.location.search);
    return params.get("silentSignin") === "1";
  }
</script>

{#if window !== window.parent}
  <!-- Nothing to render in iframe -->
{:else if isLoggedIn()}
  <!-- Nothing to render if logged in -->
{:else}
  <iframe
    id="iframeTask"
    title="Casdoor"
    src={`${sdk.getSigninUrl()}&silentSignin=1`}
    style="display: none;"
    frameBorder="no"
  ></iframe>
{/if}
