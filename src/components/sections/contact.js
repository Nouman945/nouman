import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 100px;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
    padding: 0 15px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    margin-bottom: 30px;
    color: var(--lightest-slate);
    font-weight: 600;
  }

  p {
    font-size: var(--fz-lg);
    line-height: 1.6;
    color: var(--slate);
    margin-bottom: 0;
    max-width: 600px;
    margin: 0 auto 40px;

    @media (max-width: 768px) {
      font-size: var(--fz-md);
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(100, 255, 218, 0.3);
    }

    &:active {
      transform: translateY(-1px);
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I'm always interested in connecting with fellow innovators in AI and technology. With 4+
        years of experience in Computer Vision, LLM fine-tuning, and multimodal AI systems, I'm open
        to discussing new ideas and opportunities that align with my expertise in NLP, Computer
        Vision, and MLOps. Whether it's about cutting-edge AI research, production-grade
        implementations, or potential collaborations, I welcome meaningful conversations.
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
};

export default Contact;
