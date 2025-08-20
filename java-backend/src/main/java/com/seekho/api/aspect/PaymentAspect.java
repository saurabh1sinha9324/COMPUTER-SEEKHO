package com.seekho.api.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class PaymentAspect {

    // Pointcut: All methods in PaymentController and PaymentService
    @Pointcut("execution(* com.seekho.api.controller.PaymentController.*(..)) || execution(* com.seekho.api.service.PaymentService.*(..))")
    public void paymentLayerMethods() {}

    // BEFORE - Log method call and arguments
    @Before("paymentLayerMethods()")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("🔹 [Before] Method called: " + joinPoint.getSignature().toShortString());
        System.out.println("     Arguments: " + Arrays.toString(joinPoint.getArgs()));
    }

    // AFTER - Log method completion (even if exception occurs)
    @After("paymentLayerMethods()")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("🔸 [After] Method exited: " + joinPoint.getSignature().toShortString());
    }

    // AFTER RETURNING - Log return value
    @AfterReturning(pointcut = "paymentLayerMethods()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("✅ [AfterReturning] " + joinPoint.getSignature().getName() + " returned: " + result);
    }

    // AROUND - Log execution time
    @Around("paymentLayerMethods()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        Object returnValue = joinPoint.proceed();  // Actual method execution

        long end = System.currentTimeMillis();
        System.out.println("⏱️ [Timing] " + joinPoint.getSignature().toShortString() +
                " executed in " + (end - start) + " ms");

        return returnValue;
    }
}
