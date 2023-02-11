<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;

  onMount(() => {
    console.log("Redirecting to " + data.link.url);
    setTimeout(() => {
      // check if http or https in url
      if (!data.link.url.startsWith("http")) {
        data.link.url = "http://" + data.link.url;
      }
      // window.location.href = data.link.url;
      window.location.replace(data.link.url);
    }, 500);
  });
</script>

<div class="h-screen flex flex-col items-center justify-center" transition:fade>
  <h1 class="text-6xl">Loading</h1>
</div>
