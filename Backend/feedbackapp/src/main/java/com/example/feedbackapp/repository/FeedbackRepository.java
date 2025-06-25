package com.example.feedbackapp.repository;

import com.example.feedbackapp.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
