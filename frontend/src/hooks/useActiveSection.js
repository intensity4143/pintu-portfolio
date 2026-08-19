import { useEffect, useState } from 'react';

const useActiveSection = (ids, offset = 80) => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observers = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: `-${offset}px 0px -50% 0px`, threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [ids, offset]);

  return active;
};

export default useActiveSection;
