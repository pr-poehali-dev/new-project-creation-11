import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const OWNER_ID = "-241762557";

const VIDEOS = [
  { id: "456239018", label: "Видеоотзыв №1" },
  { id: "456239019", label: "Видеоотзыв №2" },
  { id: "456239021", label: "Видеоотзыв №3" },
  { id: "456239020", label: "Видеоотзыв №4" },
];

const embedUrl = (id: string) =>
  `https://vk.com/video_ext.php?oid=${OWNER_ID}&id=${id}&hd=2&autoplay=1`;

interface VideoTestimonialsProps {
  onPlay?: () => void;
}

const VideoTestimonials = ({ onPlay }: VideoTestimonialsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActive(api.selectedScrollSnap());
      setPlayingId(null);
    };
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="video-testimonials" className="bg-[#FBF6F0] px-5 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
          Видеоотзывы
        </h2>
        <p className="mb-6 flex animate-pulse items-center justify-center gap-2 text-center text-sm font-medium text-[#8A7864] md:text-base">
          <Icon name="ArrowLeft" size={16} />
          Листайте
          <Icon name="ArrowRight" size={16} />
        </p>
        <Carousel opts={{ align: "center", loop: true }} setApi={setApi} className="relative">
          <CarouselContent className="-ml-3">
            {VIDEOS.map((v, i) => {
              const isActive = i === active;
              const isPlaying = playingId === v.id;
              return (
                <CarouselItem key={v.id} className="basis-[70%] pl-3 sm:basis-[45%] md:basis-[34%]">
                  <div
                    className={`relative aspect-[9/16] overflow-hidden rounded-2xl border border-[#E2D3C0] bg-[#2B2420] shadow-sm transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"
                    }`}
                  >
                    {isPlaying ? (
                      <iframe
                        src={embedUrl(v.id)}
                        title={v.label}
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    ) : (
                      <button
                        type="button"
                        aria-label={`Смотреть: ${v.label}`}
                        onClick={() => {
                          if (!isActive) {
                            api?.scrollTo(i);
                            return;
                          }
                          setPlayingId(v.id);
                          onPlay?.();
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#3D332B] to-[#2B2420] text-white"
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8A288] text-[#2B2420] shadow-lg transition hover:scale-110">
                          <Icon name="Play" size={28} />
                        </span>
                        <span className="px-4 text-center font-['Montserrat',sans-serif] text-sm font-bold">
                          {v.label}
                        </span>
                      </button>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-1 h-10 w-10 animate-pulse border-2 border-[#E8A288] bg-white text-[#E8A288] md:-left-4" />
          <CarouselNext className="right-1 h-10 w-10 animate-pulse border-2 border-[#E8A288] bg-white text-[#E8A288] md:-right-4" />
        </Carousel>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {VIDEOS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              aria-label={`Перейти к видео №${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-[#E8A288]" : "w-2 bg-[#E2D3C0]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
