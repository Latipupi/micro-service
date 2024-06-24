package com.school.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.school.model.School;
import com.school.service.SchoolService;

import java.util.List;

@CrossOrigin("*")
@RequestMapping(value = "/school")
@RestController
public class SchoolController {
    @Autowired
    private SchoolService schoolService;

    @CrossOrigin("*")
    @PostMapping
    public School addSchool(@RequestBody School school){
        return schoolService.addSchool(school);
    }

    @CrossOrigin("*")
    @GetMapping
    public List<School> fetchSchools(){
        return  schoolService.fetchSchools();
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public School fetchSchoolById(@PathVariable int id){
        return schoolService.fetchSchoolById(id);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchool(@PathVariable int id) {
        schoolService.deleteSchoolById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public School updateSchool(@RequestBody School school){
        return schoolService.updateSchool(school);
    }
}
