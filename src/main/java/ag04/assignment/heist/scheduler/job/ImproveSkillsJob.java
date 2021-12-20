package ag04.assignment.heist.scheduler.job;

import ag04.assignment.heist.scheduler.TriggerDetails;
import ag04.assignment.heist.service.MemberSkillService;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ImproveSkillsJob implements Job {

    private static final Logger logger = LoggerFactory.getLogger(ImproveSkillsJob.class);

    private final MemberSkillService memberSkillService;

    public ImproveSkillsJob(MemberSkillService memberSkillService) {
        this.memberSkillService = memberSkillService;
    }

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDataMap data = context.getJobDetail().getJobDataMap();
        TriggerDetails info = (TriggerDetails) data.get(ImproveSkillsJob.class.getSimpleName());

        logger.info("Improving member skills...");

        try {
            memberSkillService.levelUpMemberSkills(info.getHeist());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new JobExecutionException(e);
        }

        logger.info("Skills improved");
    }
}
