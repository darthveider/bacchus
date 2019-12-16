package com.uptime.bacchus.service;

import com.uptime.bacchus.entity.Bid;
import com.uptime.bacchus.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public Bid addBid(Bid bid) {
        return bidRepository.save(new Bid(bid.getFullName(), bid.getProductId(), bid.getBidAmount()));
    }

    public List<Bid> getBidsByProductId(String productId) {
        return bidRepository.findAllByProductIdOrderByBidAmountDesc(productId);
    }

    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

}
