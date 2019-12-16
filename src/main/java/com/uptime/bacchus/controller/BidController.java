package com.uptime.bacchus.controller;

import com.uptime.bacchus.entity.Bid;
import com.uptime.bacchus.repository.BidRepository;
import com.uptime.bacchus.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Controller
public class BidController {

    @Autowired
    private BidService bidService;

    @GetMapping("/")
    public String getMainPage() {
        return "main";
    }

    @PostMapping("/add")
    public String insertBid(Bid bid) {
        bidService.addBid(new Bid(bid.getFullName(), bid.getProductId(), bid.getBidAmount()));
        return "redirect:bidAdded";
    }

    @GetMapping("/get")
    @ResponseBody
    public List<Bid> getProductsById(String productId) {
        return bidService.getBidsByProductId(productId);
    }

    @GetMapping("/getProducts")
    @ResponseBody
    public List<Bid> getProducts(String productId) {
        return bidService.getBidsByProductId(productId);
    }

    @GetMapping("/bidAdded")
    public String getBidAddedPage() {
        return "added";
    }

}
