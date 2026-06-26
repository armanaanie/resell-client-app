import SellerStatcards from '@/components/dashboard/SellerStatcard';

import { requireRole } from '@/lib/requireRole';


const page = async() => {
   const user = await requireRole("seller");

    return (
        <div className='space-y-6 p-10'>
            <h1 className='text-center font-semibold text-3xl'>Welcome,{user?.name}!</h1>
            <SellerStatcards sellerId={user.id}/>
        </div>
    );
};

export default page;