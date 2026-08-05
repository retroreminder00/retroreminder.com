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

let currentChannel = 0;
let tvOn = false;
let volumeLevel = 2;


/* POWER */

function toggleTV() {

    const screen = document.querySelector(".tv-screen");

    if (!tvOn) {

        tvOn = true;

        screen.classList.remove("off");

        screen.onclick = null;

        /* CRT STATIC STARTUP */

        screen.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                color:#00d9ff;
                font-family:monospace;
                font-size:18px;
                letter-spacing:4px;
                text-shadow:0 0 6px #00d9ff;
            ">
                POWERING UP
            </div>
        `;

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

        setTimeout(function() {

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
                <h2>RETRO REMINDER</h2>

                <div class="boot-text">
                    CLASSIC GAME COLLECTION
                </div>

                <p class="blink">
                    ▶ SELECT CHANNEL
                </p>
            `;

        }, 700);

    } else {

        tvOn = false;

        screen.classList.add("off");

        screen.innerHTML = "";

        screen.onclick = null;

        screen.style.background = "#111";

    }
}


/* CHANNEL */

function changeChannel() {

    /* DO NOTHING IF TV IS OFF */

    if (!tvOn) {
        return;
    }

    currentChannel++;

    if (currentChannel >= channels.length) {
        currentChannel = 0;
    }

    const channel = channels[currentChannel];

    const screen = document.querySelector(".tv-screen");

    /* KEEP SCREEN SIZE */

    screen.style.boxSizing = "border-box";
    screen.style.height = screen.offsetHeight + "px";

    /* HIDE CURRENT CONTENT */

    const screenContents = screen.querySelectorAll("*");

    screenContents.forEach(function(element) {
        element.style.opacity = "0";
    });

    /* TV STATIC */

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

    /* SHOW NEW CHANNEL */

    setTimeout(function() {

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
                    color:#fff4d6;
                    font-size:12px;
                    font-weight:bold;
                    letter-spacing:3px;
                    margin-top:8px;
                    text-shadow:
                        -1px -1px 0 #111,
                         1px -1px 0 #111,
                        -1px  1px 0 #111,
                         1px  1px 0 #111,
                         0 0 5px rgba(0,0,0,.9);
                ">
                    NOW PLAYING
                </div>

                <div style="
                    color:#ffffff;
                    font-size:12px;
                    margin-top:5px;
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

        screen.onclick = function() {
            window.open(channel.url, "_blank");
        };

    }, 250);
}


/* VOLUME */

function changeVolume() {

    if (!tvOn) {
        return;
    }

    volumeLevel++;

    if (volumeLevel > 4) {
        volumeLevel = 1;
    }

    const screen = document.querySelector(".tv-screen");

    const volumeMessage = document.createElement("div");

    volumeMessage.innerHTML = `
        VOLUME ${volumeLevel}
    `;

    volumeMessage.style.position = "absolute";
    volumeMessage.style.bottom = "12px";
    volumeMessage.style.right = "12px";
    volumeMessage.style.padding = "5px 8px";
    volumeMessage.style.background = "rgba(0,0,0,.75)";
    volumeMessage.style.color = "#fff4d6";
    volumeMessage.style.fontFamily = "monospace";
    volumeMessage.style.fontSize = "12px";
    volumeMessage.style.fontWeight = "bold";
    volumeMessage.style.letterSpacing = "2px";
    volumeMessage.style.textShadow = "0 1px 2px #000";
    volumeMessage.style.zIndex = "20";

    screen.appendChild(volumeMessage);

    setTimeout(function() {

        volumeMessage.remove();

    }, 900);
}
