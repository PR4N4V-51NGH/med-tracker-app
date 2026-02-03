package com.medtracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;
import java.util.List;

@Service
public class AIService {
    
    @Value("${groq.api.key:}")
    private String apiKey;
    
    private final MedicineService medicineService;
    private final RestTemplate restTemplate = new RestTemplate();
    
    public AIService(MedicineService medicineService) {
        this.medicineService = medicineService;
    }
    
    public String askQuestion(String question) {
        String context = buildMedicineContext();
        
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("YOUR_API_KEY_HERE")) {
            return "AI Assistant not configured. Get free API key from https://console.groq.com/keys\n\n" +
                   "Meanwhile, here's your inventory:\n" + context;
        }
        
        String systemPrompt = "You are a helpful medicine inventory assistant. Answer questions based on this inventory data:\n" + context;
        
        try {
            String url = "https://api.groq.com/openai/v1/chat/completions";
            
            Map<String, Object> requestBody = Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", List.of(
                    Map.of("role", "system", "content", systemPrompt),
                    Map.of("role", "user", "content", question)
                ),
                "temperature", 0.7,
                "max_tokens", 200
            );
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            
            Map<String, Object> body = response.getBody();
            if (body != null && body.containsKey("choices")) {
                List<Map> choices = (List<Map>) body.get("choices");
                if (!choices.isEmpty()) {
                    Map message = (Map) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
            
            return "Sorry, I couldn't generate a response.";
            
        } catch (Exception e) {
            return "Error connecting to AI: " + e.getMessage() + "\n\nYour inventory:\n" + context;
        }
    }
    
    private String buildMedicineContext() {
        var medicines = medicineService.getAllMedicines();
        StringBuilder context = new StringBuilder();
        
        for (var med : medicines) {
            double daysLeft = med.getCurrentStock() / med.getDosagePerDay();
            context.append(String.format("- %s: %d tablets, %.1f days remaining, daily dose: %.1f\n",
                med.getName(), med.getCurrentStock(), daysLeft, med.getDosagePerDay()));
        }
        
        return context.toString();
    }
}
