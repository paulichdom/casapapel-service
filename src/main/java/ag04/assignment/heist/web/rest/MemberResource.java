package ag04.assignment.heist.web.rest;

import ag04.assignment.heist.domain.Member;
import ag04.assignment.heist.dto.MemberDTO;
import ag04.assignment.heist.dto.MemberSkillSetDTO;
import ag04.assignment.heist.service.MemberService;
import ag04.assignment.heist.service.MemberSkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("member")
@Validated
public class MemberResource {

    private final MemberService memberService;
    private final MemberSkillService memberSkillService;


    public MemberResource(MemberService memberService, MemberSkillService memberSkillService) {
        this.memberService = memberService;
        this.memberSkillService = memberSkillService;
    }

    @PostMapping
    public ResponseEntity<String> addNewMember(@Valid @RequestBody MemberDTO memberDTO) throws URISyntaxException {
        Member newMember = memberService.createNewMember(memberDTO);
        return ResponseEntity
                .created(new URI("/member/" + newMember.getId()))
                .build();
    }

    @PutMapping("/{member_id}/skills")
    public ResponseEntity<String> updateMemberSkills(@PathVariable Long member_id, @Valid @RequestBody MemberSkillSetDTO memberSkillSetDTO) throws URISyntaxException {
        memberSkillService.updateMemberSkillSet(member_id, memberSkillSetDTO);
        return ResponseEntity
                .noContent()
                .header("Content-Location", String.valueOf(new URI("/member/" + member_id + "/skills")))
                .build();
    }

    @DeleteMapping("/{member_id}/skills/{skill_name}")
    public ResponseEntity<String> removeMemberSkill(@PathVariable Long member_id, @PathVariable String skill_name) {
        memberSkillService.deleteMemberSkill(member_id, skill_name);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{member_id}")
    public ResponseEntity<MemberDTO> viewMemberDetails(@PathVariable Long member_id) {
        return new ResponseEntity<>(memberService.getMemberDetails(member_id), HttpStatus.OK);
    }

    @GetMapping("/{member_id}/skills")
    public ResponseEntity<MemberSkillSetDTO> viewMemberSkills(@PathVariable Long member_id) {
        return new ResponseEntity<>(memberSkillService.getMemberSkillSet(member_id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MemberDTO>> viewAllMembers() {
        return new ResponseEntity<>(memberService.fetchAllMembers(), HttpStatus.OK);
    }
}
