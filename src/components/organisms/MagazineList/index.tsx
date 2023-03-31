import { Magazine, MagazineItemList } from '#constants/magazine';
import React from 'react';
import ReactPaginate from 'react-paginate';
import MagazineItem from './MagazineItem';

interface ItemProps {
   items: Magazine[];
}
const Items = (props: ItemProps) => {
   const { items } = props;
   return (
      <div className={'column gap-[140px]'}>
         {items.map((it, idx) => (
            <MagazineItem key={idx} {...it} />
         ))}
      </div>
   );
};
const MagazineList = () => {
   const [itemOffset, setItemOffset] = React.useState(0);
   const itemsPerPage = 3;
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = MagazineItemList.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(MagazineItemList.length / itemsPerPage);

   //scroll
   const scrollRef = React.useRef<HTMLDivElement>(null);
   // Invoke when user click to request another page.
   const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % MagazineItemList.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
      window.scrollTo({ top: 600 });
   };
   React.useEffect(() => {
      const handleScroll = () => {
         console.log(window.scrollY);
      };

      // 클라이언트 측에서만 이벤트를 등록합니다.
      window.addEventListener('scroll', handleScroll);

      // 컴포넌트가 언마운트 될 때 이벤트를 제거합니다.
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <div
         ref={scrollRef}
         className={'bg-white top-[10px] w-full text-center z-10'}
         // initial={{ y: window.innerHeight }}
         // animate={{ y: window.innerHeight / 2 + 40 }}
         // transition={{ duration: 0.3, ease: easeOut }}
         onClick={() => {
            console.log(window.scrollY);
         }}
      >
         <h1 className={'pt-[180px] text-[62px] pb-11 font-[Reckless]'}>{'Magazine'}</h1>

         <Items items={currentItems} />
         <ReactPaginate
            className={'pt-[180px] pb-[214px] text-sm row items-center justify-center gap-[23px]'}
            pageClassName={'inline'}
            activeClassName={'underline'}
            breakLabel='...'
            nextLabel=''
            pageRangeDisplayed={1}
            pageCount={1}
            previousLabel=''
            onPageChange={handlePageClick}
         />
      </div>
   );
};

export default MagazineList;
