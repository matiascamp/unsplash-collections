import { describe, it, expect, vi, beforeEach,afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor,cleanup } from '@testing-library/react';
import SearchInput from './searchInput';

vi.mock('next/navigation', () => ({ usePathname: () => '/search/photos' }));

describe('SearchInput', () => {
  let onSearch: ReturnType<typeof vi.fn>;

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    onSearch = vi.fn().mockResolvedValue(undefined);
  });

  it('renderiza el input y el botón de búsqueda', () => {
    render(<SearchInput onSearch={onSearch} />);
    expect(screen.getByPlaceholderText('Enter your keywords...')).toBeTruthy();
    expect(screen.getByRole('button', { name: /search/i })).toBeTruthy();
  });

  it('renderiza el placeholder personalizado', () => {
    render(<SearchInput onSearch={onSearch} placeholder="Buscar imágenes..." />);
    expect(screen.getByPlaceholderText('Buscar imágenes...')).toBeTruthy();
  });

  it('renderiza el loader cuando isLoading es true', () => {
    render(<SearchInput onSearch={onSearch} isLoading />);
    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /search/i })).toBeNull();
  });

  it('el input se deshabilita cuando isLoading es true', () => {
    render(<SearchInput onSearch={onSearch} isLoading />);
    const input = screen.getByPlaceholderText('Enter your keywords...');
    expect((input as HTMLInputElement).disabled).toBe(true);
  });

  it('cambia el valor del input al escribir', () => {
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Enter your keywords...');
    fireEvent.change(input, { target: { value: 'cat' } });
    expect((input as HTMLInputElement).value).toBe('cat');
  });

  it('llama a onSearch al hacer click en el botón', async () => {
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Enter your keywords...');
    fireEvent.change(input, { target: { value: 'dog' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('dog');
    });
  });

  it('llama a onSearch al presionar Enter', async () => {
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Enter your keywords...');
    fireEvent.change(input, { target: { value: 'bird' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('bird');
    });
  });

  it('no llama a onSearch si el input está vacío o solo espacios', async () => {
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Enter your keywords...');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(onSearch).not.toHaveBeenCalled();
    });
  });

  it('muestra el valor inicial si se pasa initialValue', () => {
    render(<SearchInput onSearch={onSearch} initialValue="gato" />);
    expect((screen.getByPlaceholderText('Enter your keywords...') as HTMLInputElement).value).toBe('gato');
  });
}); 