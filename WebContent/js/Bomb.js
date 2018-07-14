(function(){
    var Bomb = window.Bomb = function(x,y){
        this.fno = 0;
        //中心位置
        this.x = x+game.startX+20;  //x相当于列数
        this.y = y+game.startY+20;  //y相当于行数
        this.mapX = Math.floor(x/40);
        this.mapY = Math.floor(y/40);
        game.renderQueue[this.mapY][this.mapX] = this;
        this.bombStatus = 1;
        this.bubble = game.res.bomb1;
        this.flag = 1;
    }
    Bomb.prototype.update = function(){
        if(Math.abs(game.player.x-this.x+40)<=1){
            if(game.player.y >= this.y-38 && game.player.y <= this.y+38){
                game.player.moveRight = false;
                if(game.player.y <=this.y-15){
                    game.player.slideUp = true;
                }else if(game.player.y >= this.y + 15){
                    game.player.slideDown = true;
                }
            }    
        }else if(Math.abs(game.player.x - this.x -40) <=1){
            if(game.player.y >= this.y-38 && game.player.y <= this.y+38){
                game.player.moveLeft = false;
                if(game.player.y <=this.y-15){
                    game.player.slideUp = true;
                }else if(game.player.y >= this.y + 15){
                    game.player.slideDown = true;
                }
            }    
        }
        if(Math.abs(game.player.y-this.y + 40) <=1){
            if(game.player.x >= this.x-38 && game.player.x <= this.x+38){
                game.player.moveDown = false;
                if(game.player.x <=this.x-15){
                    game.player.slideLeft = true;
                }else if(game.player.x >= this.x + 15){
                    game.player.slideRight = true;
                }
            }    
        }else if(Math.abs(game.player.y - this.y -40) <=1){
            if(game.player.x >= this.x-38 && game.player.x <= this.x+38){
                game.player.moveUp = false;
                if(game.player.x <=this.x-15){
                    game.player.slideLeft = true;
                }else if(game.player.x >= this.x + 15){
                    game.player.slideRight = true;
                }
            }    
        }
        this.fno++;
        if(this.fno%15==0){
            this.bombStatus+=this.flag;
            if(this.bombStatus == 3 || this.bombStatus == 1){
                this.flag = -this.flag;
            }
        }
        this.bubble = game.res["bomb"+this.bombStatus];
        //销毁Bomb
        // if(this.fno == 180){
        //     game.renderQueue[this.mapY][this.mapX] = null;
        //     this.destroy();
        // }
    }
    Bomb.prototype.render = function(){
        game.ctx.drawImage(this.bubble,this.x-20,this.y-25);
    }
    Bomb.prototype.destroy = function(){
        for(var i =0; i<game.bombs.length; i++){
            if(this === game.bombs[i]){
                game.bombs.splice(i,1);
            }
        }
    }
})();