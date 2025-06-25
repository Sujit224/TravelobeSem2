package com.example.feedbackapp.service;

import com.example.feedbackapp.model.Feedback;
import java.util.List;

public interface FeedbackService {
    Feedback saveFeedback(Feedback feedback);
    List<Feedback> getAllFeedback();
}
