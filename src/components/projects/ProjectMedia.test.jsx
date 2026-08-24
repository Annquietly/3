import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import ProjectMedia from './ProjectMedia';

describe('ProjectMedia', () => {
  it('renders MP4 as autoplaying inline muted looped video', () => {
    const markup = renderToStaticMarkup(
      <ProjectMedia src="/project/demo.mp4" alt="Demo" className="media" />,
    );

    expect(markup).toContain('<video');
    expect(markup).toContain('autoPlay=""');
    expect(markup).toContain('loop=""');
    expect(markup).toContain('muted=""');
    expect(markup).toContain('playsInline=""');
    expect(markup).not.toContain('controls=""');
  });

  it('keeps regular images as images', () => {
    const markup = renderToStaticMarkup(
      <ProjectMedia src="/project/demo.webp" alt="Demo" className="media" />,
    );

    expect(markup).toContain('<img');
    expect(markup).not.toContain('<video');
  });
});
