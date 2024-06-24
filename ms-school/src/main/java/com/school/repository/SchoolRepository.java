package com.school.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.model.School;

@Repository
public interface SchoolRepository extends JpaRepository<School,Integer> {

    Optional<School> findOneById(Integer id);
    
}
