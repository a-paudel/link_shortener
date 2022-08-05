<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/picocss/1.5.3/pico.min.css"
        integrity="sha512-2MD814AVKlRmLMNeIKnmSSJEaI1gFz742oiIWCkRDZ3ZoN8lALOPN71gCCya8WItuZNfrulKl5jnLOVIhtGY+A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" /> -->

    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css">

    <script src="//unpkg.com/alpinejs" defer></script>
    <title>Link Shortener</title>
</head>

<body x-data="data">
    <div class="flex flex-col h-screen bg-dark-2 justify-center items-center text-gray-3">
        <h1 class="text-6xl">Link Shortener</h1>
        <form class="flex flex-col" x-on:submit.prevent="submitHandler">
            <input type="url" placeholder="Url..."
                class="p5 text-center bg-transparent focus:outline-none focus:placeholder-transparent text-4xl placeholder-gray-6"
                x-model="url">
        </form>

        <!-- output url -->
        <div x-show="shortLink.length>0" class="flex flex-col gap-2">
            <h2>The shortened link is:</h2>
            <!-- centered code block -->
            <code x-text="shortLink" style="text-align: center;" x-on:click="openToast"
                class="p2 my-2 text-2xl bg-gray-4 text-dark rounded cursor-pointer"></code>
        </div>


        <!-- toast -->
        <article class="fixed bottom-10 bg-gray-1 text-dark p2 rounded text-1xl" x-show="toastIsOpen"
            x-transition:enter.duration.500ms x-transition:leave.duration.1000ms>
            <h5 style="margin: 0;">
                Copied to clipboard
            </h5>
        </article>
    </div>
</body>
<script>
    let data = {
        url: "",
        shortLink: "",
        toastIsOpen: false,
        resetHandler() {
            this.url = "";
            this.shortLink = "";
        },
        async submitHandler() {
            // post request to backend
            let resp = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: this.url
                })
            })
            if (resp.status == 200) {
                code = await resp.text();
                let currentUrl = window.location;
                this.shortLink = `${currentUrl.protocol}//${currentUrl.host}/${code}`
                // this.shortLink = window.location.host + "/" + code;
                console.log(this.shortLink);
            } else {
                alert("Error shortening link");
            }

        },
        openToast() {
            // alert("Clicked")
            navigator.clipboard.writeText(this.shortLink);
            this.toastIsOpen = true;
            setTimeout(() => {
                this.toastIsOpen = false;
            }, 2000);
        },

    }
</script>

</html>