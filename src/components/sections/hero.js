import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hello, I'm</h1>;
  const two = <h2 className="big-heading">Nouman Rasheed</h2>;
  const three = <h3 className="big-heading">Deep Learning & Computer Vision Engineer</h3>;
  const four = (
    <>
      <p>
        I specialize in developing advanced AI solutions with a focus on deep learning and computer vision. My expertise lies in creating innovative systems 
        that tackle complex challenges across various industries.
      </p>
      <p>
        With a strong background in AI technologies and software engineering, I'm dedicated to pushing the boundaries of what's possible in AI. 
        My approach combines cutting-edge research with practical implementation, ensuring solutions that are both innovative and effective.
      </p>
      <p>
        Currently, I'm applying my skills at{' '}
        <a href="https://deeritc.com/" target="_blank" rel="noreferrer">
        DeerItc
        </a>
        , where I continue to explore new frontiers in AI. I'm always eager to discuss potential collaborations or share insights about the evolving 
        landscape of artificial intelligence and its real-world applications.
      </p>
    </>
  );

  const five = (
    <a
      className="email-link"
      href="mailto:muhmmadnouman945@gmail.com"
      target="_blank"
      rel="noreferrer">
      Get in Touch!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
