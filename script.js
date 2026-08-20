/* =========================================
   RETRO REMINDER TV
   RR-82 SCRIPT
========================================= */


/* =========================================
   CHANNELS
========================================= */

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


/* =========================================
   VOLUME / VIDEO CHANNELS
========================================= */

const volumeVideos = [

    "tYHdM_qW7q4",
    "n37MYCyQSJA",
    "tYf6tDuVeu4",
    "-u_64Sjf4_M",
    "T_exc1RBc8s"

];


/* =========================================
   TV STATE
========================================= */

let currentChannel = 0;

let currentVideo = 0;

let tvIsOn = false;


/* =========================================
   AUDIO SYSTEM
   Creates simple mechanical TV sounds
   without requiring external audio files.
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


/* =========================================
   KNOB CLICK SOUND
========================================= */

function playKnobClick() {

    try {

        const ctx = getAudioContext();

        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            180,
            ctx.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            80,
            ctx.currentTime + 0.035
        );

        gain.gain.setValueAtTime(
            0.08,
            ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.045
        );

        oscillator.connect(gain);

        gain.connect(ctx.destination);

        oscillator.start();

        oscillator.stop(
            ctx.currentTime + 0.05
        );

    } catch (error) {

        console.log(
            "Audio unavailable."
        );

    }

}


/* =========================================
   POWER CLICK SOUND
========================================= */

function playPowerSound() {

    try {

        const ctx = getAudioContext();

        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            110,
            ctx.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            55,
            ctx.currentTime + 0.08
        );

        gain.gain.setValueAtTime(
            0.1,
            ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.1
        );

        oscillator.connect(gain);

        gain.connect(ctx.destination);

        oscillator.start();

        oscillator.stop(
            ctx.currentTime + 0.11
        );

    } catch (error) {

        console.log(
            "Audio unavailable."
        );

    }

}


/* =========================================
   STATIC / CRT POWER-UP SOUND
========================================= */

function playCRTStartSound() {

    try {

        const ctx = getAudioContext();

        const bufferSize =
            ctx.sampleRate * 0.18;

        const buffer =
            ctx.createBuffer(
                1,
                bufferSize,
                ctx.sampleRate
            );

        const data =
            buffer.getChannelData(0);

        for (
            let i = 0;
            i < bufferSize;
            i++
        ) {

            data[i] =
                (Math.random() * 2 - 1) *
                (1 - i / bufferSize);

        }

        const noise =
            ctx.createBufferSource();

        noise.buffer = buffer;

        const filter =
            ctx.createBiquadFilter();

        filter.type = "highpass";

        filter.frequency.value = 900;

        const gain =
            ctx.createGain();

        gain.gain.setValueAtTime(
            0.025,
            ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.18
        );

        noise
            .connect(filter)
            .connect(gain)
            .connect(ctx.destination);

        noise.start();

    } catch (error) {

        console.log(
            "Audio unavailable."
        );

    }

}


/* =========================================
   KNOB ROTATION
========================================= */

function rotateKnob(knob, degrees) {

    if (!knob) {
        return;
    }

    knob.style.transform =
        `rotate(${degrees}deg)`;

}


/* =========================================
   POWER
========================================= */

window.toggleTV = function () {

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


    /* =====================================
       TURN TV ON
    ===================================== */

    if (!tvIsOn) {

        playPowerSound();

        setTimeout(
            playCRTStartSound,
            120
        );

        tvIsOn = true;

        if (controls) {

            controls.classList.add(
                "powered"
            );

        }

        screen.classList.remove(
            "off"
        );


        /* Save state */

        sessionStorage.setItem(
            "retroTVOn",
            "true"
        );


        /* CRT STARTUP */

        screen.style.transition =
            "background 1.5s ease, opacity 1.5s ease";


        screen.style.opacity =
            "0";


        screen.style.background = `
            radial-gradient(
                ellipse at center,
                #777 0%,
                #555 43%,
                #303030 76%,
                #151515 100%
            )
        `;


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
                <span>
                    RETRO REMINDER
                </span>
            </div>
        `;


        /* Slowly bring CRT to life */

        setTimeout(
            function () {

                screen.style.opacity =
                    "1";

            },
            100
        );


        /* Then show channel prompt */

        setTimeout(
            function () {

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

            },
            1700
        );

    }


    /* =====================================
       TURN TV OFF
    ===================================== */

    else {

        playPowerSound();

        tvIsOn = false;

        if (controls) {

            controls.classList.remove(
                "powered"
            );

        }

        screen.style.opacity =
            "1";

        screen.classList.add(
            "off"
        );

        screen.style.background = `
            radial-gradient(
                ellipse at center,
                #181818 0%,
                #101010 58%,
                #070707 100%
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


        sessionStorage.setItem(
            "retroTVOn",
            "false"
        );

    }

};


/* =========================================
   CHANGE CHANNEL
========================================= */

window.changeChannel = function () {

    if (!tvIsOn) {
        return;
    }


    playKnobClick();


    /* Advance channel */

    currentChannel++;


    if (
        currentChannel >=
        channels.length
    ) {

        currentChannel = 0;

    }


    const channel =
        channels[currentChannel];


    const screen =
        document.querySelector(
            ".tv-screen"
        );


    const knob =
        document.querySelector(
            ".channel-knob"
        );


    if (!screen) {
        return;
    }


    /* Rotate knob */

    rotateKnob(
        knob,
        currentChannel * 72
    );


    /* Save channel */

    sessionStorage.setItem(
        "retroCurrentChannel",
        currentChannel
    );


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


    screen.style.opacity =
        "0.7";


    /* Show channel */

    setTimeout(
        function () {

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


            screen.style.opacity =
                "1";


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


            /* =================================
               OPEN SOCIAL PLATFORM
            ================================= */

            screen.onclick =
                function () {

                    window.open(
                        channel.url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                };


        },
        250
    );

};


/* =========================================
   CHANGE VOLUME / VIDEO
========================================= */

window.changeVolume = function () {

    if (!tvIsOn) {
        return;
    }


    playKnobClick();


    const screen =
        document.querySelector(
            ".tv-screen"
        );


    const knob =
        document.querySelector(
            ".volume-knob"
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


    /* Rotate volume knob */

    rotateKnob(
        knob,
        currentVideo * 72
    );


    /* Save video */

    sessionStorage.setItem(
        "retroCurrentVideo",
        currentVideo
    );


    /* STATIC */

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


    setTimeout(
        function () {

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

        },
        250
    );

};


/* =========================================
   RESTORE TV SESSION
========================================= */

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedTV =
            sessionStorage.getItem(
                "retroTVOn"
            );


        const savedChannel =
            sessionStorage.getItem(
                "retroCurrentChannel"
            );


        const savedVideo =
            sessionStorage.getItem(
                "retroCurrentVideo"
            );


        if (savedChannel !== null) {

            currentChannel =
                parseInt(
                    savedChannel,
                    10
                );

        }


        if (savedVideo !== null) {

            currentVideo =
                parseInt(
                    savedVideo,
                    10
                );

        }


        /*
         * We intentionally leave the TV
         * OFF on a completely fresh visit.
         *
         * Session state can be expanded later
         * if we want the exact screen restored
         * when someone returns from a social site.
         */

    }
);
