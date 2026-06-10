import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 40px;
  }

  .filter-chip {
    padding: 6px 14px;
    border: 1px solid var(--lightest-navy);
    border-radius: 50px;
    background-color: transparent;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      border-color: var(--green);
      color: var(--green);
    }

    &.active {
      border-color: var(--green);
      background-color: rgba(100, 255, 218, 0.1);
      color: var(--green);
    }
  }

  .timeline {
    width: 100%;
    margin-top: 50px;
  }
`;

const StyledYearGroup = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;

  @media (max-width: 600px) {
    grid-template-columns: 50px 1fr;
  }

  .year-label {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    font-weight: 400;
    margin: 0;
    padding-top: 18px;

    @media (max-width: 600px) {
      font-size: var(--fz-sm);
      padding-top: 22px;
    }
  }

  .year-entries {
    ${({ theme }) => theme.mixins.resetList};
    border-left: 1px solid var(--lightest-navy);
    padding: 10px 0 30px 30px;

    @media (max-width: 600px) {
      padding-left: 20px;
    }
  }
`;

const StyledEntry = styled.li`
  position: relative;
  padding: 8px 0;

  &:not(:last-of-type) {
    margin-bottom: 25px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 18px;
    left: -35px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: var(--navy);
    border: 2px solid var(--green);
    transition: var(--transition);

    @media (max-width: 600px) {
      left: -25px;
    }
  }

  &:hover:before {
    background-color: var(--green);
  }

  &:hover .entry-title,
  &:hover .entry-title a {
    color: var(--green);
  }

  .entry-header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 12px;
    margin-bottom: 6px;
  }

  .entry-title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    transition: var(--transition);

    a {
      color: inherit;
    }
  }

  .entry-source {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }

  .entry-links {
    display: flex;
    align-items: center;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 2px 5px;
      color: var(--light-slate);

      svg {
        width: 16px;
        height: 16px;
      }

      &:hover {
        color: var(--green);
      }
    }
  }

  .entry-description {
    color: var(--light-slate);
    font-size: var(--fz-sm);

    p {
      margin: 0;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .entry-tech {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;

    li {
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type):after {
        content: '·';
        margin: 0 8px;
        color: var(--green);
      }
    }
  }
`;

const FILTERS = ['All', 'Generative AI', 'Computer Vision', 'Data & Analytics', 'Web & Tools'];

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              category
              company
              date
            }
            html
          }
        }
      }
    }
  `);

  const [activeFilter, setActiveFilter] = useState('All');
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealTimeline = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    sr.reveal(revealTimeline.current, srConfig());
  }, []);

  const projects = data.projects.edges.filter(({ node }) => node);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter(({ node }) => node.frontmatter.category === activeFilter);

  const years = [...new Set(filtered.map(({ node }) => node.frontmatter.date.slice(0, 4)))];

  const entry = (node, key) => {
    const { frontmatter, html } = node;
    const { github, external, title, tech, company } = frontmatter;
    const titleLink = external || github;

    return (
      <StyledEntry key={key}>
        <div className="entry-header">
          <h3 className="entry-title">
            {titleLink ? (
              <a href={titleLink} target="_blank" rel="noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <span className="entry-source">{company ? `@ ${company}` : 'Personal'}</span>
          {(github || external) && (
            <div className="entry-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a href={external} aria-label="External Link" target="_blank" rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="entry-description" dangerouslySetInnerHTML={{ __html: html }} />

        {tech && (
          <ul className="entry-tech">
            {tech.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </StyledEntry>
    );
  };

  return (
    <StyledProjectsSection id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I've Built
      </h2>

      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link>

      <div className="filters">
        {FILTERS.map(filter => (
          <button
            key={filter}
            className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}>
            {filter}
          </button>
        ))}
      </div>

      <div className="timeline" ref={revealTimeline}>
        {years.map(year => (
          <StyledYearGroup key={year}>
            <h3 className="year-label">{year}</h3>
            <ul className="year-entries">
              {filtered
                .filter(({ node }) => node.frontmatter.date.slice(0, 4) === year)
                .map(({ node }, i) => entry(node, i))}
            </ul>
          </StyledYearGroup>
        ))}
      </div>
    </StyledProjectsSection>
  );
};

export default Projects;
