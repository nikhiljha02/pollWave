import { useEffect } from "react";

export default function useLandingEffects() {
    useEffect(() => {
        // Cursor
        const dot = document.getElementById("cursorDot");
        const ring = document.getElementById("cursorRing");

        let mx = 0;
        let my = 0;
        let rx = 0;
        let ry = 0;

        const mouseMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
        };

        document.addEventListener("mousemove", mouseMove);

        function animCursor() {
            if (dot && ring) {
                dot.style.left = mx + "px";
                dot.style.top = my + "px";

                rx += (mx - rx) * 0.12;
                ry += (my - ry) * 0.12;

                ring.style.left = rx + "px";
                ring.style.top = ry + "px";
            }

            requestAnimationFrame(animCursor);
        }

        animCursor();

        // Hover effect
        const hoverElements = document.querySelectorAll("a, button, .step-card, .feature-card, .testi-card, .mock-option");

        hoverElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                ring?.classList.add("hover");
            });

            el.addEventListener("mouseleave", () => {
                ring?.classList.remove("hover");
            });
        });

        // Scroll reveal
        const reveals = document.querySelectorAll(".reveal");

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.12 },
        );

        reveals.forEach((r) => obs.observe(r));

        // Navbar shrink
        const handleScroll = () => {
            const nav = document.getElementById("navbar");

            if (nav) {
                nav.style.padding = window.scrollY > 40 ? "12px 56px" : "20px 56px";
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Mock poll click
        const options = document.querySelectorAll(".mock-option");

        options.forEach((opt) => {
            opt.addEventListener("click", function () {
                options.forEach((o) => o.classList.remove("selected"));

                this.classList.add("selected");
            });
        });

        // Cleanup
        return () => {
            document.removeEventListener("mousemove", mouseMove);

            window.removeEventListener("scroll", handleScroll);

            obs.disconnect();
        };
    }, []);
}
