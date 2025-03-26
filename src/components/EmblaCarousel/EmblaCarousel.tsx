import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import HoverZoomImage from "../HoverImages/HoverZoomImage";
import { IconNext, IconPrev } from "../../assets/icons/Icons";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
  children?: ReactNode;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const newIndex = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    emblaThumbsApi.scrollTo(newIndex);
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const scrollToPrev = () => {
    if (emblaMainApi) {
      const prevIndex =
        selectedIndex === 0 ? slides.length - 1 : selectedIndex - 1;
      emblaMainApi.scrollTo(prevIndex);
    }
  };

  const scrollToNext = () => {
    if (emblaMainApi) {
      const nextIndex =
        selectedIndex === slides.length - 1 ? 0 : selectedIndex + 1;
      emblaMainApi.scrollTo(nextIndex);
    }
  };

  return (
    <div className="embla">
      <div className="embla__viewport position-relative" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <HoverZoomImage
                className="embla__slide__img"
                imageSrc={slide}
                altText="img-detail-product"
                width="100%"
                height="800px"
              />
            </div>
          ))}
        </div>
        <button
          onClick={scrollToPrev}
          className="embla__button embla__button--prev"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(-50%)",
            left: "56px",
          }}
        >
          <div>
            <IconNext></IconNext>
          </div>
        </button>
        <button
          onClick={scrollToNext}
          className="embla__button embla__button--next"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(-50%)",
            right: "24px",
          }}
        >
          <div>
            <IconPrev></IconPrev>
          </div>
        </button>
      </div>

      <div className="gap-3 embla-thumbs">
        <button
          onClick={scrollToPrev}
          className="embla__button embla__button--prev"
        >
          <div>
            <IconNext color="#000" size="20px"></IconNext>
          </div>
        </button>
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((slide, index) => (
              <div key={index} className="embla-thumbs__slide">
                <img
                  className="embla-thumbs__img"
                  src={slide}
                  alt={`Thumb ${index + 1}`}
                  onClick={() => onThumbClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollToNext}
          className="embla__button embla__button--next"
        >
          <div>
            <IconPrev color="#000" size="20px"></IconPrev>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
