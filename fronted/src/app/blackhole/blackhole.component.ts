import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-blackhole',
  templateUrl: './blackhole.component.html',
  styleUrls: ['./blackhole.component.css']
})
export class BlackholeComponent implements AfterViewInit {

  @ViewChild('blackhole', { static: false }) blackholeElement!: ElementRef;

  ngAfterViewInit(): void {
    this.blackhole('#blackhole');
  }

  blackhole(elementSelector: string): void {
    const container = document.querySelector(elementSelector) as HTMLElement;
    const h = container.offsetHeight;
    const w = container.offsetWidth;
    const cw = w;
    const ch = h;
    const maxorbit = 255;
    const centery = ch / 2;
    const centerx = cw / 2;

    const startTime = new Date().getTime();
    let currentTime = 0;
    const stars: any[] = [];
    let collapse = false;
    let expanse = false;
    let returning = false;

    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    container.appendChild(canvas);
    const context = canvas.getContext("2d")!;
    context.globalCompositeOperation = "multiply";

    function setDPI(canvas: HTMLCanvasElement, dpi: number) {
      const scaleFactor = dpi / 96;
      canvas.width = Math.ceil(canvas.width * scaleFactor);
      canvas.height = Math.ceil(canvas.height * scaleFactor);
      const ctx = canvas.getContext('2d')!;
      ctx.scale(scaleFactor, scaleFactor);
    }

    function rotate(cx: number, cy: number, x: number, y: number, angle: number): [number, number] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
      const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
    }

    setDPI(canvas, 192);

    class Star {
      x: number;
      y: number;
      yOrigin: number;
      speed: number;
      rotation: number;
      startRotation: number;
      id: number;
      collapseBonus: number;
      color: string;
      hoverPos: number;
      expansePos: number;
      prevR: number;
      prevX: number;
      prevY: number;
      originalY: number;
      trail: number | undefined;

      constructor() {
        const rands = [
          Math.random() * (maxorbit / 2) + 1,
          Math.random() * (maxorbit / 2) + maxorbit
        ];
        const orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);
        this.x = centerx;
        this.y = centery + orbital;
        this.yOrigin = this.y;
        this.speed = (Math.random() * 2.5 + 1.5) * Math.PI / 180;
        this.rotation = 0;
        this.startRotation = (Math.random() * 360 + 1) * Math.PI / 180;
        this.id = stars.length;
        this.collapseBonus = Math.max(0, orbital - (maxorbit * 0.7));
        this.color = `rgba(255,255,255,${1 - (orbital / 255)})`;
        this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus;
        this.expansePos = centery + (this.id % 100) * -10 + (Math.random() * 20 + 1);
        this.prevR = this.startRotation;
        this.prevX = this.x;
        this.prevY = this.y;
        this.originalY = this.yOrigin;
        stars.push(this);
      }

      draw() {
        if (!expanse && !returning) {
          this.rotation = this.startRotation + (currentTime * this.speed);
          this.y += collapse ? (this.hoverPos - this.y) / 5 : (this.yOrigin - this.y) / 10;
        } else if (expanse && !returning) {
          this.rotation = this.startRotation + (currentTime * (this.speed / 2));
          this.y += (this.expansePos - this.y) / 80;
        } else if (returning) {
          this.rotation = this.startRotation + (currentTime * this.speed);
          if (Math.abs(this.y - this.originalY) > 2) {
            this.y += (this.originalY - this.y) / 50;
          } else {
            this.y = this.originalY;
          }
        }

        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        const oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
        context.moveTo(oldPos[0], oldPos[1]);
        context.translate(centerx, centery);
        context.rotate(this.rotation);
        context.translate(-centerx, -centery);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    const centerHover = container.querySelector('.centerHover') as HTMLElement;
    centerHover.addEventListener('click', () => {
      collapse = false;
      expanse = true;
      returning = false;
      centerHover.classList.add('open');
      setTimeout(() => {
        expanse = false;
        returning = true;
        setTimeout(() => {
          returning = false;
          centerHover.classList.remove('open');
        }, 8000);
      }, 25000);
    });

    centerHover.addEventListener('mouseover', () => {
      if (!expanse) collapse = true;
    });

    centerHover.addEventListener('mouseout', () => {
      if (!expanse) collapse = false;
    });

    function loop() {
      const now = new Date().getTime();
      currentTime = (now - startTime) / 50;
      context.fillStyle = 'rgba(25,25,25,0.2)';
      context.fillRect(0, 0, cw, ch);
      stars.forEach(s => s.draw());
      requestAnimationFrame(loop);
    }

    function init() {
      context.fillStyle = 'rgba(25,25,25,1)';
      context.fillRect(0, 0, cw, ch);
      for (let i = 0; i < 2500; i++) new Star();
      loop();
    }

    init();
  }
}
