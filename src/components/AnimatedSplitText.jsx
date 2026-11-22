import React from 'react';

const SplitText = React.lazy(() => import('./SplitText.jsx'));

export default function AnimatedSplitText({ text, className = '', delay = 28, duration = 0.78, trigger = 'view' }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <React.Suspense fallback={<span className={className} aria-hidden="true">{text}</span>}>
        <SplitText
          text={text}
          className={className}
          tag="span"
          effect="rise"
          splitType="words"
          delay={delay}
          duration={duration}
          staggerFrom="start"
          trigger={trigger}
          threshold={0.12}
          rootMargin="-60px"
          textAlign="left"
          ariaHidden
        />
      </React.Suspense>
    </>
  );
}
