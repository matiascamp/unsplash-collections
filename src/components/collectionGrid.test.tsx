/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CollectionGrid from './collectionGrid';


vi.mock('@/utils/photosCollection', () => ({
  __esModule: true,
  default: ({ title,  photoCount }: any) => (
    <div data-testid="photo-collection">{title} ({photoCount})</div>
  )
}));
vi.mock('next/image', () => ({ __esModule: true, default: (props: any) => <img {...props} alt='alt' /> }));
vi.mock('next/link', () => ({ __esModule: true, default: (props: any) => <a {...props} /> }));
vi.mock('./modal', () => ({ __esModule: true, default: (props: any) => props.isOpen ? <div data-testid="modal">Modal abierto</div> : null }));

describe('CollectionGrid', () => {
  afterEach(() => {
    cleanup();
  });

  const collections = [
    {
      _id: '1',
      collectionName: 'Animales',
      collectionUrls: [
        { imageId: 'img1', urls: { raw: '', full: '', regular: '', small: '', thumb: '', small_s3: '' } },
        { imageId: 'img2', urls: { raw: '', full: '', regular: '', small: '', thumb: '', small_s3: '' } }
      ]
    },
    {
      _id: '2',
      collectionName: 'Naturaleza',
      collectionUrls: [
        { imageId: 'img3', urls: { raw: '', full: '', regular: '', small: '', thumb: '', small_s3: '' } }
      ]
    }
  ];

  it('renderiza un Link por cada colección', () => {
    render(<CollectionGrid collectionsImages={collections} />);
    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.getByText('Animales (2)')).toBeTruthy();
    expect(screen.getByText('Naturaleza (1)')).toBeTruthy();
  });

  it('renderiza el botón "Add new collection"', () => {
    render(<CollectionGrid collectionsImages={collections} />);
    expect(screen.getByText('Add new collection')).toBeTruthy();
  });

  it('muestra el modal al hacer click en el botón de agregar', () => {
    render(<CollectionGrid collectionsImages={collections} />);
    const addBtn = screen.getByText('Add new collection');
    fireEvent.click(addBtn);
    expect(screen.getByTestId('modal')).toBeTruthy();
  });

  it('no renderiza enlaces si collectionsImages está vacío', () => {
    render(<CollectionGrid collectionsImages={[]} />);
    expect(screen.getByText('Add new collection')).toBeTruthy();
    expect(screen.queryAllByRole('link').length).toBe(0);
  });
}); 