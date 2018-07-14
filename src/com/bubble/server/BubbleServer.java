package com.bubble.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * JSR356实现WebSocket有两种方式,一种是使用注解的,另一种是继承javax.websocket.Endpoint类,
 * 推荐方式是使用注解(本例使用注解)
 * 
 * @ServerEndpoint 注解是一个类层次的注解，它的功能主要是将目前的类定义成一个websocket服务器端,
 * 注解的值将被用于监听用户连接的终端访问URL地址,客户端可以通过这个URL来连接到WebSocket服务器端
 */
@ServerEndpoint("/websocket")
public class BubbleServer {
	//连接池，用来保存每个客户端连接的对象
	private static List<BubbleServer> msgList = new ArrayList<BubbleServer>();
//	private static List<Bomb> bombList = new ArrayList<Bomb>();
	//与某个客户端的连接会话，需要通过它来给客户端发送数据
	private static BombList bombList = new BombList();
	private Session session;
	private Map myMap = new Map();
	private String map = myMap.toString();
	/**
	 * 连接建立成功调用的方法
	 * @param session  可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
	 */
//	public synchronized void addBomb(JsonObject jsonObject) {
//		int x = jsonObject.get("bomb").getAsJsonObject().get("x").getAsInt();
//		int y = jsonObject.get("bomb").getAsJsonObject().get("y").getAsInt();
//		int power = jsonObject.get("bomb").getAsJsonObject().get("power").getAsInt();
//		Bomb bomb= new Bomb(x,y,power);
//		mapArr[x][y] = power;
//		bombList.add(bomb);
//		System.out.println(bomb.toString());
//	}
//	public synchronized void deleteBomb() {
//		if(bombList.size()>0) {
//    		long time = new Date().getTime();
//    		if(time-bombList.get(0).getTime()>=3000) {
//    			System.out.println("bombing:"+bombList.get(0).toString());
//    			bombList.remove(0);
//    		}
//    	}
//	}
    @OnOpen
    public void onOpen(Session session){
    	this.session = session;
	    msgList.add(this);
	    try {
			this.sendMessage(this.map);
		} catch (IOException e) {
			e.printStackTrace();
		}
	    System.out.println("有新连接加入");
    }
    
    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(){
	    msgList.remove(this);
	    System.out.println("有连接关闭");
    }
    
    /**
     * 收到客户端消息后调用的方法
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) {
	    //System.out.println("来自客户端的消息:" + message);
	    //群发消息
    	JsonObject jsonObject = (JsonObject) new JsonParser().parse(message);
    	if(jsonObject.get("bomb") != null) {
    		//x相当于列数，y相当于行数
    		int x = jsonObject.get("bomb").getAsJsonObject().get("x").getAsInt();
    		int y = jsonObject.get("bomb").getAsJsonObject().get("y").getAsInt();
    		int power = jsonObject.get("bomb").getAsJsonObject().get("power").getAsInt();
    		Bomb bomb= new Bomb(y,x,power);
    		myMap.setMap(y, x, power);
    		bombList.add(bomb);
    		System.out.println(bomb.toString());
    	}
    	
    	String fire = bombList.delete(myMap);
    		
	    for(BubbleServer item: msgList){
		    try {
		    	if(fire.length()>0) {
		    		item.sendMessage("{\"fire\":["+fire+"]}");
		    		System.out.println("{\"fire\":["+fire+"]}");
		    	}
		    	//System.out.println(message);
		    	item.sendMessage(message);
		    } catch (IOException e) {
			    e.printStackTrace();
			    continue;
		    }
	    }
    }
    
    /**
     * 发生错误时调用
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error){
	    System.out.println("发生错误");
	    error.printStackTrace();
    }
    
    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     * @param message
     * @throws IOException
     */
    public synchronized void sendMessage(String message) throws IOException{
	    this.session.getBasicRemote().sendText(message);//发送消息给客户端
	    //this.session.getAsyncRemote().sendText(message);
    }
}