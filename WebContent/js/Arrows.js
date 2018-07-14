(function(){
    var Arrows = window.Arrows = function(x,y){
        this.x = x;
        this.y = y;
        this.fno = 0;
        this.arrows = game.res.arrows2;
        this.status = 1;
    }
    Arrows.prototype.render = function(){
        game.ctx.drawImage(this.arrows,this.x-15,this.y-90);
    }
    Arrows.prototype.update = function(){
        this.fno ++;
        if(this.fno >15){
            this.fno = 0;
            this.status ++;
            if(this.status>3){
                this.status = 1;
            }
            this.arrows = game.res["arrows"+this.status];      
        }
        
    }
})();