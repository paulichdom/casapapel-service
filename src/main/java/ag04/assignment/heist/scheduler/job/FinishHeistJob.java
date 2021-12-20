package ag04.assignment.heist.scheduler.job;

import ag04.assignment.heist.scheduler.TriggerDetails;
import ag04.assignment.heist.service.HeistService;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class FinishHeistJob implements Job {

    private static final Logger logger = LoggerFactory.getLogger(StartHeistJob.class);

    private final HeistService heistService;

    public FinishHeistJob(HeistService heistService) {
        this.heistService = heistService;
    }

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDataMap data = context.getJobDetail().getJobDataMap();
        TriggerDetails info = (TriggerDetails) data.get(FinishHeistJob.class.getSimpleName());

        logger.info("Finishing heist...");

        try {
            heistService.finishHeist(info.getHeistIdParam());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new JobExecutionException(e);
        }

        logger.info("Heist finished");
    }
}
