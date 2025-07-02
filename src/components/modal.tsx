'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '@/store/store';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddToCollections = dynamic(() => import('./addToCollections'), { ssr: false });

const Modal = ({ isOpen, onClose }: ModalProps) => {
    const path = usePathname();
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLInputElement | HTMLButtonElement | null>(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!isOpen) return;
        setTimeout(() => {
            firstFocusableRef.current?.focus();
        }, 0);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === 'Tab' && modalRef.current) {
                const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
                    'input, button, [tabindex]:not([tabindex="-1"])'
                );
                const focusable = Array.from(focusableEls).filter(el => !el.hasAttribute('disabled'));
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                } else if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen && path !== 'collections') {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, path]);

    if (!isOpen) return null;

    const handleInput = async () => {
        await fetch('/api/collections', {
            method: 'POST',
            body: JSON.stringify({
                collectionName: query
            })
        });
        await Store.getState().fetchCollections();
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    

    return (
        <div className="fixed inset-0 bg-gray-600/30 flex items-center justify-center z-50" aria-hidden="true">
            <div
                ref={modalRef}
                className="bg-white rounded-md p-6 w-[600px] max-w-[90%] h-150"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {path.includes('collections') ? (
                    <>
                        <div className="inline mb-4 text-center">
                            <h3 id="modal-title" className="text-xl font-semibold">Add Collection</h3>
                        </div>
                        <input
                            type="text"
                            className='border border-[#E5E7EB] outline-none rounded-md bg-white w-full my-5 p-4'
                            onChange={handleInputChange}
                            ref={firstFocusableRef as React.RefObject<HTMLInputElement>}
                        />
                        <div className='flex justify-center gap-5'>
                            <button
                                className='py-1 px-4 font-semibold rounded-md hover:bg-gray-200 cursor-pointer'
                                onClick={handleInput}
                                ref={!query ? firstFocusableRef as React.RefObject<HTMLButtonElement> : undefined}
                            >
                                Save
                            </button>
                            <button
                                className='py-1 px-4 font-semibold rounded-md hover:bg-gray-200 cursor-pointer'
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <AddToCollections />
                )}
            </div>
        </div>
    );
};

export default Modal;