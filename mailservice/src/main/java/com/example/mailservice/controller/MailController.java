package com.example.mailservice.controller;



import com.example.mailservice.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mail")
public class MailController {

    @Autowired
    private MailService mailSender;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> request) {
        String to = request.get("to");
        String studentName = request.get("studentName");


        mailSender.sendMail(to, studentName);

        return ResponseEntity.ok("Email sent to: " + to);
    }
}
