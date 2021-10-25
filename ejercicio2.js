//Daniel Hernández Chávez_6000487
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return(cube);
}
function init() {

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
   
    Cubo = []; //define un array unidimensional
    dim = 10; //valor inicial de las dimensiones de los cubos
    angulo = Math.PI/4; //valor del angulo de giro
    d2 = dim/2
    di = Math.sqrt(Math.pow(d2, 2)+Math.pow(d2, 2));
    desplazamiento = di - d2;

    Cubo.push(cubo(dim, dim, dim, 0xFF0000, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0xFFDD00, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0x0000FF, 'Physical', false));

    //un ciclo for para optimizar la creación de los cubos y hacer sus respectivas transformaciones
    for(i=0; i < 3; i++){
        Cubo[i].translateX(desplazamiento); //translada el cubo en el eje x las unidades nesesarias para que el vértice del primer cubo toque el eje x según el ángulo rotado
        Cubo[i].translateY(dim/2); //translada el cubo en el eje y 5 unidades
        Cubo[i].translateZ(desplazamiento); //translada el cubo en el eje z las unidades necesarias para que el vértice del primer cubo toque el eje z según el ángulo rotado
    }

    for(i=0; i < 3; i++){
        if(i==1 || i==2){
            escala=1/(2*i);//valor del porcentaje de escala a reducir
            unidades=(dim/2)+(dim/4)+((((dim/2)+(dim/4))/2))*(i-1);//da la posición respectiva a cada cubo
            Cubo[i].scale.set(escala, escala, escala); //cambia la posición de los cubos respectivamente
            Cubo[i].translateY(unidades); //translada el cubo en el eje y para que quede arriba del cubo anterior
        }
    }

    Cubo[0].rotateY(angulo);//rota el cubo 1 según el valor del ángulo
    Cubo[2].rotateY(angulo);//rota el cubo 3 según el valor del ángulo

  
    light = new THREE.PointLight(0xFFFFFF);
    light2 = new THREE.PointLight(0xFFFFFF);
                                        
    light.position.set(-10, 20, 10);
    light2.position.set(10, 50, -10);
    scene.add( light );
    scene.add( light2 ); 

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}