<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import Swal from "sweetalert2";

  export let data: PageData;

  let shortLink = "";
  onMount(() => {
    shortLink = window.location.origin + "/" + data.link.id;
  });
  //   $: shortLink = window.location.origin + "/" + data.link.id;

  function copyHandler() {
    try {
      navigator.clipboard.writeText(shortLink);
      //   show a toast
      Swal.fire({
        icon: "success",
        title: "Copied to clipboard",
        showConfirmButton: false,
        timer: 750,
        position: "bottom",
        backdrop: false,
        background: "lightgreen",
        color: "black",
        iconColor: "black",
      });
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div in:fade>
  <a href="/" class="fixed top-1 left-1">Another</a>

  <div class="h-screen flex flex-col items-center justify-center gap4">
    <!-- <h1 class="md:text-6xl text-center">Link Shortened</h1> -->

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <code
      class="p2 rounded-sm bg-gray-2 lg:text-4xl md:text-2xl sm:text-xl text-lg cursor-copy select-all"
      on:click={copyHandler}
    >
      {shortLink}
    </code>
  </div>
</div>
