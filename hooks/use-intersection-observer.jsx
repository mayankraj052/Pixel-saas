"use client";

import React, { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setTextVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTextVisible(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return() =>observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

export default useIntersectionObserver;
