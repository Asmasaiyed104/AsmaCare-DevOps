package com.asmacare;
import com.asmacare.patient.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
@Configuration
public class DataLoader {
 @Bean CommandLineRunner seed(PatientRepository r){return a->{if(r.count()==0)r.save(new Patient("Sarah Ahmed","****-***-123","1992-04-15","Active","118/78",72));};}
}
