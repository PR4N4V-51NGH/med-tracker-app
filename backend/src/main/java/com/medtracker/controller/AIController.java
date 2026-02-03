package com.medtracker.controller;

import com.medtracker.service.AIService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {
    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ask")
    public Map<String, String> askAI(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        String answer = aiService.askQuestion(question);
        return Map.of("answer", answer);
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        String answer = aiService.askQuestion(question);
        return Map.of("answer", answer);
    }
}
