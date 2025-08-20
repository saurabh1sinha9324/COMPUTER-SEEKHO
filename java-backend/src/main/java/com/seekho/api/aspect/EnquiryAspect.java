package com.seekho.api.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class EnquiryAspect {

    // Pointcut: All public methods in EnquiryService or Controller
    @Pointcut("execution(* com.seekho.api.service.EnquiryService.*(..)) || execution(* com.seekho.api.controller.EnquiryController.*(..))")
    public void enquiryLayerMethods() {}

    // @Before - Log method entry
    @Before("enquiryLayerMethods()")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("[BEFORE] Method: " + joinPoint.getSignature().getName());
        System.out.println("Args: " + Arrays.toString(joinPoint.getArgs()));
    }
    // @After - Log method exit (regardless of success/failure)
    @After("enquiryLayerMethods()")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("[AFTER] Method: " + joinPoint.getSignature().getName());
    }
    // @AfterReturning - Log returned value
    @AfterReturning(pointcut = "enquiryLayerMethods()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("[RETURNING] Method: " + joinPoint.getSignature().getName());
        System.out.println("Returned: " + result);
    }

    // @Around - Measure execution time
    @Around("enquiryLayerMethods()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed(); // proceed to actual method
        long endTime = System.currentTimeMillis();
        System.out.println("[TIMING] " + joinPoint.getSignature().getName() + " executed in " + (endTime - startTime) + " ms");

        return result;
    }
}
