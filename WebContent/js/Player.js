(function(){
    var Player = window.Player = function(x,y,player){

        this.uuid = player?player.uuid:this.guid();
        this.shadow = game.res.shadow;
        this.role = game.res.role1_4_1;
        //影子的初始坐标
        this.x = game.startX+x;
        this.y = game.startY+y;

        this.mapY = Math.floor((this.y-game.startY)/40);
        //人物的初始坐标
        this.roleX = game.startX+x;
        this.roleY = game.startY+y;
        //走路速度
        this.speed = 4;
        this.power = 3;
        //走路方向数组
        this.keyCodeArr = [];
        this.fno = 0;
        //同一方向任务的走路状态
        this.step =1;
        //记录当前的方向
        this.direction = 4;
        //能否上下左右移动
        this.moveLeft = true;
        this.moveRight = true;
        this.moveUp = true;
        this.moveDown = true;
        //碰撞时能否滑动
        this.slideLeft = false;
        this.slideRifht = false;
        this.slideUp = false;
        this.slideDown = false;
        this.bombs = [];
        // this.bindEvent();
        this.roleStr = "";
        this.receive = player?player:"";
        this.isRender = false;
    }

    Player.prototype.update = function(){
        this.fno++;
        if(this.fno>> 4 >0){
            this.fno = 0;
            this.step++;
            if(this.step > 4){
                this.step = 1;
            }
        }
        if(this.x<=60){this.moveLeft = false;}
        if(this.x>=620){this.moveRight = false;}
        if(this.y<=60){this.moveUp = false;}
        if(this.y>=540){this.moveDown = false;}
        if(this.keyCodeArr.length>0){
            this.roleStr = "role1_"+(this.keyCodeArr[0]-36)+"_"+(this.step);
            this.role=game.res["role1_"+(this.keyCodeArr[0]-36)+"_"+(this.step)];
            switch(this.keyCodeArr[0]){
                case 37:if(this.moveLeft){this.x-=this.speed;this.roleX-=this.speed;}else{if(this.moveDown && this.slideDown){this.y+=this.speed;this.roleY+=this.speed;}if(this.moveUp && this.slideUp){this.y-=this.speed;this.roleY-=this.speed;}}break;
                case 38:if(this.moveUp){this.y-=this.speed;this.roleY-=this.speed;}else{if(this.moveLeft && this.slideLeft){this.x-=this.speed;this.roleX-=this.speed;}if(this.moveRight && this.slideRight){this.x+=this.speed;this.roleX+=this.speed;}}break;
                case 39:if(this.moveRight){this.x+=this.speed;this.roleX+=this.speed;}else{if(this.moveDown && this.slideDown){this.y+=this.speed;this.roleY+=this.speed;}if(this.moveUp && this.slideUp){this.y-=this.speed;this.roleY-=this.speed;}}break;
                case 40:if(this.moveDown){this.y+=this.speed;this.roleY+=this.speed;}else{if(this.moveLeft && this.slideLeft){this.x-=this.speed;this.roleX-=this.speed;}if(this.moveRight && this.slideRight){this.x+=this.speed;this.roleX+=this.speed;}}break;
            }
        }else{
            this.roleStr = "role1_"+this.direction+"_1";
            this.role=game.res["role1_"+this.direction+"_1"];
            this.step = 1;
            this.fno = 0;
        }
        this.mapY = Math.floor((this.y-game.startY)/40);
        this.moveLeft = true;
        this.moveRight = true;
        this.moveUp = true;
        this.moveDown = true;
        this.slideLeft = false;
        this.slideRight = false;
        this.slideUp = false;
        this.slideDown = false;
        if(con.ws){
            con.ws.send("{\"player\":{\"uuid\":\""+this.uuid+"\",\"role\":\""+this.roleStr+"\",\"x\":"+this.x+",\"y\":"+this.y+",\"roleX\":"+this.roleX+",\"roleY\":"+this.roleY+",\"mapY\":"+this.mapY+"}}");
        }
        
    }
    Player.prototype.render = function(){
        // game.ctx.drawImage(this.shadow,this.x-17,this.y-12);
        // game.ctx.drawImage(this.role,this.roleX-23,this.roleY-58);
        // console.log(this.receive);
        var obj = this.receive;
        if(obj){
            game.ctx.drawImage(this.shadow,obj.x-17,obj.y-12);
            game.ctx.drawImage(game.res[obj.role],obj.roleX-23,obj.roleY-58);
        }
    }
    Player.prototype.bindEvent = function(){
        var self = this;
        document.onkeydown = function(e){
            var keyCode = e.keyCode;
            if(keyCode == 32){
                var x = Math.floor((self.x-game.startX)/40);
                var y = Math.floor((self.y-game.startY)/40);
                console.log("{\"bomb\":{\"x\":"+x +",\"y\":"+y+",\"power\":"+self.power+"}}");
                if(!game.renderQueue[y][x]){
                    con.ws.send("{\"bomb\":{\"x\":"+x +",\"y\":"+y+",\"power\":"+self.power+"}}");
                }
                //game.bombs.push(new Bomb(x*40,y*40));
            }
            if(keyCode>=37 && keyCode<=40){
                self.addKeyCode(keyCode);
                //获得当前方向
                self.direction = keyCode - 36;
            }
        }
        document.onkeyup = function(e){ 
            var keyCode = e.keyCode;
            if(keyCode>=37 && keyCode<=40){
                //获得当前方向
                self.direction = self.keyCodeArr[0]-36;
                self.deleteKeyCode(keyCode);    
            }
        }
    }
    Player.prototype.addKeyCode = function(k){
        var flag = 0;
        for(var i=0; i<this.keyCodeArr.length; i++){
            if(this.keyCodeArr[i] == k){
                flag = 1;
            }
        }
        if(flag == 0){
            this.keyCodeArr.unshift(k);
            //当有新的走路方向时走路状态为2
            this.step = 2;
        }
    }
    Player.prototype.deleteKeyCode = function(k){
        for(var i=0; i<this.keyCodeArr.length; i++){
            if(k == this.keyCodeArr[i]){
                this.keyCodeArr.splice(i,1);
            }
        }
    }
    Player.prototype.guid = function(){
        function S4() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
})();