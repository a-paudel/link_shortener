<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade, scale } from "svelte/transition";
  import { API } from "../api";

  let url = "";
  $: urlValid = validateUrl(url);

  function validateUrl(data: string) {
    // no http
    let regex1 =
      /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    //   with http
    let regex2 =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    let result1 = regex1.test(data);
    let result2 = regex2.test(data);

    return result1 || result2;
  }

  async function submitHandler() {
    if (!urlValid) return;
    let link = await API.createId(url);
    goto(`./${link.id}/show`);
  }
</script>

<form on:submit|preventDefault={submitHandler} in:fade>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    placeholder="Shorten URL"
    autofocus
    class="p2 w-screen text-center text-6xl font-bold border-0 focus:outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    bind:value={url}
  />

  {#if urlValid}
    <div in:fade out:fade>
      <button
        class="p4 text-2xl font-bold fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-12 shadow"
        in:scale
        out:scale
      >
        Shorten
      </button>
    </div>
  {/if}
</form>
