class FileIcon {
  constructor(colors, theme) {
    this.initThemes();
    this.colors = colors || this.themes.greyscale;
    if (this.themes[theme]) this.colors = this.themes[theme];
  }

  initThemes() {
    this.themes = {
      greyscale: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#92a5ab',
        textBg: '#6e7d82',
        text: '#FFFFFF',
      },
      blue: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#2B73BA',
        textBg: '#00458F',
        text: '#FFFFFF',
      },
      lightBlue: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#54cbed',
        textBg: '#4198b3',
        text: '#FFFFFF',
      },
      red: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#be4646',
        textBg: '#901d1d',
        text: '#FFFFFF',
      },
      green: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#00b36f',
        textBg: '#03763b',
        text: '#FFFFFF',
      },
      purple: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#a040b8',
        textBg: '#73178a',
        text: '#FFFFFF',
      },
      yellow: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#fed12e',
        textBg: '#bf9f30',
        text: '#FFFFFF',
      },
      black: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#000000',
        textBg: '#000000',
        text: '#FFFFFF',
      },
      white: {
        bg: 'rgba(255, 255, 255, 0)',
        iconBg: '#ffffff',
        textBg: '#ffffff',
        text: '#000000',
      },
    };
  }

  setColorTheme(theme) {
    if (this.themes[theme]) {
      this.colors = this.themes[theme];
      return this.colors;
    }
    return null;
  }

  createIcon(ext, colors) {
    return new Promise((resolve) => {
      if (!this.colors && colors) this.colors = this.themes.greyscale;
      const canvas = this.createCanvas();
      const ctx = canvas.getContext('2d');
      this.drawBg(canvas, ctx, this.colors.bg);
      this.drawIcon(canvas, ctx, this.colors.iconBg);
      this.drawTextBg(canvas, ctx, this.colors.textBg);
      this.drawText(canvas, ctx, ext, this.colors.text);
      // convert to blob
      canvas.toBlob((blob) => resolve(blob));
    });
  }

  static createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = 512;
    return canvas;
  }

  static drawBg(canvas, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  static drawTextBg(canvas, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(72, canvas.height - 190, 268, 120);
  }

  static drawText(canvas, ctx, ext, color) {
    ctx.fillStyle = color;
    ctx.font = '70px Arial';
    ctx.font
      = "normal normal normal normal 15px/28px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.font
      = "small-caps bold 80px 'HelveticaNeue',Helvetica,Arial,sans-serif";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'end';
    ctx.fillText(ext, 320, canvas.height - 190 + 60, 240);
  }

  static drawIcon(canvas, ctx, hexcolor, outline = false) {
    ctx.save();

    if (outline) {
      ctx.strokeStyle = hexcolor;
      ctx.lineWidth = 5;
    } else {
      ctx.lineWidth = 1;
    }

    ctx.miterLimit = 4;
    ctx.scale(0.75, 0.75);
    const x = (canvas.width - canvas.width * 0.75) * 0.75;
    const y = (canvas.height - canvas.height * 0.75) * 0.75;
    ctx.translate(x, y);
    ctx.scale(1, 1);
    ctx.save();
    ctx.fillStyle = hexcolor || '#000000';
    ctx.beginPath();
    ctx.moveTo(224, 136);
    ctx.lineTo(224, 0);
    ctx.lineTo(24, 0);
    ctx.bezierCurveTo(10.7, 0, 0, 10.7, 0, 24);
    ctx.lineTo(0, 488);
    ctx.bezierCurveTo(0, 501.3, 10.7, 512, 24, 512);
    ctx.lineTo(360, 512);
    ctx.bezierCurveTo(373.3, 512, 384, 501.3, 384, 488);
    ctx.lineTo(384, 160);
    ctx.lineTo(248, 160);
    ctx.bezierCurveTo(234.8, 160, 224, 149.2, 224, 136);
    ctx.closePath();
    ctx.moveTo(384, 121.9);
    ctx.lineTo(384, 128);
    ctx.lineTo(256, 128);
    ctx.lineTo(256, 0);
    ctx.lineTo(262.1, 0);
    ctx.bezierCurveTo(268.5, 0, 274.6, 2.5, 279.1, 7);
    ctx.lineTo(377, 105);
    ctx.bezierCurveTo(381.5, 109.5, 384, 115.6, 384, 121.9);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  }

  static draw1(ctx, hexcolor) {
    ctx.save();
    ctx.strokeStyle = 'rgba(50,50,50,1)';
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 2;
    ctx.save();
    ctx.fillStyle = hexcolor || '#000000';
    ctx.beginPath();
    ctx.moveTo(369.9, 97.9);
    ctx.lineTo(286, 14);
    ctx.bezierCurveTo(277, 5, 264.8, -0.1, 252.1, -0.1);
    ctx.lineTo(48, -0.1);
    ctx.bezierCurveTo(21.5, 0, 0, 21.5, 0, 48);
    ctx.lineTo(0, 464);
    ctx.bezierCurveTo(0, 490.5, 21.5, 512, 48, 512);
    ctx.lineTo(336, 512);
    ctx.bezierCurveTo(362.5, 512, 384, 490.5, 384, 464);
    ctx.lineTo(384, 131.9);
    ctx.bezierCurveTo(384, 119.2, 378.9, 106.9, 369.9, 97.9);
    ctx.closePath();
    ctx.moveTo(332.1, 128);
    ctx.lineTo(256, 128);
    ctx.lineTo(256, 51.9);
    ctx.lineTo(332.1, 128);
    ctx.closePath();
    ctx.moveTo(48, 464);
    ctx.lineTo(48, 48);
    ctx.lineTo(208, 48);
    ctx.lineTo(208, 152);
    ctx.bezierCurveTo(208, 165.3, 218.7, 176, 232, 176);
    ctx.lineTo(336, 176);
    ctx.lineTo(336, 464);
    ctx.lineTo(48, 464);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  }
}

export default FileIcon;
