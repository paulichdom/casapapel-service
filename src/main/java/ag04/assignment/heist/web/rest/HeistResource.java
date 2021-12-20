package ag04.assignment.heist.web.rest;

import ag04.assignment.heist.domain.Heist;
import ag04.assignment.heist.dto.*;
import ag04.assignment.heist.service.HeistService;
import ag04.assignment.heist.service.HeistSkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("heist")
@Validated
public class HeistResource {

    private final HeistService heistService;
    private final HeistSkillService heistSkillService;

    public HeistResource(HeistService heistService, HeistSkillService heistSkillService) {
        this.heistService = heistService;
        this.heistSkillService = heistSkillService;
    }

    @PostMapping
    public ResponseEntity<String> addNewHeist(@Valid @RequestBody HeistDTO heistDTO) throws URISyntaxException {
        Heist newHeist = heistService.createNewHeist(heistDTO);
        return ResponseEntity
                .created(new URI("/heist/" + newHeist.getId()))
                .build();
    }

    @PatchMapping("/{heist_id}/skills")
    public ResponseEntity<String> updateRequiredHeistSkills(
            @PathVariable Long heist_id, @Valid @RequestBody HeistSkillSetDTO heistSkillSetDTO
    ) throws URISyntaxException {
        heistSkillService.updateHeistSkillSet(heist_id, heistSkillSetDTO);
        return ResponseEntity
                .noContent()
                .header("Content-Location", String.valueOf(new URI("/heist/" + heist_id + "/skills")))
                .build();
    }

    @GetMapping("/{heist_id}/eligible_members")
    public ResponseEntity<EligibleMembersDTO> viewEligibleMembers(@PathVariable Long heist_id) {
        return new ResponseEntity<>(heistService.getEligibleMembers(heist_id), HttpStatus.OK);
    }

    @PutMapping("/{heist_id}/members")
    public ResponseEntity<String> confirmHeistParticipants(
            @PathVariable Long heist_id, @Valid @RequestBody HeistParticipantSetDTO confirmedMembersDTO) throws URISyntaxException {
        heistService.confirmMembersAsHeistParticipants(heist_id, confirmedMembersDTO);
        return ResponseEntity
                .noContent()
                .header("Content-Location", String.valueOf(new URI("/heist/" + heist_id + "/members")))
                .build();
    }

    @PutMapping("/{heist_id}/start")
    public ResponseEntity<String> startHeist(@PathVariable Long heist_id) throws URISyntaxException {
        heistService.startHeistManually(heist_id);
        return ResponseEntity
                .ok()
                .location(new URI("/heist/" + heist_id + "/status"))
                .build();

    }

    @GetMapping("/{heist_id}")
    public ResponseEntity<HeistDTO> viewHeistDetails(@PathVariable Long heist_id) {
        return new ResponseEntity<>(heistService.getHeistDetails(heist_id), HttpStatus.OK);
    }

    @GetMapping("/{heist_id}/members")
    public ResponseEntity<Set<MemberDTO>> viewHeistParticipants(@PathVariable Long heist_id) {
        return new ResponseEntity<>(heistService.getAllHeistParticipants(heist_id), HttpStatus.OK);
    }

    @GetMapping("/{heist_id}/skills")
    public ResponseEntity<List<HeistSkillDTO>> viewHeistSkills(@PathVariable Long heist_id) {
        return new ResponseEntity<>(heistService.getAllHeistSkills(heist_id), HttpStatus.OK);
    }

    @GetMapping("{heist_id}/status")
    public ResponseEntity<HeistStatusDTO> viewHeistStatus(@PathVariable Long heist_id) {
        return new ResponseEntity<>(heistService.getHeistStatus(heist_id), HttpStatus.OK);
    }

    @GetMapping("{heist_id}/outcome")
    public ResponseEntity<HeistOutcomeDTO> viewHeistOutcome(@PathVariable Long heist_id) {
        return new ResponseEntity<>(heistService.getHeistOutcome(heist_id), HttpStatus.OK);
    }
}
