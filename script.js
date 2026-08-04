const channels = [
    {
        number: "03",
        name: "YouTube",
        logo: "https://cdn.simpleicons.org/youtube/FF0000",
        url: "https://youtube.com/@retro.reminder?si=RgH9yUZVI90Dgy-k"
    },
    {
        number: "07",
        name: "TikTok",
        logo: "https://cdn.simpleicons.org/tiktok/FFFFFF",
        url: "https://www.tiktok.com/@retro.reminder"
    },
    {
        number: "11",
        name: "Instagram",
        logo: "https://cdn.simpleicons.org/instagram/FFFFFF",
        url: "https://www.instagram.com/retro.reminder"
    },
    {
        number: "22",
        name: "Facebook",
        logo: "https://cdn.simpleicons.org/facebook/1877F2",
        url: "https://www.facebook.com/share/1JAfe51abo/"
    },
    {
        number: "99",
        name: "eBay",
        logo: "https://cdn.simpleicons.org/ebay/FFFFFF",
        url: "https://www.ebay.com/usr/retro.reminder"
    }
];

let currentChannel = 0;

function changeChannel() {

    currentChannel++;

    if (currentChannel >= channels.length) {
        currentChannel = 0;
    }

    const channel = channels[currentChannel];

    const screen = document.querySelector(".tv-screen");

    /* KEEP THE TV SCREEN SIZE */

    screen.style.boxSizing = "border-box";
    screen.style.height = screen.offsetHeight + "px";


    /* HIDE CURRENT CONTENT */

    const screenContents = screen.querySelectorAll("*");

    screenContents.forEach(function(element) {
        element.style.opacity = "0";
    });


    /* OLD TV STATIC */

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


    /* NEW CHANNEL */

    setTimeout(function() {

        screen.style.background = "#050505";

        screen.innerHTML = `
            <div style="
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                transform:scale(.85);
            ">

                <h2 style="
                    margin:2px 0;
                    font-size:22px;
                ">
                    CH ${channel.number}
                </h2>

                <img
                    src="${channel.logo}"
                    alt="${channel.name} logo"
                    style="
                        width:45px;
                        height:45px;
                        object-fit:contain;
                        margin:3px auto;
                        display:block;
                    "
                >

                <div style="
                    color:#8b5cf6;
                    font-size:12px;
                    letter-spacing:2px;
                    margin:3px 0;
                ">
                    NOW PLAYING
                </div>

                <p style="
                    color:#00d9ff;
                    font-size:16px;
                    margin:4px 0;
                    font-weight:bold;
                ">
                    ${channel.name}
                </p>

                <p style="
                    font-size:11px;
                    margin:4px 0 0;
                ">
                    CLICK THE SCREEN TO VISIT
                </p>

            </div>
        `;

        screen.onclick = function() {
            window.open(channel.url, "_blank");
        };

    }, 250);
}
