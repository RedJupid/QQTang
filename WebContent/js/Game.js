(function(){
    var Game = window.Game = function(params){
        this.canvas = document.getElementById(params.id);
        this.ctx = this.canvas.getContext("2d");
        this.resUrl = params.resUrl;
        this.fno = 0;
        var self = this;
        this.startX = 40;
        this.startY = 40;
        this.walls = [];
        this.bombs = [];
        this.players = [];
        this.fires = [];
        this.player = null;
        this.renderQueue = new Array(13);
        this.indexOfPlayer = 0;
        for(var i=0;i<13;i++){
            this.renderQueue[i] = new Array(15);
        }
        this.init();
        this.loadAllResource(function(){
            self.start();
        });
    }

    Game.prototype.init = function(){
        this.canvas.width = 600+40;
        this.canvas.height = 520+40;
        
    }

    Game.prototype.start = function(){
        var self = this;
        this.land = new Land();
        this.arrows = new Arrows();
        // this.player = new Player(20,20);
        // this.walls.push(new Wall(3,3));
        // this.walls.push(new Wall(3,5));
        // this.walls.push(new Wall(5,3));
        // this.walls.push(new Wall(7,3));
        
        this.timer = setInterval(function(){
            for(var i=0;i<self.walls.length;i++){
                self.renderQueue[self.walls[i].mapY][self.walls[i].mapX] = self.walls[i];
            }
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            self.land.render();
            
            // //更新渲染墙
            // for(var i=0;i<self.walls.length;i++){
            //     self.walls[i].render();
            // }
            for(var i=0;i<self.bombs.length;i++){
                self.bombs[i].update();
            }
            for(var i=0;i<self.walls.length;i++){
                self.walls[i].update();
            }
            for(var i=0;i<self.fires.length;i++){
                self.fires[i].update();
            }
            // for(var i=0;i<self.bombs.length;i++){
            //     self.bombs[i].render();
            // }
            //更新人物
            // for(var i=0;i<self.players.length; i++){
            // 	self.players[i].update();
            // }
            if(self.player){
                self.player.update();
            }
            for(var i=0;i<self.fires.length;i++){
                self.fires[i].render();
            }
            self.arrows.update();
            //渲染第几个人物
            self.indexOfPlayer = 0;
            for(var i=0;i<13;i++){
                for(var j=0;j<15;j++){    
                    if(self.renderQueue[i][j]){
                        self.renderQueue[i][j].render();
                    }
                }
                for(var k=0; k<self.players.length; k++){
                    if(self.players[k].isRender == false && i==self.players[k].receive.mapY){
                        if(self.players[k].uuid == self.player.uuid){
                            var obj = self.player.receive;
                            if(obj){
                                self.arrows.x = obj.x;
                                self.arrows.y = obj.y;
                            }
                            self.arrows.render();
                            // console.log(self.players[k].uuid);
                        }
                        self.players[k].render();
                        self.players[k].isRender = true;
                    }
                }
                
            }
            for(var k=0; k<self.players.length; k++){
                self.players[k].isRender = false;
            }
            //  self.players[1].render();
            // self.player.render();
            
            //帧编号
            self.printFno();
        },20);
    }
    //读取资源
    Game.prototype.loadAllResource = function(callback){
        this.res = {};
        var self = this;
        var alreadyDoneNumber = 0;

        //发出请求，请求JSON文件
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var resObj = JSON.parse(xhr.responseText);
                //遍历数组
                for(var i=0; i<resObj.images.length; i++){
                    self.res[resObj.images[i].name] = new Image();
                    self.res[resObj.images[i].name].src = resObj.images[i].url;
                    self.res[resObj.images[i].name].onload = function(){
                        alreadyDoneNumber ++;
                        //清屏
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        //提示文字
                        var txt = "正在加载" + alreadyDoneNumber + "/" + resObj.images.length + "请稍后";
                        //放到居中位置
                        self.ctx.textAlign = "center";
                        self.ctx.font = "20px simsun";
                        self.ctx.fillText(txt,self.canvas.width/2,self.canvas.height/2);
                        //判断是否已经全部
                        if(alreadyDoneNumber == resObj.images.length){
                            callback();
                        }
                        
                    }
                }
            }
        }
        xhr.open("get",this.resUrl,true);
        xhr.send(null);
    }

    Game.prototype.printFno = function(){
        this.fno ++;
        this.ctx.font = "16px consolas";
        this.ctx.textAlign ="left";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("FNO:"+this.fno,10,20);
    }
    
})();