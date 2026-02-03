package com.medtracker.controller;

import com.medtracker.model.FamilyMember;
import com.medtracker.repository.FamilyMemberRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/family-members")
@CrossOrigin(origins = "http://localhost:5173")
public class FamilyMemberController {
    private final FamilyMemberRepository repository;

    public FamilyMemberController(FamilyMemberRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/user/{userId}")
    public List<FamilyMember> getByUser(@PathVariable Long userId) {
        return repository.findByUserId(userId);
    }

    @PostMapping
    public FamilyMember create(@RequestBody FamilyMember member) {
        return repository.save(member);
    }

    @PutMapping("/{id}")
    public FamilyMember update(@PathVariable Long id, @RequestBody FamilyMember member) {
        member.setId(id);
        return repository.save(member);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
