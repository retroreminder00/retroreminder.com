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
   AUDIO
   Creates old-school mechanical button
   sounds without requiring sound files.
========================================= */

let audioContext = null;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (audioContext.state === "suspended") {

        audioContext.resume();

    }

    return audioContext;
}


function playClick(type = "knob") {

    try {

        const ctx = getAudioContext();

        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        oscillator.connect(gain);

        gain.connect(ctx.destination);


        const now = ctx.currentTime;


        if (type === "power") {

            /*
             * Heavier mechanical POWER click
             */

            oscillator.type = "square";

            oscillator.frequency.setValueAtTime(
                95,
                now
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                55,
                now + 0.07
            );

            gain.gain.setValueAtTime(
                0.16,
                now
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                now + 0.09
            );

            oscillator.start(now);

            oscillator.stop(now + 0.09);


        } else {

            /*
             * Short mechanical knob click
             */

            oscillator.type = "square";

            oscillator.frequency.setValueAtTime(
                850,
                now
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                350,
                now + 0.025
            );

            gain.gain.setValueAtTime(
                0.07,
                now
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                now + 0.035
            );

            oscillator.start(now);

            oscillator.stop(now + 0.035);

        }

    } catch (error) {

        /*
         * If the browser doesn't allow audio,
         * the TV still works normally.
         */

    }

}


/* =========================================
   SAVE TV STATE
========================================= */

function saveTVState() {

    try {

        sessionStorage.setItem(
            "retroReminderTVState",
            JSON.stringify({
                tvIsOn: tvIsOn,
                currentChannel: currentChannel,
                currentVideo: currentVideo
            })
        );

    } catch (error) {

        console.log(
            "Could not save TV state."
        );

    }

}


/* =========================================
   RESTORE TV STATE
========================================= */

function restoreTVState() {

    try {

        const saved =
            sessionStorage.getItem(
                "retroReminderTVState"
            );

        if (!saved) {
            return;
        }

        const state =
            JSON.parse(saved);

        if (
            typeof state.currentChannel ===
            "number"
        ) {

            currentChannel =
                state.currentChannel;

        }

        if (
            typeof state.currentVideo ===
            "number"
        ) {

            currentVideo =
                state.currentVideo;

        }

        if (state.tvIsOn) {

            tvIsOn = true;

            const screen =
                document.querySelector(
                    ".tv-screen"
                );

            const controls =
                document.querySelector(
                    ".tv-controls"
                );

            if (!screen) {
                return;
            }

            screen.classList.remove("off");

            if (controls) {
                controls.classList.add("powered");
            }

            showChannel(
                currentChannel,
                false
            );

        }

    } catch (error) {

        console.log(
            "Could not restore TV state."
        );

    }

}


/* =========================================
   POWER
========================================= */

window.toggleTV = function () {

    const screen =
        document.querySelector(".tv-screen");

    const controls =
        document.querySelector(".tv-controls");

    if (!screen) {
        return;
    }


    playClick("power");


    /* =====================================
       TURN TV ON
    ===================================== */

    if (!tvIsOn) {

        tvIsOn = true;

        if (controls) {
            controls.classList.add("powered");
        }

        screen.classList.remove("off");

        /*
         * Start completely dark.
         */

        screen.style.background = `
            radial-gradient(
                ellipse at center,
                #111 0%,
                #090909 55%,
                #050505 100%
            )
        `;


        /*
         * Show the Retro Reminder logo
         * during the warm-up sequence.
         */

        screen.innerHTML = `

            <div style="
                position:absolute;
                inset:0;
                display:flex;
                align-items:center;
                justify-content:center;
                opacity:0;
                animation:
                    retroLogoFade 1.8s ease-in forwards;
                z-index:10;
            ">

                <img
                    src="retroreminderlogotransparent.png"
                    alt="Retro Reminder"
                    style="
                        width:68%;
                        max-width:230px;
                        height:auto;
                        object-fit:contain;
                        filter:
                            drop-shadow(
                                0 0 8px
                                rgba(255,255,255,.25)
                            );
                    "
                >

            </div>

            <style>

                @keyframes retroLogoFade {

                    0% {
                        opacity:0;
                        transform:scale(.96);
                    }

                    35% {
                        opacity:.15;
                    }

                    70% {
                        opacity:.65;
                    }

                    100% {
                        opacity:1;
                        transform:scale(1);
                    }

                }

            </style>

        `;


        /*
         * Slowly bring the screen to life.
         */

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

        }, 900);


        /*
         * After the warm-up, show the
         * normal channel prompt.
         */

        setTimeout(function () {

            if (!tvIsOn) {
                return;
            }

            screen.innerHTML = `

                <h2>
                    CHANGE CHANNEL
                </h2>

                <p class="blink">
                    ▶ TURN CHANNEL KNOB
                </p>

            `;

        }, 2200);


        saveTVState();


        return;

    }


    /* =====================================
       TURN TV OFF
    ===================================== */

    tvIsOn = false;

    if (controls) {
        controls.classList.remove("powered");
    }

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

    saveTVState();

};


/* =========================================
   CHANNEL
========================================= */

window.changeChannel = function () {

    if (!tvIsOn) {
        return;
    }

    playClick("knob");


    currentChannel++;

    if (
        currentChannel >=
        channels.length
    ) {

        currentChannel = 0;

    }


    showChannel(
        currentChannel,
        true
    );


    saveTVState();

};


/* =========================================
   DISPLAY CHANNEL
========================================= */

function showChannel(
    channelIndex,
    animate
) {

    const channel =
        channels[channelIndex];

    const screen =
        document.querySelector(
            ".tv-screen"
        );

    if (!screen || !channel) {
        return;
    }


    screen.style.boxSizing =
        "border-box";

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


    const delay =
        animate ? 250 : 0;


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
                    text-shadow:
                        0 0 6px #00d9ff;
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


        /*
         * Clicking the screen now uses the
         * SAME TAB.
         *
         * This makes the browser Back button
         * return naturally to Retro Reminder.
         */

        screen.onclick = function () {

            saveTVState();

            window.location.href =
                channel.url;

        };


    }, delay);

}


/* =========================================
   VOLUME / VIDEOS
========================================= */

window.changeVolume = function () {

    if (!tvIsOn) {
        return;
    }


    playClick("knob");


    const screen =
        document.querySelector(
            ".tv-screen"
        );

    if (!screen) {
        return;
    }


    const videoID =
        volumeVideos[currentVideo];


    currentVideo++;


    if (
        currentVideo >=
        volumeVideos.length
    ) {

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


        screen.style.background =
            "#111";


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
                allow="
                    autoplay;
                    encrypted-media;
                    picture-in-picture
                "
                allowfullscreen>
            </iframe>

        `;


        saveTVState();


    }, 250);

};


/* =========================================
   RESTORE WHEN RETURNING TO THE SITE
========================================= */

window.addEventListener(
    "pageshow",
    function () {

        restoreTVState();

    }
);


/* =========================================
   SAVE BEFORE LEAVING
========================================= */

window.addEventListener(
    "pagehide",
    function () {

        saveTVState();

    }
);
