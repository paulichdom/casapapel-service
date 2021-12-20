package ag04.assignment.heist.service;

public interface EmailService {
    void notifyMember(String recipient, String subject, String content);
}
