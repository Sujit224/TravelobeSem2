package com.example.feedbackapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.feedbackapp.model.Feedback;
import com.example.feedbackapp.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*") 
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        //  System.out.println("Received comment: " + feedback);
        return feedbackService.saveFeedback(feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

   

}
