(function(){

    var Connect  = window.Connect = function(){
        this.ws = null;
        this.tip = document.getElementById("tip");
        this.conUrl = document.getElementById("conUrl");
        this.conBtn = document.getElementById("conBtn");
        this.socketCreated = false;
        this.isLogout = false;
        this.supportWS();
        this.bindEvent();
    }
    Connect.prototype.supportWS = function(){
        if(window.WebSocket || window.MozWebSocket){
            tip.innerHTML = "浏览器支持WebSocket，可以连接到服务器!";
        }else{
            tip.innerHTML = "浏览器不支持WebSocket，请更换浏览器！";
        }
    }
    Connect.prototype.bindEvent = function(){
        var self = this;
        this.conBtn.onclick = function(){
            //0：正在连接   1：已连接   2：正在关闭连接   3：已关闭连接
            if(self.socketCreated && (self.ws.readyState == 0 || self.ws.readyState == 1)){//已经连接了
                self.ws.send("<span style='color:blue;font-weight:bold'>离开了聊天室...</span><br/>");
                self.socketCreated = false;
                self.isLogout = true;
                self.ws.close();//关闭连接
                self.conBtn.innerHTML = "连接";//修改按钮文字
            }else{//还没连接
                console.log(self.conUrl.value);
                //申请WebSocket对象
                if("WebSocket" in window){
                    self.ws = new WebSocket("ws://"+conUrl.value);
                }else if("MozWebSocket" in window){
                    self.ws = new MozWebSocket("ws://"+conUrl.value);
                }
                self.socketCreated = true;
                self.isLogout = false;
                self.conBtn.innerHTML = "断开";//修改按钮文字
                
                //注册事件
                // self.ws.onopen = self.wsOnOpen(self);//获得连接时
                self.ws.onopen = function(){
                    var self = this;
                    game.player = new Player(20,20);
                    game.player.bindEvent();
                    game.players.push(game.player);
                }
                self.ws.onmessage = self.wsOnMessage;//接收消息时
                self.ws.onclose = self.wsOnclose;//关闭连接时
                self.ws.onerror = self.wsOnError;//处理发生错误时(消息发送错误、连接错误)
                
            }
        }
    }
    Connect.prototype.wsOnOpen = function(self){
        self.start();
        
        //this.ws.send("进入了聊天室...");
    }
    Connect.prototype.wsOnMessage = function(event){
        // console.log(event.data);
        var obj = JSON.parse(event.data).map;
        var player = JSON.parse(event.data).player;
        // if(player && player.uuid == game.player.uuid){
        //     game.player.receive = player;
        // }
        var bomb = JSON.parse(event.data).bomb;
        var fire = JSON.parse(event.data).fire;
        var exist = false;
        if(fire){
            console.log(fire);
            // var fireTime = new Date().getTime();
            for(var i=0; i<fire.length; i++){
                if(fire[i][2]==1){
                    // console.log(game.renderQueue[fire[i][0]][fire[i][1]]);
                    game.renderQueue[fire[i][0]][fire[i][1]].destroy();
                    game.renderQueue[fire[i][0]][fire[i][1]] = null;
                }
                game.fires.push(new Fire(fire[i][0],fire[i][1],fire[i][2]));

            }
        }
        if(bomb){
            game.bombs.push(new Bomb(bomb.x*40,bomb.y*40));
        }else if(player){            
            for(var i=0; i<game.players.length; i++){               
                if(game.players[i].uuid == player.uuid){                   
                    game.players[i].receive = player;
                    exist = true;
                }
            }
        }
        if(player && !exist){
            game.players.push(new Player(20,20,player));
            exist = false;
        }
        if(obj){
            for(var i=0;i<obj.length;i++){
                for(var j=0;j<obj[i].length;j++){
                    if(obj[i][j]==1){
                        game.walls.push(new Wall(j,i));
                    }
                }
            }
        }
    }
    Connect.prototype.wsOnclose = function(){
    }
    Connect.prototype.wsOnError = function(){
        this.tip.innerHTML = "连接错误，请检查...";
    }
    Connect.prototype.start = function(){
        var self = this;
        game.player = new Player(20,20);
        game.player.bindEvent();
        game.players.push(game.player);
    }
})();