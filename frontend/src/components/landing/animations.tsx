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