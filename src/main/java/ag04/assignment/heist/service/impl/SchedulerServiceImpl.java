package ag04.assignment.heist.service.impl;

import ag04.assignment.heist.scheduler.ScheduleUtils;
import ag04.assignment.heist.scheduler.TriggerDetails;
import ag04.assignment.heist.service.SchedulerService;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.List;

@Service
public class SchedulerServiceImpl implements SchedulerService {

    private static final Logger log = LoggerFactory.getLogger(SchedulerServiceImpl.class);

    private final Scheduler scheduler;

    public SchedulerServiceImpl(Scheduler scheduler) {
        this.scheduler = scheduler;
    }

    public void schedule(final Class<? extends Job> jobClass, final TriggerDetails info) {
        final JobDetail jobDetail = ScheduleUtils.buildJobDetail(jobClass, info);
        final Trigger trigger = ScheduleUtils.buildTrigger(jobClass, info);



        try {
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            log.error(e.getMessage());
        }
    }

    public void terminateJob(final Class<? extends Job> jobClass) {
        log.info("Un scheduling {}", jobClass.getSimpleName());

        try{
            List<? extends Trigger> trigList = scheduler.getTriggersOfJob(JobKey.jobKey(jobClass.getSimpleName()));

            for(Trigger trigger : trigList) {
                scheduler.unscheduleJob(trigger.getKey());
            }
        } catch (SchedulerException e) {
            log.error(e.getMessage());
        }

        log.info("{} unscheduled", jobClass.getSimpleName());
    }

    @PostConstruct
    public void startScheduler() {
        try {
            scheduler.start();
        } catch (SchedulerException e) {
            log.error(e.getMessage());
        }
    }

    @PreDestroy
    public void shutdownScheduler() {
        try {
            scheduler.shutdown();
        } catch (SchedulerException e) {
            log.error(e.getMessage());
        }
    }
}
