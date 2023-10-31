const getRgbArrayFromRgbaString = (rgba) => {
    try {
        const rgbArray = rgba
            .match(/^(rgba|rgb)\(((,?\s*\d+){3}).+$/)[2]
            .split(",");

        return rgbArray.map((c) => Number(c));
    } catch (err) {
        throw new Error(`getRgbArrayFromRgbaString failed. ${err}`);
    }
};

const rgbaToRgbObject = (rgba) => {
    try {
        const rgbArray = getRgbArrayFromRgbaString(rgba);

        return {
            red: rgbArray[0],
            green: rgbArray[1],
            blue: rgbArray[2],
        };
    } catch (err) {
        throw new Error(`rgbaToRgbObject failed. ${err}`);
    }
};

const rgbaToRgbString = (rgba) => {
    try {
        const rgbValues = getRgbArrayFromRgbaString(rgba).join(",");

        return `rgb(${rgbValues})`;
    } catch (err) {
        throw new Error(`rgbaToRgbString failed. ${err}`);
    }
};

const isValidHex = (color) => {
    try {
        const hexRegExp = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/gi;

        return hexRegExp.test(color);
    } catch (err) {
        throw new Error(`isValidHex failed. ${err}`);
    }
};

const getBackgroundRgbById = (value) => {
    const color = $(value).css("backgroundColor");

    return isValidHex(color) ? convertHexToRgb(color) : rgbaToRgbObject(color);
};

/*
Code below extracted from "Constrast Ratio Checker @1.1.7"

Package: https://www.npmjs.com/package/contrast-ratio-checker
Github: https://github.com/viniciusrvieira/contrast-ratio-checker

Released under MIT License @viniciusrvieira
(https://github.com/viniciusrvieira)
*/

const getFullHex = (hex) => {
    try {
        if (hex.length === 6) return hex;

        return hex
            .split("")
            .map((char) => `${char}${char}`)
            .join("");
    } catch (err) {
        throw Error(`getFullHex failed. ${err}`);
    }
};

const separateStringPerCharGroup = (string, groupBy) => {
    try {
        const regExp = new RegExp(`.{1,${groupBy}}`, "g");

        return string.match(regExp);
    } catch (err) {
        throw Error(`separateStringPerCharGroup failed. ${err}`);
    }
};

const convertHexToRgb = (hex) => {
    try {
        if (!this.isValidHex(hex)) {
            throw Error("Invalid hexadecimal string");
        }

        const hexadecimal = hex.slice(1);

        const fullHex = this.getFullHex(hexadecimal);

        const hexParts = this.separateStringPerCharGroup(fullHex, 2);

        const rgbObject = hexParts.reduce((prev, part, index) => {
            const decimal = parseInt(part, 16);

            switch (index) {
                case 0:
                    prev.red = decimal;

                    return prev;
                case 1:
                    prev.green = decimal;

                    return prev;

                case 2:
                    prev.blue = decimal;

                    return prev;
            }
        }, {});

        return rgbObject;
    } catch (err) {
        throw Error(`convertHexToRgb failed. ${err}`);
    }
};

const getHexByRgbObject = (rgb) =>
    ["red", "green", "blue"].reduce(
        (p, key) => p.concat(rgb[key].toString(16).padStart(2, "0")),
        "#"
    );
