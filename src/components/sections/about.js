import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1200px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'Kotlin',
    'PyTorch',
    'Claude / GPT / Gemini',
    'LLaMA (QLoRA)',
    'LangGraph Agents',
    'RAG / GraphRAG',
    'Text-to-SQL',
    'Prompt Engineering & Evals',
    'Qdrant / PGVector / FAISS',
    'Generative Models',
    'Transformers',
    'Computer Vision',
    'YOLOv8',
    'ONNX Runtime',
    'FastAPI',
    'gRPC',
    'Docker',
    'Terraform',
    'GCP',
    'AWS',
    'Edge Computing',
    'Weights & Biases',
    'MLOps',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I'm Nouman Rasheed, a Senior AI Engineer with <strong>4+ years</strong> of
              experience building production <strong>Generative AI</strong> systems: multi-agent LLM
              platforms, enterprise <strong>RAG</strong>, and custom generative models trained from
              scratch.
            </p>
            <p>
              As a Founding AI Engineer at{' '}
              <a href="https://ink.ai" target="_blank" rel="noreferrer">
                Ink AI
              </a>{' '}
              (founded by Rich Miner, co-founder of Android), I design and train{' '}
              <strong>handwriting synthesis transformers</strong> and ship LLM features end to end.
              As AI Lead Engineer at{' '}
              <a href="https://primegate.net.sa/" target="_blank" rel="noreferrer">
                PrimeGate
              </a>
              , I architect <strong>multi-agent platforms</strong> with LangGraph and Claude,
              bilingual Arabic/English RAG, and Text-to-SQL systems for the enterprise.
            </p>

            <p>
              Before going deep on GenAI, I spent years shipping <strong>Computer Vision</strong>{' '}
              systems: face recognition, real-time tracking, and Edge AI on Jetson and Coral TPU for
              industrial safety and security.
            </p>

            <p>Here are a few key technologies I work with:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
