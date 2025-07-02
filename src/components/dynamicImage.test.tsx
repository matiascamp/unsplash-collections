/* eslint-disable @next/next/no-img-element */
import { describe, it, expect, afterEach,vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import DynamicImage from './dynamicImage';


vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img data-testid="dynamic-img" {...props} alt="Test image" />
}));

describe('DynamicImage', () => {
  afterEach(() => {
    cleanup();
  });

  it('renderiza una imagen con los props requeridos', () => {
    render(
      <DynamicImage
        src="/test.jpg"
        alt="Test image"
        width={100}
        height={50}
      />
    );
    const img = screen.getByTestId('dynamic-img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('/test.jpg');
    expect(img.alt).toBe('Test image');
    expect(img.width).toBe(100);
    expect(img.height).toBe(50);
  });

  it('pasa correctamente los props opcionales', () => {
    render(
      <DynamicImage
        src="/test2.jpg"
        alt="Otra imagen"
        width={200}
        height={100}
        className="custom-class"
        sizes="50vw"
        priority
      />
    );
    const img = screen.getByTestId('dynamic-img') as HTMLImageElement;
    expect(img.className).toContain('custom-class');
    expect(img.getAttribute('sizes')).toBe('50vw');
  });
}); 