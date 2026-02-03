package com.medtracker.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class PriceService {
    
    private static final Map<String, Map<String, String>> MEDICINE_PRICES = new HashMap<>();
    
    static {
        // Common medicine prices (update with actual market prices)
        addPrice("MetXl", "145", "150");
        addPrice("Begaberon", "280", "290");
        addPrice("Nodosis", "95", "98");
        addPrice("Urimax", "185", "190");
        addPrice("Cliogard", "120", "125");
        addPrice("Rancad", "85", "88");
        addPrice("Telmikind", "110", "115");
        addPrice("Ecospirin", "25", "28");
        addPrice("Glucreta", "165", "170");
        addPrice("Renolog", "195", "200");
        addPrice("Neurobin", "45", "48");
        addPrice("Juliana", "220", "225");
        addPrice("Glimy", "75", "78");
    }
    
    private static void addPrice(String name, String tata1mg, String apollo) {
        Map<String, String> prices = new HashMap<>();
        prices.put("tata1mg", tata1mg);
        prices.put("apollo", apollo);
        MEDICINE_PRICES.put(name.toLowerCase(), prices);
    }
    
    public Map<String, String> fetchPrices(String medicineName) {
        // Try exact match first
        String key = medicineName.toLowerCase().trim();
        if (MEDICINE_PRICES.containsKey(key)) {
            return MEDICINE_PRICES.get(key);
        }
        
        // Try partial match
        for (Map.Entry<String, Map<String, String>> entry : MEDICINE_PRICES.entrySet()) {
            if (key.contains(entry.getKey()) || entry.getKey().contains(key)) {
                return entry.getValue();
            }
        }
        
        // Default prices for unknown medicines
        Map<String, String> defaultPrices = new HashMap<>();
        defaultPrices.put("tata1mg", "N/A");
        defaultPrices.put("apollo", "N/A");
        return defaultPrices;
    }
}
