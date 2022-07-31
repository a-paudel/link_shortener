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
</head>

<body>
    <main class="container" x-data="data">
        <h1>Link Shortner</h1>
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
        <template x-if="shortLink.length > 0">
            <div>
                <h2>The shortened link is:</h2>
                <!-- centered code block -->
                <a x-bind:href="shortLink" target="_blank">
                    <code x-text="shortLink" style="text-align: center;">
                    </code>
                </a>
            </div>
        </template>
    </main>
</body>
<script>
    let data = {
        url: "",
        shortLink: "",
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
                navigator.clipboard.writeText(this.shortLink);
            } else {
                alert("Error shortening link");
            }

        },

    }
</script>

</html>