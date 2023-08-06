import ArtistTrending from "@/features/artistTrendingMain/ArtistTrending";
import MaybeYouWant from "@/features/maybeWantMain/MaybeYouWant";
import MVHot from "@/features/mvHotMain/MVHot";
import NewMusic from "@/features/newMusicMain/NewMusic";
import Partner from "@/features/partnerMain/Partner";
import Radio from "@/features/radioMain/Radio";
import Rank from "@/features/rankMain/Rank";
import SlideBanner from "@/features/bannerMain/SlideBanner";
export default async function Home() {
  return (
    <div className='my-3'>
      <SlideBanner />
      <MaybeYouWant />
      <ArtistTrending />
      <NewMusic />
      <Radio />
      <Rank />
      <MVHot />
      <Partner />
    </div>
  );
}
