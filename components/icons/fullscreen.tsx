"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/utils/helpers";

export interface FullscreenIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface FullscreenIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isFullscreen?: boolean;
}

const FullscreenIcon = forwardRef<FullscreenIconHandle, FullscreenIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isFullscreen = false, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => controls.start("animate"),
                stopAnimation: () => controls.start("normal"),
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start("animate");
                } else {
                    onMouseEnter?.(e);
                }
            },
            [controls, onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start("normal");
                } else {
                    onMouseLeave?.(e);
                }
            },
            [controls, onMouseLeave]
        );

        return (
            <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    variants={{
                        normal: { scale: 1 },
                        animate: { scale: 1.15 },
                    }}
                    animate={controls}
                >
                    {isFullscreen ? (
                        <>
                            <polyline points="4 14 10 14 10 20" />
                            <polyline points="20 10 14 10 14 4" />
                            <line x1="14" y1="10" x2="21" y2="3" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                        </>
                    ) : (
                        <>
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                        </>
                    )}
                </motion.svg>
            </div>
        );
    }
);

FullscreenIcon.displayName = "FullscreenIcon";

export { FullscreenIcon };
