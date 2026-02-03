package com.medtracker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private Long familyMemberId;
    
    private String name;
    private double dosagePerDay;
    private int tabletsPerStrip;
    private int currentStock;
    private int pendingStrips = 0;
    private LocalDateTime lastOrderDate;

    public Medicine() {}

    public Medicine(String name, double dosagePerDay, int tabletsPerStrip, int currentStock) {
        this.name = name;
        this.dosagePerDay = dosagePerDay;
        this.tabletsPerStrip = tabletsPerStrip;
        this.currentStock = currentStock;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFamilyMemberId() { return familyMemberId; }
    public void setFamilyMemberId(Long familyMemberId) { this.familyMemberId = familyMemberId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getDosagePerDay() { return dosagePerDay; }
    public void setDosagePerDay(double dosagePerDay) { this.dosagePerDay = dosagePerDay; }

    public int getTabletsPerStrip() { return tabletsPerStrip; }
    public void setTabletsPerStrip(int tabletsPerStrip) { this.tabletsPerStrip = tabletsPerStrip; }

    public int getCurrentStock() { return currentStock; }
    public void setCurrentStock(int currentStock) { this.currentStock = currentStock; }

    public int getPendingStrips() { return pendingStrips; }
    public void setPendingStrips(int pendingStrips) { this.pendingStrips = pendingStrips; }

    public LocalDateTime getLastOrderDate() { return lastOrderDate; }
    public void setLastOrderDate(LocalDateTime lastOrderDate) { this.lastOrderDate = lastOrderDate; }
}
