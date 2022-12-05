(function(){
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var WIDTH = cnv.width, HEIGHT = cnv.height;

    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    var mvLeft = mvUp = mvRight = mvDown = false;

    var tileSize = 12;
    
    var walls = [];

    var jogador = {
        x: tileSize + 54,
        y: tileSize + 0.5,
        width: 11,
        height: 11,
        speed: 2
    };



    var maze = [
        [1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1],
        [1,0,0,1,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,1,0,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1],
        [1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1],
        [1,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0],
        [1,0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,0,0,0,1,0,0,1,1,1,1],
        [1,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
        [1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    var T_WIDTH = maze[0].length * tileSize,
        T_HEIGHT = maze.length * tileSize;

    for(var row in maze){
        for(var column in maze[row]){
            var tile = maze[row] [column];
            if(tile === 1){
                var wall = {
                    x: tileSize*column,
                    y: tileSize*row,
                    width: tileSize,
                    height: tileSize
                };
                walls.push(wall);
            }
        }
        
    }

    var cam = {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        innerLeftBoundary: function(){
            return this.x + (this.width*0.50);
        },
        innerTopBoundary: function(){
            return this.y + (this.height*0.50);
        },
        innerRightBoundary: function(){
            return this.x + (this.width*0.50);
        },
        innerBottomBoundary: function(){
            return this.y + (this.height*0.50);
        }
    };

    function blockRectangle(quadr,objB){
        var distX = (quadr.x + quadr.width/2) - (objB.x + objB.width/2);
        var distY = (quadr.y + quadr.height/2) - (objB.y + objB.height/2);

        var somaW = (quadr.width + objB.width)/2;
        var somaH = (quadr.height + objB.height)/2;

            if(Math.abs(distX) < somaW && Math.abs(distY) < somaH){
                var overlapX = somaW - Math.abs(distX);
                var overlapY = somaH - Math.abs(distY);

            if(overlapX > overlapY){
                quadr.y = distY > 0 ? quadr.y + overlapY : quadr.y - overlapY;
            } else {
                quadr.x = distX > 0 ? quadr.x + overlapX : quadr.x - overlapX;
            }
        }
    }

    window.addEventListener("keydown",keydownHandler, false);
    window.addEventListener("keyup",keyupHandler, false);

    function keydownHandler(event){
        var key = event.keyCode;
        switch(key){
            case LEFT:
                mvLeft = true;
                break;
            case UP:
                mvUp = true;
                break;
            case RIGHT:
                mvRight = true;
                break;
            case DOWN:
                mvDown = true;
                break;
        }
    }

    function keyupHandler(event){
        var key = event.keyCode;
        switch(key){
            case LEFT:
                mvLeft = false;
                break;
            case UP:
                mvUp = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case DOWN:
                mvDown = false;
                break;
        }
    }

    function update(){
        if(mvLeft && !mvRight){
            jogador.x -= jogador.speed;
        } else
        if(mvRight && !mvLeft){
            jogador.x += jogador.speed;
        }
        
        if(mvUp && !mvDown){
            jogador.y -= jogador.speed;
        } else
        if(mvDown && !mvUp){
            jogador.y += jogador.speed;
        }

        for(var i in walls){
            var wall = walls[i];
            blockRectangle(jogador,wall);
        }

        if(jogador.x < cam.innerLeftBoundary()){
            cam.x = jogador.x - (cam.width * 0.50);
        }
        if(jogador.y < cam.innerTopBoundary()){
            cam.y = jogador.y - (cam.height * 0.50);
        }
        if(jogador.x + jogador.width > cam.innerRightBoundary()){
            cam.x = jogador.x + jogador.width - (cam.width * 0.50);
        }
        if(jogador.y + jogador.height > cam.innerLeftBoundary()){
            cam.y = jogador.y + jogador.height - (cam.height * 0.50);
        }

        cam.x = Math.max(0, Math.min(T_WIDTH - cam.width, cam.x));
        cam.y = Math.max(0, Math.min(T_HEIGHT - cam.height, cam.y));
    }

    function render() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.save();
        ctx.translate(-cam.x, -cam.y);
        for(var row in maze){
            for(var column in maze[row]){
                var tile = maze[row] [column];
                if(tile === 1){
                    var x = column*tileSize;
                    var y = row*tileSize;
                    ctx.fillRect(x,y,tileSize,tileSize);
                }
            }
            
        }
        ctx.fillStyle = "#3CB371";
        ctx.fillRect(jogador.x, jogador.y, jogador.width, jogador.height);
        ctx.restore();
    }

    function loop(){
        update();
        render();
        requestAnimationFrame(loop,cnv);
    }
    requestAnimationFrame(loop,cnv);
}());