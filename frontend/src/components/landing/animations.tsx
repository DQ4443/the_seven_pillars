"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Mobile-first animation configuration
// Shorter durations and simpler easing for better performance on mobile
const MOBILE_DURATION = 0.4;
const DESKTOP_DURATION = 0.6;
const STAGGER_DELAY = 0.1;

// Smooth cubic bezier for professional feel
const smoothEasing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Animation variants optimized for mobile
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOBILE_DURATION,
      ease: smoothEasing,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: MOBILE_DURATION,
      ease: smoothEasing,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOBILE_DURATION,
      ease: smoothEasing,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOBILE_DURATION,
      ease: smoothEasing,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOBILE_DURATION,
      ease: smoothEasing,
    },
  },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.1,
    },
  },
};

// Stagger container with faster timing for lists
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Props for animation wrapper components
interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  fast?: boolean;
}

/**
 * FadeInUp - Scroll-triggered fade in with upward motion
 * Best for: Section headers, cards, text blocks
 */
export function FadeInUp({ children, className, delay = 0 }: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeIn - Simple opacity fade
 * Best for: Images, iframes, subtle reveals
 */
export function FadeIn({ children, className, delay = 0 }: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInLeft - Slide in from left
 * Best for: Alternating content, left-aligned elements
 */
export function FadeInLeft({ children, className, delay = 0 }: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInLeft}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInRight - Slide in from right
 * Best for: Alternating content, right-aligned elements
 */
export function FadeInRight({ children, className, delay = 0 }: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInRight}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn - Scale up with fade
 * Best for: Cards, buttons, featured content
 */
export function ScaleIn({ children, className, delay = 0 }: AnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={scaleIn}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger - Container that staggers child animations
 * Best for: Lists, grids, multiple cards
 * Wrap children in FadeInUp, FadeIn, etc.
 */
export function Stagger({ children, className, fast = false }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fast ? staggerContainerFast : staggerContainer}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem - Child item for Stagger container
 * Use inside Stagger for automatic stagger timing
 */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}

/**
 * HeroEntrance - Special animation for hero section
 * Immediate play on page load with staggered children
 */
export function HeroEntrance({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * HeroItem - Child item for HeroEntrance
 * Slightly longer animation for hero impact
 */
export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: smoothEasing,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * TapScale - Touch feedback for interactive elements
 * Best for: Buttons, cards, clickable items on mobile
 */
export function TapScale({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * CardHover - Subtle lift effect for cards (desktop only)
 * Falls back to tap feedback on mobile
 */
export function CardHover({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: smoothEasing } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * TimelineItem - Special animation for timeline entries
 * Alternates left/right on desktop, all from left on mobile
 */
export function TimelineItem({
  children,
  className,
  index = 0
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={{
        hidden: {
          opacity: 0,
          x: -16,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: MOBILE_DURATION,
            ease: smoothEasing,
            delay: index * 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionHeader - Animated section header with title and subtitle
 * Includes staggered text reveal
 */
export function SectionHeader({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionTitle - Animated title within SectionHeader
 */
export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <h2 className={className}>{children}</h2>;
  }

  return (
    <motion.h2
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: smoothEasing },
        },
      }}
    >
      {children}
    </motion.h2>
  );
}

/**
 * SectionSubtitle - Animated subtitle within SectionHeader
 */
export function SectionSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <p className={className}>{children}</p>;
  }

  return (
    <motion.p
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: smoothEasing },
        },
      }}
    >
      {children}
    </motion.p>
  );
}

/**
 * FloatingElement - Continuous floating animation for decorative elements
 * Best for: Background decorations, icons, shapes
 */
export function FloatingElement({
  children,
  className,
  duration = 6,
  delay = 0,
  yOffset = 20,
  xOffset = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  xOffset?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -yOffset, 0],
        x: [0, xOffset, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        x: {
          duration: duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * RotatingElement - Slow continuous rotation for decorative elements
 */
export function RotatingElement({
  children,
  className,
  duration = 20,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity: 1,
        rotate: 360,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        rotate: {
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * PulseGlow - Subtle pulsing glow effect for emphasis
 */
export function PulseGlow({
  children,
  className,
  duration = 3,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxScroll - Scroll-based parallax effect
 * speed: negative = slower than scroll, positive = faster
 */
export function ParallaxScroll({
  children,
  className,
  speed = -0.2,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false }}
      style={{
        willChange: "transform",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * GradientShift - Animated gradient background
 */
export function GradientShift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * TypewriterText - Character-by-character reveal
 * Best for: Hero headlines, impactful statements
 */
export function TypewriterText({
  text,
  className,
  speed = 0.03,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + index * speed,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * CountUp - Animated number counter
 * Best for: Statistics, achievements
 */
export function CountUp({
  end,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {prefix}
        {end}
        {suffix}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        {end}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

/**
 * MorphingBlob - Animated organic blob shape
 * Best for: Background decorations
 * OPTIMIZED: Uses only transform (scale) for GPU acceleration, removed borderRadius animation
 */
export function MorphingBlob({
  className,
  color = "primary",
}: {
  className?: string;
  color?: "primary" | "accent" | "secondary";
}) {
  const shouldReduceMotion = useReducedMotion();

  const colorClasses = {
    primary: "bg-primary/10",
    accent: "bg-accent/10",
    secondary: "bg-secondary/30",
  };

  // Always static - blobs are decorative, animation removed for performance
  return (
    <div
      className={`rounded-full blur-2xl ${colorClasses[color]} ${className}`}
      style={{ willChange: "auto" }}
    />
  );
}

/**
 * ShimmerEffect - Subtle shimmer/shine effect
 * Best for: Buttons, featured cards
 */
export function ShimmerEffect({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["0%", "200%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      />
    </div>
  );
}

/**
 * DrawLine - SVG line drawing animation
 * Best for: Decorative elements, dividers
 */
export function DrawLine({
  className,
  width = 100,
  delay = 0,
}: {
  className?: string;
  width?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <svg className={className} width={width} height="2" viewBox={`0 0 ${width} 2`}>
        <line x1="0" y1="1" x2={width} y2="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg className={className} width={width} height="2" viewBox={`0 0 ${width} 2`}>
      <motion.line
        x1="0"
        y1="1"
        x2={width}
        y2="1"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: smoothEasing }}
      />
    </svg>
  );
}