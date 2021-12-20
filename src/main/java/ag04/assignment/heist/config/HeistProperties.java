package ag04.assignment.heist.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "heist.properties")
public class HeistProperties {

    /**
     * Time interval in which to level up a heist participants skill.
     */
    Integer levelUpTime;
}
