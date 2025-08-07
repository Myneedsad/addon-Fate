import {
  world,
  system,
  Player,
  Block,
  Dimension,
  Vector3,
  CameraFadeOptions,
  GameMode,
  InputPermissionCategory,
  EasingType,
  MolangVariableMap,
} from "@minecraft/server";

world.beforeEvents.itemUse.subscribe(({ itemStack, source }) => {
  if (itemStack.typeId !== "starstore:divide_blade") return;

  system.run(() => new divideBlade(source));
});

class divideBlade {
  private viewDirection: Vector3;
  private dimension: Dimension;
  private location: Vector3;
  private targets: Player[];
  private player: Player;

  private cameraFading: CameraFadeOptions = {
    fadeColor: { blue: 0, green: 0, red: 0 },
    fadeTime: {
      fadeInTime: 0.25,
      holdTime: 1,
      fadeOutTime: 0.25,
    },
  };

  private cameraFadingOut: CameraFadeOptions = {
    fadeColor: { blue: 0, green: 0, red: 0 },
    fadeTime: {
      fadeInTime: 0.5,
      holdTime: 1,
      fadeOutTime: 0.5,
    },
  };

  private particle: string = "starstore:divide";

  constructor(player: Player) {
    this.player = player;

    this.viewDirection = player.getViewDirection();
    this.dimension = player.dimension;
    this.location = player.location;

    this.targets = this.dimension.getPlayers({
      location: player.location,
      maxDistance: 50,
    });

    this.init();
  }

  private setInput(key: string, value: boolean) {
    return this.player.inputPermissions.setPermissionCategory(
      InputPermissionCategory[key],
      value
    );
  }

  private init() {
    this.targets.forEach((target) => {
      target.camera.clear();

      target.camera.fade(this.cameraFading);
    });

    this.setInput("Camera", false);
    this.setInput("Movement", false);

    system.runTimeout(this.parseOne.bind(this), 20);
  }

  private parseOne() {
    this.player.playAnimation("animation.player.divide_blade", {
      blendOutTime: 1,
    });

    const particleLocation: Vector3 = deepClone(this.location);
    particleLocation.x += this.viewDirection.x / 2;
    particleLocation.y += 2.25;
    particleLocation.z += this.viewDirection.z / 2;

    this.dimension.spawnParticle(
      `${this.particle}_blade_effect`,
      particleLocation
    );

    this.dimension.spawnParticle(`${this.particle}_lightball`, this.location);
    this.dimension.spawnParticle(`${this.particle}_lightblade`, this.location);

    this.setCamera();

    system.runTimeout(this.parseTwo.bind(this), 60);
  }

  private setCamera() {
    const location: Vector3 = deepClone(this.location);
    location.x += this.viewDirection.x * 2;
    location.y += 1;
    location.z += this.viewDirection.z * 2;

    this.targets.forEach((target) => {
      target.camera.setCamera("minecraft:free", {
        facingLocation: this.player.getHeadLocation(),
        location: location,
      });
    });
  }

  private parseTwo() {
    this.wideViewFront().then(() => {
      system.runTimeout(() => {
        this.setCameraBack();

        system.runTimeout(() => {
          this.setCameraSword();

          system.runTimeout(this.parseTwoBackView.bind(this), 100);
        }, 20);
      }, 80);
    });
  }

  private parseTwoBackView() {
    this.wideViewBack();

    system.runTimeout(this.parseThree.bind(this), 125);
  }

