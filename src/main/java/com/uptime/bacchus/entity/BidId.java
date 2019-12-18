package com.uptime.bacchus.entity;

import java.io.Serializable;
public class BidId implements Serializable{

    private String fullName;

    private String date;

    private String time;

    public BidId(String fullName, String date, String time) {
        this.fullName = fullName;
        this.date = date;
        this.time = time;
    }

    public BidId(){}
}
