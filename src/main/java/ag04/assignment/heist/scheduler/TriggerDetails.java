package ag04.assignment.heist.scheduler;

import ag04.assignment.heist.domain.Heist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TriggerDetails {

    private int totalFireCount;

    private boolean runForever;

    private long repeatIntervalMs;

    private long initialOffsetMs;

    private Long heistIdParam;

    private Heist heist;

    public TriggerDetails(int totalFireCount,
                          boolean runForever,
                          long repeatIntervalMs,
                          long initialOffsetMs,
                          Long heistIdParam) {
        this.totalFireCount = totalFireCount;
        this.runForever = runForever;
        this.repeatIntervalMs = repeatIntervalMs;
        this.initialOffsetMs = initialOffsetMs;
        this.heistIdParam = heistIdParam;
    }

    public TriggerDetails(boolean runForever,
                          long repeatIntervalMs,
                          long initialOffsetMs,
                          Heist heist) {
        this.runForever = runForever;
        this.repeatIntervalMs = repeatIntervalMs;
        this.initialOffsetMs = initialOffsetMs;
        this.heist = heist;
    }
}
