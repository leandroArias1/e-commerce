type ProductGalleryProps = {
  image: string;
  name: string;
};

export default function ProductGallery({
  image,
  name,
}: ProductGalleryProps) {
  return (
    <div className="aspect-square bg-gray-100 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
