package com.uptime.bacchus.repository;

import com.uptime.bacchus.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, String> {
    List<Bid> findAllByProductIdOrderByBidAmountDesc(String productId);
}