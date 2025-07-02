import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import AddToCollections from './addToCollections';
import * as storeHooks from '@/store/hooks';


vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'img1' }),
}));


vi.mock('./Loader', () => ({
  __esModule: true,
  default: () => <div>Loader</div>,
}));

vi.mock('./dynamicImage', () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} src={props.src} />
  ),
}));

describe('AddToCollections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    vi.spyOn(storeHooks, 'useCollectionsWithFetch').mockReturnValue([
      { _id: '1', collectionName: 'Cats', collectionUrls: [{ imageId: 'img1', urls: { thumb: 'cat.jpg', raw: 'cat.jpg', full: 'cat.jpg', regular: 'cat.jpg', small: 'cat.jpg', small_s3: 'cat.jpg' } }] },
      { _id: '2', collectionName: 'Dogs', collectionUrls: [] },
    ]);

    vi.spyOn(storeHooks, 'useImages').mockReturnValue([
      {
        id: 'img1',
        slug: 'img1-slug',
        alt_description: 'A test image',
        description: 'A test image description',
        width: 100,
        height: 100,
        color: '#fff',
        blur_hash: 'test',
        created_at: '2023-01-01T00:00:00Z',
        user: {
          name: 'Test User',
          username: 'testuser',
          links: { html: 'https://user.example.com' },
          profile_image: { small: 'https://user.example.com/avatar.jpg' },
          first_name: 'Test',
          last_name: 'User'
        },
        links: {
          html: 'https://example.com',
          self: 'https://example.com/self',
          download: 'https://example.com/download'
        },
        urls: {
          thumb: 'img1.jpg',
          raw: 'img1.jpg',
          full: 'img1.jpg',
          regular: 'img1.jpg',
          small: 'img1.jpg'
        }
      }
    ]);

    vi.spyOn(storeHooks, 'useIsLoading').mockReturnValue(false);

    vi.spyOn(storeHooks, 'useStoreActions').mockReturnValue({
      fetchCollections: vi.fn(),
      setImages: vi.fn(),
      addImages: vi.fn(),
      resetImages: vi.fn(),
      setIsLoading: vi.fn(),
      setHasMore: vi.fn(),
      setCurrentPage: vi.fn(),
      setCollections: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renderiza el título y el input de búsqueda', () => {
    render(<AddToCollections />);
    expect(screen.getByText('Add to Collections')).toBeTruthy();
    expect(screen.getAllByPlaceholderText('Search collections...')[0]).toBeTruthy();
  });

  it('renderiza la lista de colecciones', () => {
    render(<AddToCollections />);
    expect(screen.getAllByText('Cats').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dogs').length).toBeGreaterThan(0);
  });

  it('filtra colecciones al escribir en el input', async () => {
    render(<AddToCollections />);
    const input = screen.getAllByPlaceholderText('Search collections...')[0];
    fireEvent.change(input, { target: { value: 'cat' } });

    await waitFor(() => {
      expect(screen.getByText('Cats')).toBeTruthy();
      expect(screen.queryByText('Dogs')).toBeNull();
    });
  });

  it('llama a fetch y fetchCollections al hacer click en + Add to Collection', async () => {
    const mockFetchCollections = vi.fn();

    vi.spyOn(storeHooks, 'useStoreActions').mockReturnValue({
      fetchCollections: mockFetchCollections,
      setImages: vi.fn(),
      addImages: vi.fn(),
      resetImages: vi.fn(),
      setIsLoading: vi.fn(),
      setHasMore: vi.fn(),
      setCurrentPage: vi.fn(),
      setCollections: vi.fn(),
    });

    render(<AddToCollections />);

    const addBtn = screen.getAllByText('+ Add to Collection')[0];
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(mockFetchCollections).toHaveBeenCalled();
    });
  });

  it('muestra el mensaje No collections found si no hay colecciones', () => {
    vi.spyOn(storeHooks, 'useCollectionsWithFetch').mockReturnValue([]);
    render(<AddToCollections />);
    expect(
      screen.getByText((content) => content.includes('No collections found'))
    ).toBeTruthy();
  });
});
