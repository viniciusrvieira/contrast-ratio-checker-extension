$(document).ready(() => {
    $("#color-1 div, #color-2 div").on("click", setColor);

    $("input#custom-ratio, input#font-size, input#bold").on("input", setInput);

    $("#tab-header").on("click", toggleSettings);

    $("#color-1 button, #color-2 button").on("click", copyColor);

    watchToasts();

    watchTooltips();
});
