package com.bubble.server;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BombList {
	private List<Bomb> bombs = new ArrayList<Bomb>();
	public List<Bomb> getBombList() {
		return bombs;
	}
	
	public synchronized void add(Bomb bomb) {
		bombs.add(bomb);
	}
	
	public synchronized void move(int x,int y) {
		for(int i=0;i<bombs.size();i++) {
			if(bombs.get(i).getX() == x && bombs.get(i).getY() == y) {
				bombs.remove(i);
			}
		}
	}
	
	public synchronized String delete(Map m) {
		String fire = "";
		if(bombs.size()>0) {
			long time = new Date().getTime();
			if(time - bombs.get(0).getTime()>=3000) {
				//记录爆炸产生的火焰
				int a[][] = new int[13][15];
				//记录需要移除的Bomb
				List<Integer> l = new ArrayList<Integer>();
//				String destoryBomb = "{\"destoryBomb\":[";
				fire = explode(bombs.get(0),m,a,l,true);
				
				for(int i=0;i<l.size();i+=2) {
					move(l.get(i),l.get(i+1));
					m.setMap(l.get(i), l.get(i+1), 0);
				}
//				System.out.println(destoryBomb);
//				System.out.println(str);
				
			}
		}
		return fire;
	}
	public String explode(Bomb bomb,Map m,int [][]a,List<Integer> l,boolean first) {
		if(bomb==null) {
			return "";
		}
		int x = bomb.getX();
		int y = bomb.getY();
		l.add(x);
		l.add(y);
		a[x][y] = 1;
		String str = "";
		if(first) {
			str = "["+x+","+y+",1]";
		}else {
			str = ",["+x+","+y+",1]";
		}
		
		//向左爆炸时
		for(int i=1; i<bomb.getPower();i++) {
			int u = x;
			int v = y-i;
			if(v<0)break;
			int value = m.getMap(u,v);
			if(value == 0 && a[u][v]==0) {
				str +=getString(u,v,2);
				a[u][v] = 2;
			}else if(value == 1 || a[u][v]>0) {
				break;
			}else if(value>=2 && value<=8){
				str+=explode(getBomb(u,v),m,a,l,false);
			}
		}
		//向上爆炸时
		for(int i=1; i<bomb.getPower();i++) {
			int u = x-i;
			int v = y;
			if(u<0)break;
			int value = m.getMap(u,v);
			if(value == 0 && a[u][v]==0) {
				str +=getString(u,v,3);
				a[u][v] = 3;
			}else if(value == 1 || a[u][v]>0) {
				break;
			}else if(value>=2 && value<=8){
				str+=explode(getBomb(u,v),m,a,l,false);
			}
		}
		//向右爆炸时
		for(int i=1; i<bomb.getPower();i++) {
			int u = x;
			int v = y+i;
			if(v>14)break;
			int value = m.getMap(u,v);
			if(value == 0 && a[u][v]==0) {
				str +=getString(u,v,4);
				a[u][v] = 4;
			}else if(value == 1 || a[u][v]>0) {
				break;
			}else if(value>=2 && value<=8){
				str+=explode(getBomb(u,v),m,a,l,false);
			}
		}
		//向下爆炸时
		for(int i=1; i<bomb.getPower();i++) {
			int u = x+i;
			int v = y;
			if(u>12)break;
			int value = m.getMap(u,v);
			if(value == 0 && a[u][v]==0) {
				str +=getString(u,v,5);
				a[u][v] = 5;
			}else if(value == 1 || a[u][v]>0) {
				break;
			}else if(value>=2 && value<=8){
				str+=explode(getBomb(u,v),m,a,l,false);
			}
		}

		return str;
	}
	public Bomb getBomb(int x,int y) {
		for(int i=0;i<bombs.size();i++) {
			if(bombs.get(i).getX() == x && bombs.get(i).getY() == y) {
				return bombs.get(i);
			}
		}
		return null;
	}
	public String getString(int x,int y,int v) {
		return ",["+x+","+y+","+v+"]";
	}
}
