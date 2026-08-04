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

    /* LOCK ORIGINAL SCREEN SIZE */

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


    /* CHANGE CHANNEL */

    setTimeout(function() {

        screen.style.background = "#050505";

        screen.innerHTML = `
            <h2 style="
                margin:5px 0;
                font-size:24px;
            ">
                CH ${channel.number}
            </h2>

            <img
                src="${channel.logo}"
                alt="${channel.name} logo"
                style="
                    width:50px;
                    height:50px;
                    object-fit:contain;
                    margin:5px auto;
                    display:block;
                "
            >

            <div class="boot-text" style="
                margin-top:8px;
                font-size:14px;
            ">
                NOW PLAYING
            </div>

            <p class="blink" style="
                margin:8px 0;
                font-size:18px;
            ">
                ${channel.name}
            </p>

            <p style="
                margin:8px 0 0;
                font-size:12px;
            ">
                CLICK THE SCREEN TO VISIT
            </p>
        `;

        screen.onclick = function() {
            window.open(channel.url, "_blank");
        };

    }, 250);
}
