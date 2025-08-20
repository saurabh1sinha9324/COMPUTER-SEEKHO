package com.example.mailservice.service;


import jakarta.mail.*;
import jakarta.mail.internet.*;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;

@Component
public class MailService {

    private final String emailId = "computerseekho2025@gmail.com";
    private final String password = "uqknkgmutwmxuxju";

    public void sendMail(String to, String studentName) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailId, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("Confirmation of Admission in Computer Seekho");

            String emailTemplate = new String(Files.readAllBytes(Paths.get("src/main/resources/templates/emailTemplate.html")));
            emailTemplate = emailTemplate.replace("${studentName}", studentName);

            MimeBodyPart htmlMimeBodyPart = new MimeBodyPart();
            htmlMimeBodyPart.setContent(emailTemplate, "text/html");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlMimeBodyPart);

            message.setContent(multipart);
            Transport.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
