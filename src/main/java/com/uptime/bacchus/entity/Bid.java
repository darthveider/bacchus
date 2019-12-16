package com.uptime.bacchus.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "bids")
@Data
@NoArgsConstructor
@IdClass(BidId.class)
public class Bid {

    @Id
    @NotNull
    private String fullName;

    @Id
    private String date;

    @Id
    private String time;

    @NotNull
    private String productId;

    @NotNull
    private String bidAmount;

    public Bid(@NotNull String fullName, @NotNull String productId, @NotNull String bidAmount) {
        this.fullName = fullName;

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yy");
        this.date = simpleDateFormat.format(new Date());

        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HH:mm");
        this.time = simpleTimeFormat.format(new Date());

        this.productId = productId;
        this.bidAmount = bidAmount;
    }
}
