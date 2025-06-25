package com.example.feedbackapp.service;

import com.example.feedbackapp.model.Feedback;
import com.example.feedbackapp.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository repository;

    @Override
    public Feedback saveFeedback(Feedback feedback) {
        return repository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return repository.findAll();
    }
}
