/* CRC DEFAULT VALUES */
const DEFAULT_FONT_SIZE_PX = 16;
const DEFAULT_BOLD = false;

/* VALIDATORS DEFAULT TEXT */
const DEFAULT_TEXT = "N/A";

/* VALIDATORS STATUS COLORS */
const TRUE_COLOR = "bg-green-400";
const FALSE_COLOR = "bg-red-400";
const NA_COLOR = "bg-stone-400";

/* VALIDATORS IDENTIFIERS */
const WCAG_AA_ID = "#wcag-aa";
const WCAG_AAA_ID = "#wcag-aaa";
const CUSTOM_ID = "#custom";

/* FORM VARIABLES */
var fontSize;
var customRatio;
var bold;

const recalculateValidators = () => {
    const [rgb1, rgb2] = ["#color-1 div", "#color-2 div"].map((id) =>
        getBackgroundRgbById(id)
    );

    const validators = crc.getRatioValidationByRgb(rgb1, rgb2, {
        fontSizePx: Number(fontSize || 0) || null,
        custom: Number(customRatio || 0) || null,
        bold,
    });

    setValidators(validators);
};

const formatValidatorText = (text) =>
    text !== undefined
        ? String(text).charAt(0).toUpperCase() + String(text).slice(1)
        : DEFAULT_TEXT;

const getStatusClass = (value) => {
    switch (value) {
        case true:
            return TRUE_COLOR;
        case false:
            return FALSE_COLOR;
        default:
            return NA_COLOR;
    }
};

const setValidatorValue = (id, value) => {
    $(id.concat(" data")).text(formatValidatorText(value));

    $(id.concat(" span"))
        .removeClass([TRUE_COLOR, FALSE_COLOR, NA_COLOR].join(" "))
        .addClass(getStatusClass(value));
};

const setValidators = ({ WCAG_AA, WCAG_AAA, CUSTOM }) => {
    const validators = [
        { id: WCAG_AA_ID, value: WCAG_AA },
        { id: WCAG_AAA_ID, value: WCAG_AAA },
        { id: CUSTOM_ID, value: CUSTOM },
    ];

    validators.forEach((validator) =>
        setValidatorValue(validator.id, validator.value)
    );
};
