package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.domain.Heist;
import ag04.assignment.heist.domain.HeistSkill;
import ag04.assignment.heist.domain.HeistStatus;
import ag04.assignment.heist.dto.HeistSkillSetDTO;
import ag04.assignment.heist.exception.MethodNotAllowedException;
import ag04.assignment.heist.mapper.HeistSkillMapper;
import ag04.assignment.heist.repository.HeistSkillRepository;
import ag04.assignment.heist.service.HeistService;
import ag04.assignment.heist.service.HeistSkillService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class HeistSkillServiceImpl implements HeistSkillService {

    private final HeistSkillRepository heistSkillRepository;
    private final HeistService heistService;
    private final HeistSkillMapper heistSkillMapper;

    public HeistSkillServiceImpl(HeistSkillRepository heistSkillRepository, HeistService heistService, HeistSkillMapper heistSkillMapper) {
        this.heistSkillRepository = heistSkillRepository;
        this.heistService = heistService;
        this.heistSkillMapper = heistSkillMapper;
    }

    @Override
    public void updateHeistSkillSet(Long heist_id, HeistSkillSetDTO heistSkillSetDTO) {
        Heist heistToUpdate = heistService.getHeistById(heist_id);

        if(heistToUpdate.getHeistStatus().equals(HeistStatus.IN_PROGRESS)) {
           throw new MethodNotAllowedException("Cannot update heist skills. Heist has already started");
        }

        if(heistSkillSetDTO.getSkills() != null) {
            Set<HeistSkill> skillSetForUpdate = heistSkillMapper.heistSkillDTOsToHeistSkills(heistSkillSetDTO.getSkills());

            for(HeistSkill heistSkill : skillSetForUpdate) {

                Optional<HeistSkill> containedSkill = heistSkillRepository.findByHeistIdAndSkillIdAndLevel(
                        heistToUpdate.getId(), heistSkill.getSkill().getId(), heistSkill.getLevel()
                );

                if(containedSkill.isPresent()) {
                    containedSkill.get().setMembers(heistSkill.getMembers());
                    heistSkillRepository.save(containedSkill.get());
                } else {
                    heistSkillRepository.save(new HeistSkill(
                            heistToUpdate, heistSkill.getSkill(), heistSkill.getLevel(), heistSkill.getMembers()));
                }
            }
        }
    }
}
