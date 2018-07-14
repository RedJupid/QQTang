(function(){
    var Land = window.Land = function(){
        this.image = game.res.land;
        this.x = game.startX;
        this.y = game.startY;
    }
    Land.prototype.update = function(){

    }
    Land.prototype.render = function(){
        game.ctx.drawImage(this.image,this.x,this.y);
    }
})();