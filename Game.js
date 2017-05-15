var tela;
var ctx;
var antes = 0;
var dt = 0;
var mapa;
var pc;
function init(){
  tela = document.getElementsByTagName('canvas')[0];
  tela.width = 600;
  tela.height = 480;
  ctx = tela.getContext('2d');
  mapa = new Map(12, 15);
  mapa.loadMap([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,9,1,0,0,0,0,9,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,9,1,0,0,0,0,0,9,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,0,1,1,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,9,0,0,0,0,0,9,0,1],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,0,0,0,1,1,1],
    [1,0,9,0,0,0,0,0,0,0,0,9,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]);
  pc = new Sprite();
  pc.x = 50;
  pc.y = 50;
  configuraControles();

  requestAnimationFrame(passo);
}

function passo(t){
  dt = (t - antes)/1000;
  ctx.clearRect(0,0, tela.width, tela.height);
  requestAnimationFrame(passo);
  mapa.persegue(pc);
  pc.moverOnMap(mapa, dt);
  mapa.moverInimigosOnMap(mapa, dt);
  mapa.desenhar(ctx, 'blue');
  pc.desenhar(ctx, 'black');
  antes = t;
}

function configuraControles(){
  addEventListener("keydown", function(e){
    switch (e.keyCode) {
      case 37:
          pc.vx = -100;
          e.preventDefault();
        break;
      case 38:
          pc.vy = -100;
          e.preventDefault();
        break;
      case 39:
          pc.vx = +100;
          e.preventDefault();
        break;
      case 40:
          pc.vy = +100;
          e.preventDefault();
        break;
      case 32:
        mapa.tiro(pc);
        break;
    }
  });
  addEventListener("keyup", function(e){
    switch (e.keyCode) {
      case 37:
      case 39:
          pc.vx = 0;
          e.preventDefault();
        break;
      case 38:
      case 40:
          pc.vy = 0;
          e.preventDefault();
        break;
    }
  });
}