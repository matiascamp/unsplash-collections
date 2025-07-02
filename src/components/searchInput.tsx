'use client'
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useId } from "react";

interface SearchInputProps {
    onSearch: (query: string) => Promise<void>;
    isLoading?: boolean;
    placeholder?: string;
    initialValue?: string;
}

const SearchInput = ({
    onSearch,
    isLoading = false,
    placeholder = "Enter your keywords...",
    initialValue = ''
}: SearchInputProps) => {
    const [query, setQuery] = useState(initialValue);
    const path = usePathname()
    const inputId = useId();

    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    const handleSearch = async () => {
        if (!query.trim()) return;
        await onSearch(query.trim());
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await handleSearch();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };



    return (
        <div className={`flexgap-2 ${path === '/search/photos' ? 'absolute' : ''} -bottom-5 z-1`}>
            <div className="flex items-center relative border border-[#E5E7EB] outline-none rounded-md bg-white w-130 p-4">
                <label htmlFor={inputId} className="sr-only">Search images</label>
                <input
                    id={inputId}
                    type="search"
                    placeholder={placeholder}
                    className='w-full outline-none'
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    aria-label="Search images"
                />
                {isLoading ?
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2" role="status" aria-live="polite">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={handleSearch}
                        aria-label="Search"
                        disabled={isLoading}
                    >
                        <Image src='/Search.svg' alt="" width={20} height={20} />
                    </button>
                }
            </div>
        </div>
    );
};

export default SearchInput;