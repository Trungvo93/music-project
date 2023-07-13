import ArtistTrending from "@/features/ArtistTrending";
import MaybeYouWant from "@/features/MaybeYouWant";
import MVHot from "@/features/MVHot";
import NewMusic from "@/features/NewMusic";
import Partner from "@/features/Partner";
import Radio from "@/features/Radio";
import Rank from "@/features/Rank";
import SlideBanner from "@/features/SlideBanner";
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
