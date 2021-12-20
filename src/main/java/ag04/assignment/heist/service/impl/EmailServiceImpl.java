package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.internet.InternetAddress;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    private static final String TEAM_EMAIL = "casapapel.team@ag04.io";

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    @Override
    public void notifyMember(String recipient, String subject, String content) {
        MimeMessagePreparator mimeMsgPrep = mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(new InternetAddress(recipient));
            message.setFrom(new InternetAddress(TEAM_EMAIL, "CASA-PAPEL-TEAM"));
            message.setSubject(subject);
            message.setText(content);
        };

        try {
            this.mailSender.send(mimeMsgPrep);
            log.debug("Sent email to Member '{}'", recipient);
        } catch (MailException mailException) {
            log.warn("Email could not be sent to user '{}'", recipient, mailException);
        }
    }
}
