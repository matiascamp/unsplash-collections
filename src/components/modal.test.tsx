import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './modal';
import * as nextNavigation from 'next/navigation';

vi.mock('next/navigation', () => ({ usePathname: () => 'collections/123' }));

vi.mock('@/store/store', () => ({ Store: { getState: () => ({ fetchCollections: vi.fn() }) } }));

vi.mock('./addToCollections', () => ({ __esModule: true, default: () => <div>AddToCollections</div> }));

describe('Modal', () => {
    const onClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('no renderiza nada si isOpen es false', () => {
        const { container } = render(<Modal isOpen={false} onClose={onClose} />);
        expect(container.firstChild).toBeNull();
    });

    it('renderiza el modal si isOpen es true', () => {

        render(<Modal isOpen={true} onClose={onClose} />);
        expect(screen.getByRole('dialog', { hidden: true }));
    });

    it('llama a onClose al hacer clic en Cancel', () => {
        vi.spyOn(nextNavigation, 'usePathname').mockReturnValue('collections/123');
        render(<Modal isOpen={true} onClose={onClose} />);
        const cancelButtons = screen.getAllByRole('button', { name: /cancel/i,hidden:true });
        fireEvent.click(cancelButtons[0]);
        expect(onClose).toHaveBeenCalled();
    });

    it('llama a onClose al presionar Escape', () => {
        render(<Modal isOpen={true} onClose={onClose} />);
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).toHaveBeenCalled();
    });

    it('renderiza AddToCollections si el path no incluye collection', () => {
        vi.spyOn(nextNavigation, 'usePathname').mockReturnValue('photos');
        render(<Modal isOpen={true} onClose={onClose} />);
        const elements = screen.getAllByText('Add Collection');
        expect(elements.length).toBeGreaterThan(1);
    });

    vi.clearAllMocks()
}); 