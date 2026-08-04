const channels = [
    {
        number: "03",
        name: "YouTube",
        url: "https://youtube.com/@retro.reminder?si=RgH9yUZVI90Dgy-k"
    },
    {
        number: "07",
        name: "TikTok",
        url: "https://www.tiktok.com/@retro.reminder"
    },
    {
        number: "11",
        name: "Instagram",
        url: "https://www.instagram.com/retro.reminder"
    },
    {
        number: "22",
        name: "Facebook",
        url: "https://www.facebook.com/share/1JAfe51abo/"
    },
    {
        number: "99",
        name: "eBay",
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

    screen.innerHTML = `
        <h2>CH ${channel.number}</h2>

        <div class="boot-text">
            NOW PLAYING
        </div>

        <p class="blink">
            ${channel.name}
        </p>

        <p>
            CLICK THE SCREEN TO VISIT
        </p>
    `;

    screen.onclick = function() {
        window.open(channel.url, "_blank");
    };
}
