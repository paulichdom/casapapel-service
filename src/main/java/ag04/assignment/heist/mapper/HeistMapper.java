package ag04.assignment.heist.mapper;

import ag04.assignment.heist.domain.Heist;
import ag04.assignment.heist.domain.HeistSkill;
import ag04.assignment.heist.dto.HeistDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class HeistMapper {

    private final HeistSkillMapper heistSkillMapper;

    public HeistMapper(HeistSkillMapper heistSkillMapper) {
        this.heistSkillMapper = heistSkillMapper;
    }

    public Heist heistDTOToHeist(HeistDTO heistDTO) {
        if(heistDTO == null) {
            return null;
        } else {
            Heist heist = new Heist();
            heist.setName(heistDTO.getName());
            heist.setLocation(heistDTO.getLocation());
            heist.setStartDate(heistDTO.getStartDate());
            heist.setEndDate(heistDTO.getEndDate());
            heist.setHeistStatus(heistDTO.getHeistStatus());

            Set<HeistSkill> heistSkills = heistSkillMapper.heistSkillDTOsToHeistSkills(heistDTO.getSkills());
            heist.setSkills(heistSkills);

            return heist;
        }
    }

    public HeistDTO heistToHeistDTO(Heist heist) {
        if(heist == null) {
            return null;
        } else {
            HeistDTO heistDTO = new HeistDTO();
            heistDTO.setId(heist.getId());
            heistDTO.setName(heist.getName());
            heistDTO.setLocation(heist.getLocation());
            heistDTO.setStartDate(heist.getStartDate());
            heistDTO.setEndDate(heist.getEndDate());
            heistDTO.setHeistStatus(heist.getHeistStatus().toString());
            heistDTO.setSkills(heistSkillMapper.heistSkillsToHeistSkillDTOs(heist.getSkills()));
            return heistDTO;
        }
    }

    public List<HeistDTO> heistsToHeistDTOs(List<Heist> heistList) {
        return heistList.stream().map(this::heistToHeistDTO).collect(Collectors.toList());
    }
}
