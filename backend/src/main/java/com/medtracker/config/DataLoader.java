package com.medtracker.config;

import com.medtracker.model.Medicine;
import com.medtracker.repository.MedicineRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

// @Component - Disabled for multi-user setup
public class DataLoader implements CommandLineRunner {

    private final MedicineRepository repository;

    public DataLoader(MedicineRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.saveAll(List.of(
                new Medicine("MetXl 50", 1.0, 10, 36),
                new Medicine("Begaberon", 1.0, 10, 18),
                new Medicine("Nodosis", 2.0, 10, 36),
                new Medicine("Urimax", 1.0, 15, 22),
                new Medicine("Cliogard", 2.0, 10, 36),
                new Medicine("Rancad 1000", 1.0, 10, 18),
                new Medicine("Telmikind 40", 1.0, 10, 10),
                new Medicine("Ecospirin 75", 1.0, 14, 14),
                new Medicine("Glucreta 5", 1.0, 10, 12),
                new Medicine("Renolog", 2.0, 15, 13),
                new Medicine("Neurobin", 1.0, 30, 30),
                new Medicine("Juliana", 1.0, 10, 12),
                new Medicine("Glimy 1", 0.5, 10, 30)
            ));
            System.out.println(">> Database Seeded with 13 Medicines!");
        }
    }
}
