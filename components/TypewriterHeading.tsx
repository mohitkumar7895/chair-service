'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TypewriterHeadingProps {
  text: string;
  highlightText?: string;
  tag?: 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
  className?: string;
  speed?: number;
}

export default function TypewriterHeading({
  text,
  highlightText,
  tag: Tag = 'h2',
  style,
  className = '',
  speed = 22
}: TypewriterHeadingProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedHighlight, setDisplayedHighlight] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let current = 0;
    const textLen = text.length;
    const highLen = highlightText ? highlightText.length : 0;

    const timer = setInterval(() => {
      if (current <= textLen) {
        setDisplayedText(text.slice(0, current));
        current++;
      } else if (highlightText && current <= textLen + highLen) {
        setDisplayedHighlight(highlightText.slice(0, current - textLen));
        current++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [hasStarted, text, highlightText, speed]);

  return (
    <Tag
      ref={elementRef}
      style={{ minHeight: '1.2em', ...style }}
      className={className}
    >
      <span>{hasStarted ? displayedText : ''}</span>
      {highlightText && (
        <span className="text-gradient-gold"> {hasStarted ? displayedHighlight : ''}</span>
      )}
      {hasStarted && !isComplete && (
        <span
          style={{
            display: 'inline-block',
            width: '3px',
            height: '0.85em',
            background: '#d97706',
            marginLeft: '4px',
            verticalAlign: 'baseline',
            animation: 'blinkCursor 0.7s infinite'
          }}
        />
      )}
    </Tag>
  );
}
