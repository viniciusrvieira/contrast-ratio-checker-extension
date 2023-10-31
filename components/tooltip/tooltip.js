const getTooltipClasses = (options) => {
    const {
        fontFamily = "Arial",
        width = "150px",
        fontSize = "12px",
        lineHeight = "16px",
    } = options || {};

    return [
        "tooltip",
        "absolute",
        "inline-block",
        "h-fit",
        `w-[${width}]`,
        "ml-1.5",
        "p-2.5",
        "bg-stone-600",
        "text-white",
        "text-left",
        "whitespace-break-spaces",
        `font-[${fontFamily}]`,
        `text-[${fontSize}]`,
        `leading-[${lineHeight}]`,
        "rounded",
        "animate-[fadeIn_600ms_ease-out]",
    ].join(" ");
};

const watchTooltips = () => {
    $("[tooltip]").on("mouseenter", (evt) => {
        const target = evt.target;

        const text = $(target).attr("tooltip");

        const width = $(target).attr("tooltip-width");

        const fontFamily = $(target).attr("tooltip-font-family");

        const textEl = `<div class="${getTooltipClasses({
            width: width || null,
            fontFamily: fontFamily || null,
        })}">${text}</div>`;

        $(target).append(textEl);
    });

    $("[tooltip]").on("mouseleave", (evt) => {
        $(".tooltip").remove();
    });
};
