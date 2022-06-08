/**
 * Created by yh on 2021/7/4
 */
const colorStops = [
    [0, "rgb(84, 94, 109)"],
    [0.2, "rgb(111, 122, 137)"],
    [0.4, "rgb(153, 156, 168)"],
    [0.6, "rgb(195, 200, 219)"],
    [0.9, "rgb(74, 73, 83)"],
    [1, "rgb(93, 93, 93)"]
];
export const createShinyBox = (...buttons) => {
    const shines = buttons.map(button => {
        if(typeof button === 'string'){
            button = document.querySelector(button);
        }
        const loopPartial = () => {
            let canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '-1';
            button.appendChild(canvas);
            setTimeout(() => {},200);
            const c = button.querySelector("canvas");
            const $ = c.getContext("2d");
            const { width, height } = button.getBoundingClientRect();
            let w = (c.width = width);
            let h = (c.height = height);

            return (x, y, width, height, i) => {
                const xRatio = width / x || 0;
                const yRatio = height / y || 0;
                console.log(i);
                const diff = i + 1;
                const gradient = $.createLinearGradient(
                    yRatio * (w / 2) / 8 * -diff * 2,
                    xRatio * (w / 2) / 8 - diff * 2,
                    xRatio * (w / 2),
                    yRatio * h / (diff / 2)
                );

                colorStops.forEach(([stop, color]) =>{
                    gradient.addColorStop(stop, color);
                });

                $.fillStyle = gradient;
                $.fillRect(0, 0, w, h);
            };
        };
        const loop = loopPartial();
        const innerWidth = window.innerWidth;
        //const innerheight = window.innerHeight;
        // Init
        loop(innerWidth / 2, innerHeight / 2, innerWidth, innerHeight, 0);
        return loop;
    });

    document.addEventListener("mousemove", ({ clientX, clientY }) => {
        shines.forEach((shine, i) => {
            const innerWidth = window.innerWidth;
            const innerHeight = window.innerHeight;
            requestAnimationFrame(() =>
                shine(clientX, clientY, innerWidth, innerHeight, i)
            );
        });
    });
};
