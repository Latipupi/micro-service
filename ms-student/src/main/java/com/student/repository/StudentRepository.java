package com.student.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.model.Student;

@Repository
public interface  StudentRepository  extends JpaRepository<Student, Integer> {
    
    Optional<Student> findOneById(Integer id);
}
