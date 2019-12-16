package com.uptime.bacchus.entity;


import lombok.Data;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

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

    // equals() and hashCode()
}
