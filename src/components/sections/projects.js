import React, { useEffect, useRef } from 'react';
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

  .project-group {
    width: 100%;
    margin-top: 50px;
  }

  .group-label {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 0 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 400;
    white-space: nowrap;

    &:after {
      content: '';
      display: block;
      position: relative;
      width: 100%;
      height: 1px;
      margin-left: 20px;
      background-color: var(--lightest-navy);
    }
  }

  .project-list {
    ${({ theme }) => theme.mixins.resetList};
  }
`;

const StyledProjectRow = styled.li`
  position: relative;
  padding: 20px 25px;
  border-radius: var(--border-radius);
  transition: var(--transition);

  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  &:hover,
  &:focus-within {
    background-color: var(--light-navy);

    .project-title,
    .project-title a {
      color: var(--green);
    }
  }

  .row-header {
    ${({ theme }) => theme.mixins.flexBetween};
    align-items: baseline;
    margin-bottom: 8px;
  }

  .project-title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
    transition: var(--transition);

    a {
      position: static;
      color: inherit;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: 15px;
    color: var(--light-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      position: relative;
      z-index: 1;
      padding: 5px 7px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: var(--fz-md);

    p {
      margin: 0;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      position: relative;
      z-index: 1;
    }
  }

  .project-tech-list {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

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

const CATEGORY_ORDER = ['Generative AI', 'Computer Vision', 'Data & Analytics', 'Web & Tools'];

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
            }
            html
          }
        }
      }
    }
  `);

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealGroups = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealGroups.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const projects = data.projects.edges.filter(({ node }) => node);

  const groups = CATEGORY_ORDER.map(category => ({
    category,
    items: projects.filter(({ node }) => node.frontmatter.category === category),
  })).filter(group => group.items.length > 0);

  const uncategorized = projects.filter(
    ({ node }) => !CATEGORY_ORDER.includes(node.frontmatter.category),
  );
  if (uncategorized.length > 0) {
    groups.push({ category: 'More Projects', items: uncategorized });
  }

  const projectRow = (node, key) => {
    const { frontmatter, html } = node;
    const { github, external, title, tech } = frontmatter;
    const titleLink = external || github;

    return (
      <StyledProjectRow key={key}>
        <div className="row-header">
          <h3 className="project-title">
            {titleLink ? (
              <a href={titleLink} target="_blank" rel="noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <div className="project-links">
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
        </div>

        <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />

        {tech && (
          <ul className="project-tech-list">
            {tech.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </StyledProjectRow>
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

      {groups.map(({ category, items }, groupIndex) => (
        <div
          className="project-group"
          key={category}
          ref={el => (revealGroups.current[groupIndex] = el)}>
          <h3 className="group-label">{category}</h3>
          <ul className="project-list">{items.map(({ node }, i) => projectRow(node, i))}</ul>
        </div>
      ))}
    </StyledProjectsSection>
  );
};

export default Projects;