  private parseThree() {
    const particleLocation: Vector3 = deepClone(this.location);
    particleLocation.x += this.viewDirection.x / 2;
    particleLocation.z += this.viewDirection.z / 2;

    const yaw: number = -this.player.getRotation().y;

    const radLeftBack = (yaw - 225) * (Math.PI / 180);
    const radRightBack = (yaw + 45) * (Math.PI / 180);

    const multiplier: number = -15;

    const sideA = new MolangVariableMap(); // Left-back
    sideA.setFloat("direction_x", Math.cos(radLeftBack) * multiplier);
    sideA.setFloat("direction_z", Math.sin(radLeftBack) * multiplier);

    const sideB = new MolangVariableMap(); // Right-back
    sideB.setFloat("direction_x", Math.cos(radRightBack) * multiplier);
    sideB.setFloat("direction_z", Math.sin(radRightBack) * multiplier);

    system.runTimeout(() => {
      this.dimension.spawnParticle(
        `${this.particle}_blade_effect_sword`,
        particleLocation
      );

      this.dimension.spawnParticle(
        `${this.particle}_blade_effect_side`,
        particleLocation,
        sideA
      );

      this.dimension.spawnParticle(
        `${this.particle}_blade_effect_side`,
        particleLocation,
        sideB
      );

      system.runTimeout(this.parseFour.bind(this), 1180);
    }, 10);
  }

  private parseFour() {
    this.targets.forEach((target) => {
      target.camera.fade(this.cameraFadingOut);

      system.runTimeout(() => target.camera.clear(), 10);
    });

    this.setInput("Camera", true);
    this.setInput("Movement", true);
  }

  private async wideViewFront() {
    const location: Vector3 = deepClone(this.location);
    location.x += this.viewDirection.x * 10;
    location.y += 3;
    location.z += this.viewDirection.z * 10;

    this.targets.forEach((target) => {
      target.camera.setCamera("minecraft:free", {
        facingLocation: this.player.getHeadLocation(),
        location: location,
        easeOptions: {
          easeTime: 0.2,
          easeType: EasingType.OutSine,
        },
      });
    });
  }

  private wideViewBack() {
    const location: Vector3 = deepClone(this.location);

    location.x += this.viewDirection.x * -20;
    location.y += 3;
    location.z += this.viewDirection.z * -20;

    this.targets.forEach((target) => {
      target.camera.setCamera("minecraft:free", {
        facingLocation: this.player.getHeadLocation(),
        location: location,
        easeOptions: {
          easeTime: 5,
          easeType: EasingType.OutSine,
        },
      });
    });
  }

  private setCameraBack() {
    const location: Vector3 = deepClone(this.location);
    location.x += this.viewDirection.x * 4;
    location.y += 1.2;
    location.z += -(this.viewDirection.z * 2);

    this.targets.forEach((target) => {
      target.camera.fade({
        fadeColor: { red: 1, green: 1, blue: 1 },
        fadeTime: { fadeInTime: 0, fadeOutTime: 0, holdTime: 0.1 },
      });

      target.camera.setCamera("minecraft:free", {
        facingLocation: this.player.getHeadLocation(),
        location: location,
      });
    });
  }

  private setCameraSword() {
    const location: Vector3 = deepClone(this.location);
    location.x += this.viewDirection.x + 1.5;
    location.y += 2.25;
    location.z += this.viewDirection.z * 0.1;

    const facingLocation: Vector3 = deepClone(this.location);
    facingLocation.x += this.viewDirection.x;
    facingLocation.y += 2;
    facingLocation.z += this.viewDirection.z / 2;

    this.targets.forEach((target) => {
      target.camera.setCamera("minecraft:free", {
        facingLocation,
        location,
        easeOptions: {
          easeTime: 0.2,
          easeType: EasingType.InSine,
        },
      });
    });
  }
}

function deepClone<T>(obj: T, hash = new WeakMap()): T {
  // Return primitives and functions as-is
  if (Object(obj) !== obj || obj instanceof Function) return obj;

  // Return from cache if circular reference
  if (hash.has(obj)) return hash.get(obj);

  let result: any;

  if (Array.isArray(obj)) {
    result = [] as any[];
    hash.set(obj, result);
    obj.forEach((item, i) => {
      result[i] = deepClone(item, hash);
    });
  } else if (obj instanceof Date) {
    result = new Date(obj);
  } else if (obj instanceof RegExp) {
    result = new RegExp(obj.source, obj.flags);
  } else {
    result = {} as Record<string | symbol | number, any>;
    hash.set(obj, result);
    const keys = Reflect.ownKeys(obj) as (keyof T)[];
    keys.forEach((key) => {
      result[key] = deepClone((obj as any)[key], hash);
    });
  }

  return result;
}
