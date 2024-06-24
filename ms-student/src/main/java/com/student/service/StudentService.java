package com.student.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.student.dto.SchoolDTO;
import com.student.dto.StudentRespDTO;
import com.student.model.Student;
import com.student.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> createStudent(Student student){
        try{
            return new ResponseEntity<Student>(studentRepository.save(student), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> fetchStudentById(Integer id){
        Optional<Student> student =  studentRepository.findById(id);
        if(student.isPresent()){
            SchoolDTO school = restTemplate.getForObject("http://SCHOOL-SERVICE/school/" + student.get().getSchoolId(), SchoolDTO.class);
            StudentRespDTO studentResponse = new StudentRespDTO(
                    student.get().getId(),
                    student.get().getName(),
                    student.get().getAge(),
                    student.get().getGender(),
                    school
            );
            return new ResponseEntity<>(studentResponse, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No Student Found",HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> fetchStudents(){
        List<Student> students = studentRepository.findAll();
        return new ResponseEntity<List<Student>>(students, HttpStatus.OK);
    }

    public void deleteSchoolById(Integer id) {
        studentRepository
            .findOneById(id)
            .ifPresent(school -> {
                studentRepository.delete(school);
            });
    }

    public ResponseEntity<?> updateStudent(Student student){
        try{
            return new ResponseEntity<Student>(studentRepository.save(student), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

