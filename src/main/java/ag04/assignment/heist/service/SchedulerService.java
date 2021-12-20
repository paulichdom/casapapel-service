package ag04.assignment.heist.service;

import ag04.assignment.heist.scheduler.TriggerDetails;
import org.quartz.Job;

public interface SchedulerService {

    void schedule(Class<? extends Job> jobClass, final TriggerDetails info);
    void terminateJob(final Class<? extends Job> jobClass);
}
