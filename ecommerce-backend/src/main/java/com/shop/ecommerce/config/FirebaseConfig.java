package com.shop.ecommerce.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.getApplicationDefault())
                        .build();
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            // Note: If GOOGLE_APPLICATION_CREDENTIALS is not set, Firebase Admin won't initialize.
            // For local development without Firebase, you can catch this and log a warning.
            System.err.println("WARNING: Could not initialize Firebase Admin SDK. Please set GOOGLE_APPLICATION_CREDENTIALS environment variable.");
        }
    }
}
