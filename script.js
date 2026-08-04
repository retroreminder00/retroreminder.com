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


function changeChannel() {

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


    /* NEW BROADCAST */

    setTimeout(function() {

        screen.style.background = "#050505";

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


                <!-- CHANNEL NUMBER -->

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


                <!-- LOGO -->

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


                <!-- CHANNEL NAME -->

                <div style="
                    color:#00d9ff;
                    font-size:21px;
                    font-weight:bold;
                    letter-spacing:3px;
                    text-shadow:
                        0 0 6px #00d9ff;
                ">
                    ${channel.name}
                </div>


                <!-- NOW PLAYING -->

                <div style="
                    color:#8b5cf6;
                    font-size:12px;
                    letter-spacing:3px;
                    margin-top:8px;
                ">
                    NOW PLAYING
                </div>


                <!-- RETRO REMINDER -->

                <div style="
                    color:#ffffff;
                    font-size:12px;
                    margin-top:5px;
                ">
                    RETRO REMINDER
                </div>


                <!-- WATCH -->

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

            window.open(
                channel.url,
                "_blank"
            );

        };

    }, 250);

}
