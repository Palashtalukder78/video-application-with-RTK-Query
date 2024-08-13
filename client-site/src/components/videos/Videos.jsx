import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  let content = null;
  if (isLoading) content = <VideoLoader length={length} />;
  if (!isLoading && isError) content = <Error message={error} />;
  if (!isLoading && !isError && videos?.length === 0)
    content = <Error message="No video Found!!" />;
  if (!isLoading && !isError && videos?.length > 0)
    content = videos?.map((video) => <Video key={video?.id} video={video} />);
  return <>{content}</>;
}
