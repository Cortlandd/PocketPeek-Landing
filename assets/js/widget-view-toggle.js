(() => {
    const publicBtn = document.getElementById("public-view-btn");
    const privacyBtn = document.getElementById("privacy-mode-btn");
    if (!publicBtn || !privacyBtn) return;

    const sensitiveEls = Array.from(document.querySelectorAll(".js-sensitive"));
    const chartEls = Array.from(document.querySelectorAll(".js-chart"));
    const statusIcon = document.getElementById("widget-view-icon");
    const statusText = document.getElementById("widget-view-text");
    const blurClasses = ["blur-md", "blur-lg", "blur-[6px]"];

    sensitiveEls.forEach((el) => {
        const existing = blurClasses.filter((blurClass) => el.classList.contains(blurClass));
        el.dataset.privacyBlur = existing.join(" ");
    });

    const setMode = (mode) => {
        const isPrivacy = mode === "privacy";

        publicBtn.classList.toggle("bg-primary", !isPrivacy);
        publicBtn.classList.toggle("text-background-dark", !isPrivacy);
        publicBtn.classList.toggle("shadow-lg", !isPrivacy);
        publicBtn.classList.toggle("shadow-primary/10", !isPrivacy);
        publicBtn.classList.toggle("text-slate-500", isPrivacy);
        publicBtn.classList.toggle("hover:text-white", isPrivacy);

        privacyBtn.classList.toggle("bg-primary", isPrivacy);
        privacyBtn.classList.toggle("text-background-dark", isPrivacy);
        privacyBtn.classList.toggle("shadow-lg", isPrivacy);
        privacyBtn.classList.toggle("shadow-primary/10", isPrivacy);
        privacyBtn.classList.toggle("text-slate-500", !isPrivacy);
        privacyBtn.classList.toggle("hover:text-white", !isPrivacy);

        publicBtn.setAttribute("aria-pressed", String(!isPrivacy));
        privacyBtn.setAttribute("aria-pressed", String(isPrivacy));

        sensitiveEls.forEach((el) => {
            blurClasses.forEach((blurClass) => el.classList.remove(blurClass));
            if (isPrivacy && el.dataset.privacyBlur) {
                el.dataset.privacyBlur.split(" ").forEach((blurClass) => el.classList.add(blurClass));
            }
        });

        chartEls.forEach((el) => {
            el.classList.toggle("grayscale", isPrivacy);
            el.classList.toggle("opacity-50", isPrivacy);
        });

        if (statusIcon) {
            statusIcon.textContent = isPrivacy ? "visibility_off" : "visibility";
        }

        if (statusText) {
            statusText.textContent = isPrivacy
                ? "Showing Privacy Mode: All balances are blurred for public viewing."
                : "Showing Public View: Balances are fully visible.";
        }
    };

    publicBtn.addEventListener("click", () => setMode("public"));
    privacyBtn.addEventListener("click", () => setMode("privacy"));
    setMode("public");
})();

(() => {
    const yearEl = document.getElementById("copyright-year");
    if (!yearEl) return;
    yearEl.textContent = String(new Date().getFullYear());
})();
