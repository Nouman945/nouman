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
    max-width: 720px;
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
  const three = <h3 className="big-heading">AI Developer and Researcher</h3>;
  const four = (
    <>
      <p>
        I'm an AI Developer and Researcher with <strong>4+ years</strong> of experience in Computer
        Vision,
        <strong> LLM fine-tuning</strong>, and multimodal AI systems. I specialize in delivering
        impactful solutions in <strong>NLP, Computer Vision, and MLOps</strong>, with hands-on
        expertise in deploying production-grade AI applications.
      </p>
      <p>
        My experience spans from developing advanced computer vision systems for security and safety
        applications to building sophisticated chatbots with multilingual capabilities. I have a
        proven track record in both academic and industrial <strong>R&D</strong>, including work in
        fast-paced startup environments.
      </p>
      <p>
        Currently, I'm working as an AI Lead Engineer at{' '}
        <a href="https://primegate.net.sa/" target="_blank" rel="noreferrer">
          PrimeGate
        </a>{' '}
        and as an AI Researcher/Tech Lead at{' '}
        <a href="https://ink.ai" target="_blank" rel="noreferrer">
          Ink AI
        </a>
        . I'm passionate about transforming complex challenges into elegant, production-ready AI
        solutions.
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
