# Martin Mouritzen — Birthday Experience

## Structure

1. **Before midnight:** a locked dark cinematic hero only. The seven real photos form the circular composition around Martin Mouritzen, with the Copenhagen midnight countdown.
2. **At midnight:** the lock transitions into the dark birthday journey.
3. **Birthday journey:** birthday reveal, curated wishes, approved community wishes, seven-photo slideshow, progressive new-year wishes, personal message, and quiet finale.
4. **Main birthday website:** a separate, full-page **light** website Martin can scroll through and revisit. Image 7 is used as the circular hero portrait. Sections include family, all curated wishes, community wishes, memories/photos, message, new-year wishes, and wish submission.
5. **Developer:** not part of the journey. A small Danish button at the very end of the light website opens a separate developer reveal. That chapter is always Danish.

## Language

Danish is the default. The language toggle can switch the birthday experience and main website to English. The developer reveal is intentionally language-locked to Danish.

## Assets

The real seven photos are in `public/photos/image-1.jpg` through `image-7.jpg`.

## Supabase

The existing Supabase schema and moderation model are preserved. Add the project URL and anon key using `.env.local` based on `.env.local.example`.

Sound files remain optional under `public/sounds/`.
