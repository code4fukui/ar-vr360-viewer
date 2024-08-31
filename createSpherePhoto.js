import { THREE } from "https://code4fukui.github.io/egxr.js/egxr.js";

export const createSpherePhoto = (imgurl, r = 1.0) => {
  const loader = new THREE.TextureLoader();
  const textureFront = loader.load(imgurl);
  const textureBack = loader.load(imgurl, (texture) => {
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.repeat.x = -1;
    texture.offset.x = 1;
  });

  const geometry = new THREE.SphereGeometry(r, 32, 32); 
  const materialFront = new THREE.MeshBasicMaterial({
    side: THREE.FrontSide,
    map: textureFront,
    //color: "#ff0000",
  });
  const materialBack = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: textureBack,
    //color: "#ffff00",
  });
  const material = [materialBack, materialFront];
  //const sphere = new THREE.Mesh(geometry, materialBack);
  const sphereFront = new THREE.Mesh(geometry, materialFront);
  const sphereBack = new THREE.Mesh(geometry, materialBack);

  const grp = new THREE.Group();
  grp.add(sphereFront);
  grp.add(sphereBack);
  return grp;
};
