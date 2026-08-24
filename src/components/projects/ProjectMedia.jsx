const VIDEO_EXTENSION = /\.(mp4|webm|ogg)(?:[?#].*)?$/i;

const isVideoMedia = (src) => VIDEO_EXTENSION.test(src);

export default function ProjectMedia({ src, alt, ...props }) {
  if (isVideoMedia(src)) {
    return (
      <video
        src={src}
        aria-label={alt}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        {...props}
      />
    );
  }

  return <img src={src} alt={alt} {...props} />;
}
