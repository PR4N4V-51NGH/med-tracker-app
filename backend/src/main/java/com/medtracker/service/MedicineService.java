package com.medtracker.service;

import com.medtracker.model.Medicine;
import com.medtracker.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MedicineService {
    private final MedicineRepository repository;

    public MedicineService(MedicineRepository repository) {
        this.repository = repository;
    }

    public List<Medicine> getAllMedicines() {
        return repository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Medicine saveMedicine(Medicine medicine) {
        return repository.save(medicine);
    }

    public void deleteMedicine(Long id) {
        repository.deleteById(id);
    }

    public Medicine addPendingStrip(Long id) {
        Medicine med = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        med.setPendingStrips(med.getPendingStrips() + 1);
        return repository.save(med);
    }

    public Medicine removePendingStrip(Long id) {
        Medicine med = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        med.setPendingStrips(Math.max(0, med.getPendingStrips() - 1));
        return repository.save(med);
    }

    public Medicine addStrips(Long id, Integer strips) {
        Medicine med = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
        int stripsValue = strips != null ? strips : 0;
        med.setPendingStrips(Math.max(0, stripsValue));
        return repository.save(med);
    }

    public Medicine placeOrder(Long id) {
        Medicine med = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        
        int stripsToAdd = med.getPendingStrips();
        med.setCurrentStock(med.getCurrentStock() + (stripsToAdd * med.getTabletsPerStrip()));
        med.setPendingStrips(0);
        med.setLastOrderDate(LocalDateTime.now());
        return repository.save(med);
    }

    public List<Medicine> placeOrderAll() {
        List<Medicine> allMeds = repository.findAll();
        for (Medicine med : allMeds) {
            if (med.getPendingStrips() > 0) {
                med.setCurrentStock(med.getCurrentStock() + (med.getPendingStrips() * med.getTabletsPerStrip()));
                med.setPendingStrips(0);
                med.setLastOrderDate(LocalDateTime.now());
                repository.save(med);
            }
        }
        return repository.findAll();
    }

    public Medicine updateStock(Long id, int newStock) {
        Medicine med = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        med.setCurrentStock(Math.max(0, newStock));
        return repository.save(med);
    }

    public Medicine updateDose(Long id, double newDose) {
        Medicine med = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        med.setDosagePerDay(Math.max(0, newDose));
        return repository.save(med);
    }

    public double calculateDaysLeft(Medicine med) {
        if (med.getDosagePerDay() <= 0) return 0;
        return med.getCurrentStock() / med.getDosagePerDay();
    }

    public int calculateSuggestedStrips(Medicine med) {
        double tabletsNeeded = med.getDosagePerDay() * 30;
        double shortage = tabletsNeeded - med.getCurrentStock();
        
        if (shortage <= 0) return 0;
        return (int) Math.ceil(shortage / med.getTabletsPerStrip());
    }
}
