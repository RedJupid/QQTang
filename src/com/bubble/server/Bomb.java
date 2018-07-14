package com.bubble.server;

import java.util.Date;

public class Bomb {
	private int x;
	private int y;
	private int power;
	private long time;
	public Bomb(int x,int y,int power) {
		super();
		this.x = x;
		this.y = y;
		this.power = power;
		this.time = new Date().getTime();
	}
	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public int getPower() {
		return power;
	}
	public void setPower(int power) {
		this.power = power;
	}
	public long getTime() {
		return time;
	}
	public void setTime(long time) {
		this.time = time;
	}
	public String toString() {
		return "x:"+this.x+"y:"+this.y+"power:"+this.power+"time:"+this.time;
	}
}
