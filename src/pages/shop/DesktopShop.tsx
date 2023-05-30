import Footer from '#components/organisms/Footer';
import DesktopNavbar from '#components/organisms/Navbar/Desktop';
import ShopList from '#components/organisms/ShopList';
import { useMount } from '#hooks/useMount';
import { useScrollPosition } from '#utils/scroll';
import { cc } from '#utils/string';
import React from 'react';
import useBgStore from 'src/store/useTextColor';

const DesktopShop = () => {
   const scrollY = useScrollPosition();
   const [flag, setFlag] = React.useState(false);
   React.useEffect(() => {
      if (scrollY >= window.innerHeight / 2 - 40) {
         setFlag(true);
      } else {
         setFlag(false);
      }
   }, [scrollY]);
   const mount = useMount();

   return (
      <div className='relative h-screen '>
         <div
            style={{
               backgroundImage: 'url(' + `/img/shop_pc.png` + ')',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               transition: 'background-image ease-in 0.5s',
            }}
            className={'flex items-center z-0 sticky top-0 w-screen h-[calc(50vh+60px)] '}
         ></div>
         <div className={'z-10 translate-y-[-100px]  '}>
            <div className={cc('w-full sticky top-[100px] transition-all', flag ? 'bg-white ' : '')}>
               <DesktopNavbar />
            </div>

            <ShopList />
         </div>
         <div className={'translate-y-[-200px]'}>
            <Footer />
         </div>
      </div>
   );
};
export default DesktopShop;
