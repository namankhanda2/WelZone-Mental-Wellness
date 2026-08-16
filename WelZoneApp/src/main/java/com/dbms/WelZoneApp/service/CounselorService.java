package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Counselor;
import com.dbms.WelZoneApp.repository.CounselorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CounselorService {
    private final CounselorRepository counselorRepository;
    private final PasswordEncoder encoder;

    public CounselorService(CounselorRepository counselorRepository, PasswordEncoder encoder) {
        this.counselorRepository = counselorRepository;
        this.encoder = encoder;
    }

    public void addCounselor(Counselor counselor) {
        counselor.setCreatedAt(LocalDateTime.now());
        counselor.setUpdatedAt(LocalDateTime.now());
        counselor.setPassword(encoder.encode(counselor.getPassword()));
        counselorRepository.save(counselor);
    }

    public List<Counselor> getAllCounselors() {
        return counselorRepository.findAll();
    }

    public Counselor getCounselorById(Long counselorId) {
        return counselorRepository.findById(counselorId);
    }

    public void updateCounselor(Counselor counselor) {
        counselorRepository.update(counselor);
    }

    public void deleteCounselor(Long counselorId) {
        counselorRepository.delete(counselorId);
    }

    public Counselor getCounselorByUsername(String username) {
        return counselorRepository.findByUsername(username);
    }

    // Method to authenticate counselor
    public boolean authenticateCounselor(String username, String password) {
        Counselor counselor = counselorRepository.findByUsername(username);
        if (counselor != null) {
            return encoder.matches(password, counselor.getPassword());
        }
        return false;
    }
}
