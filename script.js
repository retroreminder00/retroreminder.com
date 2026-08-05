const channels = [
    {
        number: "03",
        name: "YOUTUBE",
        logo: "https://cdn.simpleicons.org/youtube/FF0000",
        url: "https://youtube.com/@retro.reminder?si=RgH9yUZVI90Dgy-k"
    },
    {
        number: "07",
        name: "TIKTOK",
        logo: "https://cdn.simpleicons.org/tiktok/FFFFFF",
        url: "https://www.tiktok.com/@retro.reminder"
    },
    {
        number: "11",
        name: "INSTAGRAM",
        logo: "https://cdn.simpleicons.org/instagram/FFFFFF",
        url: "https://www.instagram.com/retro.reminder"
    },
    {
        number: "22",
        name: "FACEBOOK",
        logo: "https://cdn.simpleicons.org/facebook/1877F2",
        url: "https://www.facebook.com/share/1JAfe51abo/"
    },
    {
        number: "99",
        name: "EBAY",
        logo: "https://cdn.simpleicons.org/ebay/FFFFFF",
        url: "https://www.ebay.com/usr/retro.reminder"
    }
];

const volumeVideos = [
    "tYHdM_qW7q4",
    "n37MYCyQSJA",
    "tYf6tDuVeu4",
    "-u_64Sjf4_M",
    "T_exc1RBc8s"
];

let currentChannel = 0;
let currentVideo = 0;
let tvIsOn = false;


/* =========================================
   POWER
========================================= */

window.toggleTV = function () {

    const screen = document.querySelector(".tv-screen");

    if (!screen) {
        return;
    }

    if (!tvIsOn) {

        tvIsOn = true;

        screen.classList.remove("off");

        screen.style.background = `
            radial-gradient(
                ellipse at center,
                #777 0%,
                #555 45%,
                #333 78%,
                #1b1b1b 100%
            )
        `;

        screen.innerHTML = `
    <h2>
        CHANGE CHANNEL
    </h2>

    <p class="blink">
        ▶ TURN CHANNEL KNOB
    </p>
`;

        screen.onclick = null;

    } else {

        tvIsOn = false;

        screen.classList.add("off");

        screen.style.background = `
            radial-gradient(
                ellipse at center,
                #191919 0%,
                #101010 60%,
                #080808 100%
            )
        `;

        screen.innerHTML = `
            <h2>
                RETRO REMINDER
            </h2>

            <p class="blink">
                ▶ PRESS POWER
            </p>
        `;

        screen.onclick = null;
    }
};


/* =========================================
   CHANNEL
========================================= */

window.changeChannel = function () {

    if (!tvIsOn) {
        return;
    }

    currentChannel++;

    if (currentChannel >= channels.length) {
        currentChannel = 0;
    }

    const channel = channels[currentChannel];

    const screen = document.querySelector(".tv-screen");

    if (!screen) {
        return;
    }

    screen.style.boxSizing = "border-box";
    screen.style.height = screen.offsetHeight + "px";

    screen.style.background = `
        repeating-radial-gradient(
            circle at 50% 50%,
            #ffffff 0px,
            #777777 1px,
            #111111 2px,
            #eeeeee 3px,
            #333333 4px
        )
    `;

    setTimeout(function () {

        if (!tvIsOn) {
            return;
        }

        screen.style.background = `
            radial-gradient(
                ellipse at center,
                #777 0%,
                #555 45%,
                #333 78%,
                #1b1b1b 100%
            )
        `;

        screen.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                transform:scale(.82);
                font-family:monospace;
                position:relative;
            ">

                <div style="
                    position:absolute;
                    top:0;
                    left:0;
                    color:#00d9ff;
                    font-size:13px;
                    font-weight:bold;
                    letter-spacing:2px;
                ">
                    CH ${channel.number}
                </div>

                <img
                    src="${channel.logo}"
                    alt="${channel.name} logo"
                    style="
                        width:50px;
                        height:50px;
                        object-fit:contain;
                        margin-bottom:5px;
                    "
                >

                <div style="
                    color:#00d9ff;
                    font-size:21px;
                    font-weight:bold;
                    letter-spacing:3px;
                    text-shadow:0 0 6px #00d9ff;
                ">
                    ${channel.name}
                </div>

                <div style="
                    color:#ffffff;
                    font-size:12px;
                    margin-top:8px;
                ">
                    RETRO REMINDER
                </div>

                <div style="
                    color:#00d9ff;
                    font-size:11px;
                    margin-top:10px;
                    letter-spacing:2px;
                ">
                    ▶ WATCH NOW
                </div>

            </div>
        `;

        screen.onclick = function () {
            window.open(channel.url, "_blank");
        };

    }, 250);
};


/* =========================================
   VOLUME / VIDEOS
========================================= */

window.changeVolume = function () {

    if (!tvIsOn) {
        return;
    }

    const screen = document.querySelector(".tv-screen");

    if (!screen) {
        return;
    }

    const videoID = volumeVideos[currentVideo];

    currentVideo++;

    if (currentVideo >= volumeVideos.length) {
        currentVideo = 0;
    }

    screen.style.background = `
        repeating-radial-gradient(
            circle at 50% 50%,
            #ffffff 0px,
            #777777 1px,
            #111111 2px,
            #eeeeee 3px,
            #333333 4px
        )
    `;

    setTimeout(function () {

        if (!tvIsOn) {
            return;
        }

        screen.style.background = "#111";

        screen.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoID}?autoplay=1&playsinline=1&rel=0"
                style="
                    width:100%;
                    height:100%;
                    border:0;
                    display:block;
                "
                title="Retro Reminder Video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;

    }, 250);
};
