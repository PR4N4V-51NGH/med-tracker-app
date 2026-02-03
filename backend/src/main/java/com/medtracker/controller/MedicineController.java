package com.medtracker.controller;

import com.medtracker.model.Medicine;
import com.medtracker.service.MedicineService;
import com.medtracker.service.PriceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {
    private final MedicineService service;
    private final PriceService priceService;

    public MedicineController(MedicineService service, PriceService priceService) {
        this.service = service;
        this.priceService = priceService;
    }

    @GetMapping
    public List<Medicine> getInventory(@RequestParam(required = false) Long familyMemberId) {
        if (familyMemberId != null) {
            return service.getMedicinesByFamilyMember(familyMemberId);
        }
        return service.getAllMedicines();
    }

    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return service.saveMedicine(medicine);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        service.deleteMedicine(id);
    }

    @PostMapping("/{id}/add-strips")
    public ResponseEntity<?> addStrips(@PathVariable Long id, @RequestBody StripsUpdate update) {
        try {
            Medicine result = service.addStrips(id, update.getStrips());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/place-order")
    public List<Medicine> placeOrderAll() {
        return service.placeOrderAll();
    }

    @PutMapping("/{id}/stock")
    public Medicine updateStock(@PathVariable Long id, @RequestBody StockUpdate update) {
        return service.updateStock(id, update.getStock());
    }

    @PutMapping("/{id}/dose")
    public Medicine updateDose(@PathVariable Long id, @RequestBody DoseUpdate update) {
        return service.updateDose(id, update.getDose());
    }

    @GetMapping("/{id}/price")
    public Map<String, String> getPrice(@PathVariable Long id, @RequestParam String name) {
        return priceService.fetchPrices(name);
    }

    static class StockUpdate {
        private int stock;
        public int getStock() { return stock; }
        public void setStock(int stock) { this.stock = stock; }
    }

    static class DoseUpdate {
        private double dose;
        public double getDose() { return dose; }
        public void setDose(double dose) { this.dose = dose; }
    }

    static class StripsUpdate {
        private Integer strips;
        public Integer getStrips() { return strips; }
        public void setStrips(Integer strips) { this.strips = strips; }
    }
}
