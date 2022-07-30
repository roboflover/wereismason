import {Enemy} from './Enemy.js'
import {scene, container, renderer, controls, THREE} from './../component/Init.js';

 
 export class Mixer {
  constructor() {
  this.group = new THREE.Group();

  //const mason = new Mason();
  //this.group.add(mason.mesh);
  const enemy = new Enemy();
  this.enemy = enemy;
  this.lepestok = this.enemy.lepestok;
  //console.log(this.lepestok)
  }
}

/*
class Switch {
  constructor() {
    this.mesh = new THREE.Object3D();
    let level;
    level = new Level();
    this.mesh.add(level.mesh);
  }
}
*/
