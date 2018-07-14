(function(){
    var Fire = window.Fire = function(x,y,n){
        //中心位置
        this.x = x*40+game.startY;
        this.y = y*40+game.startX;
        this.fire = game.res["fire"+n];
        this.fno = 0;
        //this.time = time;
    }
    Fire.prototype.update = function(){
        this.fno ++;
        if(this.fno>20){
            this.destroy();
        }
        // if(new Date().getTime()-this.time>800){
        //     this.destroy();
        // }
    }
    Fire.prototype.render = function(){
        game.ctx.drawImage(this.fire,this.y,this.x);
    }
    Fire.prototype.destroy = function(){
        for(var i =0; i<game.fires.length; i++){
            if(this === game.fires[i]){
                game.fires.splice(i,1);
            }
        }
    }
})();