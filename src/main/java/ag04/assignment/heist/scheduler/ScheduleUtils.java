package ag04.assignment.heist.scheduler;

import org.quartz.*;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public final class ScheduleUtils {

    public ScheduleUtils() {}

    public static JobDetail buildJobDetail(final Class<? extends Job> jobClass, final TriggerDetails info) {
        final JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put(jobClass.getSimpleName(), info);

        return JobBuilder
                .newJob(jobClass)
                .withIdentity(jobClass.getSimpleName())
                .setJobData(jobDataMap)
                .build();
    }

    public static Trigger buildTrigger(final Class<? extends Job> jobClass, final TriggerDetails info) {
        SimpleScheduleBuilder builder = SimpleScheduleBuilder.simpleSchedule().withIntervalInMilliseconds(info.getRepeatIntervalMs());

        if(info.isRunForever()) {
            builder = builder.repeatForever();
        } else {
            builder = builder.withRepeatCount(info.getTotalFireCount() - 1);
        }

        if(info.getInitialOffsetMs() < 0) {
            info.setInitialOffsetMs(0);
        }

        return TriggerBuilder
                .newTrigger()
                .withIdentity(jobClass.getSimpleName())
                .withSchedule(builder)
                .startAt(new Date(System.currentTimeMillis() + info.getInitialOffsetMs()))
                .build();
    }

    /**
     * Calculate time difference between desired date and current local time
     * @param date desired date
     * @param timeUnit the unit in which you want the diff
     * @return the diff value, in the provided unit
     */
    public static long getDateDiff(Date date, TimeUnit timeUnit) {
        long diffInMillis = date.getTime() - System.currentTimeMillis();
        return timeUnit.convert(diffInMillis, timeUnit);
    }
}
