package com.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class MsStudentApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsStudentApplication.class, args);
	}

   @Bean
   @LoadBalanced
   public RestTemplate restTemplate(){
      return new RestTemplate();
   }
}
