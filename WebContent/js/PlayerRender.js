(function(){
    var PlayerRender = window.PlayerRender = function(receive,uuid){
        this.uuid = uuid;
        this.receive = receive;
        this.mapY = this.receive.mapY;
        this.shadow = game.res.shadow;
    }
    PlayerRender.prototype.update = function(receive){
        this.receive = receive;
    }
    PlayerRender.prototype.render = function(){
        game.ctx.drawImage(this.shadow,this.receive.x-17,this.receive.y-12);
        game.ctx.drawImage(game.res[this.receive.role],this.receive.roleX-23,this.receive.roleY-58);
    }
})();