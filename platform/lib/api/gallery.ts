import { galleryImages, GalleryImage } from '@/data/mock/gallery';

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(galleryImages);
    }, 100);
  });
}
