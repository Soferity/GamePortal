const circle = '<svg viewBox="0 0 11.4 11.9"><path class="circle" d="M5.7,0.1C2.6,0.1,0,2.8,0,6s2.6,5.9,5.7,5.9s5.7-2.7,5.7-5.9S8.9,0.1,5.7,0.1L5.7,0.1z M5.7,8.8 C4.2,8.8,3,7.6,3,6s1.2-2.8,2.7-2.8S8.4,4.4,8.4,6S7.2,8.8,5.7,8.8L5.7,8.8z"/></svg>';
const rhombus = '<svg viewBox="0 0 13 14"><path class="rhombus" d="M5.9,1.2L0.7,6.5C0.5,6.7,0.5,7,0.7,7.2l5.2,5.4c0.2,0.2,0.5,0.2,0.7,0l5.2-5.4 C12,7,12,6.7,11.8,6.5L6.6,1.2C6.4,0.9,6.1,0.9,5.9,1.2L5.9,1.2z M3.4,6.5L6,3.9c0.2-0.2,0.5-0.2,0.7,0l2.6,2.6 c0.2,0.2,0.2,0.5,0,0.7L6.6,9.9c-0.2,0.2-0.5,0.2-0.7,0L3.4,7.3C3.2,7.1,3.2,6.8,3.4,6.5L3.4,6.5z" /></svg>';

const pentahedron = '<svg viewBox="0 0 561.8 559.4"><path class="pentahedron" d="M383.4,559.4h-204l-2.6-0.2c-51.3-4.4-94-37-108.8-83l-0.2-0.6L6,276.7l-0.2-0.5c-14.5-50,3.1-102.7,43.7-131.4 L212.1,23C252.4-7.9,310.7-7.9,351,23l163.5,122.5l0.4,0.3c39,30.3,56,82.6,42.2,130.3l-0.3,1.1l-61.5,198 C480.4,525.6,435.5,559.4,383.4,559.4z M185.5,439.4h195.2l61.1-196.8c0-0.5-0.3-1.6-0.7-2.1L281.5,120.9L120.9,241.2 c0,0.3,0.1,0.7,0.2,1.2l60.8,195.8C182.5,438.5,183.7,439.1,185.5,439.4z M441,240.3L441,240.3L441,240.3z"/></svg>';
const x = '<svg viewBox="0 0 12 12"> <path class="x" d="M10.3,4.3H7.7V1.7C7.7,0.8,7,0,6,0S4.3,0.8,4.3,1.7v2.5H1.7C0.8,4.3,0,5,0,6s0.8,1.7,1.7,1.7h2.5v2.5 C4.3,11.2,5,12,6,12s1.7-0.8,1.7-1.7V7.7h2.5C11.2,7.7,12,7,12,6S11.2,4.3,10.3,4.3z"/></svg>';
const dribble = '<svg viewBox="0 0 184.3 184.3"> <path class="dribble" d="M92.2,184.3C41.3,184.3,0,143,0,92.2S41.3,0,92.2,0s92.2,41.3,92.2,92.2S143,184.3,92.2,184.3z M169.9,104.8 c-2.7-0.9-24.4-7.3-49-3.4c10.3,28.3,14.5,51.3,15.3,56.1C153.8,145.6,166.4,126.7,169.9,104.8z M122.9,164.7 c-1.2-6.9-5.7-31-16.8-59.7c-0.2,0.1-0.3,0.1-0.5,0.2c-44.4,15.5-60.3,46.3-61.8,49.2C57.2,164.8,74,171,92.2,171 C103.1,171,113.5,168.8,122.9,164.7z M33.7,144.9c1.8-3.1,23.4-38.8,64-51.9c1-0.3,2.1-0.6,3.1-0.9c-2-4.5-4.1-8.9-6.4-13.4 C55.1,90.4,16.9,89.9,13.5,89.9c0,0.8,0,1.6,0,2.4C13.4,112.5,21.1,131,33.7,144.9z M15.1,76.2c3.5,0,36,0.2,72.8-9.6 C74.8,43.4,60.8,23.9,58.7,21C36.7,31.4,20.2,51.7,15.1,76.2z M73.7,15.7c2.2,2.9,16.5,22.4,29.4,46.1c28-10.5,39.8-26.4,41.3-28.4 c-13.9-12.3-32.2-19.8-52.2-19.8C85.8,13.6,79.6,14.3,73.7,15.7z M153.1,42.5c-1.7,2.2-14.8,19.2-44,31c1.8,3.7,3.6,7.6,5.2,11.4 c0.6,1.4,1.1,2.7,1.7,4.1c26.2-3.3,52.2,2,54.8,2.5C170.7,73,164,55.9,153.1,42.5z"/> </svg>';

const data = [rhombus, pentahedron, circle, x];

const max = 60;

let particles = [];


class Ball {
    constructor(shape) {
        this.shape = $(shape);
        this.speed = 2 + Math.random() * 6;
        this.vx = Math.random() * this.speed - Math.random() * this.speed;
        this.vy = Math.random() * this.speed - Math.random() * this.speed;
        this.radius = 10 + Math.round(Math.random() * 50);
        this.w = $(window).width();
        this.h = $(window).height();
        this.x = (this.w - this.radius) / 2;
        this.y = (this.h - this.radius) / 2;

        $(window).on("resize", this.resize.bind(this));
        this.render();
    }

    render() {
        $(this.shape).css({
            width: this.radius,
            height: this.radius
        });

        $("#particle").append(this.shape);
    }

    resize() {
        this.w = $(window).width();
        this.h = $(window).height();
    }

    move() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;


        this.shape.css({
            left: this.x,
            top: this.y,
            transform: "rotate(" + this.y + "deg)"
        });


        if (this.x < 0 || this.x > this.w - this.radius) {
            this.vx = -this.vx;
        }
        if (this.y < 0 || this.y > this.h - this.radius) {
            this.vy = -this.vy;
        }
        return this;
    }
}



function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


for (let i = 0; i < max; i++) {
    particles.push(
        new Ball(data[randomInt(0, data.length - 1)]));

}

function update() {
    particles = particles.filter(function(p) {
        return p.move();
    });
    requestAnimationFrame(update.bind(this));
}
update();