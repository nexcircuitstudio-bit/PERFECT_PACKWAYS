import React from 'react';

const BlurText = React.lazy(() => import('./BlurText.jsx'));

export default function AnimatedWords({
  text,
  as = 'span',
  className = 'animated-words',
  color,
  delay = 16,
  stepDuration = 0.3,
  threshold = 0.14,
  distance = 12,
  blur = 3,
  style = {}
}) {
  const Element = as;
  const display = as === 'span' ? 'inline-flex' : 'flex';
  const safeStyle = { display, ...style };
  return (
    <React.Suspense fallback={<Element className={className} style={safeStyle}>{text}</Element>}>
      <BlurText
        as={as}
        text={text}
        className={className}
        color={color}
        effect="blur"
        animateBy="words"
        direction="bottom"
        staggerFrom="start"
        trigger="view"
        delay={delay}
        stepDuration={stepDuration}
        threshold={threshold}
        distance={distance}
        blur={blur}
        style={safeStyle}
      />
    </React.Suspense>
  );
}
