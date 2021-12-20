package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.domain.Skill;
import ag04.assignment.heist.repository.SkillRepository;
import ag04.assignment.heist.service.SkillService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public Skill addSkill(String skillName) {
        Optional<Skill> containedSkill = skillRepository
                .findByName(this.preFormatString(skillName));

        return containedSkill.orElseGet(() -> skillRepository.save(
                new Skill(this.preFormatString(skillName)))
        );
    }

    public Skill getSkill(String skillName) {
        return skillRepository.findByName(skillName).orElseThrow(
                () -> new EntityNotFoundException("Resource not found. Skill '" + skillName + "' does not exist"));
    }

    private String preFormatString(String string) {
        return string.trim().toLowerCase();
    }
}
