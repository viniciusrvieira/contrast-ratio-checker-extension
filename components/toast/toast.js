const getToastClasses = (options) => {
    const { duration = 6000, width = "100%", zIndex = 100 } = options || {};

    return [
        "toast",
        "fixed",
        "start-0",
        `w-[${width}]`,
        `z-[${zIndex}]`,
        "bottom-2.5",
        "flex",
        "flex-col",
        "items-center",
        "transition-all",
        `animate-[fadeInBottomToTop_600ms_ease-out,fadeOutTopToBottom_600ms_ease-in_${duration}ms_forwards]`,
    ].join(" ");
};

const getToastEl = (text, type) =>
    `<div class="bg-white border p-3 rounded w-fit">${text}</div>`;

const toast = (text, type = "none", options = {}) => {
    const toastEl = getToastEl(text, type);

    const backdrop = `<div class="${getToastClasses(
        options
    )}">${toastEl}</div>`;

    $(".toast").remove();

    $("body").append(backdrop);
};

const watchToasts = () => {
    $("body").on(
        "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        ".toast",
        (evt) => {
            const animationName = evt.originalEvent.animationName;

            if (animationName === "fadeOut") {
                $(".toast").remove();
            }
        }
    );
};
