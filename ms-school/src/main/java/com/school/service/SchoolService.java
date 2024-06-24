package com.school.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.model.School;
import com.school.repository.SchoolRepository;

import java.util.List;
@Service
public class SchoolService {
    @Autowired
    private SchoolRepository schoolRepository;

    public School addSchool(School school){
        return schoolRepository.save(school);
    }
    public List<School> fetchSchools(){
        return schoolRepository.findAll();
    }
    public School fetchSchoolById(int id){
        return schoolRepository.findById(id).orElse(null);
    }

    public void deleteSchoolById(Integer id) {
        schoolRepository
            .findOneById(id)
            .ifPresent(school -> {
                schoolRepository.delete(school);
            });
    }

    public School updateSchool(School school) {
        return schoolRepository.save(school);
    }
}
