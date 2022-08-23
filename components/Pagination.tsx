import React from 'react';
import qs from 'qs';
import { TDirection } from '../types';
import { useRouter } from 'next/router';
import { ArrowNarrowLeftIcon , ArrowNarrowRightIcon } from '@heroicons/react/solid'

interface IPropType {
    page: number;
    pageCount: number;
    redirectUrl?: string;
}

const Pagination = ({ page, pageCount, redirectUrl = '/' }: IPropType) => {
    const router = useRouter();

    const isNextDisabled = (): boolean => {
        return page >= pageCount;
    };

    const isPrevDisabled = (): boolean => {
        return page <= 1;
    };

    const handlePaginate = async (direction: TDirection) => {
        if (direction === 1 && isNextDisabled()) {
            return;
        }

        if (direction === -1 && isPrevDisabled()) {
            return;
        }
        const queryString = qs.stringify({
            ...router.query,
            page: page + direction,
        });

        router.push(`${redirectUrl}?${queryString}`);
    };
    return (
        <div className="flex justify-center mt-24">
        <ArrowNarrowLeftIcon
        onClick={() => handlePaginate(-1)}
        className={`${'bg-primary text-white w-16 h-10 rounded'} ${
            isPrevDisabled() ? 'disabled' : ''
        }`}
        />

            
                <ArrowNarrowRightIcon 
                onClick={() => handlePaginate(1)}
                className={`${'bg-primary text-white w-16 h-10 rounded ml-4'} ${
                    isNextDisabled() ? 'disabled' : ''
                }`}/>
        
        </div>
    );
};

export default Pagination;
