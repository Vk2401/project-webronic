"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems = [], // Default to an empty array if navItems is not provided
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(60px 60px at ${offsetX}px ${offsetY}px, white, transparent)`;

  const border = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const rect = border.current?.getBoundingClientRect();
      if (rect) {
        offsetX.set(e.clientX - rect.x);
        offsetY.set(e.clientY - rect.y);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [offsetX, offsetY]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "border-blue flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          background: "rgb(255 255 255 / 1%)",
          borderRadius: "12px",
        }}
      >
        <motion.div
          className="absolute inset-0 border-2 border-green rounded-xl"
          style={{
            borderRadius: "12px",
            maskImage: maskImage,
            WebkitMaskImage: maskImage,
          }}
          ref={border}
        ></motion.div>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-white font-bold hover:text-green"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-sm !cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
