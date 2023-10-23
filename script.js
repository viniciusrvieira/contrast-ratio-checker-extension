const crc = new ContrastRatioChecker.ContrastRatioChecker();

const hexRegExp = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/gi;

const recalculateRatio = () => {
  const color1 = $('#color-1 div').css('backgroundColor');
  const color2 = $('#color-2 div').css('backgroundColor');

  const result = crc.getContrastRatioByRgb(
    rgbaToRgbObject(color1),
    rgbaToRgbObject(color2)
  );

  $('#result').text(result.toFixed(2));
};

const getRgbArrayFromRgbaString = (rgba) => {
  const rgbArray = rgba.match(/^(rgba|rgb)\(((,?\s*\d+){3}).+$/)[2].split(',');

  return rgbArray.map((c) => Number(c));
};

const rgbaToRgbObject = (rgba) => {
  const rgbArray = getRgbArrayFromRgbaString(rgba);

  return {
    red: rgbArray[0],
    green: rgbArray[1],
    blue: rgbArray[2],
  };
};

const rgbaToRgbString = (rgba) => {
  const rgbValues = getRgbArrayFromRgbaString(rgba).join(',');

  return `rgb(${rgbValues})`;
};

const isValidHex = (color) => {
  return hexRegExp.test(color);
};

const setColor = (event) => {
  if (!window.EyeDropper) {
    alert('Error: Your browser does not support the EyeDropper API');

    return;
  }

  const eyeDropper = new EyeDropper();

  eyeDropper
    .open()
    .then((res) => {
      const color = res.sRGBHex;

      if (isValidHex(color)) {
        event.target.style.backgroundColor = color;
      } else {
        event.target.style.backgroundColor = rgbaToRgbString(color);
      }
    })
    .catch((err) => {
      alert(`EyeDropper error: ${err}`);
    })
    .finally(() => recalculateRatio());
};

$('#color-1 div, #color-2 div').on('click', setColor);
