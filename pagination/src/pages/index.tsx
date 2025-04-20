import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePagination() {
const router = useRouter();
useEffect(() => {
router.replace('/posts?page=1');
}, []);
return null;
}