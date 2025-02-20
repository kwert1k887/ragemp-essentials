// src/blip/index.ts
var Blip = class _Blip {
  /** Основная функция для создания метки или нескольких меток */
  static create(spriteOrData, posOrOptions, maybeOptions) {
    try {
      const sprite = spriteOrData;
      if (Array.isArray(posOrOptions)) {
        const coords = posOrOptions;
        const options = maybeOptions || {};
        return coords.map((coord) => _Blip.createSingle(sprite, coord, options));
      } else {
        const coord = posOrOptions;
        const options = maybeOptions || {};
        return _Blip.createSingle(sprite, coord, options);
      }
    } catch (e) {
      console.log(e);
    }
  }
  /** Функция для создания одной метки */
  static createSingle(sprite, coord, options) {
    const { x, y, z, dimension = 0 } = coord;
    return mp.blips.new(sprite, new mp.Vector3(x, y, z), {
      // Создаем метку на карте с указанными опциями
      name: options.name || "",
      scale: options.scale ?? 1,
      color: options.color ?? 0,
      alpha: options.alpha ?? 255,
      drawDistance: options.drawDistance ?? 100,
      shortRange: options.shortRange ?? false,
      rotation: options.rotation ?? 0,
      dimension
    });
  }
};

// src/index.ts
var essentials = {
  blip: {
    create: Blip.create
  }
};
export {
  essentials
};
//# sourceMappingURL=index.js.map
