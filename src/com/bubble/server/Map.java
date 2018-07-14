package com.bubble.server;

public class Map {
	private int array[][]= {
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,1,0,1,0,1,0,1,0,1,0,1,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,1,0,1,0,1,0,1,0,1,0,1,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,1,0,1,0,1,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}
	};
	public String toString() {
		String str = "{\"map\":[";
		for(int i=0; i<13; i++) {
			str+="["+this.array[i][0]+",";
			for(int j=1; j<14; j++) {
				str+=(this.array[i][j])+",";
			}
			str+=(this.array[i][14]);
			if(i!=12) {
				str+="],";
			}else {
				str+="]]}";
			}	
		}
		return str;
	}
	public synchronized void setMap(int x,int y,int value) {
		this.array[x][y] = value;
	}
	public int getMap(int x,int y) {
		return array[x][y];
	}
	public int [][] getMap(){
		return this.array;
		
	}
}
