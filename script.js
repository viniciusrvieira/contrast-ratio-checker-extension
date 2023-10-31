const crc = new ContrastRatioChecker.ContrastRatioChecker();

var setFontSizeTimeout = null;
var setCustomRatioTimeout = null;
var setBoldTimeout = null;

const recalculateRatio = () => {
    const [rgb1, rgb2] = ["#color-1 div", "#color-2 div"].map((id) =>
        getBackgroundRgbById(id)
    );

    const result = crc.getContrastRatioByRgb(rgb1, rgb2);

    $("#result").text(result.toFixed(2));
};

const setColor = (event) => {
    if (!window.EyeDropper) {
        alert("Error: Your browser does not support the EyeDropper API");

        return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
        .open()
        .then((res) => {
            const color = res.sRGBHex;

            if (isValidHex(color)) {
                event.target.style.backgroundColor = color;
            } else {
                event.target.style.backgroundColor = rgbaToRgbString(color);
            }

            recalculateRatio();
            recalculateValidators();
        })
        .catch((err) => {
            console.error(err);
        });
};

const debounceTime = (cb, timeout, duration) => {
    this[timeout] && clearTimeout(this[timeout]);

    this[timeout] = setTimeout(cb, duration);
};

const setInput = (event) => {
    const target = event.target;
    const id = target.id;

    switch (id) {
        case "bold":
            debounceTime(
                () => {
                    bold = target.checked;

                    recalculateValidators();
                },
                "setBoldTimeout",
                300
            );

            break;

        case "font-size":
            debounceTime(
                () => {
                    fontSize = target.value;

                    recalculateValidators();
                },
                "setFontSizeTimeout",
                300
            );

            break;

        case "custom-ratio":
            debounceTime(
                () => {
                    customRatio = target.value;

                    recalculateValidators();
                },
                "setCustomRatioTimeout",
                300
            );

            break;
    }
};

const toggleSettings = (event) => {
    const target = $("#tab-header button").get(0);

    const action = target.innerText === "expand_more" ? "open" : "close";

    $(target).text(action === "open" ? "expand_less" : "expand_more");

    if (action === "open") {
        $("#inputs-wrapper").addClass("max-h-48");
    } else {
        $("#inputs-wrapper").removeClass("max-h-48");
    }
};

const copyToClipboard = (text) => {
    const clipBoard = navigator.clipboard;

    clipBoard.writeText(text).then(() => {
        toast("Text copied to clipboard.", "info", {
            width: "286px",
            zIndex: "100",
            duration: 3000,
        });
    });
};

const copyColor = (evt) => {
    const colorNumber = evt.target.parentNode.innerText.match(/Color (.)+/)[1];

    const rgb = getBackgroundRgbById(`#color-${colorNumber} div`);

    const hex = getHexByRgbObject(rgb);

    copyToClipboard(hex);
};
