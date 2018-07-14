(function(){
    var Wall = window.Wall = function(i,j){
        this.x = game.startX+i*40+20;
        this.y = game.startY+j*40+20;
        this.mapX = i;
        this.mapY = j;
        this.wall = game.res.wall;
    }

    Wall.prototype.update = function(){
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
    }
    Wall.prototype.render = function(){
        game.ctx.drawImage(this.wall,this.x-20,this.y-30);
    }

})();