package com.shop.ecommerce.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.shop.ecommerce.model.User;
import com.shop.ecommerce.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    public JwtAuthFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                String email = decodedToken.getEmail();
                
                userRepository.findByEmail(email).ifPresentOrElse(user -> {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            user, null, List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
                    );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }, () -> {
                    // Auto-register user from Firebase token
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(decodedToken.getName() != null ? decodedToken.getName() : "Firebase User");
                    newUser.setRole("USER");
                    userRepository.save(newUser);
                    
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            newUser, null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
                    );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                });
                
            } catch (Exception e) {
                // Invalid token or Firebase not initialized
                System.err.println("Firebase Auth Error: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
