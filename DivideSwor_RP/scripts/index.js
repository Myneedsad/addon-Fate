import { world, system, InputPermissionCategory, EasingType, MolangVariableMap, } from "@minecraft/server";

const cooldowns = new Map(); 
const COOLDOWN_TIME = 60 * 60 * 1000; 

world.beforeEvents.itemUse.subscribe(({ itemStack, source }) => {
    if (itemStack.typeId !== "starstore:divide_blade")
        return;


    const playerId = source.id;
const now = Date.now();
const lastUsed = cooldowns.get(playerId) ?? 0;

if (now - lastUsed < COOLDOWN_TIME) {
    const remaining = COOLDOWN_TIME - (now - lastUsed);
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    source.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§cDivide Blade ยังคูลดาวน์อยู่ (${minutes} นาที ${seconds} วินาที)"}]}`);
    return;
}

cooldowns.set(playerId, now); 
system.run(() => new divideBlade(source));
});
class divideBlade {
    viewDirection;
    dimension;
    location;
    targets;
    player;
    cameraFading = {
        fadeColor: { blue: 0, green: 0, red: 0 },
        fadeTime: {
            fadeInTime: 0.25,
            holdTime: 1,
            fadeOutTime: 0.25,
        },
    };
    cameraFadingOut = {
        fadeColor: { blue: 0, green: 0, red: 0 },
        fadeTime: {
            fadeInTime: 0.5,
            holdTime: 1,
            fadeOutTime: 0.5,
        },
    };
    particle = "starstore:divide";
    constructor(player) {
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
    setInput(key, value) {
        return this.player.inputPermissions.setPermissionCategory(InputPermissionCategory[key], value);
    }
    init() {
        this.targets.forEach((target) => {
            target.camera.clear();
            target.camera.fade(this.cameraFading);
        });
        this.setInput("Camera", false);
        this.setInput("Movement", false);
        system.runTimeout(this.parseOne.bind(this), 20);
    }
    parseOne() {
        this.player.playAnimation("animation.player.divide_blade", {
            blendOutTime: 1,
        });
        const particleLocation = deepClone(this.location);
        particleLocation.x += this.viewDirection.x / 2;
        particleLocation.y += 2.25;
        particleLocation.z += this.viewDirection.z / 2;
        this.dimension.spawnParticle(`${this.particle}_blade_effect`, particleLocation);
        this.dimension.spawnParticle(`${this.particle}_lightball`, this.location);
        this.dimension.spawnParticle(`${this.particle}_lightblade`, this.location);

        this.targets.forEach((target) => {
        target.runCommandAsync(`playsound kaiju.sculk_nuke_break @a[r=150]`);

        target.runCommandAsync(`camerashake add @a[r=300] 1 15 positional`);

        target.runCommandAsync(`effect @s resistance 360 10`);

        target.runCommandAsync(`effect @s strength 360 4`);

         target.runCommandAsync(`effect @s speed 360 5`);

        target.runCommandAsync(`effect @a[r=300] blindness 1 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 115`);
     
        target.runCommandAsync(`effect @a[r=300] blindness 1 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 5`);
  
        target.runCommandAsync(`effect @a[r=300] blindness 1 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 10`);
    

     
        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 10`);
        
  

     
        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 10`);
        
      

     
        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 10`);
        
       

       
        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 15`);
        
      

    
        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 15`);
        
     

        
        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 15`);
        
  
  
        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 20`);
        

        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 30`);
        

        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 30`);
        


        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 30`);
        
 


        target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
        target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 60`);
        

    });
        


        this.setCamera();
        system.runTimeout(this.parseTwo.bind(this), 60);

         this.targets.forEach((target) => {
            target.runCommandAsync(`playsound kaiju.sculk_nuke_break @a[r=150]`);
        });

        this.targets.forEach((target) => {
            target.runCommandAsync(`camerashake add @a[r=300] 1 15 positional`);
        });

        this.targets.forEach((target) => {
            target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
            target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 5`);
        });

         this.targets.forEach((target) => {
            target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
            target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 10`);
        });

         this.targets.forEach((target) => {
            target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
            target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 15`);
        });

         this.targets.forEach((target) => {
            target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
            target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 20`);

        });

         this.targets.forEach((target) => {
            target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
            target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 30`);
        });
        
         this.targets.forEach((target) => {
            target.runCommandAsync(`effect @a[r=300] blindness 3 5 true`);
            target.runCommandAsync(`damage @e[type=!minecraft:villager,type=!minecraft:iron_golem,type=!minecraft:snow_golem,type=!minecraft:horse,type=!minecraft:sheep,type=!minecraft:cow,type=!minecraft:chicken,type=!minecraft:cat,type=!minecraft:wolf,type=!minecraft:llama,type=!minecraft:trader_llama,type=!dolphin,type=!donkey,type=!mule,type=!pufferfish,type=!salmon,type=!cod,type=!tropicalfish,r=150] 60`);
        });
         
        
        
    }

    
    setCamera() {
        const location = deepClone(this.location);
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
    parseTwo() {
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
    parseTwoBackView() {
        this.wideViewBack();
        system.runTimeout(this.parseThree.bind(this), 125);
    }
    parseThree() {
        const particleLocation = deepClone(this.location);
        particleLocation.x += this.viewDirection.x / 2;
        particleLocation.z += this.viewDirection.z / 2;
        const yaw = -this.player.getRotation().y;
        const radLeftBack = (yaw - 225) * (Math.PI / 180);
        const radRightBack = (yaw + 45) * (Math.PI / 180);
        const multiplier = -15;
        const sideA = new MolangVariableMap(); // Left-back
        sideA.setFloat("direction_x", Math.cos(radLeftBack) * multiplier);
        sideA.setFloat("direction_z", Math.sin(radLeftBack) * multiplier);
        const sideB = new MolangVariableMap(); // Right-back
        sideB.setFloat("direction_x", Math.cos(radRightBack) * multiplier);
        sideB.setFloat("direction_z", Math.sin(radRightBack) * multiplier);
        system.runTimeout(() => {
            this.dimension.spawnParticle(`${this.particle}_blade_effect_sword`, particleLocation);
            this.dimension.spawnParticle(`${this.particle}_blade_effect_side`, particleLocation, sideA);
            this.dimension.spawnParticle(`${this.particle}_blade_effect_side`, particleLocation, sideB);

        

        
            system.runTimeout(this.parseFour.bind(this), 125);
        }, 10);
    }
    parseFour() {
        this.targets.forEach((target) => {
            target.camera.fade(this.cameraFadingOut);
            system.runTimeout(() => target.camera.clear(), 10);
        });
        this.setInput("Camera", true);
        this.setInput("Movement", true);

    system.runTimeout(() => {
        this.player.playAnimation("animation.player.raise_blade", {
            blendOutTime: 0.2
        });
    }, 20); 

        
    }
    async wideViewFront() {
        const location = deepClone(this.location);
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
    wideViewBack() {
        const location = deepClone(this.location);
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
    setCameraBack() {
        const location = deepClone(this.location);
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
    setCameraSword() {
        const location = deepClone(this.location);
        location.x += this.viewDirection.x + 1.5;
        location.y += 2.25;
        location.z += this.viewDirection.z * 0.1;
        const facingLocation = deepClone(this.location);
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
function deepClone(obj, hash = new WeakMap()) {
    // Return primitives and functions as-is
    if (Object(obj) !== obj || obj instanceof Function)
        return obj;
    // Return from cache if circular reference
    if (hash.has(obj))
        return hash.get(obj);
    let result;
    if (Array.isArray(obj)) {
        result = [];
        hash.set(obj, result);
        obj.forEach((item, i) => {
            result[i] = deepClone(item, hash);
        });
    }
    else if (obj instanceof Date) {
        result = new Date(obj);
    }
    else if (obj instanceof RegExp) {
        result = new RegExp(obj.source, obj.flags);
    }
    else {
        result = {};
        hash.set(obj, result);
        const keys = Reflect.ownKeys(obj);
        keys.forEach((key) => {
            result[key] = deepClone(obj[key], hash);
        });
    }
    return result;
}
system.runInterval(() => {
    const now = Date.now();
    for (const [playerId, lastUsed] of cooldowns.entries()) {
        if (now - lastUsed >= COOLDOWN_TIME) {
            const player = world.getPlayers().find(p => p.id === playerId);
            if (player) {
                player.runCommandAsync(`playsound random.levelup @s`); 
                player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§aDivide Blade พร้อมใช้งานแล้ว!"}]}`);

            }
            cooldowns.delete(playerId); 
        }
    }
}, 100); 
