<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/picocss/1.5.3/pico.min.css"
        integrity="sha512-2MD814AVKlRmLMNeIKnmSSJEaI1gFz742oiIWCkRDZ3ZoN8lALOPN71gCCya8WItuZNfrulKl5jnLOVIhtGY+A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="//unpkg.com/alpinejs" defer></script>
    <title>Link Shortener</title>
</head>

<body>
    <main class="container" x-data="data">
        <h1>Link Shortener</h1>
        <hr>
        <form action="" x-on:reset.prevent="resetHandler" x-on:submit.prevent="submitHandler">
            <label for="">
                URL:
                <input type="url" name="url" id="url" placeholder="Enter your URL" x-model="url">
            </label>
            <div class="grid">
                <button type="reset" class="secondary button">Reset</button>
                <button type="submit">Shorten</button>
            </div>
        </form>
        <hr>
        <div x-show="shortLink.length>0">
            <h2>The shortened link is:</h2>
            <!-- centered code block -->
            <code x-text="shortLink" style="text-align: center;" x-on:click="openToast"></code>
        </div>

        <!-- toast -->
        <article style="position: fixed; width: 15em; height: 9em; left: 50%; bottom: 1em; margin-left: -7.5em;"
            data-theme="light" x-show="toastIsOpen" x-transition:enter.duration.500ms
            x-transition:leave.duration.1000ms>
            <h5 style="margin: 0;">
                Copied to clipboard
            </h5>
        </article>
    </main>
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